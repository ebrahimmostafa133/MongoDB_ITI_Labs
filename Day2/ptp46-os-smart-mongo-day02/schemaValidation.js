

/**
 * 
 * 
 * 
 * you need define schema for the collections you are using ??
 * 
 * 
 */

db.getCollecitonInfos({name: 'instructors'})
// create collection users ---> define schema for it...


db.createCollection("users", 
    {
        validator: {
            $jsonSchema: {
                bsonType:"object",
                properties: {
                    firstName: {bsonType: "string"},
                    lastName: {bsonType: "string"}
                }
            }


        } // validator 

    } // creation options ?
);


db.users.insertOne({_id:1})

db.users.insertOne({_id:3, username:'abbass'})

db.users.insertOne({_id:4, firstName:true})  
/*"errmsg" : "Document failed validation",
	"op" : {
		"_id" : 4,
		"firstName" : true
	} */

///-------------- I have create the collection but I need to identify more fields, constrains etc... ?


db.users.runCommand("collMod", {
        validator: {
            $jsonSchema: {
                bsonType:"object",
                properties: {
                    firstName: {bsonType: "string"},
                    lastName: {bsonType: "string"},
                    age: {bsonType: 'number'}
                }
            }


        } // validator 
})

db.users.insertOne({age:"iti"})
/**
 * WriteError({
	"index" : 0,
	"code" : 121,
	"errmsg" : "Document failed validation",
	"op" : {
		"_id" : ObjectId("696e0fbc6e9fcf3463af03ff"),
		"age" : "iti"
	}
})
 */


/////////////////////////////
// I need to define required field =--> firstName, lastName 
db.users.runCommand("collMod", {
        validator: {
            $jsonSchema: {
                bsonType:"object",
                required: ["firstName", "lastName"],
                properties: {
                    firstName: {bsonType: "string"},
                    lastName: {bsonType: "string"},
                    age: {bsonType: 'number'}
                }
            }


        } // validator 
})

db.users.insertOne({age:10, name:"abbass"})
db.users.insertOne({age:10, firstName:"abbass", lastName:"ABC", city:"cairo"})

//***********************Prevent adding extra properties ************** */

db.users.runCommand("collMod", {
        validator: {
            $jsonSchema: {
                bsonType:"object",
                additionalProperties: false,
                required: ["firstName", "lastName"],
                properties: {
                    firstName: {bsonType: "string"},
                    lastName: {bsonType: "string"},
                    age: {bsonType: 'number'}
                }
            }


        } // validator 
})

db.users.insertOne({age:10, firstName:"abbass", lastName:"ABC", city:"cairo"})
db.users.insertOne({age:10, firstName:"abbass", lastName:"ABC"})


// if you are using additionalProperties: false ---> You must specify the id in properties 

db.users.runCommand("collMod", {
        validator: {
            $jsonSchema: {
                bsonType:"object",
                additionalProperties: false,
                required: ["firstName", "lastName"],
                properties: {
                    _id:{},  // id from any type
                    firstName: {bsonType: "string"},
                    lastName: {bsonType: "string"},
                    age: {bsonType: 'number'}
                }
            }


        } // validator 
})

db.users.insertOne({age:10, firstName:"abbass", lastName:"ABC"})


db.users.insertOne({age:10, firstName:"abbass", lastName:"ABC", _id:100})

// limit ids  ==> to be integers 
db.users.runCommand("collMod", {
        validator: {
            $jsonSchema: {
                bsonType:"object",
                additionalProperties: false,
                required: ["firstName", "lastName"],
                properties: {
                    _id:{bsonType: 'number'},  // id must be string 
                    firstName: {bsonType: "string"},
                    lastName: {bsonType: "string"},
                    age: {bsonType: 'number'}
                }
            }


        } // validator 
})

// numbers  --> range min, max

db.users.runCommand("collMod", {
        validator: {
            $jsonSchema: {
                bsonType:"object",
                additionalProperties: false,
                required: ["firstName", "lastName"],
                properties: {
                    _id:{bsonType: 'number'},  // id must be string 
                    firstName: {bsonType: "string"},
                    lastName: {bsonType: "string"},
                    age: {bsonType: 'number', minimum:10, maximum:60}
                }
            }


        } // validator 
})

// 
db.users.runCommand("collMod", {
        validator: {
            $jsonSchema: {
                bsonType:"object",
                additionalProperties: false,
                required: ["firstName", "lastName"],
                properties: {
                    _id:{bsonType: 'number'},  // id must be string 
                    firstName: {bsonType: "string"},
                    lastName: {bsonType: "string"},
                    age: {bsonType: 'number', minimum:10, maximum:60}, 
                    gender: {
                        enum : ["male", "female"]
                    }
                }
            }


        } // validator 
})

db.users.insertOne({age:10, firstName:"abbass", lastName:"ABC", _id:502, gender:"m"})
