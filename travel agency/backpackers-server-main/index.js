const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.cdlz9dq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const run = async() => {
    try {
        await client.connect();

        const database = client.db(process.env.DB_NAME);
  
        const packageCollection = database.collection('packages');

        const bookingCollection = database.collection('bookings');


        // Code

          app.get('/packages', async (req, res) => {
            const query = {};
            const cursor = packageCollection.find(query);
    
            const results = await cursor.toArray();
            
            if(results) {
              res.json(results);
            }
    
            else {
              res.send([]);
            }
    
          });

          app.get('/bookings', async (req, res) => {
            const query = {};
            const cursor = bookingCollection.find(query);
    
            const results = await cursor.toArray();
            
            if(results) {
              res.json(results);
            }
    
            else {
              res.send([]);
            }
    
          });

          app.get('/booking/:email', async (req, res) => {
            const { email } = req.params;
            const query = { email: email };
            
            const cursor = bookingCollection.find(query);
    
            const results = await cursor.toArray();
    
            if(results) {
                res.json(results);
            }
    
            else {
                res.send([]);
            }
  
          });

          app.get('/pack/:id/:email', async (req, res) => {
            const { id, email } = req.params;

            const query = { email: email };
    
            const result = await bookingCollection.findOne(query);

            console.log(result);

            if (!result) {
                const query = { _id: ObjectId(id) };
                const data = await packageCollection.findOne(query);
                console.log(data)
                const sentData = { ...data };
                res.json(sentData);

            } else {
                const query = { _id: ObjectId(id) };
                const data = await packageCollection.findOne(query);
                const sentData = { ...data };
                res.json(sentData);
            }
          });

          app.post('/book', async (req, res) => {
            const newOrder = req.body;
            const result = await bookingCollection.insertOne(newOrder);
            res.json(result);
          });

    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server Up and Running..');
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

module.exports = app;