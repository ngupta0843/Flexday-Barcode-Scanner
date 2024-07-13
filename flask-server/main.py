from flask import Flask, request, jsonify
from flask_cors import CORS
from barcodeCV import detect_and_decode_barcode

app = Flask(__name__)
CORS(app)

@app.route('/api/images', methods=['POST'])
def upload_image():
    return 'hello world!'

if __name__ == '__main__':
    app.run(debug=True, port=5001)