//Connecting to MongoDB
const MongoClient = require('mongodb').MongoClient;
//To use strict assertion mode:
const assert = require('assert').strict;
const dboper = require('./operations');

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
        console.log('Dropped Collection:', result);

        // insert data into a document
        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" },
            'campsites', result => {
                console.log('Insert Document:', result.ops);

                //find all documents by the name campsites
                dboper.findDocuments(db, 'campsites', docs => {
                    console.log('Found Documents:', docs);

                    //update an existing document
                    dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description" }, 'campsites',
                        result => {
                            console.log('Updated Document Count:', result.result.nModified);

                            //find documents campsites
                            dboper.findDocuments(db, 'campsites', docs => {
                                console.log('Found Documents:', docs);

                                //remove named document
                                dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                    'campsites', result => {
                                        console.log('Deleted Document Count:', result.deletedCount);

                                        //closing the connection
                                        client.close();
                                    }
                                );
                            });
                        }
                    );
                });
            });
    });
});
/* Resources:
 *  https://flaviocopes.com/node-mongodb/
 *  https://mongodb.github.io/node-mongodb-native/3.4/api/Collection.html#updateOne
 */