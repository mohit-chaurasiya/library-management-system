const express = require("express");
// const {users} =require("./data/users.json")

const dotenv = require("dotenv")

// import database connection
const DbConnection = require("./databaseConnection")

// importing router
const usersRouter = require("./routes/users")
const booksRouter = require("./routes/books")

dotenv.config();

const app = express();

DbConnection();

const port = 8081;

app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).json({
        message: "Home-page : - )"
    })
})


app.use("/users",usersRouter);
app.use("/books",booksRouter);


// app.all('',(req,res)=>{
//     res.status(500).json({
//         message: "Not Built Yet"
//     })
// })

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
    
})