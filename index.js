//Connecting to MongoDB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
//Create a URL to the MongoDB server: 27017 is the default port.
const url = 'mongodb://localhost:27017/';
//Create database name.
const dbname = 'nucampsite';
//connect() method to get the reference to the MongoDB instance client. 
MongoClient.connect(url, {
    useUnifiedTopology: true
}, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    //select a database using the client.db() method. 
    const db = client.db(dbname);
    //delete collection dropCollection()
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);
        // create and get a collection db.collection()
        const collection = db.collection('campsites');
        //Insert data into a collection a Document insertOne() to add an object campsites collection
        collection.insertOne({ name: "Breadcrumb Trail Campground", description: "Test" },
            (err, result) => {
                assert.strictEqual(err, null);
                console.log('Insert Document:', result.ops);
                //Find all documents find() to get all the documents added to the collection:
                collection.find().toArray((err, docs) => {
                    assert.strictEqual(err, null);
                    console.log('Found Documents:', docs);
                    // closing the connection close()
                    client.close();
                });
            });
    });
});
/* Resources:
 *  https://flaviocopes.com/node-mongodb/
 */