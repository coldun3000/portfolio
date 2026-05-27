import re

with open(r'D:\DLE сайтик\templates\Aonix432\assets\css\app.min.css', 'r', encoding='utf-8') as f:
    css = f.read()

main_matches = re.findall(r'\.main\s*\{([^}]+)\}', css)
print(".main {")
for match in main_matches:
    print(match)
print("}")

aside_matches = re.findall(r'\.main__aside\s*\{([^}]+)\}', css)
print(".main__aside {")
for match in aside_matches:
    print(match)
print("}")

sidebar_matches = re.findall(r'\.sidebar\s*\{([^}]+)\}', css)
print(".sidebar {")
for match in sidebar_matches:
    print(match)
print("}")
