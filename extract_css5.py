import re

with open(r'D:\DLE сайтик\templates\Aonix432\assets\css\app.min.css', 'r', encoding='utf-8') as f:
    css = f.read()

fixed_matches = re.findall(r'(\.[a-zA-Z0-9_-]+)\s*\{[^}]*position\s*:\s*fixed[^}]*\}', css)
print("Elements with position: fixed:")
for match in fixed_matches:
    print(match)
