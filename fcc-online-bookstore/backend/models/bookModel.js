import mongoose from "mongoose";
const bookSchema = mongoose.Schema(
    {   //no id because id will be handled directly by the database
        title : {
            type : String,
            required : true,
        },
        author : {
            type : String,
            required : true,
        },
        publishYear : {
            type : Number,
            required : true,
        },
    }
); //better approach is creating the schema outside if u have other fields
export const Book = mongoose.model('Book',bookSchema); //can use it in another file
