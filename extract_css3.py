import re

with open(r'D:\DLE сайтик\templates\Aonix432\assets\css\app.min.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Look for any element that has height: 100vh or max-height: 100vh
matches = re.findall(r'(\.[a-zA-Z0-9_-]+)\s*\{[^}]*height\s*:\s*100vh[^}]*\}', css)
print("Elements with 100vh:")
for match in matches:
    print(match)

wrapper_matches = re.findall(r'\.wrapper\s*\{([^}]+)\}', css)
print(".wrapper {")
for match in wrapper_matches:
    print(match)
print("}")

body_matches = re.findall(r'body\s*\{([^}]+)\}', css)
print("body {")
for match in body_matches:
    print(match)
print("}")
