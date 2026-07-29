import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

input_path = r"C:\Users\dell\.gemini\antigravity\brain\e23bab35-e9ef-456b-812f-9ec398b6f7d3\.user_uploaded\media__1785216642393.png"
output_path = r"C:\Users\dell\.gemini\antigravity\brain\e23bab35-e9ef-456b-812f-9ec398b6f7d3\edited_email_timestamp.png"

img = Image.open(input_path).convert("RGBA")
w, h = img.size
print(f"Image size: {w}x{h}")

# Let's save a crop of the top region or analyze colors
# We'll also check if we can locate "3 days ago" automatically or crop
# The top-right region of sender info:
# y roughly between 0.20*h and 0.30*h
# x roughly between 0.40*w and 0.65*w

# Let's print out pixel sample around sender card background
bg_color = img.getpixel((int(w * 0.5), int(h * 0.25)))
print(f"Sample background color: {bg_color}")
