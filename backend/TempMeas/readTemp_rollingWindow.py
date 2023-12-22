import os                                                  # import os module
import glob                                                # import glob module
import time                                                # import time module
import datetime
import collections
import csv
from RepeatedTimer import RepeatedTimer

os.system('modprobe w1-gpio')                              # load one wire communication device kernel modules
os.system('modprobe w1-therm')
base_dir = '/sys/bus/w1/devices/'                          # point to the address
device_folders = glob.glob(base_dir + '28*')                # find devices with address starting from 28*
timeWindow = collections.deque(maxlen=6)                  # Time window to always contain measurement for 24 h

def read_temp_raw(sensor):
   f = open(device_folders[sensor] + '/w1_slave', 'r')
   lines = f.readlines()                                   # read the device details
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
   with open('./temperature_readings.csv', 'a') as csvfile:
      writer = csv.writer(csvfile)

      temp_readings = read_temp()
      meas_time = datetime.datetime.now()
      item = []
      item.append(meas_time.strftime("%c"))
      item.extend(temp_readings)
      print(item)
      timeWindow.append(item)
      writer.writerow(item)

# Max values of outside, compartment, radiator temp, frequency?
# min values of outside, compartment

def get_timeWindowData():
    print (timeWindow)

def main():
   start_time = datetime.datetime.now()

   # The time interval must be longer than the actual time it takes to read the sensors, i.e. 1 second
   rt = RepeatedTimer(1, 10, new_measurement) # it auto-starts, no need of rt.start()
#      rt = RepeatedTimer(1, 1, new_measurement, writer) # it auto-starts, no need of rt.start()
#      rt = RepeatedTimer(1, 1, hello, "test") # it auto-starts, no need of rt.start()
   try:
      while 1:
         time.sleep(1)
#         get_timeWindowData()

   finally:
      rt.stop() # better in a try/finally block to make sure the program ends


if __name__ == "__main__":
	main()

