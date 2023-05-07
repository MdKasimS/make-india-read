const dbConnect = require('./mongodb');

async function updateData() {
    let collection = await dbConnect();
    let data = await collection.updateOne({userName:'qasim'},{$set:{userName:'qasim04',passWord:'qasim@04'}});
    console.log(data);
}