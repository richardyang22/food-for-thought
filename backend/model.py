import cv2
from ultralytics import YOLO
import json

def predict(image_name):
    with open('classes.json', 'r') as f:
        class_names = json.load(f)
    model = YOLO("yolov8s.pt") 
    image = cv2.imread(f"images_in/{image_name}")
    results = model(image)

    for result in results:
    
        boxes = result.boxes.xyxy  # Bounding boxes in (x1, y1, x2, y2) format
        confidences = result.boxes.conf  # Confidence scores
        class_ids = result.boxes.cls  # Class IDs

        for box, conf, cls in zip(boxes, confidences, class_ids):
            x1, y1, x2, y2 = box
            label = f"Class: {class_names[str(int(cls))]}, Confidence: {conf:.2f}"
            cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Display the result
        output_filepath = f'images_out/{image_name}'
        cv2.imwrite(output_filepath, image)

        detected_classes = set()
        for result in results:
            class_ids = result.boxes.cls
            detected_classes.update(class_ids)

        detected_class_names = [class_names[str(int(cls))] for cls in detected_classes]
        print("Detected Class Names:", set(detected_class_names))
        return detected_class_names
