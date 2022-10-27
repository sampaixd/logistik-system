# Logistik system

## Overview

This is an API projekt from school, demonstrating the implementation of a logistics system using express as well as mongoDB and mongoose

### Files and their purpose:

controllers - The processes working with the database
error - custom made errors
routes - communication between server and client
schema - database schemas
src - connects all routes, opens connection to localhost and database

The files are named after the different components and mostly work only with that component, however there are instances where for example storage works with shipments.

### The following objects have routes you can interact with

customer
product
shipment
storage
trucker
worker

## Routes function and simple description
(remember to insert "/{routeName}" in order to use that specific route)

### shared route functions

###### get "/get"
Gets all objects. Possible to filter inserting a object with the route name in json

###### post "/add"
Adds a object to the database. Requires a object of the specified route

###### put "/update"
Updates a object in the database. Takes an "id" objectId and a "newData" object involving the specified data to update as well as the new value. Example for changing a customer email: "newData": {"email": "foo.bar@gmail.com"}

###### delete "/delete"
Deletes a specified object in the database. Requires an "id" objectId

### customer route

###### get "/getOrders"
Gets all orders from the customer. Requires a "customer_id" objectId

###### post "/placeOrder"
Places an order, which then goes through the most advanced algorithm in the codebase to add the order to a shipment. Requires a "order" object, consisting of a "customer_id" objectId, "product_id" objectId and a "amount" number.

###### put "/updateOrder"
Works as update in shared route functions. uses "order_id" instead of "id". The status of the shipment the order is part of does not affect ability to edit.



