from glob import glob
import json
import os

IMAGES_DIR = "images"
os.makedirs(IMAGES_DIR, exist_ok=True)

image_files_list = []

for root, dirs, files in os.walk("images", topdown=False):
    for name in files:
        image = os.path.join(root, name).replace('\\', '/')
        image_files_list.append(image)

json_s = json.dumps(image_files_list, indent=2)
js_string = f"export default {json_s};"

print(f"found these images: {json_s}")

with open("js/images.js", "w") as f:
    f.write(js_string)
