from PIL import Image
import os

def convert_webp_to_jpg():
    # Directory containing the WebP images
    input_dir = ''  # Put your WebP images in this folder
    # Directory for output JPG images
    output_dir = ''  # JPG images will be saved here
    
    # List of number words
    numbers = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"]
    
    # Convert each WebP file to JPG
    for number in numbers:
        webp_path = os.path.join(input_dir, f'baddie{number}.webp')
        jpg_path = os.path.join(output_dir, f'baddie{number}.jpg')
        
        try:
            # Open and convert the image
            image = Image.open(webp_path)
            # Convert to RGB mode if necessary
            if image.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', image.size, (255, 255, 255))
                background.paste(image, mask=image.split()[-1])
                image = background
            # Save as JPG
            image.save(jpg_path, 'JPEG', quality=95)
            print(f'Converted {webp_path} to {jpg_path}')
        except Exception as e:
            print(f'Error converting {webp_path}: {str(e)}')

if __name__ == '__main__':
    convert_webp_to_jpg()