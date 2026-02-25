const {UserModel, BookModel} = require('../models');
const { rawListeners } = require('../models/user-models');



//  ====================================================
// router.get('/',(req,res) =>{
//     res.status(200).json({
//         success: true,
//         data: users
//     })
// })
exports.getAllUsers = async (req,res) => {
    const users = await UserModel.find();

    if(!users || users.length === 0){
        return res.status(404).json({
            success: false,
            message: "No user found"
        })
    }

    res.status(200).json({
        success: true,
        data : users
    })
}


// =====================================================


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

exports.getSingleUserById = async (req,res) => {

    const {id} = req.params;

    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message : `No user foun with the is ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data : user
    })
}

// ===============================================

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


exports.addNewUser = async (req,res) => {
    
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message :"Please provide all the details"
        })
    }

    await UserModel.create(data);

    const allUser = await UserModel.find();

    res.status(201).json({
        success: true,
        message : "User added Successfully",
        data: allUser

    })

}

// ==================================================================

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


exports.updateUserById = async (req,res) => {
      const {id} = req.params;
      const {data} = req.body;

      if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide all the details"
        })
      }

      const updateUser = await UserModel.findOneAndUpdate(
        {_id : id},
        data,
        {new : true}
      )

      if(!updateUser){
        return res.status(404).json({
            success : false,
            message : `User not found with the id ${id}`
        })
      }

      res.status(200).json({
        success : true,
        message : "User updated successfully",
        data : updateUser
      })
}
// ===================================================================

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

exports.deleteUserbyId = async (req,res) => {
    const {id} = req.params;

    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success : false,
            message : `User not found with the id ${id}`
        })
    }

    await UserModel.findByIdAndUpdate(id);

    res.status(200).json({
        success: true,
        message : "User deleted Successfully"
    })
}

// ===================================================================

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



exports.getSubscriptionDetailsById = async (req, res) => {
      const {id} = req.params;

      const user = await UserModel.findById(id);

      if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found with the id ${id}`
        })
      }

      
       const getDateInDays = (data = '') => {
        let date;
        if(data){
            date = new Date(data);
        }else{
            date = new Date();
        }
         let days = Math.floor((date) / (1000*60*60*24))
         return days;
       }
        const subscriptionType = (date) => {
             if(user.subscriptionType === "Basic"){
                date = date + 90;
             }else if(user.subscriptionType == "Standard"){
                date = date + 180;
             }else if(user.subscriptionType == "Premium"){
                date = date + 365;
             }

             return date;
        }
        // Subscription expiration calculation
        // jauary 1, 1970 UTC // millisecond

        let returnDate = getDateInDays(user.returnDate);
        let currentDate = getDateInDays();
        let subscriptionDate = getDateInDays(user.subscriptionDate)
        let subscriptionExpiration = subscriptionType(subscriptionDate)

        const data = {
            ...user,
            subscriptionExpired: subscriptionExpiration < currentDate,
            subscriptionDaysLeft: subscriptionExpiration - currentDate,
            daysLeftForExpiration: returnDate - currentDate,
            returnDate: returnDate < currentDate ? "Book is Overdue" : returnDate,
            fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
        }

        res.status(200).json({
            success: true,
            data : data
        })


}