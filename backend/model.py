import cv2
from ultralytics import YOLO
import json
import os
from clarifai.client.model import Model


def predict(image_name):
    with open('classes.json', 'r') as f:
        class_names = json.load(f)
    model = YOLO("yolov8s.pt") 
    image = cv2.imread(f"images_in/{image_name}")
    results = model(image)

    for result in results:
    
    #     boxes = result.boxes.xyxy  # Bounding boxes in (x1, y1, x2, y2) format
    #     confidences = result.boxes.conf  # Confidence scores
    #     class_ids = result.boxes.cls  # Class IDs

    #     for box, conf, cls in zip(boxes, confidences, class_ids):
    #         x1, y1, x2, y2 = box
    #         label = f"Class: {class_names[str(int(cls))]}, Confidence: {conf:.2f}"
    #         cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
    #         cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    #     # Display the result
    #     output_filepath = f'images_out/{image_name}'
    #     cv2.imwrite(output_filepath, image)

        detected_classes = set()
        for result in results:
            class_ids = result.boxes.cls
            detected_classes.update(class_ids)

        detected_class_names = [class_names[str(int(cls))] for cls in detected_classes]
        detected_class_names = set(detected_class_names)
        print("Detected Class Names:", detected_class_names)
        return list(detected_class_names)



def predict2(image_name):    
    image_path = os.path.join("images_in", image_name)

    model_url = (
        "https://clarifai.com/clarifai/main/models/food-item-recognition"
    )
    print(image_path)
    model_prediction = Model(url=model_url, pat="0100150ba24647b2a6b629b8e8fa97ee").predict_by_filepath(image_path, input_type="image")

    # x = model_prediction.outputs[0].data.concepts

    concepts = model_prediction.outputs[0].data.concepts

    detected_class_names = set()
    for concept in concepts:
        concept_name = concept.name  
        concept_value = concept.value 

        print(f"Concept: {concept_name}, Confidence: {concept_value}")
        if concept_value >= 0.5:
            detected_class_names.add(str(concept_name))

    if len(detected_class_names) < 1:
        max_concept_name = None
        max_concept_value = 0

        for concept in concepts:
            concept_name = concept.name  
            concept_value = concept.value 
            
            if concept_value > max_concept_value:
                max_concept_value = concept_value
                max_concept_name = concept_name

        max_concept_list = [max_concept_name] if max_concept_name else []
        print("Max Concept Name:", max_concept_list)
        return max_concept_list

    detected_class_names_list = list(detected_class_names)
    print("Detected Class Names:", detected_class_names_list)
    return detected_class_names_list