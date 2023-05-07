async function setData() {
    let collection = await dbConnect();
    console.log("Alhamdulillah adding 1st data");
    const status = await collection.bulkWrite(
        {
            insertOne:{
                document:
                {
                    ISBN:"1623439671",
                    JPEG:"1623439671.jpg",
                    ImageURL:"http://ecx.images-amazon.com/images/I/61t-hrSw9BL.jpg",
                    Title:"Doug the Pug 2016 Wall Calendar",
                    Author:"Doug the Pug",
                    Ratings:4,
                }
            }
        });
        console.log(status);
};