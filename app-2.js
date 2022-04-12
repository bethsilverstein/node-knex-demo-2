var cfg = require("./knex-cfg").sqlite;
var screen = require("./screen");
var knex = require("knex")(cfg);

screen.clear();

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

// example where select has array parameter (and uses aliases)
knex.table("book").column(["title", "rating"]).then(function(rows) { // can use column and table as aliases for select and from respectively
    screen.write(rows);
})
.catch(function(err) {
    screen.write("Oops!!!");
    screen.write(err);
})
.finally(function() {
    knex.destroy();
});



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