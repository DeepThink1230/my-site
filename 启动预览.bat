@echo off
chcp 65001 >nul
title 我的小站 - 本地预览
cd /d "%~dp0"
set "PATH=%~dp0.tools\node-v22.20.0-win-x64;%PATH%"

echo.
echo   🌱 正在启动小站预览，浏览器会自动打开 http://localhost:4321
echo   关闭本窗口即可停止预览
echo.

call npm run dev -- --open --port 4321
pause
