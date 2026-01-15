# Demo Recording

Record terminal demos with asciinema.

## Prerequisites

```bash
# Install asciinema
brew install asciinema  # macOS
# or
pip install asciinema   # pip
```

## Recording

```bash
# From repo root
asciinema rec demo/frank.cast -c "./demo/record.sh"
```

## Preview

```bash
asciinema play demo/frank.cast
```

## Upload

```bash
asciinema upload demo/frank.cast
```

## Convert to GIF (optional)

```bash
# Install agg (asciinema gif generator)
cargo install --git https://github.com/asciinema/agg

# Convert
agg demo/frank.cast demo/frank.gif
```

## Tips

- Edit `record.sh` to adjust timing (`TYPE_DELAY`, `PAUSE_*` variables)
- The script creates a temp directory and cleans up after itself
- Re-record as many times as needed before uploading
