import express from "express";
import {PORT, MONGODB_URL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';



const app = express();

//middleware for handling the cors policy: 2 ways
//type 1: allow all origins with default of cors(*)
app.use(cors());
//type 2: allow custom origins
app.use(cors({
    origin : "localhost:3000",
    methods : [],
    allowedHeaders : [],
})
);


//App is listening to port:5555 : everything good
//404 : we do not have the requested url
//for each url we need to have a Http route 
//the default http route of the server is a slash

//creating a http route for "/"
//get http method is generally used for getting a resource from server

// app.get('/',function(req,res){
//     console.log(req);
//     res.send("hello");
// }) 



//using middleware to parse request body
app.use(express.json());

//alternate method 
app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('Mern stack tutorial');
})

//we have import the book model

//middleware 
app.use('/books',booksRoute)

//.connect to connect database
//.then .catch : handle success / failure scenarios
mongoose
    .connect(MONGODB_URL)
    .then(()=>{
        console.log('App connected to database')
        //express server will only run if the database connection is successful
        app.listen(PORT,()=>{
            console.log(`App is listening to port:${PORT}`)
        });
    })
    .catch((error)=>{
        console.log(error);
    });;















