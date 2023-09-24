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

//data read

router.route("/").get((req,res)=>{
    OrderI.find().then((user)=>{
        res.json(user);
    }).catch((error)=>{
        console.log(error)
    })
});

//data update
router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {order_id,supplier,date,destination,quantity} = req.body;

    const updateUser = {
        order_id,supplier,date,destination,quantity
    }
    const update = await OrderI.findByIdAndUpdate(userID,updateUser).then(()=>{
        res.status(200).send({status:"Inventory update"});
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({status:"error updating data!", error:error.message});
    });
});
