const express = require("express")
const {users} = require("../data/users.json")
const { getAllUsers, getSingleUserById, addNewUser, updateUserById, deleteUserbyId, getSubscriptionDetailsById } = require("../controllers/user-controller")

const  router = express.Router()
/**
* Route: /user
 * method: GET
 * Decsription: get all the list in the system 
 * Access: Public
 * Parameter: None
 */

// router.get('/',(req,res) =>{
//     res.status(200).json({
//         success: true,
//         data: users
//     })
// })

router.get('/',getAllUsers)

/**
 * Route: /user
 * method: POST
 * Decsription: Create/Register a new user
 * Access: Public
 * Parameter: None
 */

// router.post('/',(req,res)=>{


//     const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
//     if( !id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
//         return res.status(400).json({
//             success: false,
//             message: "Please provide all required field"
//         })
//     }

//     const user = users.find((each)=>each.id === id)
//     if(user){
//         return res.status(409).json({
//             success: false,
//             message: "User already exist."
//         })
//     }

//     users.push({
//         id,
//         name,
//         surname,
//         email,
//         subscriptionType,
//         subscriptionDate
//     })

//     res.status(201).json({
//         success: false,
//         message: "User created successfully"
//     })

// })

router.post('/',addNewUser)



/**
 * Route: /user/:id
 * method: GET
 * Decsription: get a user by the id
 * Access: Public
 * Parameter: id
 */

// router.get('/:id',(req,res)=>{

//     const {id} = req.params;

//     const user = users.find((each)=>each.id === id)

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User Not found for id: ${id}`
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: user
//     })
// })

router.get('/:id',getSingleUserById)


/**
 * Route: /user/:id
 * method: PUT
 * Decsription: Updating a user by thier id
 * Access: Public
 * Parameter: id
 */

// router.put('/:id',(req,res) => {
     
//     const {id} = req.params;
//     const {data} = req.body;

//     // check if the user exits
//     const user = users.find((each)=>each.id === id);
//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message: `User not found for id: ${id}`
//         })
//     }

//     const updatedUser = users.map((each)=>{
       
//         if(each.id === id){
//             return {
//                 ...each,
//                 ...data,
//             }
//         }

//         return each
//     })

//     res.status(200).json({
//         success: true,
//         data: updatedUser,
//         message: "User updated successfully"
//     })

// })

router.put('/:id', updateUserById)

/**
 * Route: /user/:id
 * method: DELETE
 * Decsription: Updating a user by thier id
 * Access: Public
 * Parameter: id
 */

// router.delete('/:id',(req,res) => {
//     const {id} = req.params;

//     // check if the user exits
//     const user = users.find((each) => each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found for id: ${id}`
//         })
//     }


//     // if the user exits, filter it out from the user array
//     const updatedUsers = users.filter((each)=>each.id !== id)

//     res.status(200).json({
//         success: true,
//         data: updatedUsers,
//         message: "User Deleted Successfully"
//     })
// })

router.delete('/:id',deleteUserbyId)


/**
 * Route: /user/subscription-details/:id
 * method: GET
 * Decsription: Get all the user details regarding to subscription
 * Access: Public
 * Parameter: id
 */

// router.get('/subscription-details/:id',(req,res) => {

//     const {id} = req.params;

//     const user = users.find((each) => each.id === id);

//     if(!user){
//         return  res.status(404).json({
//             success: false,
//             message: `User not found for id ${id}`
//         })
//     }
   
//        const getDateInDays = (data = '') => {
//         let date;
//         if(data){
//             date = new Date(data);
//         }else{
//             date = new Date();
//         }
//          let days = Math.floor((date) / (1000*60*60*24))
//          return days;
//        }
//         const subscriptionType = (date) => {
//              if(user.subscriptionType === "Basic"){
//                 date = date + 90;
//              }else if(user.subscriptionType == "Standard"){
//                 date = date + 180;
//              }else if(user.subscriptionType == "Premium"){
//                 date = date + 365;
//              }

//              return date;
//         }


//         // Subscription expiration calculation
//         // jauary 1, 1970 UTC // millisecond

//         let returnDate = getDateInDays(user.returnDate);
//         let currentDate = getDateInDays();
//         let subscriptionDate = getDateInDays(user.subscriptionDate)
//         let subscriptionExpiration = subscriptionType(subscriptionDate)

//         const data = {
//             ...user,
//             subscriptionExpired: subscriptionExpiration < currentDate,
//             subscriptionDaysLeft: subscriptionExpiration - currentDate,
//             daysLeftForExpiration: returnDate - currentDate,
//             returnDate: returnDate < currentDate ? "Book is Overdue" : returnDate,
//             fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
//         }

//         res.status(200).json({
//             success: true,
//             data : data
//         })

        
    


// })

router.get('/subscription-details/:id',getSubscriptionDetailsById)


module.exports = router;

