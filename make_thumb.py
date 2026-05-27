from PIL import Image, ImageDraw, ImageFilter

bg_path = r"C:\Users\egor2\.gemini\antigravity\brain\75dc6b50-8184-407a-b563-527b5d917c56\pizzeria_bg_1777356805900.png"
fg_path = r"C:\Users\egor2\.gemini\antigravity\playground\azure-meteor\preview_frame.jpg"
out_path = r"C:\Users\egor2\.gemini\antigravity\brain\75dc6b50-8184-407a-b563-527b5d917c56\final_thumbnail.png"

try:
    bg = Image.open(bg_path).convert("RGBA")
    fg = Image.open(fg_path).convert("RGBA")

    bg = bg.resize((1920, 1080), Image.Resampling.LANCZOS)

    target_w = int(1920 * 0.75)
    aspect = fg.height / fg.width
    target_h = int(target_w * aspect)
    fg = fg.resize((target_w, target_h), Image.Resampling.LANCZOS)

    rad = 40
    mask = Image.new("L", fg.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, target_w, target_h), radius=rad, fill=255)
    
    fg_rounded = Image.new("RGBA", fg.size)
    fg_rounded.paste(fg, mask=mask)

    shadow_offset = 25
    shadow = Image.new("RGBA", bg.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    
    x = (1920 - target_w) // 2
    y = (1080 - target_h) // 2
    
    shadow_draw.rounded_rectangle(
        (x + shadow_offset, y + shadow_offset, x + target_w + shadow_offset, y + target_h + shadow_offset),
        radius=rad, fill=(0, 0, 0, 180)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(40))

    final = Image.alpha_composite(bg, shadow)
    final.paste(fg_rounded, (x, y), fg_rounded)

    final.save(out_path)
    print("Success")
except Exception as e:
    print("Error:", e)
