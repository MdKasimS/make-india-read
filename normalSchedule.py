import os
import sqlite3
import threading
import time

def killtask(command):
    os.system(command)

conn =  sqlite3.connect('services.db')
c = conn.cursor()
c.execute("select service_name,port_number from services")  #where service_traffic=? and type_of_service=?",("high","leaf",))
commands = c.fetchall()
conn.close()
line = ''

scriptStart = time.time()
summationInit = 11

for i in commands:
    print("Command :{} on {} at port  STARTING ====> {}".format(i[0], time.ctime(time.time()), i[1]),'')
    tstart = threading.Thread(target=killtask,args=(i[0],))
    tstart.start()
    time.sleep(11)

    tnew= threading.Thread(target=killtask,args=("netstat -ano | findstr :{} > pids.txt".format(i[1]),))
    tnew.start()

    with open("pids.txt") as f:
        for l in f.readlines():
            print(l[-6:-1])
            line=l[-6:-1]
        f.close()
    print("I am closing command {}".format(line))
    # scriptTemp = time.time() - scriptTemp
    # scriptStart += time.time()

    t1 = threading.Thread(target=killtask,args=("taskkill /PID {} /F".format(line),))

    if i[1]!=5000:
        print("Command :{} on {} at port CLOSING ====> {}".format(i[0], time.ctime(time.time()), i[1]),'')
        t1.start()

scriptEnd = time.time()
print("Total CLosing Time : ", float(scriptEnd - scriptStart - 77))
