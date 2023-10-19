var mysql = require('mysql2')

var con = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database: 'NW_discord_bot_db',
    });
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE IF NOT EXISTS NW_discord_bot_db", function (err, result) {
        if (err) throw err;
        console.log("Database OK");
    });
    var sql = "CREATE TABLE IF NOT EXISTS product (barcode_ID VARCHAR(65) UNIQUE, product_name VARCHAR(65),price INT,editer VARCHAR(128))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table OK");
    });
});

async function InsertData(barcode_id,product_name,price,editer,interaction)
{
    con.query(`SELECT * FROM product WHERE barcode_ID = '${barcode_id}'`, function (err, result) {
        if (err)
        {
            interaction.reply("Error")
            throw err;
        }
        if (result == false)
        {
            var sql = `INSERT INTO product (barcode_ID, product_name , price , editer) VALUES ('${barcode_id}', '${product_name}','${price}','${editer}')`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(`inserted ('${barcode_id}', '${product_name}','${price}','${editer}')`);
                interaction.reply(`BarcodeID : ${barcode_id} \nName : ${product_name} \nPrice : ${price} \nEditer : ${editer}`);
            });
        }
        else
        {
            interaction.reply("barcode_ID has been used")
        }
    })
}

async function EditPrice(barcode_id,price,editer,interaction)
{
    con.query(`SELECT * FROM product WHERE barcode_ID = '${barcode_id}'`, function (err, result) {
        if (err)
        {
            interaction.reply("Error")
            throw err;
        }
        if (result == false)
        {
            interaction.reply("Not Found Data")
        }
        else
        {
            var sql = `UPDATE product SET price = ${price} , editer = '${editer}' WHERE barcode_ID = '${barcode_id}'`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(`edit ('${barcode_id}','${price}','${editer}')`);
            });
            interaction.reply(`${editer} Edit "${barcode_id}"`)
        }
    })
}
async function EditName(barcode_id,product_name,editer,interaction)
{
    con.query(`SELECT * FROM product WHERE barcode_ID = '${barcode_id}'`, function (err, result) {
        if (err)
        {
            interaction.reply("Error")
            throw err;
        }
        if (result == false)
        {
            interaction.reply("Not Found Data")
        }
        else
        {
            var sql = `UPDATE product SET product_name = '${product_name}' , editer = '${editer}' WHERE barcode_ID = '${barcode_id}'`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(`edit ('${barcode_id}', '${product_name}','${editer}')`);
            });
            interaction.reply(`${editer} Edit "${barcode_id}"`)
        }
    })
}
async function DeleteData(barcode_id,editer,interaction)
{
    con.query(`SELECT * FROM product WHERE barcode_ID = '${barcode_id}'`, function (err, result) {
        if (err)
        {
            interaction.reply("Error")
            throw err;
        }
        if (result == false)
        {
            interaction.reply("Not Found Data")
        }
        else
        {
            var sql = `DELETE FROM product WHERE barcode_ID = '${barcode_id}'`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(`Delete ('${barcode_id}')`);
            });
            interaction.reply(`${editer} delete "${barcode_id}"`)
        }
    })
}

async function GetProductFromID(id,res)
{
    con.query(`SELECT * FROM product WHERE barcode_ID = '${id}'`, function (err, result) {
        if (err)
        {
            res.write("Error");
            res.end()
            throw err;
        }
        if (result == false)
        {
            res.write("Not Found");
            res.end()
        }
        else
        {
            console.log(result);
            console.log(result[0]['price']);
            var str = `${result[0]['price'].toString()}\n${result[0]['product_name'].toString()}`
            res.write(str);
            //res.write(":");
            //res.write(result[0]['product_name'].toString());
            res.end()
        }
    })
}

module.exports = 
{
    GetProductFromID,
    InsertData,
    EditName,
    EditPrice,
    DeleteData,
}