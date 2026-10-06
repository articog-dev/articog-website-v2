#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INPUT_DIR="$ROOT_DIR/public/videos"
OUTPUT_DIR="$INPUT_DIR/optimized"

command -v ffmpeg >/dev/null 2>&1 || {
  printf 'ffmpeg is required. Install it, then rerun this script.\n' >&2
  exit 1
}

mkdir -p "$OUTPUT_DIR"

encode_video() {
  local input="$1"
  local output="$2"
  local width="$3"
  local crf="$4"
  local maxrate="$5"
  local bufsize="$6"

  if [[ ! -f "$INPUT_DIR/$input" ]]; then
    printf 'Missing source video: %s\n' "$INPUT_DIR/$input" >&2
    exit 1
  fi

  ffmpeg -hide_banner -y -i "$INPUT_DIR/$input" \
    -map 0:v:0 -an \
    -vf "scale=${width}:-2:flags=lanczos" \
    -c:v libx264 -preset slow -crf "$crf" \
    -maxrate "$maxrate" -bufsize "$bufsize" \
    -pix_fmt yuv420p -movflags +faststart -map_metadata -1 \
    "$OUTPUT_DIR/$output"

  printf '%s -> %s\n' "$input" "$OUTPUT_DIR/$output"
}

encode_video hero.mp4 WA-03.mp4 1280 28 900k 1800k
encode_video hero.mp4 WA-03-mobile.mp4 640 29 550k 1100k
encode_video pipeline.mp4 WA-01.mp4 1280 27 850k 1700k
encode_video our-approach.mp4 WA-02.mp4 1280 27 1100k 2200k