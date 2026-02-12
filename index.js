const express = require("express");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).json({
        message: "Home-page : - )"
    })
})

app.all('',(req,res)=>{
    res.status(500).json({
        message: "Not Built Yet"
    })
})

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
    
})