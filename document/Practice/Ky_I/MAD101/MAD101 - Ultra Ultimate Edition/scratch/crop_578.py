import cv2

img = cv2.imread('0578_q578_Question_578.webp')
# Crop the graph area
h, w, _ = img.shape
# The graph is roughly in x: [300, 650], y: [100, 500]
crop = img[50:600, 320:700]
cv2.imwrite('scratch/q578_crop.png', crop)
print("Cropped Q578 graph to scratch/q578_crop.png")
