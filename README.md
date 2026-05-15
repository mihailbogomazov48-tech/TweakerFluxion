# FluxionTweaker v5.6 Pro Build

FluxionTweaker is a powerful optimization and tweaking utility for Windows 10 and 11. It features a modern 16:9 Glassmorphism UI (1280x720) and a wide range of features to improve your system's performance, privacy, and gaming experience.

## What's New in v5.6 (May 2026)
- **Always on Top:** Stay focused with the new pinning feature.
- **Bypass TTL:** Optimize your network for internet distribution.
- **Hard-disable Updates:** Block windows updates through registry and hosts securely.
- **Edge removal:** Completely uninstall Microsoft Edge.
- **Process management:** New visual indicators for system health.
- **Advanced tweaks:** VBS disabling, HWID activation, and more.

## Features
- **Optimization:** MSI Mode, HPET disabling, VBS management.
- **Gaming:** GraalVM installation, RAM calculator, TCP No Delay.
- **Privacy:** Host Blocker, Yandex Browser blocking, Telemetry removal.
- **Maintenance:** WinSxS cleaning, Driver Store management, UWP app removal.
- **Multi-language:** English, Russian, Ukrainian, Japanese, Chinese.
- **Advanced UI:** Glassmorphism, Animated transitions, Real-time monitoring stats.

## Build Instructions (EXE)
To create the standalone EXE file, use the provided builder script:
1. Ensure you have Python installed.
2. Run `python build_project.py`.
3. The generated file will be in the `dist/` folder.

## Creating an Installer (Setup.exe)
We use **Inno Setup** to create professional installers:
1. Install [Inno Setup](https://jrsoftware.org/).
2. Build the project using `build_project.py` first to get the `.exe`.
3. Open `installer_setup.iss` in Inno Setup.
4. Click **Compile**.
5. Your setup file will be in the `installer_output/` folder.

## Build Instructions (Web/Vite)
1. **Install Node.js 18+**
2. **Install dependencies:** `npm install`
3. **Build:** `npm run build`

## Requirements

- Windows 10 or 11
- Administrator privileges (for system modifications)
