
/***
 * 
 * once you install mongodb 
 * then connected to the service using mongosh -->// or any client interface 
 * 
 * by default -->3 basic database , local , config, admin
 * 
 * when you open shell 00> you are using database with name test ?
 * 
 * list all databases ;;; 
 * show dbs; 
 */

// mongo db--> database will be created until you add data to it ??


// create database 
use iti;


db.employees.insertOne({name:"noha"})  
{
  acknowledged: true,
  insertedId: ObjectId('696cc0033bb1e5b4588ce5b0')
}

// the above command  --> create collection with name employees --> insert document --> {}

db.employees.insertOne({"firstName":"noha", "lastName":"Shehab"}) 


// each document in mongo must contain primary key, created by mongo engine ??
// _id: object_id() // size of object_id 

// no schema for collection
// collection can contain different documents with different fields or datatypes

// _id: primary key you can send it while creating document, otherwise mongo 
// will do the task

db.instructors.insertMany(instructorsArray)

db.instructors.insertOne({
    firstName: "Noha",
    lastName : "Shehab",
    email: "nshehab@iti.gov.eg",
    courses: ["mongo", "linux", "genAI"]
})


db.instructors.insertOne({
    _id:6,
    firstName: "Noha",
    lastName : "Shehab",
    email: "nshehab@iti.gov.eg",
    courses: ["mongo", "linux", "genAI"]
})


db.instructors.insertOne({
    fullName:"Youssef Gaber",
    salary :  2000000
})

// get the data from the database 

// 1- find 

// select * from insturctors;
db.instructors.find()


// select firstName, lastName from insturctors 

db.instructors.find(
    {}, // condition you need to apply on the data 
    {
        firstName:1, 
        lastName: 1 
    } // projection  ---> fields you need to select ??
)

// each document returned in mongo must have _id 

// unless you say no ??

db.instructors.find(
    {}, // condition you need to apply on the data 
    {
        firstName:1, 
        lastName: 1 , 
        _id: 0
    } // projection  ---> fields you need to select ??
)

//
db.instructors.find(
    {
        firstName:1, 
        lastName: 1 , 
        _id: 0
    } // projection  ---> fields you need to select ??
)

// 

db.instructors.find(
    {
        firstName: "Noha"
    },
    {
        firstName:1, 
        lastName: 1 , 
        _id: 0
    } // projection  ---> fields you need to select ??
)


// select * from insturctors limit 1; 
db.instructors.findOne()

db.instructors.findOne({}, {})
