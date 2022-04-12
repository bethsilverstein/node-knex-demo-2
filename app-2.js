var cfg = require("./knex-cfg").pg;
var screen = require("./screen");
var knex = require("knex")(cfg);

//screen.clear();

var author_id = 1;
var query1 = knex("book").column(["title", "rating"]);
var query2 = knex("book").select(knex.raw("COUNT(*) AS BookCount")); // example of raw()
var query3 = knex.raw("SELECT * FROM book where author_id = 1");
var query4 = knex.raw("SELECT * FROM book where author_id = ?", [author_id]);
var query5 = knex("book").column("title", "rating").orderBy("title", "desc");
var query6 = knex("book").column("title", "rating").orderBy("id").limit(2);
var query7 = knex("book").column("title", "rating").orderBy("id").limit(2).offset(2);
var query8 = knex("book").min("rating as lowScore");
var query9 = knex("book").select("author_id").min("rating as lowScore").groupBy("author_id");
var query10 = knex("author").where({"firstname": "Mark", "lastname": "Twain"});
var query11 = knex("author").where("id", 1);
var query12 = knex("author").where("id", "<>", 1); // '<>' means 'not equal to' apparently
var query13 = knex("author").where("id", "in", [1, 2, 3]);
var subquery = knex("author").select("id").where("id", ">", 1);
var query14 = knex("author").where("id", "in", subquery);

var query15 = knex("author").where(function() {
    this.where("id", 1).orWhere("id", ">", 3);
});

var query16 = knex("author").where(function() {
    this.where("id", 1).orWhere("id", ">", 3);
}).orWhere({firstname: "Mark"});

var query17 = knex("book").whereExists(function() {
    this.from("author").whereRaw("1=1"); // always true
});

var query18 = knex("book").join("author", "author.id", "=", "book.author_id").select("author.firstname", "author.lastname", "book.title");

var query19 = knex("book").join("author", function() {
    this.on("author.id", "=", "book.author_id").orOn("x", "=", "y"); // won't work bc x and y are just examples
}).select("author.firstname", "author.lastname", "book.title");

run (query18, "pretty");

function run(knexQuery, mode) {
    return knexQuery.then(function(rows) {
        screen.write(rows);
    })
    .catch(function(err) {
        screen.write("Oops!!!");
        screen.write(err);
    })
    .finally(function() {
        knex.destroy();
    });
}




// original example
// knex.select("title", "rating").from("book").then(function(rows) { // change 'book' to 'boo' or something that doesn't exist to test .catch
//     screen.write(rows);
// })
// .catch(function(err) {
//     screen.write("Oops!!!");
//     screen.write(err);
// })
// .finally(function() {
//     knex.destroy();
// });



// example where from and select are switched
// knex.from("book").select("title", "rating").then(function(rows) {
//     screen.write(rows);
// })
// .catch(function(err) {
//     screen.write("Oops!!!");
//     screen.write(err);
// })
// .finally(function() {
//     knex.destroy();
// });


// // example where select has array parameter (and uses aliases)
// knex.table("book").column(["title", "rating"]).then(function(rows) { // can use column and table as aliases for select and from respectively
//     screen.write(rows);
// })
// .catch(function(err) {
//     screen.write("Oops!!!");
//     screen.write(err);
// })
// .finally(function() {
//     knex.destroy();
// });