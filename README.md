# Express Bookstore

For this exercise, you will build an express.js application that validates a resource and then add tests to the application.
Getting started

You will be adding validation to an application that stores one resource, books. Here is an example of what a book object should look like:

```
{
  "isbn": "0691161518",
  "amazon_url": "http://a.co/eobPtX2",
  "author": "Matthew Lane",
  "language": "english",
  "pages": 264,
  "publisher": "Princeton University Press",
  "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
  "year": 2017
}
```

Your application currently consists of the following routes:

GET /books
Responds with a list of all the books
POST /books
Creates a book and responds with the newly created book
GET /books/[isbn]
Responds with a single book found by its isbn
PUT /books/[isbn]
Updates a book and responds with the updated book
DELETE /books/[isbn]
Deletes a book and responds with a message of “Book deleted”

## Part One - Getting Started + Adding Validation

Before you get started, read through the code to make sure you understand what’s going on here.

Create your database and then run the data.sql file. You can find the database name in the config.js file.

Use JSONSchema to validate the creation and updating of your books! Display an error message containing all of the validation errors if book creation or updating fails.

## Part Two - Add Tests

Add integration tests for each of your routes to make sure that the response expected is sent.

Think about certain edge cases for each of these routes and add tests for things like invalid input to make sure your schema validation is correct.

Also make sure to set process.env.NODE_ENV = “test” inside of your test file.

## Notes on the solution

- mkdir express_bookstore
- cd express_bookstore
- git init
- add node_modules to .gitignore

- copy files from exercise download
- add to data.sql:

```
DROP DATABASE IF EXISTS books;
CREATE DATABASE books;
\c books
```

- psql < data.sql
- psql books

- npm install // will install everything from package.json

- check in package.json for:

```
"main": "server.js",
"start": "node server.js"
like this:
{
"name": "bookstore-solution",
"version": "1.0.0",
"main": "server.js",
 "scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node server.js"
},
```

- check versions
- nodemon -v
- jest --version

- Start the server with nodemon
- use insomnia so submit GET/POST/PUT/DELETE to http://localhost:3000
- for example: GET to http://localhost:3000/books will display a list of all books in the db

### To add a book to the books table with psql books

```
$ psql books
books=#
    INSERT INTO
     books (isbn,
       amazon_url,
       author,
       language,
       pages,
       publisher,
       title,
       year)
       VALUES ('0691161518',
       'http://a.co/eobPtX2',
       'Matthew Lane',
       'english',
       264,
       'Princeton University Press',
       'Power-Up: Unlocking the Hidden Mathematics in Video Games',
       2017);
```

- git add .
- git commit -m "commit message"
- git push
