const express = require("express");
const mongoose = require("mongoose")
const router = express.Router()
const Books = require("../models/book")

//Adding book
router.post("/add", async (req, res) => {
    console.log(req.body)
    let flag = true
    for(let x in req.body){
        if(!req.body[x]){
            flag = false
            break
        }
    }
    if(!flag){
        return res.status(422).json({message:"Please all the fields before submitting"})
    }
    try {
        const newBook = new Books(req.body)
        await newBook.save().then(() => {
            res.status(200).json({ message: "Book added successfully" })
        });
    }
    catch (error) {
        console.log(error)
    }

})

//find the particular book

router.post("/findbook",(req,res)=>{
    // console.log(req.body)
    Books.find({_id:req.body.bookid})
    .then(result=>{
        // console.log(result[0])
        res.json(result[0])
    })
})

//getting the books

router.get("/getbooks", async (req, res) => {
    try {
        let allBooks = await Books.find()
        // console.log(allBooks)
        res.status(200).json(allBooks)
    }
    catch (error) {
        console.log(error)
    }
})

//getting the Particular book using its id

router.get("/getbooks/:id", async (req, res) => {
    let particularBook;
    const id = req.params.id;
    try {
        particularBook = await Books.findById(id);
        res.status(200).json(particularBook)
    }
    catch (error) {
        console.log(error)
    }
})

//updating the book using that book id

router.put("/updatebook/:id", async (req, res) => {
    const id = req.params.id;
    // console.log(id)
    let updatedBook;
    const { bookname, year, isbn, author, image, price } = req.body;
    try {
        updatedBook = await Books.findByIdAndUpdate(id, {
            bookname:bookname,
            year:year,
            isbn:isbn,
            author:author,
            image:image,
            price:price
        })
        // console.log(updatedBook)
        await updatedBook.save().then((result) => {
            // console.log(result)
            res.status(201).json({ message: "Book updated successfully" })
        })

    }
    catch (error) {
        console.log(error)
    }
})

//deleting the book by bookid

router.delete("/deletebook/:id", async (req, res) => {
    const id = req.params.id
    try {
        await Books.findByIdAndDelete(id).then(() => res.status(201).json({ message: "Book deleted successfully" }))
    }
    catch (error) {
        console.log(error)
    }
})
module.exports = router