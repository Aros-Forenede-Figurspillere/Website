# Simple PowerShell HTTP Server for Local Development
# Run this script to serve your website locally and avoid CORS issues

param(
    [int]$Port = 8000
)

Write-Host "Starting local HTTP server on port $Port..." -ForegroundColor Green
Write-Host "Website will be available at: http://localhost:$Port" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

try {
    # Change to the website directory
    Set-Location $PSScriptRoot
    
    # Try Python first (most reliable)
    if (Get-Command python -ErrorAction SilentlyContinue) {
        Write-Host "Using Python HTTP server..." -ForegroundColor Green
        python -m http.server $Port
    }
    # Try Node.js http-server if available
    elseif (Get-Command npx -ErrorAction SilentlyContinue) {
        Write-Host "Using Node.js http-server..." -ForegroundColor Green
        npx http-server -p $Port -c-1
    }
    # Try PowerShell 7+ web server
    elseif ($PSVersionTable.PSVersion.Major -ge 7) {
        Write-Host "Using PowerShell web server..." -ForegroundColor Green
        # Simple PowerShell web server (requires PS 7+)
        $listener = [System.Net.HttpListener]::new()
        $listener.Prefixes.Add("http://localhost:$Port/")
        $listener.Start()
        Write-Host "Server started at http://localhost:$Port/"
        
        while ($listener.IsListening) {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            
            $localPath = $request.Url.LocalPath
            if ($localPath -eq "/") { $localPath = "/index.html" }
            
            $filePath = Join-Path $PSScriptRoot $localPath.TrimStart('/')
            
            if (Test-Path $filePath -PathType Leaf) {
                $content = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $content.Length
                $response.OutputStream.Write($content, 0, $content.Length)
            } else {
                $response.StatusCode = 404
                $errorContent = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
                $response.ContentLength64 = $errorContent.Length
                $response.OutputStream.Write($errorContent, 0, $errorContent.Length)
            }
            
            $response.Close()
        }
    }
    else {
        Write-Error "No suitable HTTP server found. Please install Python or Node.js."
        Write-Host "Alternatives:" -ForegroundColor Yellow
        Write-Host "1. Install Python: https://www.python.org/downloads/" -ForegroundColor Cyan
        Write-Host "2. Install Node.js: https://nodejs.org/" -ForegroundColor Cyan
        Write-Host "3. Use VS Code Live Server extension" -ForegroundColor Cyan
    }
}
catch {
    Write-Error "Error starting server: $_"
}
finally {
    if ($listener) {
        $listener.Close()
    }
}
