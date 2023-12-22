import os                                                  # import os module
import glob                                                # import glob module
import time                                                # import time module
os.system('modprobe w1-gpio')                              # load one wire communication device kernel modules
os.system('modprobe w1-therm')                                                 
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
      print(x,len(device_folders))
      lines = read_temp_raw(x)
      while lines[0].strip()[-3:] != 'YES':                   # ignore first line
         time.sleep(0.2)
         lines = read_temp_raw(x)
      equals_pos = lines[1].find('t=')                        # find temperature in the details
      if equals_pos != -1:
         temp_string = lines[1][equals_pos+2:]
         temp_c = float(temp_string) / 1000.0                 # convert to Celsius
      list_of_temperatures.append(temp_c)

   return list_of_temperatures

while True:
   print(read_temp())                                      # Print temperature    
   time.sleep(1)
    

