//Connecting to MongoDB
const MongoClient = require('mongodb').MongoClient;

const dboper = require('./operations');

//Create a URL to the MongoDB server: 27017 is the default port.
const url = 'mongodb://localhost:27017/';

//Create database name.
const dbname = 'nucampsite';

//connect() method to get the reference to the MongoDB instance client. 
MongoClient.connect(url, {
        useUnifiedTopology: true
    }).then(client => {


        console.log('Connected correctly to server');

        //select a database using the client.db() method. 
        const db = client.db(dbname);

        //delete collection dropCollection()
        db.dropCollection('campsites').then(result => {
                console.log('Dropped Collection:', result);
            })
            .catch(err => console.log('No collection to drop'));


        // insert data into a document
        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
            .then(result => {
                console.log('Insert Document:', result.ops);

                return dboper.findDocuments(db, 'campsites');
            })
            //find all documents by the name campsites
            .then(docs => {
                console.log('Found Documents:', docs);
                //update an existing document
                return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description" }, 'campsites');
            })
            .then(result => {
                console.log('Updated Document Count:', result.result.nModified);
                //find documents campsites
                return dboper.findDocuments(db, 'campsites');
            })

        .then(docs => {
                console.log('Found Documents:', docs);
                //remove named document
                return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                    'campsites');
            })
            .then(result => {
                console.log('Deleted Document Count:', result.deletedCount);

                return client.close();
            })
            .catch(err => {
                console.log(err);
                client.close();
            });
    })
    .catch(err => console.log(err));
/* Resources:
 *  http://callbackhell.com/
 *  https://medium.com/@js_tut/the-great-escape-from-callback-hell-3006fa2c82e
 */