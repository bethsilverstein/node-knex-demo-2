var cfg = require("./knex-cfg").sqlite;
var screen = require("./screen");
var knex = require("knex")(cfg);

screen.clear();

knex.select("title", "rating").from("book").then(function(rows) { // change 'book' to 'boo' or something that doesn't exist to test .catch
    screen.write(rows);
})
.catch(function(err) {
    screen.write("Oops!!!");
    screen.write(err);
})
.finally(function() {
    knex.destroy();
});