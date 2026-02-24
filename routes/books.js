const express = require("express")
const { books } = require("../data/books.json");
const {users} = require("../data/users.json")

const router = express.Router()

/**
* Route: /books
 * method: GET
 * Decsription: get all the list in the system 
 * Access: Public
 * Parameter: None
 */

router.get('/',(req,res) =>{
    res.status(200).json({
        success: true,
        data: books
    })
})

/**
* Route: /books/:id
 * method: GET
 * Decsription: get all the list in the system 
 * Access: Public
 * Parameter: ID
 */

router.get('/:id' , (req, res) =>{
    const {id} = req.params;
    const book = books.find((each) => each.id === id)

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book ${id} not found`
        })
    }

    res.status(200).json({
        success: true,
        data: book,
        
    })
})

/**
* Route: /books/:id
 * method: POST
 * Decsription: Create/register a new book
 * Access: Public
 * Parameter: ID
 */

router.post('/',(req,res)=>{
   
    const { id, name, author, genre, price, publisher} = req.body;

    if(!id || !name || !author || !genre || !price || !publisher ){
        return res.status(400).json({
            success: false,
            message: "Please provide all requires fields"
        })
    }
    const book = books.find((each)=>each.id === id);

        if(book){
            return res.status(400).json({
                success: false,
                message: `Book with ${id} is already registerd`
            })
        }
    
    books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher
    })

    res.status(200).json({
        success: true,
        message: "Book registered successfully"
    }) 
})

/**
 * Route: /user/:id
 * method: PUT
 * Decsription: Updating a user by thier id
 * Access: Public
 * Parameter: id
 */

router.put('/:id',(req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    // if(!data || Object.keys(data).length === 0){
    //     return res.status(400).json({
    //         success: false,
    //         message:"Please provide data to update"
    //     })
    // }

    // check the user exits 

    const book = books.find((each) => each.id === id)

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found with id ${id}`
        })
    }

    const updateBook = books.map((each) => {

        if (each.id === id){
            return {
                ...each,
                ...data,
            }  
        }

        return each;
    })

    res.status(200).json({
        success: true,
        data: updateBook,
        message: "Books updated successfully"
    })
})

/**
 * Route: /books/:id
 * method: DELETE
 * Decsription: delete a book by thier id
 * Access: Public
 * Parameter: id
 */

router.delete('/:id',(req,res) => {
    const {id} = req.params;

    const book = books.find((each) => each.id === id)

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found with is ${id}`
        })
    }

    const updatedBook = books.filter((each) => each.id === id)

    res.status(200).json({
        success: true,
        message: "Books deleted successfully",
        data: updatedBook
    })
})

/**
 * Route: /books/issued/for-user
 * method: GET
 * Decsription: Get all issues books
 * Access: Public
 * Parameter: None
 */

router.get('/issued/for-user',(req,res) => {
    // const issuedBook = books.filter((each) => each.issuedBook === true);
    const userWithissuedBooks = users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
    })


    const issuedBook = [];
   
    userWithissuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        if(book){
             book.issuedBy = each.name;
             book.issuedDate = each.issuedDate;
             book.returnDate = each.returnDate;
        }

       

        issuedBook.push(book)
    })

    if(!issuedBook === 0){
        return res.status(404).json({
            success: false,
            message : "No Book issued yet"
        })
    }
   

    res.status(200).json({
        success: true,
        data: issuedBook
    });
})



module.exports = router;