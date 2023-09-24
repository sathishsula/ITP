const router = require ("express").Router();
//const user = require("../models/user.js");
let Inventory = require("../models/Inventory.js");


//data insert

router.route("/add").post((req,res)=>{
    const item_id = req.body.item_id;
    const item_name = req.body.item_name;
    const category = req.body.category;
    const quantity = Number(req.body.quantity);

    const newInventory = new Inventory({
        item_id,
        item_name,
        category,
        quantity
    })
  
      
    newInventory.save().then(()=>{
        res.json("Data is saved by the db");
    }).catch((error)=>{
        console.log(error);
    })
});

//data read
