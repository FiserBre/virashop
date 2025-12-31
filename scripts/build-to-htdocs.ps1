# Build the Vite app and copy production files into ./htdocs
# Usage: run this from project root in PowerShell: `npm run build:htdocs`

# Run the production build
npm run build

# Ensure htdocs exists
if (-Not (Test-Path -Path .\htdocs)) {
  New-Item -ItemType Directory -Path .\htdocs | Out-Null
}

# Clear existing htdocs contents (but keep folder)
Get-ChildItem -Path .\htdocs -Force | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Copy build output
Copy-Item -Path .\dist\* -Destination .\htdocs -Recurse -Force

# If images folder exists in project root, copy it into htdocs/images
if (Test-Path -Path .\images) {
  Copy-Item -Path .\images -Destination .\htdocs\images -Recurse -Force -ErrorAction SilentlyContinue
}

# Copy .htaccess if present
if (Test-Path -Path .\.htaccess) {
  Copy-Item -Path .\.htaccess -Destination .\htdocs\.htaccess -Force
}

Write-Host "Build and copy complete. htdocs is ready." -ForegroundColor Green
