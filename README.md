# FluxionTweaker v3.0

FluxionTweaker is a powerful optimization and tweaking utility for Windows 10 and 11. It features a modern 16:9 Glassmorphism UI (1280x720) and a wide range of features to improve your system's performance, privacy, and gaming experience.

## Features

- **Performance:** Game Mode, Visual Effects optimization, Disk cleaning.
- **Gaming:** GraalVM installation, RAM calculator, TCP No Delay.
- **Privacy:** Host Blocker, Cortana disabling, Telemetry removal.
- **Maintenance:** WinSxS cleaning, Driver Store management.
- **Multi-language:** English, Russian, Ukrainian, Japanese, Chinese.
- **Advanced UI:** Glassmorphism, Animated transitions, Real-time monitoring stats.

## Build Instructions (EXE)

To create the standalone EXE file, follow these steps:

1. **Install Python 3.11+**
2. **Install dependencies:**
   ```bash
   pip install pillow wmi pywin32
   ```
3. **Install PyInstaller:**
   ```bash
   pip install pyinstaller
   ```
4. **Build the EXE:**
   ```bash
   pyinstaller --onefile --noconsole --uac-admin --name FluxionTweaker fluxion_tweaker.py
   ```
5. The generated file will be in the `dist/` folder.

## Build Instructions (Web/Vite)

1. **Install Node.js 18+**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Build Static Files:**
   ```bash
   npm run build
   ```
   Static files will be generated in the `dist/` directory.

## Requirements

- Windows 10 or 11
- Administrator privileges (for system modifications)
