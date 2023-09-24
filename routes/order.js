const router = require ("express").Router();
let OrderI = require("../models/Order.js");


//data insert

router.route("/add").post((req,res)=>{
    const order_id = req.body.order_id;
    const supplier = req.body.supplier;
    const date = req.body.date;
    const destination = req.body.destination;
    const quantity = Number(req.body.quantity);

    const newOrderI = new OrderI({
        order_id,
        supplier,
        date,
        destination,
        quantity
    })
  
      
    newOrderI.save().then(()=>{
        res.json("Data is saved by the db");
    }).catch((error)=>{
        console.log(error);
    })
});
