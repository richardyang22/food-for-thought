from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from model import predict, predict2, predict0

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'images_in'
os.makedirs(UPLOAD_FOLDER, exist_ok=True) 
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/image', methods=['POST'])
def image():
    # check that request has file
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['image']
    
    # if the user does not select a file, send an empty file without a filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = file.filename
        file.save(os.path.join(UPLOAD_FOLDER, filename))  # Save the file
    
        detected_class_names = predict0(filename)
        if len(detected_class_names) < 1:
            detected_class_names = predict(filename)

            if len(detected_class_names) < 1:
                detected_class_names = predict2(filename)
        return jsonify({'classes': detected_class_names}), 200
    return jsonify({'error': 'File type not allowed'}), 400

if __name__ == '__main__':
    app.run(debug=True)
