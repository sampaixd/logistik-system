# Logistik system

## Overview

This is an API projekt from school, demonstrating the implementation of a logistics system using express and node, as well as mongoDB and mongoose

The purpose of this API is to simulate an logistics system for a company. The API keeps track of storages, workers, truckers, customers, shipments, orders, schedules and products. 
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

##### get "/get"
Gets all objects. Possible to filter inserting a object with the route name in json

##### post "/add"
Adds a object to the database. Requires a object of the specified route

##### put "/update"
Updates a object in the database. Takes an "id" objectId and a "newData" object involving the specified data to update as well as the new value. Example for changing a customer email: "newData": {"email": "foo.bar@gmail.com"}

##### delete "/delete"
Deletes a specified object in the database. Requires an "id" objectId

### customer route

##### get "/order/get"
Gets all orders from the customer. Requires a "customer_id" objectId

##### post "/order/place"
Places an order, which then goes through the most advanced algorithm in the codebase to add the order to a shipment. Requires a "order" object, consisting of a "customer_id" objectId, "product_id" objectId and a "amount" number.

##### put "/order/update"
Works as update in shared route functions. uses "order_id" instead of "id". The status of the shipment the order is part of does not affect ability to edit.

#### delete "/order/delete"
Works as delete in shared route functions. uses "order_id" instead of "id". The status of the shipment the order is part of does not affect ability to delete.

### product route

#### get "/stock/get"
Gets all storages with the product in stock, and displays the available stock. Requires a "productId" objectId

### shipment route

#### get "/monthy-sale/get"
Gets the total sales for the specified month, as well as displaying the most expensive order(s). Requires a "monthInt" Number which specifies the month, with January being 0.

#### put "/status/get"
Sets the status of the shipment between "pending", "packaged" and "delivered". Requires a "status" String.

#### get "/pending/get"
Works as get in shared route functions, but only gets the shipments that are pending.

#### get "/packaged/get"
Works as get in shared route functions, but only gets the shipments that are packaged. Also sorts the shipments from oldest to newest.

### storage route

#### put "/worker/asign"
Asigns specified worker to specified storage. Requires a "storage_id" objectId and "worker_id" objectId.

#### put "/worker/relieve"
Relieves specified worker from specified storage. Requires a "storage_id" objectId and "worker_id" objectId.

#### post "/product/add"
Adds specified product to specified storage. Requires "storageId" objectId, "productId" objectId and "stock" Number.

#### put "/product/stock/add"
Adds specified amount of stock to specified product in specified storage. Requires "storageId" objectId, "productId" objectId and "additionalStock" Number.

### trucker route

#### get "/available"
Gets all truckers that does not have a shipment designated that day. Requires a "selectedDay" String, and the string must be one of the weekdays with no capital letters. This function is not really useful, since currently you cannot asign shipments to truckers.

### worker route

#### get "/available"
Same as trucker, read above for information.


## Error messages
Errors are very simple, but might be hard for users to understand at times. Error messages correctly handled will always return with the code 400, as well as a short scentence telling you what kind or error occured. Often the error message will include the error message thrown by the interpeter, however in some instances the error message is fully custom made for the occasion

## possible improvements, missing features and bugs
* Stock will not be subtracted from storages by shipments
* Truckers and workers will not be given assigned shipments
* The function to check if an existing shipment can be edited is outdated and could be changed to look at status instead of shipping date
* The password hashing for customers does not work
* Some functions could be split into smaller functions (SRP)
* There are inconsistencies within variable namings (some use snake case, others use camel case) which could be cleaned up 
* No functions require any kind of authentication. This is especially prevalent for the customer functions, as the only requirement is the customer ID
* Schedule could possibly have used Date instead of String for better time manipulation