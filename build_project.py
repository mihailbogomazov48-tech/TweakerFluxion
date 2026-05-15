import os
import subprocess
import sys

def build():
    print("--- FluxionTweaker v5.6 Build Tool ---")
    
    # 1. Check for PyInstaller
    try:
        import PyInstaller
    except ImportError:
        print("Installing PyInstaller...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pyinstaller"])

    # 2. Build React Frontend (optional, assumed built in dist/)
    print("Assuring dist/ folder exists for frontend assets...")
    if not os.path.exists("dist"):
        print("Warning: /dist folder not found. Web version may not be bundled correctly.")

    # 3. Build Python Executable
    print("Building FluxionTweaker.exe...")
    cmd = [
        "pyinstaller",
        "--noconfirm",
        "--onefile",
        "--windowed",
        "--icon=NONE", # Add icon path here if needed
        "--name=FluxionTweaker_v56",
        "--add-data=dist;dist", # Include React build if needed
        "fluxion_tweaker.py"
    ]
    
    try:
        subprocess.check_call(cmd)
        print("\nSUCCESS! Executable is in the 'dist' folder.")
    except Exception as e:
        print(f"\nBUILD FAILED: {e}")

if __name__ == "__main__":
    build()
