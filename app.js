var cfg = require("./knex-cfg").pg;

var knex = require("knex")(cfg);

//clear();

knex.select("firstname", "lastname").from("author").asCallback(function(err, rows) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(rows);
    }
    knex.destroy();
    console.log('done with author query');
})


knex.select("title", "rating").from("book").asCallback(function(err, rows) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(rows);
    }
    knex.destroy();
    console.log('done with book query');
});

//knex.destroy();
//console.log('doneeee');

function clear ()
{
    process.stdout.write("\033c");
}


