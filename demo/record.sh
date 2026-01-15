#!/usr/bin/env bash
#
# Asciinema Demo Script for Frank
#
# Usage:
#   asciinema rec demo.cast -c "./demo/record.sh"
#
# Tips:
#   - Use asciinema play demo.cast to preview
#   - Upload with: asciinema upload demo.cast
#

set -e

# Use local frank from repo
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
frank() {
    bun run "$REPO_ROOT/src/index.ts" "$@"
}

# Colors
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

# Typing simulation delay (seconds)
TYPE_DELAY=0.04
PAUSE_SHORT=1
PAUSE_MEDIUM=2
PAUSE_LONG=3

# Simulated typing effect
type_cmd() {
    echo -ne "${BOLD}\$ ${RESET}"
    for ((i=0; i<${#1}; i++)); do
        echo -n "${1:$i:1}"
        sleep $TYPE_DELAY
    done
    echo
    sleep 0.3
}

# Run a command with typing effect
run() {
    type_cmd "$1"
    eval "$1"
}

# Pause with optional message
pause() {
    sleep "${1:-$PAUSE_MEDIUM}"
}

# Clear and show title
clear
echo -e "${BOLD}"
cat << 'EOF'
    _____ ____      _    _   _ _  __
   |  ___|  _ \    / \  | \ | | |/ /
   | |_  | |_) |  / _ \ |  \| | ' /
   |  _| |  _ <  / ___ \| |\  | . \
   |_|   |_| \_\/_/   \_\_| \_|_|\_\

   Blueprint-Driven Development
EOF
echo -e "${RESET}"
pause $PAUSE_LONG

# Setup demo directory
DEMO_DIR="/tmp/frank-demo-$$"
mkdir -p "$DEMO_DIR"
cd "$DEMO_DIR"

echo -e "${DIM}# Let's create a new project...${RESET}"
pause $PAUSE_SHORT

run "frank init"
pause $PAUSE_MEDIUM

echo
echo -e "${DIM}# The Blueprint is assembled. Let's check the status...${RESET}"
pause $PAUSE_SHORT

run "frank status"
pause $PAUSE_MEDIUM

echo
echo -e "${DIM}# Add the Zig Organ for systems programming...${RESET}"
pause $PAUSE_SHORT

run "frank add zig"
pause $PAUSE_MEDIUM

echo
echo -e "${DIM}# Check status again...${RESET}"
pause $PAUSE_SHORT

run "frank status"
pause $PAUSE_MEDIUM

echo
echo -e "${DIM}# The .project/ folder is the source of truth...${RESET}"
pause $PAUSE_SHORT

run "ls -la .project/"
pause $PAUSE_MEDIUM

echo
echo -e "${DIM}# The kanban tracks our work...${RESET}"
pause $PAUSE_SHORT

run "cat .project/kanban/backlog.md"
pause $PAUSE_MEDIUM

echo
echo -e "${DIM}# And now... the incantation.${RESET}"
pause $PAUSE_SHORT

run "frank alive"
pause $PAUSE_LONG

# Cleanup
cd /
rm -rf "$DEMO_DIR"

echo
echo -e "${BOLD}Demo complete. IT'S ALIVE!${RESET}"
echo
