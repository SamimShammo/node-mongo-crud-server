// 1st step 
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
// 2nd step 
const app = express();
// 3rd step 
const port = 5000; 

app.use(cors())
app.use(express.json())
// 4th step 

// user name "mydbuser"
// pass : '3gSlfelh6WTyjw0G'

// connection 
const uri = "mongodb+srv://mydbuser:3gSlfelh6WTyjw0G@cluster0.qvlwz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//   const collection = client.db("FoodMaster").collection("Users");
//   // perform actions on the collection object
//   console.log('hitting the database')
//   const user = {name:'Samim', email:'Samim@gmail.com', phone:'01739325254'}
//   collection.insertOne(user)
//   .then(() => {
//       console.log('inset one')
//   })
// //   client.close();
// });
// // connection

async function run() {
    try {
        await client.connect();
        const database = client.db('FoodMaster');
    
        const userCollection = database.collection('user');
        // GET API 
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        })
        //POST API 
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await  userCollection.insertOne(newUser);
            res.send(result)
        })
        // DELETE API 
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query)
            console.log('delete', result)
            res.json(result)
        })

        // updateuser  
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const user = await userCollection.findOne(query);
            console.log('load user id', id)
            res.send(user)
        })
 
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Running my crud servicer')
})



// 5th step 
app.listen(port, () => {
    console.log('Running server', port)
})