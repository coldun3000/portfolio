import re

with open(r'D:\DLE сайтик\templates\Aonix432\assets\css\app.min.css', 'r', encoding='utf-8') as f:
    css = f.read()

content_matches = re.findall(r'\.content\s*\{([^}]+)\}', css)
print(".content {")
for match in content_matches:
    print(match)
print("}")

print("----------")
main_aside_matches = re.findall(r'\.main__aside\s*\{([^}]+)\}', css)
print(".main__aside {")
for match in main_aside_matches:
    print(match)
print("}")
