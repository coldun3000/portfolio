import re

with open(r'D:\DLE сайтик\templates\Aonix432\assets\css\app.min.css', 'r', encoding='utf-8') as f:
    css = f.read()

layout_matches = re.findall(r'\.layout\s*\{([^}]+)\}', css)
print(".layout {")
for match in layout_matches:
    print(match)
print("}")
