import os
import sqlite3
import threading
import time


def killtask(command):
    os.system(command)
conn =  sqlite3.connect('services.db')
c = conn.cursor()
c.execute("select port_number from services")
servicePortList = []
rowsForPort = c.fetchall()
for row in rowsForPort:
    print(row[0])
    servicePortList.append(row[0])
print(servicePortList)
# os.system("powershell")
# #print("Working directory ",os.getcwd())
contents = []
for i in servicePortList:
    os.system("netstat -ano | findstr :{} > port.txt".format(i))
    with open("port.txt") as f:
        for line in f.readlines():
            contents.append(line)
        f.close()
print(contents)
portNumber = []
print(len(contents))
for i in range(0,len(contents)):
    if i%2 == 0:
        portNumber.append(contents[i][-6:-1])

print(portNumber)
num = int(input("Enter 1 to Shut all Services"))

scriptStart = time.time()
if num == 1:
    for i in portNumber:
        t1 = threading.Thread(target=killtask,args=("taskkill /PID {} /F".format(int(i)),))
        t1.start()
        print(t1.ident)
        #os.system("taskkill /PID {} /F".format(int(i)))

scriptEnd = time.time()

print("Total CLosing Time : ", scriptEnd - scriptStart)