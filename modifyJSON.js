// DEPENDENCIES
// =====================================

// Read and set environment variables
require("dotenv").config();

// Import the API keys
var keys = require("./keys");

// Import the FS package for read/write.
var fs = require("fs");


// FUNCTIONS
// =====================================

// Writes to the log.txt file
var writeToLog = function(data) {
  // Append the JSON data and add a newline character to the end of the log.txt file
  fs.appendFile("log.txt", JSON.stringify(data) + "\n", function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("log.txt was updated!");
  });
};

// Function for running a command based on text file
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

// Takes a string and splits via a delimiter into an array. It then takes the array and puts it into a JSON file for reading in the future
strToJson = (args, string, delim, tableTitle,title) => {
  // args[0] = string, args[1] = delim, args[2]=tableTitle, args[3] = title
  let strArr = args[0].split(args[1]);
  console.log(strArr)
  // Create an obj to push to a JSON with a key named args[2]
  let obj = {[args[2]]:strArr}
  // convert obj to JSON and then stringify it
  let json = JSON.stringify(obj)
  // write JSON to a file on the system
  fs.writeFile(`${args[3]}.json`, json, 'utf8', () => {console.log("Check the file!")})
}

appendToJson = (args, title, tableName, newDataTable ,newData) => {
  // args[0] = title, args[1] = tableName, args[2]=newDataTable, args[3] = newData
  fs.readFile(args[0], 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    let obj = JSON.parse(data); //now JSON file an object
    let newObj = {[args[2]]:args[3]} // creates a newObj to push to the JSON file
    obj.push(newObj); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile(args[0], json, 'utf8', () => {console.log("Check the file!")}); // write it back 
}});
}

// Function for determining which command is executed
var pick = function(args) {
  console.log(`Case name: ${args[0]}`)
  // first args is case name
  switch (args[0]) {
  case "make-json":
    console.log(args.slice(1))
    strToJson(args.slice(1));
    break;
  case "add-to-json":
    console.log(args.slice(1))
    appendToJson(args.slice(1));
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("Unknown option.");
    
  }
};

// Function which takes in command line arguments and executes correct function accordingly
var runThis = function(args) {
  console.log("Reading args")
  console.log (args)
  pick(args);
};

// MAIN PROCESS
// =====================================
// creates a list of all given parameters
let localParams= process.argv.slice(2)
runThis(localParams);
