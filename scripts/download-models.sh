#!/bin/bash

# Create models directory if it doesn't exist
mkdir -p public/models

# Download models from Sketchfab or other free sources
# Note: These are placeholder URLs - you'll need to replace them with actual model URLs
wget -O public/models/react-logo.glb https://example.com/react-logo.glb
wget -O public/models/nodejs-logo.glb https://example.com/nodejs-logo.glb
wget -O public/models/python-logo.glb https://example.com/python-logo.glb
wget -O public/models/docker-logo.glb https://example.com/docker-logo.glb
wget -O public/models/aws-logo.glb https://example.com/aws-logo.glb

echo "Models downloaded successfully!" 