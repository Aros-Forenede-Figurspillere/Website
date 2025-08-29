# Simple HTTP Server for Testing
Write-Host "Starting local server..." -ForegroundColor Green
Write-Host "Open your browser to: http://localhost:8000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow

# Check if Python is available
if (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server 8000
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    python3 -m http.server 8000
} else {
    Write-Host "Python is not available. Please install Python or use another method to serve the files." -ForegroundColor Red
    Write-Host "Alternative: Use Live Server extension in VS Code" -ForegroundColor Yellow
}
