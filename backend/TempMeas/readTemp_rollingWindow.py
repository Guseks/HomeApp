import os                                                  # import os module
import glob                                                # import glob module
import time                                                # import time module
import datetime
import collections
import csv
import threading
import sys
sys.path.append('/home/hakek/work/HomeApp/backend/TempMeas')
from RepeatedTimer import RepeatedTimer

#print(sys.path)

os.system('modprobe w1-gpio')                               # load one wire communication device kernel modules
os.system('modprobe w1-therm')
base_dir = '/sys/bus/w1/devices/'                           # point to the address
device_folders = glob.glob(base_dir + '28*')                # find devices with address starting from 28*
SensorReadInterval = 10                                     # Read interval of sensors
timeWindowsLength = int(3600/SensorReadInterval*24)
timeWindow = collections.deque(maxlen=timeWindowsLength)    # Time window to always contain measurement for 24 h
temperature_lock = threading.Lock()
stand_alone = 0;                                            # Default is that measurement is part of web application

def read_temp_raw(sensor):
   f = open(device_folders[sensor] + '/w1_slave', 'r')
   lines = f.readlines()                                    # read the device details
   f.close()
   return lines

def read_temp():
   list_of_temperatures = []
   for x in range(len(device_folders)):
      lines = read_temp_raw(x)
      while lines[0].strip()[-3:] != 'YES':                   # ignore first line
         time.sleep(0.2)
         lines = read_temp_raw(x)
      equals_pos = lines[1].find('t=')                        # find temperature in the details
      if equals_pos != -1:
         temp_string = lines[1][equals_pos+2:]
         temp_c = float(temp_string) / 1000.0                 # convert to Celsius
      list_of_temperatures.append(str(temp_c))

   return list_of_temperatures

def new_measurement():
   temp_readings = read_temp()
   meas_time = datetime.datetime.now()
   item = []
   item.append(meas_time.strftime("%c"))
   item.extend(temp_readings)

   with temperature_lock:
      timeWindow.append(item)

   if stand_alone==1:
      with open('./temperature_readings.csv', 'a') as csvfile:
         writer = csv.writer(csvfile)
         writer.writerow(item)
         print(item)

def get_timeWindowData():
    print (timeWindow)

def start_measuring():
   start_time = datetime.datetime.now()

   # The time interval must be longer than the actual time it takes to read the sensors, i.e. 1 second
   rt = RepeatedTimer(1, SensorReadInterval, new_measurement) # it auto-starts, no need of rt.start()

   try:
      while 1:
         time.sleep(1)

   finally:
      rt.stop() # better in a try/finally block to make sure the program ends


if __name__ == "__main__":
  stand_alone=1
  start_measuring()

