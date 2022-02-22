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
strToJson = (string, delim, tableTitle,title) => {
  let strArr = string.split(delim);
  console.log(strArr)
  // Create an obj to push to a JSON
  let obj = {[tableTitle]:[]}
  // push strArr to table
  obj.table.push(strArr)
  // convert obj to JSON and then stringify it
  let json = JSON.stringify(obj)
  // write JSON to a file on the system
  fs.writeFile(`${title}.json`, json, 'utf8', callback)
}

appendToJson = (title, tableName, newDataTable ,newData) => {
  fs.readFile(title, 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    let obj = JSON.parse(data); //now JSON file an object
    let newObj = {[newDataTable]:newData} // creates a newObj to push to the JSON file
    obj.push(newObj); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile(title, json, 'utf8', callback); // write it back 
}});
}

// Function for determining which command is executed
var pick = function(caseData, functionData) {
  switch (caseData) {
  case "make-json":
    strToJson();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("Randomizer is ready.");
    console.log("Arguments that were read are: "+ process.argv[2]);
  }
};

// Function which takes in command line arguments and executes correct function accordingly
var runThis = function(...args) {
  console.log("Reading args")
  console.log (args)
  // pick(funcName, arg2);
};

// MAIN PROCESS
// =====================================
// creates a list of all given parameters
let localParams= process.argv.slice(2)
console.log(localParams)
runThis(localParams);
