import sqlite3

conn =  sqlite3.connect('services.db')
c = conn.cursor()

c.execute("""CREATE TABLE SERVICES(
            service_id integer not null primary key AUTOINCREMENT,
            port_number integer,
            service_name text,
            service_traffic text,
            cloud_name text,
            type_of_service text,
            operation text,
            init_time real
            )""")

# c.execute("""drop table SERVICES""")
newData = [
     ['java -jar UsernameAvailable-0.0.1-SNAPSHOT.jar','high','local','leaf','acc',10.4,9003],
     ['java -jar Login-Page-0.0.1-SNAPSHOT.jar','medium','local','chained','acc',9.2,9001],
     ['java -jar GetUserData-0.0.1-SNAPSHOT.jar','medium','local','chained','acc',9.8,9002],
     ['npm start','high','local','leaf','acc', 6.3, 5000],
     ['npx nodemon server.js','high','chained','leaf','acc', 12.3, 5001],
     ['npx nodemon login.js','high','local','chained','acc', 10.2, 5002],
      ['npx nodemon registration.js','high','local','chained','acc', 6.3, 5003]
      ]
c.executemany("INSERT INTO SERVICES(service_name,service_traffic,cloud_name,type_of_service,operation,init_time,port_number) values (?,?,?,?,?,?,?)",newData)
conn.commit()
conn.close()
