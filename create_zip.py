import zipfile
import os

def create_zip(zip_name="FluxionTweaker_Project.zip"):
    files_to_include = [
        "fluxion_tweaker.py",
        "build_project.py",
        "installer_setup.iss",
        "README.md",
        "package.json",
        "src/App.tsx",
        "src/main.tsx",
        "src/index.css",
        "vite.config.ts",
        "tailwind.config.js"
    ]
    
    print(f"Creating {zip_name}...")
    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file in files_to_include:
            if os.path.exists(file):
                zipf.write(file)
                print(f"Added: {file}")
            else:
                print(f"Skipped (Not found): {file}")
    
    print("\nDONE! Zip archive created.")

if __name__ == "__main__":
    create_zip()
