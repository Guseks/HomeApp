# Variable to define if realtime data shall be used of data read from file
sim = 1

from flask import Flask, jsonify
from datetime import datetime, timedelta
import random
from flask_cors import CORS 
import threading
import csv

if sim==0:
    from TempMeas.readTemp_rollingWindow import timeWindow, start_measuring, temperature_lock 
else:
    from collections import deque
    timeWindow = deque(maxlen=1000)
    temperature_lock = threading.Lock()    

app = Flask(__name__)
CORS(app)

# Generate test data for 24 hours
def generate_test_data():

    # Replace 'your_file.csv' with the path to your actual CSV file
    file_path = './TempMeas/20230103.csv'

    # Initialize an empty list to hold the rows of data
    multidimensional_list = []

    # Open the CSV file
    with open(file_path, mode='r', encoding='utf-8') as file:
        # Create a CSV reader
        reader = csv.reader(file)
        
        # Iterate over the reader object to read each row
        for row in reader:
            # Each row is already a list; add it to the multidimensional list
            multidimensional_list.append(row)

    return deque(multidimensional_list)


# Route to get the generated test data
@app.route('/temperature_data', methods=['GET'])
def get_temperature_data():
    #print("test")
        
    with temperature_lock:
        latest_values = list(timeWindow)

    return jsonify(latest_values)

# Route to get the max/min values
@app.route('/min_max_temperature_data', methods=['GET'])
def get_min_max_temperature_data():
    maxRadOut = max(timeWindow, key=lambda x: x[2])
    minOutdoorTemp = min(timeWindow, key=lambda x: x[4])    
    maxOutdoorTemp = max(timeWindow, key=lambda x: x[4])
    maxVpOut = max(timeWindow, key=lambda x: x[5])

    #print(maxRadOut)

    return jsonify([maxRadOut, minOutdoorTemp, maxOutdoorTemp, maxVpOut])

if __name__ == '__main__':
    # Generate test data
    if sim==1:
        timeWindow = generate_test_data()
    else:
        measurement_thread = threading.Thread(target=start_measuring)
        measurement_thread.daemon = True
        measurement_thread.start()

    app.run(debug=True)