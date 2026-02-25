# library-management-system

  This is a library management system API backend for the management of user and the books

#  Routes and the Endpoint

## /users
GET: get all the list in the system 
POST: Create/Register a new user

## /users/(id)
GET    : Get a a user bu their ID
PUT    : Updating a user by their ID
DELETE : Deleting a user by thier ID (Check if the user still has an issued book ) && (is there any fine/penality to be collected)

## /users/subscription-details/(id)
GET    : Get a user subscription details by their ID
      >> Date of subscriptiom
      >> Valid till ?
      >> Fine if any ?

##  /books
GET : Get all the books in the system
POST  : Add a new book to the system 

## /bookd/(id)
GET : Get a book by its ID
PUT : Update a book bby its ID
DELETE : Delete a book by its ID

## /book/issued
GET : Get all the issued books

## /books/issued/withFine
GET : Get all issued books with their fine amount

### Subscription Types
    >> Basic ( 3 months)
    >> Standard (6 months)
    >> Premium (12 months)
    
    >> If the user missed the renewal date , then user should be collected with $100
    
    >> If the user missed the subscription date , then user is expected to pay with $100

    >>If a user misses both renewal & subscription, then the collected amount should be $200

## Commands:
npm init 
npm i express
npm i nodemon  --save-dev

npm run dev

To restore node module and packag-lock.json --> npm i / npm install 
npm i mongoose
npm install mongodb
npm i dotenv

mongodb+srv://mohitchaurasiya0857:<db_password>@cluster0.gsrrnjf.mongodb.net/?appName=Cluster0


## MVC Architecture 
  
   >> M: Model (Structure of Our MongoDb)
   >> V: View (Frontend)
   >> C: Controllers (Brain / Logic of a route)

### DTO (Data Transfer Object)


