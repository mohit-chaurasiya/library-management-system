const {BookModel , UserModel } = require("../models")
const IssuedBook = require("../dtos/book-dto")
// const bookModels = require("../models/book-models")

// const getAllBooks = () =>{

// }

// const getSingleBookById = () => {

// }

// module.exports = {
//     getAllBooks,
//     getSingleBookById
// }

// ==========================================================================
// router.get('/',(req,res) =>{
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })

exports.getAllBooks = async(req,res) => {
        const books = await BookModel.find()

        if(books.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Book in the system"
            })
        }


        res.status(200).json({
            success: true,
            data : books
        })
}

// ===================================================================================

// router.get('/:id' , (req, res) =>{
//     const {id} = req.params;
//     const book = books.find((each) => each.id === id)
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book ${id} not found`
//         })
//     }
//     res.status(200).json({
//         success: true,
//         data: book,
        
//     })
// })

exports.getSingleBookByID = async(req,res) => {
    
    const {id} = req.params;
    const book = await BookModel.findById(id)

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
}

// =======================================================================================


// router.get('/issued/for-user',(req,res) => {
//     // const issuedBook = books.filter((each) => each.issuedBook === true);
//     const userWithissuedBooks = users.filter((each)=>{
//         if(each.issuedBook){
//             return each;
//         }
//     })


//     const issuedBook = [];
   
//     userWithissuedBooks.forEach((each) => {
//         const book = books.find((book) => book.id === each.issuedBook);

//         if(book){
//              book.issuedBy = each.name;
//              book.issuedDate = each.issuedDate;
//              book.returnDate = each.returnDate;
//         }

       

//         issuedBook.push(book)
//     })

//     if(!issuedBook === 0){
//         return res.status(404).json({
//             success: false,
//             message : "No Book issued yet"
//         })
//     }
   

//     res.status(200).json({
//         success: true,
//         data: issuedBook
//     });
// })


exports.getAllIssuedBook = async(req,res) => {

    const users = await UserModel.find({
        issuedBook: {$exists : true},
    }).populate("issuedBook")

    const issuedBooks = users.map((each) => {
        return new IssuedBook(each);
    })

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success : false,
            message : "No Books issued yet"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    })
}

// ================================================================

// router.post('/',(req,res)=>{
   
//     const { id, name, author, genre, price, publisher} = req.body;

//     if(!id || !name || !author || !genre || !price || !publisher ){
//         return res.status(400).json({
//             success: false,
//             message: "Please provide all requires fields"
//         })
//     }
//     const book = books.find((each)=>each.id === id);

//         if(book){
//             return res.status(400).json({
//                 success: false,
//                 message: `Book with ${id} is already registerd`
//             })
//         }
    
//     books.push({
//         id,
//         name,
//         author,
//         genre,
//         price,
//         publisher
//     })

//     res.status(200).json({
//         success: true,
//         message: "Book registered successfully"
//     }) 
// })

exports.addNewBook = async(req,res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please Provide the data to add a new book"
        })
    }

    await BookModel.create(data);
    
    const allBooks = await BookModel.find();

    res.status(201).json({
        success: true,
        message : "Book added Successfully",
        data : allBooks
    })
}

// ======================================================================

exports.updateBookById = async(req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message : "Please provide the data to update"
        })
    }

    // Check if the book exists

    const updatedBook = await BookModel.findOneAndUpdate(
        {_id: id},
        data,
        {new : true}
    );

    if(!updatedBook){
        return res.status(404).json({
            success: false,
            message: `Book not found id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        message: "Book updated Successfully",
        data: updatedBook
    })
}

// =====================================================================

// router.delete('/:id',(req,res) => {
//     const {id} = req.params;

//     const book = books.find((each) => each.id === id)

//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found with is ${id}`
//         })
//     }

//     const updatedBook = books.filter((each) => each.id === id)

//     res.status(200).json({
//         success: true,
//         message: "Books deleted successfully",
//         data: updatedBook
//     })
// })



exports.deleteBookById = async(req,res) => {
     const {id} = req.params;
     
     const book = await BookModel.findById(id);

     if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id ${id}`
        })
     }

     await BookModel.findByIdAndDelete(id);

     res.status(200).json({
        success: true,
        message : "Book deleted successfully"
     })
}