process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const ExpressError = require("../expressError")

let testBook;
let testBookISBN;

beforeEach(async () => {
    await db.query("DELETE FROM books");
    const result = await db.query(`
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
        2017)
      RETURNING isbn, amazon_url, author, language, pages, publisher, title, year`);
  testBook = result.rows[0];
  testBookISBN = result.rows[0].isbn;
});

describe("GET /books", () => {
    test("Gets a list of books but returning just 1 book", async () => {
        const response = await request(app).get(`/books`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({books: [testBook]});
        expect(response.body.books).toHaveLength(1);
        expect(response.body.books[0]).toHaveProperty("isbn");        
    });
});

describe("GET /books/:isbn", () => {
    test("Get information for one book", async  () => {        
        const response = await request(app).get(`/books/${testBookISBN}`);        
        expect(response.statusCode).toEqual(200);        
        expect(response.body.book.isbn).toBe(testBookISBN);
    });
    test("Display error message if book is not found", async  () => {        
        const response = await request(app).get(`/books/0`);
        expect(response.statusCode).toEqual(404);        
    });

});

describe("POST /books", () => {
    test("Add a book", async () => {
        const response = await request(app).post(`/books`)
        .send({
            isbn: '0691161519',
            amazon_url: "http://a.co/eobPtX2",
            author: "Matthew Lane",
            language: "english",
            pages: 999,
            publisher: "Princeton University Press",
            title: "Power-Up",
            year: 2022            
        });
        expect(response.statusCode).toEqual(201);
        expect(response.body.book).toHaveProperty("isbn");        
    });

    test("Display error message if required information is missing", async  () => {                
        const response = await request(app).post(`/books`)
        .send({
            isbn: '0691161529'                
        });
        expect(response.statusCode).toEqual(400);
    });
});

describe("PUT /books/:isbn", () => {
    test("Update a book", async () => {
        const response = await request(app).put(`/books/${testBookISBN}`)
        .send({
            amazon_url: "http://a.co/eobPtX2",
            author: "Matthew Lane, Jr.",
            language: "english",
            pages: 999,
            publisher: "Princeton University Press",
            title: "Power-Up for Kids",
            year: 2022            
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.book.isbn).toBe(testBookISBN);
        expect(response.body.book.title).toContain("Power-Up for Kids");
    });

});

describe("DELETE /books/:isbn", () => {
test("Delete a book", async  () => {
    const response = await request(app).delete(`/books/${testBookISBN}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({message: "Book deleted"});    
});
});

afterEach(async () => {
    await db.query(`DELETE FROM books`)
})
  
// close db connection
afterAll(async () => {  
    await db.end();
});
