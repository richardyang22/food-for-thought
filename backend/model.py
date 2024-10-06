import cv2
from ultralytics import YOLO

model = YOLO("best.pt") 
image_path = "richard food.png"
image = cv2.imread(image_path)
results = model(image)

# print(results)

for result in results:
 
    boxes = result.boxes.xyxy  # Bounding boxes in (x1, y1, x2, y2) format
    confidences = result.boxes.conf  # Confidence scores
    class_ids = result.boxes.cls  # Class IDs

    for box, conf, cls in zip(boxes, confidences, class_ids):
        x1, y1, x2, y2 = box
        label = f"Class: {int(cls)}, Conf: {conf:.2f}"
        cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
        cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# Display the result
cv2.imshow("YOLOv8 Prediction", image)


# Process results
detected_classes = set()  # Use a set to avoid duplicates

for result in results:
    class_ids = result.boxes.cls
    detected_classes.update(class_ids)

print("Detected Classes:", detected_classes)

class_names = model.names  # Get class names from the model

detected_class_names = [class_names[int(cls)] for cls in detected_classes]
print("Detected Class Names:", detected_class_names)

cv2.waitKey(0)
cv2.destroyAllWindows()