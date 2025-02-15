
#!/bin/bash

# Check for unprocessed changeset markdown files with at least two dashes (-)
if [ "$(find .changeset -name '*-*-*.md' | wc -l)" -ne "0" ]; then
  echo "Unprocessed changeset files with '*-*-*' detected. Setting failed condition."
  echo "release_ready=false"
else
  echo "No unprocessed changeset files detected. Setting successful condition."
  echo "release_ready=true"
fi
