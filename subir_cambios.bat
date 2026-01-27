@echo off
echo ==========================================
echo      SINCRONIZANDO CON GITHUB...
echo ==========================================

:: 1. Añadir todos los archivos nuevos/modificados
git add .

:: 2. Guardar cambios (Commit) con fecha y hora
git commit -m "Auto-update: %date% %time%"

:: 3. Subir a la nube (Push)
echo Subiendo cambios...
git push

echo.
echo ==========================================
echo   LISTO! CAMBIOS SUBIDOS CORRECTAMENTE
echo   EasyPanel actualizara tu web en breve.
echo ==========================================
timeout /t 5
