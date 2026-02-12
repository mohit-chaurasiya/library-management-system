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





