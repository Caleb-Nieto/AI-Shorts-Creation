import argparse
import json
import os
import subprocess
import sys
import time
import urllib.request
import urllib.error

VOICEBOX_HOST = os.environ.get("VOICEBOX_HOST", "http://127.0.0.1:17493")
CLIENT_ID = "claude-code"
DEFAULT_PROFILE_ID = "93c085b9-0268-465e-8020-256bb9268415" # "My voice"
DEFAULT_ENGINE = "qwen"
DEFAULT_MODEL_SIZE = "1.7B"
DEFAULT_INSTRUCT = "angry"
TIMEOUT_SECONDS = 300

def get_audio_duration(file_path: str) -> float:
    cmd = [
        "ffprobe",
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        file_path
    ]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
    return float(result.stdout.strip())

def request_json(url: str, method: str = "GET", data: dict = None, timeout: int = 20):
    headers = {"X-Voicebox-Client-Id": CLIENT_ID}
    body = None
    if data is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))

def download_file(url: str, dest_path: str, timeout: int = 40):
    headers = {"X-Voicebox-Client-Id": CLIENT_ID}
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=timeout) as resp, open(dest_path, "wb") as f:
        f.write(resp.read())

def unload_models(host: str):
    """Frees GPU/CPU memory by unloading active models."""
    try:
        request_json(f"{host}/models/unload", method="POST", timeout=10)
    except Exception:
        pass

def generate_voicebox_act(text: str, profile_id: str, host: str, output_wav: str, instruct: str = None) -> float:
    payload = {
        "profile_id": profile_id,
        "text": text,
        "language": "es",
        "engine": DEFAULT_ENGINE,
        "model_size": DEFAULT_MODEL_SIZE,
        "normalize": True
    }
    if instruct:
        payload["instruct"] = instruct

    print(f"Enviando solicitud a Voicebox (instruct='{instruct}')...")
    gen_resp = request_json(f"{host}/generate", method="POST", data=payload, timeout=30)
    gen_id = gen_resp.get("id")
    if not gen_id:
        raise RuntimeError(f"Voicebox did not return a generation id: {gen_resp}")

    print(f"Generación iniciada (ID: {gen_id}). Esperando síntesis...")
    start_time = time.time()
    while time.time() - start_time < TIMEOUT_SECONDS:
        time.sleep(2.0)
        history = request_json(f"{host}/history/{gen_id}", method="GET", timeout=10)
        status = history.get("status")
        if status == "completed":
            print(f"Completado en {round(time.time() - start_time, 1)}s. Descargando audio...")
            download_file(f"{host}/audio/{gen_id}", output_wav, timeout=30)
            duration = history.get("duration")
            if not duration or duration <= 0:
                duration = get_audio_duration(output_wav)
            return float(duration)
        elif status == "failed":
            error_msg = history.get("error", "Unknown Voicebox error")
            raise RuntimeError(f"Voicebox generation failed for act: {error_msg}")

    raise TimeoutError(f"Voicebox generation timed out after {TIMEOUT_SECONDS}s for id {gen_id}")

def main():
    parser = argparse.ArgumentParser(description="Voicebox Autonomous Audio Generator")
    parser.add_argument("--slug", required=True, help="Video slug directory name")
    parser.add_argument("--profile-id", default=DEFAULT_PROFILE_ID, help="Voicebox profile ID")
    parser.add_argument("--instruct", default=DEFAULT_INSTRUCT, help="Emotion or style instruction")
    parser.add_argument("--host", default=VOICEBOX_HOST, help="Voicebox base URL")
    args = parser.parse_args()

    slug = args.slug
    script_path = os.path.join("src", "videos", slug, "script.json")

    if not os.path.exists(script_path):
        print(json.dumps({"status": "error", "message": f"File not found: {script_path}", "slug": slug}))
        sys.exit(1)

    try:
        try:
            request_json(f"{args.host}/health", timeout=5)
        except Exception:
            request_json(f"{args.host}/", timeout=5)
    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": f"Cannot connect to Voicebox at {args.host}. Check if Voicebox is running.",
            "error": str(e),
            "slug": slug
        }))
        sys.exit(1)

    try:
        with open(script_path, "r", encoding="utf-8") as f:
            script_data = json.load(f)

        fps = script_data.get("fps", 60)
        assets_dir = os.path.join("public", "assets", slug)
        os.makedirs(assets_dir, exist_ok=True)

        acts_output = []
        current_frame = 0

        for act in script_data.get("acts", []):
            act_num = act["act"]
            narration = act["narration"]
            wav_path = os.path.join(assets_dir, f"act{act_num}.wav")
            mp3_path = os.path.join(assets_dir, f"act{act_num}.mp3")

            print(f"\n--- Generando Acto {act_num} con 'My voice' (angry) ---")
            print(f"Texto: \"{narration}\"")
            duration_sec = generate_voicebox_act(narration, args.profile_id, args.host, wav_path, instruct=args.instruct)

            # Standardize audio with ffmpeg: 44100Hz, stereo 16-bit
            temp_wav = wav_path + ".tmp.wav"
            subprocess.run(
                ["ffmpeg", "-y", "-i", wav_path, "-ar", "44100", "-ac", "2", temp_wav],
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True
            )
            os.replace(temp_wav, wav_path)

            # Also generate MP3 for fallback
            subprocess.run(
                ["ffmpeg", "-y", "-i", wav_path, "-q:a", "2", mp3_path],
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True
            )

            actual_duration = get_audio_duration(wav_path)
            # Add safety frames for sound decay between acts (e.g. 10 frames)
            duration_frames = int(round(actual_duration * fps)) + 10

            act_data = {
                "act": act_num,
                "audio": f"assets/{slug}/act{act_num}.wav",
                "durationSeconds": round(actual_duration, 2),
                "durationInFrames": duration_frames,
                "startFrame": current_frame,
                "endFrame": current_frame + duration_frames,
                "transcript": narration
            }
            acts_output.append(act_data)
            current_frame += duration_frames

        total_duration_sec = round(current_frame / fps, 2)
        timestamps_data = {
            "fps": fps,
            "voiceProfile": "My voice (Voicebox)",
            "profileId": args.profile_id,
            "instruct": args.instruct,
            "acts": acts_output,
            "totalDurationInFrames": current_frame,
            "totalDurationSeconds": total_duration_sec
        }

        timestamps_path = os.path.join(assets_dir, "timestamps.json")
        with open(timestamps_path, "w", encoding="utf-8") as f:
            json.dump(timestamps_data, f, indent=2, ensure_ascii=False)

        unload_models(args.host)

        print("\n===============================")
        print(f"Síntesis completada con Voicebox ('My voice', instruct='{args.instruct}')!")
        print(f"Duración total: {total_duration_sec} segundos ({current_frame} fotogramas a {fps} fps)")
        print(f"Timestamps guardados en: {timestamps_path}")
        print("===============================\n")

    except Exception as e:
        unload_models(args.host)
        print(json.dumps({
            "status": "error",
            "message": str(e),
            "slug": slug
        }))
        sys.exit(1)

if __name__ == "__main__":
    main()
