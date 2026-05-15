import os
import sys
import subprocess
import ctypes
import platform
import json
import webbrowser
import threading
import time
from tkinter import *
from tkinter import ttk, messagebox
from PIL import Image, ImageTk, ImageDraw
import wmi
import winreg

# Check for admin privileges
def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

if not is_admin():
    # Re-run the program with admin rights
    ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, " ".join(sys.argv), None, 1)
    sys.exit()

class FluxionTweaker:
    def __init__(self, root):
        self.root = root
        self.root.title("FluxionTweaker v3.0")
        self.root.geometry("1280x720")
        self.root.resizable(False, False)
        
        # Languages
        self.translations = {
            "EN": {
                "Main": "Main", "Optimization": "Optimization", "Gaming": "Gaming", "Privacy": "Privacy",
                "Cleaning": "Cleaning", "Debloat": "Debloat", "Customization": "Customization",
                "Monitoring": "Monitoring", "Activation": "Activation", "Programs": "Programs",
                "Frameworks": "Frameworks", "Drivers": "Drivers", "Settings": "Settings", "About": "About",
                "Search": "Search functions...", "Language": "Select Language", "Theme": "Select Theme",
                "OptimizeAll": "Full Optimization (One Click)", "Specs": "Hardware Specification"
            },
            "RU": {
                "Main": "Главная", "Optimization": "Оптимизация", "Gaming": "Игры", "Privacy": "Приватность",
                "Cleaning": "Очистка", "Debloat": "Деблоат", "Customization": "Кастомизация",
                "Monitoring": "Мониторинг", "Activation": "Активация", "Programs": "Программы",
                "Frameworks": "Фреймворки", "Drivers": "Драйверы", "Settings": "Настройки", "About": "О программе",
                "Search": "Поиск функций...", "Language": "Выбор языка", "Theme": "Выбор темы",
                "OptimizeAll": "Полная оптимизация (В один клик)", "Specs": "Характеристики оборудования"
            },
            "UA": {
                "Main": "Головна", "Optimization": "Оптимізація", "Gaming": "Ігри", "Privacy": "Приватність",
                "Cleaning": "Очистка", "Debloat": "Деблоат", "Customization": "Кастомізація",
                "Monitoring": "Моніторинг", "Activation": "Активація", "Programs": "Програми",
                "Frameworks": "Фреймворки", "Drivers": "Драйвери", "Settings": "Налаштування", "About": "Про програму",
                "Search": "Пошук функцій...", "Language": "Вибір мови", "Theme": "Вибір теми",
                "OptimizeAll": "Повна оптимізація (В один клік)", "Specs": "Характеристики обладнання"
            },
            "JP": {
                "Main": "メイン", "Optimization": "最適化", "Gaming": "ゲーム", "Privacy": "プライバシー",
                "Cleaning": "クリーニング", "Debloat": "不要ソフト削除", "Customization": "カスタマイズ",
                "Monitoring": "モニタリング", "Activation": "ライセンス認証", "Programs": "プログラム",
                "Frameworks": "フレームワーク", "Drivers": "ドライバー", "Settings": "設定", "About": "情報",
                "Search": "機能を検索...", "Language": "言語の選択", "Theme": "テーマの選択",
                "OptimizeAll": "すべて最適化 (ワンクリック)", "Specs": "ハードウェア仕様"
            },
            "CN": {
                "Main": "主页", "Optimization": "优化", "Gaming": "游戏", "Privacy": "隐私",
                "Cleaning": "清理", "Debloat": "精简", "Customization": "自定义",
                "Monitoring": "监控", "Activation": "激活", "Programs": "程序",
                "Frameworks": "框架", "Drivers": "驱动程序", "Settings": "设置", "About": "关于",
                "Search": "搜索功能...", "Language": "语言选择", "Theme": "主题选择",
                "OptimizeAll": "一键优化", "Specs": "硬件规格"
            }
        }
        self.lang = "EN"
        self.t = self.translations[self.lang]
        
        # Colors & Themes
        self.themes = {
            "Dark": {"bg": "#1a1625", "sidebar": "#2a2435", "accent": "#007AFF", "text": "#e2e0e7", "card": "#352e46"},
            "White": {"bg": "#eeeff1", "sidebar": "#ffffff", "accent": "#007aff", "text": "#0f172a", "card": "#f8fafc"},
            "Yellow": {"bg": "#1c1a0e", "sidebar": "#2d2a1c", "accent": "#FFD60A", "text": "#e7e7e0", "card": "#3b382a"},
            "Purple": {"bg": "#1b1221", "sidebar": "#2b1e33", "accent": "#BF5AF2", "text": "#e0e0e7", "card": "#392b45"},
            "Red": {"bg": "#1f1111", "sidebar": "#331c1c", "accent": "#FF3B30", "text": "#e7e0e0", "card": "#422626"}
        }
        self.current_theme = "Dark"
        self.colors = self.themes[self.current_theme]
        
        self.setup_ui()
        self.start_monitoring()

    def setup_ui(self):
        # Background
        self.bg_canvas = Canvas(self.root, width=1280, height=720, bg=self.colors["bg"], highlightthickness=0)
        self.bg_canvas.pack(fill=BOTH, expand=True)
        
        # Sidebar
        self.sidebar = Frame(self.bg_canvas, width=280, bg=self.colors["sidebar"], highlightthickness=0)
        self.sidebar.place(x=0, y=0, relheight=1)
        
        # Search Bar
        self.search_var = StringVar()
        self.search_entry = Entry(self.sidebar, textvariable=self.search_var, bg=self.colors["card"], fg=self.colors["text"], insertbackground=self.colors["text"], relief=FLAT, font=("Inter", 12))
        self.search_entry.place(x=20, y=20, width=240, height=40)
        self.search_entry.insert(0, "Search functions...")
        
        # Navigation
        self.nav_items = [
            "Main", "Optimization", "Gaming", "Privacy", "Cleaning", 
            "Debloat", "Customization", "Monitoring", "Activation", 
            "Programs", "Frameworks", "Drivers", "Settings", "About"
        ]
        self.nav_buttons = []
        for i, item in enumerate(self.nav_items):
            display_name = self.t.get(item, item)
            btn = Button(self.sidebar, text=display_name, bg=self.colors["sidebar"], fg=self.colors["text"], activebackground=self.colors["accent"], activeforeground="#FFFFFF", border=0, font=("Inter", 11), anchor="w", padx=20, command=lambda x=item: self.show_page(x))
            btn.place(x=0, y=80 + (i * 45), width=280, height=40)
            self.nav_buttons.append(btn)
            
        # Main Content Area
        self.content_frame = Frame(self.bg_canvas, bg=self.colors["bg"], highlightthickness=0)
        self.content_frame.place(x=300, y=20, width=960, height=680)
        
        self.show_page("Main")

    def show_page(self, page_name):
        # Clear content
        for widget in self.content_frame.winfo_children():
            widget.destroy()
            
        display_title = self.t.get(page_name, page_name)
        Label(self.content_frame, text=display_title, font=("Inter", 24, "bold"), bg=self.colors["bg"], fg=self.colors["text"]).pack(anchor="w", pady=(0, 20))
        
        if page_name == "Main": self.page_main()
        elif page_name == "Optimization": self.page_optimization()
        elif page_name == "Gaming": self.page_gaming()
        elif page_name == "Monitoring": self.page_monitoring()
        elif page_name == "Settings": self.page_settings()
        elif page_name == "About": self.page_about()

    def page_about(self):
        Card = Frame(self.content_frame, bg=self.colors["card"], padx=20, pady=20)
        Card.pack(fill=BOTH, expand=True)
        
        Label(Card, text="FluxionTweaker", font=("Inter", 24, "bold"), bg=self.colors["card"], fg=self.colors["accent"]).pack(pady=(0, 5))
        Label(Card, text="Version 3.0.0 Stable", font=("Inter", 12), bg=self.colors["card"], fg=self.colors["text"]).pack(pady=(0, 20))
        
        dev_frame = Frame(Card, bg=self.colors["card"])
        dev_frame.pack(fill=X, pady=10)
        Label(dev_frame, text="Developers:", font=("Inter", 12, "bold"), bg=self.colors["card"], fg=self.colors["text"]).pack(anchor="w")
        Label(dev_frame, text="Fluxion Team (Lead: Mihail B.)", font=("Inter", 11), bg=self.colors["card"], fg=self.colors["text"]).pack(anchor="w")
        
        lib_frame = Frame(Card, bg=self.colors["card"])
        lib_frame.pack(fill=X, pady=10)
        Label(lib_frame, text="Used Libraries:", font=("Inter", 12, "bold"), bg=self.colors["card"], fg=self.colors["text"]).pack(anchor="w")
        libraries = [
            "Tkinter (Built-in)",
            "Pillow (Image Processing)",
            "WMI (System Information)",
            "PyWin32 (Windows API Access)",
            "Winreg (Registry Management)",
            "Threading / Subprocess"
        ]
        for lib in libraries:
            Label(lib_frame, text=f"• {lib}", font=("Inter", 10), bg=self.colors["card"], fg=self.colors["text"]).pack(anchor="w")
            
        license_frame = Frame(Card, bg=self.colors["card"])
        license_frame.pack(fill=X, pady=10)
        Label(license_frame, text="License:", font=("Inter", 12, "bold"), bg=self.colors["card"], fg=self.colors["text"]).pack(anchor="w")
        Label(license_frame, text="MIT License. Free for personal and commercial use.", font=("Inter", 10), bg=self.colors["card"], fg=self.colors["text"]).pack(anchor="w")
        
        Button(Card, text="Show Detailed Info (Modal)", bg=self.colors["accent"], fg="#FFFFFF", border=0, padx=20, pady=10, command=self.show_about_modal).pack(pady=20)

    def show_about_modal(self):
        modal = Toplevel(self.root)
        modal.title("About FluxionTweaker")
        modal.geometry("500x400")
        modal.configure(bg=self.colors["bg"])
        modal.transient(self.root)
        modal.grab_set()
        
        Label(modal, text="FluxionTweaker", font=("Inter", 18, "bold"), bg=self.colors["bg"], fg=self.colors["accent"]).pack(pady=20)
        
        info_text = (
            "FluxionTweaker v3.0.0 Stable\n\n"
            "An open-source utility designed to enhance\n"
            "Windows experience and performance.\n\n"
            "Created with Python and Tkinter.\n"
            "Copyright © 2024–2026 Fluxion Team."
        )
        Label(modal, text=info_text, font=("Inter", 11), bg=self.colors["bg"], fg=self.colors["text"], justify=CENTER).pack(pady=10)
        
        Button(modal, text="Close", bg=self.colors["card"], fg=self.colors["text"], width=15, command=modal.destroy).pack(side=BOTTOM, pady=20)
        # Add other pages as needed...

    def page_main(self):
        self.create_toggle("Game Mode", "Enable Windows Game Mode for better performance", "GAMEMODE")
        self.create_toggle("Disable Visual Effects", "Disable transparency and animations", "VISUALEFFECTS")
        self.create_toggle("Disable Telemetry", "Stop Windows data collection", "TELEMETRY")

    def page_optimization(self):
        Button(self.content_frame, text="Full Optimization (One Click)", bg=self.colors["accent"], fg="#FFFFFF", font=("Inter", 12, "bold"), border=0, command=self.optimize_all).pack(fill=X, pady=10)
        self.create_toggle("MSI Mode (GPU)", "Enable Message Signaled Interrupts for GPU", "MSIMODE")
        self.create_toggle("Disable VBS/HVCI", "Disable Virtualization Based Security", "DISABLEVBS")
        self.create_toggle("Disable HPET", "Disable High Precision Event Timer", "DISABLEHPET")

    def page_gaming(self):
        Button(self.content_frame, text="Install GraalVM (Minecraft)", bg=self.colors["card"], fg=self.colors["text"], border=0, command=lambda: self.run_cmd("winget install GraalVM.GraalVM.17")).pack(fill=X, pady=5)
        self.create_toggle("TCP No Delay", "Reduces ping in online games", "TCPNODELAY")
        
        Label(self.content_frame, text="Minecraft RAM Calculator", bg=self.colors["bg"], fg=self.colors["text"], font=("Inter", 12, "bold")).pack(anchor="w", pady=10)
        ram_input = Entry(self.content_frame, bg=self.colors["card"], fg=self.colors["text"], border=0)
        ram_input.pack(fill=X)
        Button(self.content_frame, text="Calculate", command=lambda: messagebox.showinfo("RAM", f"Recommended: {int(ram_input.get()) // 2}GB for Minecraft")).pack(pady=5)

    def page_monitoring(self):
        self.mon_labels = {
            "CPU": Label(self.content_frame, text="CPU: Loading...", bg=self.colors["bg"], fg=self.colors["text"], font=("Inter", 14)),
            "GPU": Label(self.content_frame, text="GPU: Loading...", bg=self.colors["bg"], fg=self.colors["text"], font=("Inter", 14)),
            "RAM": Label(self.content_frame, text="RAM: Loading...", bg=self.colors["bg"], fg=self.colors["text"], font=("Inter", 14)),
            "OS": Label(self.content_frame, text=f"OS: {platform.system()} {platform.release()}", bg=self.colors["bg"], fg=self.colors["text"], font=("Inter", 14))
        }
        for lbl in self.mon_labels.values(): lbl.pack(anchor="w", pady=5)

    def page_settings(self):
        Label(self.content_frame, text=self.t["Language"], bg=self.colors["bg"], fg=self.colors["text"], font=("Inter", 14)).pack(anchor="w", pady=10)
        lang_frame = Frame(self.content_frame, bg=self.colors["bg"])
        lang_frame.pack(fill=X)
        for l_code in self.translations.keys():
            Button(lang_frame, text=l_code, width=10, command=lambda l=l_code: self.change_language(l)).pack(side=LEFT, padx=5)

        Label(self.content_frame, text=self.t["Theme"], bg=self.colors["bg"], fg=self.colors["text"], font=("Inter", 14)).pack(anchor="w", pady=(20, 10))
        for theme in self.themes.keys():
            Button(self.content_frame, text=theme, bg=self.themes[theme]["accent"], fg="#FFFFFF", width=15, command=lambda t=theme: self.change_theme(t)).pack(pady=2)

    def change_language(self, l_code):
        self.lang = l_code
        self.t = self.translations[l_code]
        self.setup_ui() # Full refresh

    def change_theme(self, theme_name):
        self.current_theme = theme_name
        self.colors = self.themes[theme_name]
        self.root.configure(bg=self.colors["bg"])
        self.setup_ui() # Refresh UI

    def create_toggle(self, title, desc, key):
        frame = Frame(self.content_frame, bg=self.colors["card"], padx=15, pady=10)
        frame.pack(fill=X, pady=5)
        
        Label(frame, text=title, font=("Inter", 12, "bold"), bg=self.colors["card"], fg=self.colors["text"]).pack(anchor="w")
        Label(frame, text=desc, font=("Inter", 10), bg=self.colors["card"], fg=self.colors["text"], opacity=0.7).pack(anchor="w")
        
        # Simple Toggle Placeholder
        var = BooleanVar()
        cb = Checkbutton(frame, variable=var, bg=self.colors["card"], activebackground=self.colors["card"], command=lambda: self.apply_tweak(key, var.get()))
        cb.place(relx=0.9, rely=0.3)

    def apply_tweak(self, key, value):
        if key == "GAMEMODE":
            path = r"Software\Microsoft\GameBar"
            self.set_reg(path, "AllowAutoGameMode", value, winreg.REG_DWORD)
        elif key == "VISUALEFFECTS":
            # Complex visual effects registry block
            pass # Implementation here
        # ... more tweaks ...

    def set_reg(self, path, name, value, type=winreg.REG_SZ):
        try:
            key = winreg.CreateKey(winreg.HKEY_CURRENT_USER, path)
            winreg.SetValueEx(key, name, 0, type, value)
            winreg.CloseKey(key)
        except Exception as e:
            print(f"Reg error: {e}")

    def run_cmd(self, cmd):
        subprocess.run(cmd, shell=True, capture_output=True)

    def optimize_all(self):
        messagebox.showinfo("Optimization", "Full optimization started. Please wait...")
        # Chain multiple commands
        self.run_cmd("bcdedit /set disabledynamictick yes")
        self.run_cmd("bcdedit /deletevalue useplatformclock")
        
    def start_monitoring(self):
        def monitor_loop():
            w = wmi.WMI()
            while True:
                try:
                    cpu_load = w.Win32_Processor()[0].LoadPercentage
                    mem = w.Win32_OperatingSystem()[0]
                    free_mem = int(mem.FreePhysicalMemory) / 1024 / 1024
                    total_mem = int(mem.TotalVisibleMemorySize) / 1024 / 1024
                    
                    if hasattr(self, 'mon_labels'):
                        self.mon_labels["CPU"].config(text=f"CPU Load: {cpu_load}%")
                        self.mon_labels["RAM"].config(text=f"RAM: {total_mem - free_mem:.2f}GB / {total_mem:.2f}GB")
                except:
                    pass
                time.sleep(2)
                
        threading.Thread(target=monitor_loop, daemon=True).start()

if __name__ == "__main__":
    root = Tk()
    app = FluxionTweaker(root)
    root.mainloop()
