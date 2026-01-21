

//

db.instructors.find().constructor.name

/***
 * 
 * 
 * 
 * cursor ? object mongo return query execution result in 
 */

 db.instructors.find({}).forEach((document)=>{
    print(document); })  // cursor


arr.forEach((element)=>{
    print(`element= ${element}`)
})

/**
 * 
 * mongo knows that may need to iterate over the result-set 
 * cursor --> like what you do with arrays 
 * 
 * allow functionality forEach --> to be applied directly on the result 
 * set --> type cursor 
 */

 db.instructors.find({}).count()


 // in js env.

 var docs = db.instructors.find()

 while(docs.hasNext()){
    print(docs.next())
 }


 // cast cursor to An array 

var documents =  db.instructors.find().toArray()
 print(documents)
 print(documents.constructor.name)

 // es6 filter, map, ---> you can simply cast the cursor to the array. 

 /************************************************************/

 
























