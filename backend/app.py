from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample API route
@app.route('/api/message', methods=['GET'])
def get_message():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/get_density', methods=['POST'])
def greet():
    data = request.json  # Get the JSON data from the request
    area = data.get('area', '')  # Get the text from the request
    density = int(area) * 5
    return jsonify({"density": density})

if __name__ == '__main__':
    app.run(debug=True)
