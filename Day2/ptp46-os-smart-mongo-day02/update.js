

// update  in sql --> update existing fields with new values

// update instructors set firstName='noha' where id = 10; 

// rename column --> alter



/// in mongo --> update --> has more options

// 1- update value of existing field 

// 2- upsert  if field doesn't exist -> update it 


// no ddl ==> 3- rename ---> update 

//// update  ?



db.instructors.updateOne(
    {

    }, // condtion --> specify document you need apply 

    {

    } // action you need to apply on the document 
)

// I need to update firstName

db.instructors.updateOne(
    {

    }, // condtion --> specify document you need apply 

    {
        $set: {firstName: "Noha", lastName:"Shehab"}

    } 
)

// 1- update existing fields 
db.instructors.updateOne(
    {
        _id:6 

    }, // condtion --> specify document you need apply 

    {
        $set: {firstName: "Noha", lastName:"Shehab"}

    } 
)

// 2- if field doesn't exist --> add it. (alter table add column email, )

db.instructors.updateOne(
    {
        _id:6
    }, 
    {
        $set : {email: 'nshehab@iti.gov.eg'}
    }
)

// if document exists  update it , if not exists  --> insert  
db.instructors.updateOne(
    {
        _id:1000
    }, 
    {
        $set : {firstName: "Noha", email: 'nshehab@iti.gov.eg'}
    },
    {

        upsert : true 
    } // here you place the update options
)

/*************** Rename field ?? modify the document structure  **********/

db.instructors.updateOne(
    {
        _id:1000
    }, 
    {
        $rename: {
            email: 'mailAddress'
        }
      
    }
)

/******************************* remove field ?? ********************** */

db.instructors.updateOne(
    {
        _id:1000
    }, 
    {
        $unset :{mailAddress: "anyvalue"}

    }
)


/**************************update  embedded object ********************/

obj= {
    "_id" : 6.0,
    "firstName" : "Noha",
    "lastName" : "Shehab",
    "age" : 21.0,
    "salary" : 3500.0,
    "address" : {
        "city" : "cairo",
        "street" : 10.0,
        "building" : 8.0
    },
    "courses" : [ 
        "js", 
        "mvc", 
        "signalR", 
        "expressjs"
    ],
    "email" : "nshehab@iti.gov.eg"
}

db.instructors.updateOne(
    {
        _id:6
    }, 
    {
        $set: {address : "Mansoura"}
    }
)

// I need to update city in the address 
db.instructors.updateOne(
    {
        _id:6
    }, 
    {
        $set: {address : {
        "city" : "cairo",
        "street" : 10.0,
        "building" : 8.0
    },}
    }
)

db.instructors.updateOne(
    {
        _id:6
    }, 
    {
        $set: {'address.city': 'Mansoura'}
    }
)

/***************************** increment the salary **************************/


db.instructors.updateOne(
    {
        _id:6
    }, 
    {
        $set: {salary: 10000}
    }
)


db.instructors.updateOne(
    {
        _id:6
    }, 
    {
        $inc: {salary: 1000}
    }
)

db.instructors.updateOne(
    {
        _id:6
    }, 
    {
        $inc: {salary: -1000}
    }
)


db.instructors.updateOne(
    {
        _id:6
    }, 
    {
        $mul: {salary: 10}
    }
)

/********************************Array operators ************************************ */


db.instructors.updateOne(
    {
        _id:6
    },
    {
        $set: {courses:"django"}
    }
)
///---------------- update exisiting value in the array ?? 
// I know the index of the value I need to update ??


db.instructors.updateOne(
    {
        _id:6
    },
    {
        $set: {"courses.0":"django"}
    }
)


/// I don't know the index of the value I need to update 



db.instructors.updateOne(
    {
        _id:6
    },
    {
        $set: {"courses.$":["django",'signalR']}
    }
) // wrong


db.instructors.updateOne(
    {
        _id:6, courses: "signalR"
    },
    {
        $set: {"courses.$":"django"}
    }
)


db.instructors.updateOne(
    {
        _id:6, courses: "django"
    },
    {
        $set: {"courses.$":"Python"}
    }
)  // update first occurrence 



db.instructors.updateMany(
    {
         courses: "js"
    },
    {
        $set: {"courses.$":"JavaScript"}
    }
)  // update first occurrence 


// add new element to the array ??

db.instructors.updateOne(
    {
         _id: 6
    },
    {
        $addToSet: {courses: 'Laravel'} // will add the value to the array if not exists 
    }
)  // update first occurrence 

// set --> no duplication 

/////// add it even if it is existing 

db.instructors.updateOne(
    {
         _id: 6
    },
    {
        $push: {courses: 'Laravel'} // will add the value to the array if not exists 
    }
) 

// pop element from the array 

db.instructors.updateOne(
    {
         _id: 6
    },
    {
        $pop: {courses: 'Laravel'} // "errmsg" : "Expected a number in: courses: \"Laravel\"
    }
) 


db.instructors.updateOne(
    {
         _id: 6
    },
    {
        $pop: {courses: 4} // 	"errmsg" : "$pop expects 1 or -1, found: 4",

    }
) 

db.instructors.updateOne(
    {
         _id: 6
    },
    {
        $pop: {courses: 1} // pop the last element in the array 

    }
) 

// I need to remove item --> not in the beginning or the end of the array 
db.instructors.updateOne(
    {
         _id: 6
    },
    {
        $pull: {courses: 'django'} // 

    }
) 

// $max 

db.instructors.updateOne(
    {
         _id: 6
    },
    {
        $max: {salary: 6666} // 

    }
) 

// if salary < 6666 then update it to be 6666 else: keep the original value 

db.instructors.updateOne(
    {
         _id: 2
    },
    {
        $max: {salary: 6666} // 

    }
) 