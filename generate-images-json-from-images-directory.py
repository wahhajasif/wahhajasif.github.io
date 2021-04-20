import json
import os

IMAGES_DIR = "images"
os.makedirs(IMAGES_DIR, exist_ok=True)

image_files_list = []

for image in sorted(os.listdir("./images")):
    image_files_list.append(image)

json_s = json.dumps(image_files_list, indent=2)
js_string = f"export default {json_s};"

with open("js/images.js", "w") as f:
    f.write(js_string)
