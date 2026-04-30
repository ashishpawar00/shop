@echo off
setlocal

cd /d "%~dp0server"

echo Starting Laxmi Krashi Kendra backend server...
echo.
node server.js

if errorlevel 1 (
  echo.
  echo Server stopped with an error.
  pause
)
