

// deal with huge amount of data  --> 
// I need to retrieve this data

instructors = db.instructors.find()

instructors = instructors.toArray()
// use filter to get the data...

// mongo provide different operators -->> get the required documents 

/// comparasion operators

// 1- get instructors with salary > 3500 ??

// select * from instructors where salary > 3500 ??

// --> eq 
db.instructors.find(
    { salary: 3500 },
    {})


// > ?

db.instructors.find(
    { salary: { $gt: 3500 } },
    {})


db.instructors.find(
    { salary: { $gte: 3500 } },
    {})



db.instructors.find(
    { salary: { $eq: 3500 } },
    {})


/// get instructors salary --> 3500 or 3600 ??

// $in operator



db.instructors.find(
    { salary: { $in: [3500, 3600] } },
    {})


//*************** logical operators ?? **********/ */

// or ?


db.instructors.find(
    { age: { $in: [22, 28] } },
    {})


// or ??

db.instructors.find(
    { age: { $or: [22, 28] } },
    {})

// logical operators  ===> top level operators ?? 
db.instructors.find(
    { $or : [{age:22}, {age:28}] },
    {})


    db.instructors.find(
    { $or : [
        {age: 22},
        {firstName: "noha"}
    ] },
    {})


    db.instructors.find(
    { $and : [
        {age: 22},
        {firstName: "noha"}
    ] },
    {})


    // and , or ??

    // insturctors  -->salary 6200 and age 22 or 28 ??


    db.instructors.find(
    { 
        $and: [
            {salary: 6200},
            {
                $or : [{age: 22}, {age:28}]
            }
        ]

    },
    {})



    // get instructors lives in cairo ?

        // search for object extact match address: cairo ....

    db.instructors.find(
    { 
       address: "cairo"

    },
    {})



    db.instructors.find(
    { 
       'address.city': "cairo"

    },
    {})

    // get firstname, lastname, city



 db.instructors.find(
    { 
       'address.city': "cairo"

    },
    {
        firstName:1, 
        lastName:1, 
        "address.city":1
    })
///**************************** Array operators ****************************/

/// instructors --> js >>

 
db.instructors.find(
    {
        courses:"js" // courses if array --> return with documents courses contains 'js'
    }, 
    {
        firstName:1, 
        lastName:1, 
        courses:1 
    }
)


// instructors teach js, html5 and other courses??
db.instructors.find(
    {
        courses:["js", "html4"]  // js, html5 only 
    }, 
    {
        firstName:1, 
        lastName:1, 
        courses:1 
    }
)


db.instructors.find(
    {
        courses: {$all: ['js', 'html5']}  
    }, 
    {
        firstName:1, 
        lastName:1, 
        courses:1 
    }
)



db.instructors.find(
    {
        courses: ["js", 'html5']  // get documents ?? courses only ["js", 'html5']
    }, 
    {
        firstName:1, 
        lastName:1, 
        courses:1 
    }
)


// courses  --> contain js, html5


db.instructors.find(
    {
        courses:   {
            $all: ['html5', 'js']
        } //
    }, 
    {
        firstName:1, 
        lastName:1, 
        courses:1 
    }
)


// instructors  --> teaches 3 courses ??
// size elements of array ?

db.instructors.find(
    {
        courses:   {
           $size: 3
        } //
    }, 
    {
        firstName:1, 
        lastName:1, 
        courses:1 
    }
)



db.instructors.insertOne(
    {
        _id:100, 
        firstName:"Noha",
        lastName:"Shehab",
        subjects: [55,5, 60]
    }
)

db.instructors.insertOne(
    {
        _id:101, 
        firstName:"Ali",
        lastName:"Test",
        subjects: [10,20, 30]
    }
)




// get instructor  --> subjects  --> contain value > 55 ??


db.instructors.find(
    {
        subjects:   {
           $elemMatch : {$gt: 55}
        } //
    }, 
    {
        firstName:1, 
        subjects:1
    }
)

// operators =--> structure of the document 


db.instructors.find({}, {firstName:1}) // may result in returning with documents --> don't firstName


db.instructors.find(
    {
        firstName: {$exists:true}
    }, 
    {firstName:1})




// total salaries for all instructors 

let summ = 0

db.instructors.find().forEach(element => {
    summ += element.salary
});

print(`total salary ${summ}`)


let summ = 0

db.instructors.find( 
    {salary: {$exists:true }}
).forEach(element => {
    summ += element.salary
});

print(`total salary ${summ}`)



db.instructors.insertOne({
    firstName: "Ahmed",
    lastName: "Ehab",
    salary: "One million"  
})


// salary exists but not suitable for the operation ... 

// you to consider data type
summ = 0

db.instructors.find( 
    {salary: {$type:"number" }}
).forEach(element => {
    summ += element.salary
});

print(`total salary ${summ}`)


/// 
db.instructors.find(
    {
        firstName: {
            $regex: "/^Noha/",
            $options: "i"
        }
    }, 
    {firstName:1}
)








db.instructors.insertOne({
    _id : 103,
    firstName: "Ali",
    salary : 500,
    commission : 200
})
db.instructors.insertOne({
    _id : 104,
    firstName: "Omar",
    salary : 500,
    commission : 600
})


/// get documents  commission > salary 

db.instructors.find(
    {
        $expr : {
            $gt : ["commission", "salary"]
        }
    }
)


db.instructors.find(
    {
        $expr : {
            $gt : ["$commission", "$salary"]  // compare values in commission exists in the document
        }
    }
)
















































































