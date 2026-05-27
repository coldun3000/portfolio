import sys
import os

path = r'd:\DLE сайтик\templates\Aonix432\store\store.js'
if not os.path.exists(path):
    print(f"File {path} not found")
    sys.exit(1)

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Truncate at the error point (around line 489)
# We want to keep up to line 489 (which is index 488)
new_lines = lines[:489]

# Add the correct logic
relocation_js = """
$(document).ready(function() {
    if ($('#product-sidebar-source').length && $('#product-sidebar-dest').length) {
        var html = $('#product-sidebar-source').html();
        $('#product-sidebar-dest').html(html);
    }
});
"""

new_lines.append(relocation_js)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Successfully fixed store.js")
