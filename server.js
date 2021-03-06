const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://test:test@cluster0.me8ts.mongodb.net/inventory?retryWrites=true&w=majority";
const dbName = "inventory";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('items').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {items: result})
  })
})

app.post('/inventory', (req, res) => {
  db.collection('items').insertOne({
    item: req.body.item, 
    price: req.body.price,
    quantity: 1 
    
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/inventory', (req, res) => {
  db.collection('items')
  .findOneAndUpdate({items: req.body.item}, {
    $set: {
      quantity: req.body.quantity
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/inventory', (req, res) => {
  db.collection('items').findOneAndDelete({items: req.body.item, price: req.body.price}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
