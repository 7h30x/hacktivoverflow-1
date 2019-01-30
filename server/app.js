require("dotenv").config();
const express = require ('express');
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const cors = require('cors');
const bodyParser = require ('body-parser');
const questionRouter = require ('./routes/questions');
const answerRouter = require ('./routes/answers');
const userRouter = require ('./routes/users');
const redis = require('redis');
redis.createClient({host: '127.0.0.1', port: 6379});

// DB CONNECT 
const mongoose = require ('mongoose');
let uri ; 
NODE_ENV == 'development' ? uri = 'mongodb://localhost:27017/overflow-v2' : uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () =>console.log('db connection error'));
db.once('open', function () {console.log('connection')});

const app = express();
app.use(cors());
//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

//register routers
app.use('/questions', questionRouter);
app.use('/answers', answerRouter);
app.use('/users',userRouter);

app.listen(port, ()=> console.log('cors-enabled router is listening'))