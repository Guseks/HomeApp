import threading 
import time


class RepeatedTimer(object):
    def __init__(self, first_interval, interval, func, *args, **kwargs):
        self.timer      = None
        self.first_interval = first_interval
        self.interval   = interval
        self.func   = func
        self.args   = args
        self.kwargs = kwargs
        self.running = False
        self.is_started = False
        self.start()

    def start(self):
        try:
            # no race-condition here because only control thread will call this method
            # if already started will not start again
            if not self.is_started:
                self.is_started = True
                self.timer = threading.Timer(self.first_interval, self.run)
                self.running = True
                self.timer.start()
        except Exception as e:
            print("timer first_start failed") 
            raise

    def run(self):
        # if not stopped start again
        if self.running:
            self.timer = threading.Timer(self.interval, self.run)
            self.timer.start()
        self.func(*self.args, **self.kwargs)

    def stop(self):
        # cancel current timer in case failed it's still OK
        # if already stopped doesn't matter to stop again
        if self.timer:
            self.timer.cancel()
        self.running = False


# Usage
# from time import sleep

#def hello(name):
#    print "Hello %s!" % name

#print "starting..."
#rt = RepeatedTimer(1, hello, "World") # it auto-starts, no need of rt.start()
#try:
#    sleep(5) # your long-running job goes here...
#finally:
#    rt.stop() # better in a try/finally block to make sure the program ends
