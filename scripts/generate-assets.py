import os
import math
from PIL import Image, ImageDraw, ImageFont

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
public_dir = os.path.join(project_root, 'public')
images_dir = os.path.join(public_dir, 'images')
os.makedirs(images_dir, exist_ok=True)

font_yahei = "C:/Windows/Fonts/msyh.ttc"
font_yahei_bold = "C:/Windows/Fonts/msyhbd.ttc"
if not os.path.exists(font_yahei_bold):
    font_yahei_bold = font_yahei
font_arial = "C:/Windows/Fonts/arial.ttf"

def create_gradient_img(width, height, color1, color2):
    base = Image.new('RGBA', (width, height), color1)
    top = Image.new('RGBA', (width, height), color2)
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            # Diagonal gradient
            ratio = (x / width + y / height) / 2.0
            mask_data.append(int(255 * ratio))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

# ----------------------------------------------------
# 1. Generate logo-512.png (512x512)
# ----------------------------------------------------
print("Generating logo-512.png...")
logo = Image.new('RGBA', (512, 512), (9, 13, 22, 255))
draw_logo = ImageDraw.Draw(logo)

# Rounded rectangle background with gradient
bg_box = create_gradient_img(460, 460, (14, 165, 233, 255), (99, 102, 241, 255))
# Create rounded mask
corner_mask = Image.new('L', (460, 460), 0)
draw_mask = ImageDraw.Draw(corner_mask)
draw_mask.rounded_rectangle((0, 0, 460, 460), radius=100, fill=255)
logo.paste(bg_box, (26, 26), corner_mask)

# Draw stylized Flask / Radar graphic inside logo
center_x, center_y = 256, 256
draw_logo.ellipse((center_x - 140, center_y - 140, center_x + 140, center_y + 140), outline=(255, 255, 255, 80), width=6)
draw_logo.ellipse((center_x - 90, center_y - 90, center_x + 90, center_y + 90), outline=(255, 255, 255, 140), width=5)
draw_logo.ellipse((center_x - 30, center_y - 30, center_x + 30, center_y + 30), fill=(255, 255, 255, 240))
draw_logo.line((center_x, center_y, center_x + 100, center_y - 100), fill=(255, 255, 255, 220), width=8)

logo.save(os.path.join(images_dir, 'logo-512.png'), 'PNG')

# ----------------------------------------------------
# 2. Generate apple-touch-icon.png (180x180)
# ----------------------------------------------------
print("Generating apple-touch-icon.png...")
apple_icon = logo.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon.save(os.path.join(public_dir, 'apple-touch-icon.png'), 'PNG')

# ----------------------------------------------------
# 3. Generate favicon.ico (16, 32, 48)
# ----------------------------------------------------
print("Generating favicon.ico...")
icon_sizes = [(16, 16), (32, 32), (48, 48)]
logo.save(os.path.join(public_dir, 'favicon.ico'), format='ICO', sizes=icon_sizes)

# ----------------------------------------------------
# 4. Generate og-cover.png (1200x630)
# ----------------------------------------------------
print("Generating og-cover.png...")
og = Image.new('RGBA', (1200, 630), (7, 10, 16, 255))
draw_og = ImageDraw.Draw(og)

# Background subtle ambient glow
for r in range(300, 0, -10):
    alpha = int(25 * (1 - r / 300))
    draw_og.ellipse((100 - r, 80 - r, 100 + r, 80 + r), fill=(14, 165, 233, alpha))
    draw_og.ellipse((1100 - r, 500 - r, 1100 + r, 500 + r), fill=(99, 102, 241, alpha))

# Card boundary / Grid decoration
draw_og.rounded_rectangle((40, 40, 1160, 590), radius=24, outline=(30, 41, 59, 255), width=2)

# Small Logo icon at top left
small_logo = logo.resize((72, 72), Image.Resampling.LANCZOS)
og.paste(small_logo, (80, 80), small_logo)

font_brand = ImageFont.truetype(font_yahei_bold, 36)
draw_og.text((170, 92), "NodeLab 节点实验室", font=font_brand, fill=(255, 255, 255, 255))

font_badge = ImageFont.truetype(font_yahei_bold, 18)
# Badge pill: 2026 晚高峰实测基准
badge_text = "● 7x24h 自动化晚高峰测速 · 2026 权威矩阵"
draw_og.rounded_rectangle((80, 200, 530, 240), radius=20, fill=(14, 165, 233, 40), outline=(14, 165, 233, 100), width=1)
draw_og.text((105, 210), badge_text, font=font_badge, fill=(56, 189, 248, 255))

# Main Title
font_h1 = ImageFont.truetype(font_yahei_bold, 54)
draw_og.text((80, 270), "2026 最专业梯子代理评测与翻墙指南", font=font_h1, fill=(255, 255, 255, 255))

# Subtitle
font_sub = ImageFont.truetype(font_yahei, 26)
draw_og.text((80, 360), "全内网 IPLC 专线实测 · 4K/8K 流媒体解锁 · ChatGPT 住宅 IP 防风控", font=font_sub, fill=(148, 163, 184, 255))

# Metric boxes at bottom
boxes = [
    ("920+ Mbps", "晚高峰实测带宽"),
    ("0.00% 丢包", "IEPL 纯专线保障"),
    ("4K / 8K 秒开", "Netflix / Disney+"),
    ("全平台配置", "Clash / Sing-box")
]

box_x = 80
for value, label in boxes:
    draw_og.rounded_rectangle((box_x, 440, box_x + 235, 530), radius=16, fill=(15, 23, 42, 255), outline=(30, 41, 59, 255), width=1)
    font_val = ImageFont.truetype(font_yahei_bold, 28)
    font_lbl = ImageFont.truetype(font_yahei, 18)
    draw_og.text((box_x + 20, 452), value, font=font_val, fill=(56, 189, 248, 255))
    draw_og.text((box_x + 20, 492), label, font=font_lbl, fill=(148, 163, 184, 255))
    box_x += 255

og_path = os.path.join(images_dir, 'og-cover.png')
og.save(og_path, 'PNG')
print(f"Successfully generated og-cover at {og_path}!")
