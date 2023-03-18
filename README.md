# Simple Nodejs server
A server that maintains a ‘database’ of your appointments (date, time, with whom). All the usual operations such as searching, addition and deletion are available.

The 'database' is a textfile called appointment.txt. This Nodejs server was created with the intention of connecting to the server through Telnet.

# Run server
- open cmd
- cd /path/to/project
- run command:
  - ```node Appointments.js```

# Connect to server through telnet
- open terminal
- run command:
  ```telnet localhost 55555```
 
 # How it works
 - Click CTRL+] when the console for Telnet appears and is blank. You will
    then be shown a terminal to type commands
 - In order to send an operation, you must use the command:
 - ```send <number of command>```
      - Example: ```send 1```
  - You then enter the value you want to insert, search or delete
 - The available commands are:
      - ```send 1``` -insert into textfile
      - ```send 2``` -search for record
      - ```send 3``` -delete record from textfile
      - ```send 4``` -kill connection to server
  - After using ```send <number of command>```, you then make use of:
      - ```send <value to insert,delete,search>```
 

