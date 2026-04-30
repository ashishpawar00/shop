@echo off
setlocal

set "ROOT=%~dp0"

echo Starting Laxmi Krashi Kendra frontend and backend...
echo.

start "Laxmi Krashi Backend" cmd /k "cd /d ""%ROOT%server"" && node server.js"
start "Laxmi Krashi Frontend" cmd /k "cd /d ""%ROOT%client"" && npm run dev"
