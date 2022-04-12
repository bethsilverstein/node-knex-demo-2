var cfg = require("./knex-cfg").sqlite; // either .sqlite or .pg to change which kind of database it is (or others if there are other dbs)
var screen = require("./screen");
var knex = require("knex")(cfg);

//clear();
screen.clear()


//this was me testing stuff
// knex.select("firstname", "lastname").from("author").asCallback(function(err, rows) {
//     if (err) {
//         console.error(err);
//     }
//     else {
//         console.log(rows);
//     }
//     knex.destroy();
//     console.log('done with author query');
// })

//var query = knex.select("title", "rating").from("book");
//var sql = query.toString();
//var sql = query.toSQL();
//screen.write(sql);

knex.select("title", "rating").from("book").asCallback(function(err, rows) {
    if (err) {
        console.error(err);
    }
    else {
        //console.log(rows);
        //screen.write(rows, "json");
        screen.write(rows, "pretty");
    }
    knex.destroy();
    console.log('done with book query');
});

//knex.destroy();
//console.log('doneeee');

// function clear ()
// {
//     process.stdout.write("\033c");
// }


