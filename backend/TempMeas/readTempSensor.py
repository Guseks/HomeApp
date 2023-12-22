import os                                                  # import os module
import glob                                                # import glob module
import time                                                # import time module
import datetime
import csv
from RepeatedTimer import RepeatedTimer

#os.system('modprobe w1-gpio')                              # load one wire communication device kernel modules
#os.system('modprobe w1-therm')                                                 
base_dir = '/sys/bus/w1/devices/'                          # point to the address
device_folders = glob.glob(base_dir + '28*')             # find devices with address starting from 28*

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

def new_measurement(path):
#   base_dir = '/var/www/ekstromdomain.com/html/temperature_readings'
#   path = base_dir + start_time.strftime("%Y%y%d")
#   with open('/var/www/ekstromdomain.com/html/temperature_readings.csv', 'a') as csvfile:
   with open(path, 'a') as csvfile:
      writer = csv.writer(csvfile)
      
      temp_readings = read_temp()
      meas_time = datetime.datetime.now()
      item = []
      item.append(meas_time.strftime("%Y-%m-%d"))
      item.append(meas_time.strftime("%X"))      
      item.extend(temp_readings)
      print(item)
      writer.writerow(item)


def main():   
   start_time = datetime.datetime.now()
#   base_dir = '/var/www/ekstromdomain.com/html/temperature_readings'
   base_dir = './'

   path = base_dir + start_time.strftime("%Y%m%d") + '.csv'  
   with open('path', 'w') as csvfile:
      writer = csv.writer(csvfile)
      
   # The time interval must be longer than the actual time it takes to read the sensors, i.e. 1 second
   rt = RepeatedTimer(1, 15, new_measurement,path) # it auto-starts, no need of rt.start()
#      rt = RepeatedTimer(1, 1, new_measurement, writer) # it auto-starts, no need of rt.start()      
#      rt = RepeatedTimer(1, 1, hello, "test") # it auto-starts, no need of rt.start()      
   try:
      while 1:
         time.sleep(1)

   finally:
      rt.stop() # better in a try/finally block to make sure the program ends


if __name__ == "__main__":
	main()    

