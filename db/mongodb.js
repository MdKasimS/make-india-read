// get process's driver code
const mongo = require('mongodb');

// get process's ID (either finr or its predecided)
const mongoClient = new mongo.MongoClient("mongodb://localhost:27017")


const databaseName = 'local';
// const collectionName = 'users_details';
const collectionName = 'googleBooks';


const connectDB = async ()=>{
    
    // get process's objects called connection object
    let conObj = await mongoClient.connect();
    
    // call process's higher-level objects
    let database = conObj.db(databaseName);
    
    // call process's lower-level objects
    let collection = database.collection(collectionName);

    return collection;
}

module.exports = connectDB;