
//Jonel Albuquerque u21598267 COS332 Practical 2


//This section includes all the requirements for the project
const net = require('net'); //for telnet
const fs = require("fs"); //to read from the 'database' file appointment.txt
//**************************************************************************





//This variable creates a server
const server = net.createServer((socket) => {

    //prints a message to the client when they connect and create a new line of available commands
    socket.write('Welcome to the server. send ...',function () {
        socket.write('\n1 to enter a new appointment. 2 to search for an appointment. 3 to delete an appointment. 4 to exit the server. \n');
    });


    //this variable is used in connection with input to see the action the user wants to take
    let dataTest = "" ;

    //prints a message to the client when they connect based on their input
    socket.on('data', (data) => {
        console.log(data.toString());
        socket.write(`You entered: ${data}`); //TODO: print all the values entered by the client to the socket
        //if input is 1
        if(data.toString() == '1' && dataTest == ""){
          socket.write(`Please use the command "send \< details to enter into database \>"`); //instructions for the client
          dataTest = "1";
        }
        else if(dataTest == '1'){
            //enter the data into the appointment.txt file and reset dataTest
            let input = data.toString() + "-1"; //used as a delimiter
            insertData(data.toString()); //helper function to insert values
            dataTest = "" ; //reset dataTest
        }
        //if the input is 2
        else if(data.toString() == '2' && dataTest == ""){
            socket.write(`Please use the command "send \< string you are looking for \> "`);
            dataTest = "";
        }
        else if(dataTest == '2'){
            socket.write(`The results are: ${searchData(data.toString())}`);
        }
        //if the input is 3
        else if(data.toString() == '3' && dataTest == ""){
            socket.write(`Please use the command "send \< appointment you want to delete by name \> "`);
            dataTest = "";
        }
        else if(dataTest == '3'){
            socket.write(`The results are: ${deleteData(data.toString())}`);
        }
        //if the input is 4
        else if(data.toString() == '4'){
            socket.write(`Thank you for using the server. Goodbye.`);
            socket.end();
        }

    });

    //prints a message to the server when they disconnect
    socket.on('end', () => {
        console.log('Client disconnected');
    });


});

//ensures the server listens on port 55555
server.listen(55555, () => {
    console.log('Server is listening on port 55555');
});

//gets all the values from the appointment.txt file and convert them into an array
function getValues(data){
    return data.split("-1");
}

//uses readData() to search the appointment.txt file for the input and return the results
function searchData(input){
    let data = readData();
    let values = getValues(data);
    let results = "";
    for(let i = 0; i < values.length; i++){
        if(values[i].includes(input)){
            results += values[i] + "\n";
        }
    }
    return results;
}



//opens appointment.txt and read the data
function readData() {
    let fs = require('fs');
    let data = fs.readFileSync('appointment.txt', 'utf8');
    return data;
}

//this code below will insert values to the appointment.txt file
function insertData(input) {
    let fs = require('fs');
    let temp = "-1" + input.toString();
    input = temp;
    fs.appendFile('appointment.txt', input, function (err) {
        console.log('Appointment has been created');
    });
}

//this code below will delete up until -1 from the appointment.txt file
function deleteData(input) {
    let fs = require('fs');
    let data = fs.readFileSync('appointment.txt', 'utf8');
    let values = getValues(data);
    let results = "";
    for(let i = 0; i < values.length; i++){
        if(values[i].includes(input) === false){
            results += values[i] + "\n";
        }
    }
    //results should be joined together with a -1 at the end of each line and then saved to the file
    results = results.replace(/\n/g, "-1");
    //remove the last two characters from the string results
    results = results.substring(0, results.length - 2);
    fs.writeFile('appointment.txt', results, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}



