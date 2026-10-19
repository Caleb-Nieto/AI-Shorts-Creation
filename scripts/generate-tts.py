import argparse
import asyncio
import json
import os
import subprocess
import sys
import edge_tts

VOICE = "es-MX-JorgeNeural" # Voz masculina enérgica, contundente y seria
RATE = "+12%" # Cadencia indignada, mordaz y dinámica

async def generate_audio_for_act(text: str, output_path: str):
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicate.save(output_path)

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

async def main():
    parser = argparse.ArgumentParser(description="TTS Audio Generator")
    parser.add_argument("--slug", default="sillas-gamer")
    parser.add_argument("--provider", default="edge", choices=["edge", "voicebox"])
    args = parser.parse_args()

    slug = args.slug

    # If voicebox provider is requested, delegate to generate-voicebox.py
    if args.provider == "voicebox":
        voicebox_script = os.path.join(os.path.dirname(__file__), "generate-voicebox.py")
        res = subprocess.run([sys.executable, voicebox_script, f"--slug={slug}"], capture_output=True, text=True)
        if res.stdout:
            print(res.stdout.strip())
        if res.returncode != 0:
            if res.stderr and not res.stdout:
                print(json.dumps({"status": "error", "message": res.stderr.strip(), "slug": slug}))
            sys.exit(res.returncode)
        return

    script_path = os.path.join("src", "videos", slug, "script.json")
    if not os.path.exists(script_path):
        print(json.dumps({"status": "error", "message": f"File not found: {script_path}", "slug": slug}))
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
            mp3_path = os.path.join(assets_dir, f"act{act_num}.mp3")
            wav_path = os.path.join(assets_dir, f"act{act_num}.wav")

            await generate_audio_for_act(narration, mp3_path)

            # Convert to WAV with standard sample rate for maximum Remotion compatibility
            subprocess.run(["ffmpeg", "-y", "-i", mp3_path, "-ar", "44100", "-ac", "2", wav_path],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

            duration_sec = get_audio_duration(wav_path)
            # Add safety frames for sound decay/breathing between acts (e.g. 15-20 frames)
            duration_frames = int(round(duration_sec * fps)) + 15

            act_data = {
                "act": act_num,
                "audio": f"assets/{slug}/act{act_num}.wav",
                "durationSeconds": round(duration_sec, 2),
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
            "voiceProfile": VOICE,
            "acts": acts_output,
            "totalDurationInFrames": current_frame,
            "totalDurationSeconds": total_duration_sec
        }

        timestamps_path = os.path.join(assets_dir, "timestamps.json")
        with open(timestamps_path, "w", encoding="utf-8") as f:
            json.dump(timestamps_data, f, indent=2, ensure_ascii=False)

        # Single-line JSON output adhering to minimalist output policy
        print(json.dumps({
            "status": "ok",
            "provider": "edge",
            "slug": slug,
            "acts": len(acts_output),
            "totalDurationSeconds": total_duration_sec,
            "totalFrames": current_frame
        }))

    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e), "slug": slug}))
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())
