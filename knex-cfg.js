module.exports = 
{
    pg: 
    {
        client: "pg",
        connection: 
        {
            host: 'localhost',
            user: 'postgres',
            database: 'book-test-pgadmin',
            password: 'postgrespassword'
        },
        debug: true
    },
    sqlite : 
    {
        client: "sqlite3",
        connection: {
            filename: "./book.sqlite"
        },
        debug: true
    }
};