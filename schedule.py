import os
import signal
import sys
import threading
import sqlite3
from queue import Queue

def task(jarname):
    os.system(jarname)
    
def startLeafServices():
    leafThreadDict={}
    global startList
    for i in startList:
        tleaf=threading.Thread(target=task,args=(i,))
        tleaf.start()
        print("Thread id ",tleaf.ident) 
        leafThreadDict[i]=tleaf.ident
    print(leafThreadDict)
def startChainedServices():
    chainedThreadDict={}
    global priorityList
    for i in priorityList:
        tchained = threading.Thread(target=task,args=(i,))
        tchained.start()
        print("Thread id ",tchained.ident)
        chainedThreadDict[i]=tchained.ident
    print(chainedThreadDict)
def startAllServices():  
    conn =  sqlite3.connect('services.db')
    c = conn.cursor()
    startQueue = Queue()
    priorityQueue = Queue()
    global startList
    global priorityList
    startList = []
    priorityList = []
    c.execute("select service_name from services where service_traffic=? and type_of_service=?",("high","leaf",))
    rowsForStartQueue = c.fetchall()
    print("start queue contents")
    for row in rowsForStartQueue:
        print(row)
        startQueue.put(row)
    #startQueue.put('powershell')
    c.execute("select service_name from services where type_of_service=? order by init_time DESC",("chained",))
    rowsForPriorityQueue = c.fetchall()
    print("priority queue contents")
    for row in rowsForPriorityQueue:
        print(row)
        priorityQueue.put(row)
    print("Initial start queue")
    print(startQueue)
    for i in range(0,startQueue.qsize()):
        temp = startQueue.get(i)[0]
        startList.append(temp)
        print(temp)
        # print(temp[0])
    print("Initial priority Queue")
    print(priorityQueue)
    for i in range(0,priorityQueue.qsize()):
        temp = priorityQueue.get(i)[0]
        priorityList.append(temp)
        print(temp)
    print("Services in start list")
    print(startList)
    print("Services in priority list")
    print(priorityList)
    print(startQueue.empty())
    print(priorityQueue.empty())
    conn.commit()
    conn.close()
    startLeafServices()
    startChainedServices()
    # print(signal.valid_signals())

if __name__ == "__main__":
    startAllServices()