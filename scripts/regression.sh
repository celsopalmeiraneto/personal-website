#!/usr/bin/env bash
set -uo pipefail

BASELINES_DIR="${1:-test-screenshots/baselines}"
CANDIDATE_DIR="${2:-test-screenshots/current}"

if [ ! -d "$BASELINES_DIR" ]; then
  echo "Error: baselines directory not found: $BASELINES_DIR"
  exit 2
fi

if [ ! -d "$CANDIDATE_DIR" ]; then
  echo "Error: candidate directory not found: $CANDIDATE_DIR"
  exit 2
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMPARE_SCRIPT="$SCRIPT_DIR/compare-images.sh"

PASS=0
FAIL=0
FAILURES=""

echo "========================================="
echo " Visual Regression Report"
echo "========================================="
echo ""

for BASELINE in "$BASELINES_DIR"/*.png; do
  FNAME=$(basename "$BASELINE")
  CANDIDATE="$CANDIDATE_DIR/$FNAME"

  if [ ! -f "$CANDIDATE" ]; then
    echo "  [MISS] $FNAME - no candidate found"
    ((FAIL++))
    continue
  fi

  echo -n "  $FNAME ... "

  if RESULT=$("$COMPARE_SCRIPT" "$BASELINE" "$CANDIDATE" 2>/dev/null); then
    echo "PASS"
    ((PASS++))
  else
    echo "FAIL"
    ((FAIL++))
    FAILURES="$FAILURES\n--- $FNAME ---\n$RESULT"
  fi
done

echo ""
echo "========================================="
echo " Summary: $PASS passed, $FAIL failed"
echo "========================================="

if [ -n "$FAILURES" ]; then
  echo ""
  echo "Failures detail:"
  echo -e "$FAILURES"
  echo ""
  exit 1
fi

exit 0
