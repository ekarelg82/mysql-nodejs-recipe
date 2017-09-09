const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'userphp',
 password : 'Bradva0427',
 database : 'library'
});
connection.connect();
const cors = require('cors')

//this code to accept tequest body
const bodyParser = require('body-parser');
 app.use(bodyParser.json());

 app.use(cors());
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post('/classics', function(req,res){
 console.log(req.body);
 let query = "INSERT INTO classics (author_id, title, type)" +
 `VALUES(${req.body.author_id}, '${req.body.title}', '${req.body.type}')`;
 console.log(query);
 connection.query(query, function(err, result){
   if (err){
     console.log(err);
     return res.send(500);
   }
res.send('Success');
 });
});


app.post('/author', function(req,res){
 console.log(req.body);
 let query = "INSERT INTO author (first_name, last_name, nationality)" +
 `VALUES('${req.body.first_name}', '${req.body.last_name}', '${req.body.nationality}')`;
 console.log(query);
 connection.query(query, function(err, result){
   if (err){
     console.log(err);
     return res.sendStatus(500);
   }
res.send('Success');
 });
});
 //all request bodiesin Json are built in to req.body only if content type is application /json

app.put('/classics/:id', function(req,res){
  let id = req.params.id;
  let rb = req.body;
  let query = 'UPDATE classics set ? WHERE id='+connection.escape(id);
  connection.query(query, rb, function(err, rows){
//   if (rb.author_id) query+= `author_id=${rb.author_id},`;
//   if (rb.title) query += `title='${rb.title}',`;
//   if (rb.type) query += `type='${rb.type}',`;
// query = query.substr(0,query.length-1);
// query += ` WHERE id=${id}`;
// console.log(query);
// connection.query(query, function(err, rows){
  if (err){
    console.log(err);
    return res.sendStatus(500);
  }
  res.send('Success updating id: '+id);
});
});

app.put('/author/:id', function(req,res){
  let id = req.params.id;
  let rb = req.body;
  let query = 'UPDATE author set ? WHERE id='+connection.escape(id);
  connection.query(query, rb, function(err, rows){
    if (err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send('Success updating id: '+id);
  });
  });


app.delete('/classics/:id', function(req,res){
  let query = `DELETE from classics WHERE id=${req.params.id}`;
  connection.query(query, function(err, result){
    if (err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send('Successfully deleted id: '+req.params.id);
  });
  });

  app.delete('/author/:id', function(req,res){
    let query = `DELETE from author WHERE id=${req.params.id}`;
    connection.query(query, function(err, result){
      if (err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.send('Successfully deleted id: '+req.params.id);
    });
    });
app.get('/', function(req, res) {
   console.log("hello    - - -");
   console.log("supppeeeer");
   res.end("jet.com would not hire me");
});

app.get('/randomfight/:player1/:player2', function(req, res) {
   let p1 = req.params.player1;
   let p2 = req.params.player2;
   console.log("Received request to fight for players", p1, p2);
   if (Math.random() > 0.5) res.end(p1+" wins!");
   else res.end(p2+" wins!");
});

app.get('/classics', function(req, res) {
   connection.query('SELECT * FROM classics', function(err, books){
       if(err) res.send(500);
       res.json(books);
   })
})

app.get('/author', function(req, res) {
   connection.query('SELECT * FROM author', function(err, books){
       if(err) res.send(500);
       res.json(books);
   })
})
app.listen(1337);
console.log("Server listening on port 1337");
