import cv2, os

# Q578
img578 = cv2.imread('0578_q578_Question_578.webp')
cv2.imwrite('scratch/crops/q578.png', img578[50:450, 500:1000])

# Q579
img579 = cv2.imread('0579_q579_Question_579.webp')
cv2.imwrite('scratch/crops/q579.png', img579[50:450, 450:1050])

# Q580
img580 = cv2.imread('0580_q580_Question_580.webp')
cv2.imwrite('scratch/crops/q580.png', img580[50:500, 450:1100])

# Q583
img583 = cv2.imread('0583_q583_Question_583.webp')
cv2.imwrite('scratch/crops/q583.png', img583[50:500, 450:1100])

# Q591
img591 = cv2.imread('0591_q591_Question_591.webp')
cv2.imwrite('scratch/crops/q591.png', img591[50:500, 450:1150])

# Q597
img597 = cv2.imread('0597_q597_Question_597.webp')
cv2.imwrite('scratch/crops/q597.png', img597[50:500, 450:1100])

print("Cropped centered successfully!")
