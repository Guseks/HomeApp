from flask import Flask, jsonify
from datetime import datetime, timedelta
import random
from flask_cors import CORS 


app = Flask(__name__)
CORS(app)

# Generate test data for 24 hours
def generate_test_data():
    
    start_date = datetime.strptime("2023-12-01 00:00:00", "%Y-%m-%d %H:%M:%S")
    data = []
    
    for i in range(24):
        # Increment hour by 1 for each iteration
        current_date = start_date + timedelta(hours=i)
        # Generate 5 random water temperature readings
        temperature_readings = [round(random.uniform(15, 50), 0) for _ in range(5)]
        data.append({
            "date": current_date.strftime("%Y-%m-%d %H:%M:%S"),
            "temperature_readings": temperature_readings
        })
    return data

# Route to get the generated test data
@app.route('/temperature_data', methods=['GET'])
def get_temperature_data():
    # Generate test data
    test_data = generate_test_data()
    return jsonify(test_data)

if __name__ == '__main__':
    app.run(debug=True)