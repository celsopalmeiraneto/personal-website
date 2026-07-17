#!/usr/bin/env bash
set -euo pipefail

BASELINE="$1"
CANDIDATE="$2"
API_KEY="${XAI_API_KEY:-}"

if [ -z "$BASELINE" ] || [ -z "$CANDIDATE" ]; then
  echo "Usage: compare-images.sh <baseline.png> <candidate.png>"
  exit 2
fi

if [ -z "$API_KEY" ]; then
  echo "Error: XAI_API_KEY environment variable is not set."
  exit 2
fi

if [ ! -f "$BASELINE" ]; then
  echo "Error: baseline image not found: $BASELINE"
  exit 2
fi

if [ ! -f "$CANDIDATE" ]; then
  echo "Error: candidate image not found: $CANDIDATE"
  exit 2
fi

BASELINE_B64_FILE=$(mktemp)
CANDIDATE_B64_FILE=$(mktemp)

base64 -w0 "$BASELINE" > "$BASELINE_B64_FILE"
base64 -w0 "$CANDIDATE" > "$CANDIDATE_B64_FILE"

PROMPT="Compare these two website screenshots. The first is the baseline (expected), the second is the new build (candidate). If they are visually identical in every aspect (layout, colors, fonts, spacing, text, images, elements), your response MUST start with the single word PASS on the first line. If there is ANY difference, however small, your response MUST start with the single word FAIL on the first line, followed by a detailed list of differences. Do NOT say PASS if there are differences, and do NOT say FAIL if they are identical. Be decisive."

PAYLOAD_FILE=$(mktemp)

jq -n \
  --arg model "grok-4.3" \
  --arg prompt "$PROMPT" \
  --rawfile baseline_b64 "$BASELINE_B64_FILE" \
  --rawfile candidate_b64 "$CANDIDATE_B64_FILE" \
  '{
    model: $model,
    store: false,
    input: [{
      role: "user",
      content: [
        { type: "input_image", image_url: "data:image/png;base64,\($baseline_b64)", detail: "high" },
        { type: "input_image", image_url: "data:image/png;base64,\($candidate_b64)", detail: "high" },
        { type: "input_text", text: $prompt }
      ]
    }]
  }' > "$PAYLOAD_FILE"

RESPONSE=$(curl -s -X POST https://api.x.ai/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -m 3600 \
  -d "@$PAYLOAD_FILE")

rm -f "$PAYLOAD_FILE" "$BASELINE_B64_FILE" "$CANDIDATE_B64_FILE"

echo "$RESPONSE" >&2

OUTPUT_TEXT=$(echo "$RESPONSE" | jq -r '.output[] | select(.type == "message") | .content[0].text // "ERROR: no response text"')

echo "$OUTPUT_TEXT"

if echo "$OUTPUT_TEXT" | head -1 | grep -q "PASS"; then
  exit 0
else
  exit 1
fi
