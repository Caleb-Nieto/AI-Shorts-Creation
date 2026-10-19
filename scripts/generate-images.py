import argparse
import json
import os
import random
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid

COMFY_HOST = os.environ.get("COMFYUI_HOST", "http://127.0.0.1:8188")
TIMEOUT_SECONDS = 120

ASPECT_RATIOS = {
    "1:1": (1024, 1024),
    "9:16": (768, 1344),
    "16:9": (1344, 768),
    "4:5": (896, 1120),
    "3:4": (864, 1152),
    "4:3": (1152, 864)
}

def request_json(url: str, method: str = "GET", data: dict = None, timeout: int = 15):
    body = None
    headers = {}
    if data is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))

def download_file(url: str, dest_path: str, timeout: int = 30):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=timeout) as resp, open(dest_path, "wb") as f:
        f.write(resp.read())

def get_available_checkpoints(host: str) -> list:
    try:
        obj_info = request_json(f"{host}/object_info/CheckpointLoaderSimple", timeout=10)
        ckpt_list = obj_info.get("CheckpointLoaderSimple", {}).get("input", {}).get("required", {}).get("ckpt_name", [[]])[0]
        return ckpt_list or []
    except Exception:
        return []

def build_workflow(ckpt_name: str, positive_prompt: str, negative_prompt: str, width: int, height: int, seed: int, prefix: str):
    return {
        "3": {
            "class_type": "KSampler",
            "inputs": {
                "cfg": 7.0,
                "denoise": 1.0,
                "latent_image": ["5", 0],
                "model": ["4", 0],
                "negative": ["7", 0],
                "positive": ["6", 0],
                "sampler_name": "euler",
                "scheduler": "normal",
                "seed": seed,
                "steps": 20
            }
        },
        "4": {
            "class_type": "CheckpointLoaderSimple",
            "inputs": {
                "ckpt_name": ckpt_name
            }
        },
        "5": {
            "class_type": "EmptyLatentImage",
            "inputs": {
                "batch_size": 1,
                "height": height,
                "width": width
            }
        },
        "6": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "clip": ["4", 1],
                "text": positive_prompt
            }
        },
        "7": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "clip": ["4", 1],
                "text": negative_prompt
            }
        },
        "8": {
            "class_type": "VAEDecode",
            "inputs": {
                "samples": ["3", 0],
                "vae": ["4", 2]
            }
        },
        "9": {
            "class_type": "SaveImage",
            "inputs": {
                "filename_prefix": prefix,
                "images": ["8", 0]
            }
        }
    }

def assemble_prompts(subject: str, style_config: dict) -> tuple:
    theme_name = style_config.get("themeName", "Retro Editorial")
    palette = style_config.get("palette", {})
    palette_colors = ", ".join(filter(None, [
        palette.get("accentPrimary"),
        palette.get("accentSecondary"),
        palette.get("accentHighlighter"),
        palette.get("gridAndBorders")
    ]))

    positive = (
        f"Cutout illustration of {subject}, {theme_name} graphic design style, "
        f"clean sharp sticker silhouette, isolated on solid pure white background, "
        f"color palette hints ({palette_colors}), subtle paper texture, vector-like editorial art, "
        f"bold contour, high definition, 2d graphic cutout, no photorealism"
    )

    negative = (
        "photorealistic, photograph, 3d render, noisy background, realistic skin texture, "
        "gradients, clutter, blurry, low quality, artifacts, watermark, text, frame, border"
    )

    return positive, negative

def generate_single_image(host: str, workflow: dict, dest_file: str) -> bool:
    client_id = str(uuid.uuid4())
    payload = {"prompt": workflow, "client_id": client_id}
    queue_resp = request_json(f"{host}/prompt", method="POST", data=payload, timeout=15)
    prompt_id = queue_resp.get("prompt_id")

    if not prompt_id:
        raise RuntimeError(f"ComfyUI rejected prompt: {queue_resp}")

    start_time = time.time()
    while time.time() - start_time < TIMEOUT_SECONDS:
        time.sleep(1.5)
        history = request_json(f"{host}/history/{prompt_id}", method="GET", timeout=10)
        if prompt_id in history:
            hist_item = history[prompt_id]
            outputs = hist_item.get("outputs", {})

            # Locate SaveImage node output
            images_found = []
            for node_id, node_data in outputs.items():
                if "images" in node_data:
                    images_found.extend(node_data["images"])

            if images_found:
                img_info = images_found[0]
                filename = img_info["filename"]
                subfolder = img_info.get("subfolder", "")
                folder_type = img_info.get("type", "output")

                params = urllib.parse.urlencode({
                    "filename": filename,
                    "subfolder": subfolder,
                    "type": folder_type
                })
                img_url = f"{host}/view?{params}"
                download_file(img_url, dest_file, timeout=30)
                return True

            status = hist_item.get("status", {})
            if status.get("status_str") == "error":
                messages = status.get("messages", [])
                raise RuntimeError(f"ComfyUI execution error: {messages}")

    raise TimeoutError(f"ComfyUI image generation timed out after {TIMEOUT_SECONDS}s")

def main():
    parser = argparse.ArgumentParser(description="ComfyUI Autonomous Image Generator")
    parser.add_argument("--slug", required=True, help="Video slug directory name")
    parser.add_argument("--host", default=COMFY_HOST, help="ComfyUI API base URL")
    parser.add_argument("--ckpt", default=None, help="Explicit checkpoint model name")
    args = parser.parse_args()

    slug = args.slug
    assets_dir = os.path.join("public", "assets", slug)
    prompts_path = os.path.join(assets_dir, "image-prompts.json")

    # If image-prompts.json does not exist, return ok with 0 items
    if not os.path.exists(prompts_path):
        print(json.dumps({
            "status": "ok",
            "slug": slug,
            "items": 0,
            "message": f"No image-prompts.json found at {prompts_path}"
        }))
        return

    try:
        with open(prompts_path, "r", encoding="utf-8") as f:
            items = json.load(f)
    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Invalid JSON in {prompts_path}: {e}", "slug": slug}))
        sys.exit(1)

    if not isinstance(items, list) or len(items) == 0:
        print(json.dumps({"status": "ok", "slug": slug, "items": 0, "message": "Prompts list is empty"}))
        return

    # Check ComfyUI server connectivity
    try:
        request_json(f"{args.host}/system_stats", timeout=5)
    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": f"Cannot connect to ComfyUI at {args.host}. Ensure ComfyUI is running.",
            "error": str(e),
            "slug": slug
        }))
        sys.exit(1)

    # Read style.json locally
    style_path = os.path.join("docs", "style.json")
    style_config = {}
    if os.path.exists(style_path):
        try:
            with open(style_path, "r", encoding="utf-8") as f:
                style_config = json.load(f)
        except Exception:
            pass

    # Check available checkpoints
    ckpt_name = args.ckpt
    available_ckpts = get_available_checkpoints(args.host)
    if not ckpt_name:
        if available_ckpts:
            ckpt_name = available_ckpts[0]
        else:
            print(json.dumps({
                "status": "error",
                "message": "ComfyUI is running, but no checkpoint model (.safetensors) was found in ComfyUI models/checkpoints folder. Please download or place a model checkpoint.",
                "slug": slug,
                "available_checkpoints": []
            }))
            sys.exit(1)

    saved_files = []
    os.makedirs(assets_dir, exist_ok=True)

    try:
        for idx, item in enumerate(items):
            item_id = str(item.get("id", f"cutout_{idx}"))
            subject = item.get("subject", "")
            aspect_ratio = item.get("aspect_ratio", "1:1")
            width, height = ASPECT_RATIOS.get(aspect_ratio, (1024, 1024))

            # Standardize filename: cutout_0.png
            filename = f"{item_id}.png" if item_id.startswith("cutout_") else f"cutout_{item_id}.png"
            dest_file = os.path.join(assets_dir, filename)

            pos_prompt, neg_prompt = assemble_prompts(subject, style_config)
            seed = random.randint(1000000, 9999999999)
            prefix = f"remotion_{slug}_{item_id}"

            workflow = build_workflow(ckpt_name, pos_prompt, neg_prompt, width, height, seed, prefix)
            generate_single_image(args.host, workflow, dest_file)

            if os.path.exists(dest_file):
                saved_files.append(filename)

        # Single-line JSON log (Zero-Payload, minimal output)
        print(json.dumps({
            "status": "ok",
            "slug": slug,
            "items": len(saved_files),
            "outputs": saved_files
        }))

    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": str(e),
            "slug": slug,
            "partial_outputs": saved_files
        }))
        sys.exit(1)

if __name__ == "__main__":
    main()
