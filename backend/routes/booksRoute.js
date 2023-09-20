import express from 'express';
import {Book} from '../models/bookModel.js';
const router  = express.Router();



//for creating and saving a book we need a post method
//for testing a post method we cannot use browser, we use postman to interact with web apis
router.post('/',async(request,response)=>{
    try{
        //quick validation for input which comes from request.body
        //check all required field and if they are not return error (catch block)
        if(
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear 
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author and publishYear'
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear, 
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
 });

//route to get the books
router.get('/', async(request,response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books
        });

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//if you have a list of books. you may want to show the product details to the client
//get book by id
router.get('/:id', async(request,response)=>{
    try{
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//update a book by its id 
router.put('/:id', async(request,response)=>{
    try{
        if(!request.body.title || 
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author and publishYear'
            });
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message : 'Book not found'});
        }
        return response.status(200).send({message:'book updated successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//deleting a book
router.delete('/:id',async (request,response)=>{
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message : 'Book not found'});
        }
        return response.status(200).send({message:'book deleted successfully'});

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

export default router;