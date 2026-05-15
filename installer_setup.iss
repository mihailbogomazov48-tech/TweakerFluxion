; Inno Setup Script for FluxionTweaker
[Setup]
AppName=FluxionTweaker
AppVersion=5.6
DefaultDirName={pf}\FluxionTweaker
DefaultGroupName=FluxionTweaker
OutputDir=installer_output
OutputBaseFilename=FluxionTweaker_Setup_v5.6
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin

[Files]
Source: "dist\FluxionTweaker_v56.exe"; DestDir: "{app}"; Flags: ignoreversion
; Include other assets if necessary
; Source: "dist\assets\*"; DestDir: "{app}\assets"; Flags: ignoreversion recursesubdirs

[Icons]
Name: "{group}\FluxionTweaker"; Filename: "{app}\FluxionTweaker_v56.exe"
Name: "{commondesktop}\FluxionTweaker"; Filename: "{app}\FluxionTweaker_v56.exe"

[Run]
Filename: "{app}\FluxionTweaker_v56.exe"; Description: "Launch FluxionTweaker"; Flags: nowait postinstall skipifsilent
