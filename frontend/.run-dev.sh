#!/bin/bash
export PATH="$HOME/.local/node/bin:$PATH"
export BROWSER=none
export PORT=3000
export REACT_APP_BACKEND_URL=http://localhost:8000
export WDS_SOCKET_PORT=3000
export DANGEROUSLY_DISABLE_HOST_CHECK=true
cd "$(dirname "$0")"
exec yarn start
