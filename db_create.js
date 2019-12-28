require('dotenv').config();
const databaseStuff = require('./custom_modules/databaseStuff.js');
const {Client} = require('pg');

dbConf = databaseStuff.getDbConfig();
CreateDB();



async function CreateDB(){
    let continueFlag = true;

    let client = new Client({
        host: dbConf.host,
        port: dbConf.port,
        user: dbConf.user,
        password: dbConf.password,
        database: 'postgres',
    });
  
    console.log(`Connecting to database 'postgres' @${dbConf.host}:${dbConf.port} with user '${dbConf.user}'`);
    
    await client.connect()
        .then((res) => {
            console.log("Connected");
        })
        .catch((err) => {
            console.log(`Error connecting to database, aborting`);  
            continueFlag = false;
        });

    if(continueFlag === false){
        return;
    }


    console.log(`Creating database ${dbConf.database}`);

    await client.query(`
            CREATE DATABASE "${dbConf.database}"
            WITH 
            OWNER = ${dbConf.user}
            ENCODING = 'UTF8'
            LC_COLLATE = 'en_US.utf8'
            LC_CTYPE = 'en_US.utf8'
            TABLESPACE = pg_default
            CONNECTION LIMIT = -1;`)
        .then((res) => {
            console.log("Database created");
        })
        .catch( (err) => {
            console.log("Error creating database - maybe it already exists?");
            continueFlag = false;
        })

    if(continueFlag === false){
        client.end();
        return;
    }

    console.log("Disconnecting from db 'postgres");
    console.log(`Connecting to database '${dbConf.database}' @${dbConf.host}:${dbConf.port} with user '${dbConf.user}'`);
    client = new Client({
        host: dbConf.host,
        port: dbConf.port,
        user: dbConf.user,
        password: dbConf.password,
        database: dbConf.database,
    });    

    await client.connect()
        .then((res) => {
            console.log("Connected");
        })
        .catch((err) => {
            console.log(`Error connecting to database, aborting`);  
            continueFlag = false;
        });
    if(continueFlag === false){
        return;
    }

    console.log(`Creating users table '${dbConf.Tables.Users}'`);
    await client.query(
        `CREATE TABLE ${dbConf.Tables.Users}(
            uid serial NOT NULL PRIMARY KEY,
            uname text NOT NULL UNIQUE,
            upassword text NOT NULL)`)
        .then((res) => {
            console.log("Table created");
        })    
        .catch((err) => {
            console.log("Error creating users table - maybe it already exists?");
            continueFlag = false;
        });
    if(continueFlag === false){
        client.end();
        return;
    }

    console.log(`Creating todos table '${dbConf.Tables.Todos}'`);
    await client.query(`
        CREATE TABLE public.todos_t(
            itemuid serial NOT NULL PRIMARY KEY,
            itemuser serial NOT NULL,
            itemtitle text,
            itemdescription text,
            itemurgent boolean
        )`)
        .then((res) => {
            console.log("Table created");
        })    
        .catch((err) => {
            console.log("Error creating todos table - maybe it already exists?");
            continueFlag = false;
        });
    if(continueFlag === false){
        client.end();
        return;
    }

    console.log(`Creating test user 'testuser'`);
    await client.query(`
            INSERT INTO public.users_t (uname, upassword)
            VALUES ('testuser', 'testpassword'
        )`)
        .then((res) => {
            console.log("User created");
        })
        .catch ((err) => {
            console.log("Error creating user - maybe it already exists?");
            continueFlag = false;
        });
    if(continueFlag === false){
        client.end();
        return;
    }    

    console.log(`Adding new todo item for user 'testuser'`);
    await client.query(`
            INSERT INTO public.todos_t (itemuser, itemtitle, itemdescription, itemurgent) 
            VALUES ((SELECT users_t.uid FROM users_t WHERE uname LIKE 'testuser'), 'new testuser thing to do', 'desc', false)
        `)
        .then((res) => {
            console.log("Item added");
        })
        .catch((err) => {
            console.log("Error adding new item");
            continueFlag = false;
        })
    if(continueFlag === false){
        client.end();
        return;
    }   
    
    console.log(`Checking if everything is ok - querying for todo item for user 'testuser'`);
    let response = await client.query(`
            SELECT todos_t.itemtitle, todos_t.itemdescription, todos_t.itemurgent 
            FROM public.todos_t
            INNER JOIN public.users_t ON public.users_t.uid=public.todos_t.itemuser
            WHERE users_t.uname LIKE 'testuser'    
        `)
        .then((res) => {
            if(res.rowCount === 1){
                console.log("Everything seems OK");
            }else{
                throw("test select query failed");
            }
        })
        .catch((err) => {
            console.log("Error - something was wrong");
            continueFlag = false;
        });
    if(continueFlag === false){
        client.end();
        return;
    }  

    client.end();
    console.log("DONE");
    process.exit();
}

