const router =require("express").Router();
let inventory=require("../models/inventory");

//add

http://localhost:8070/stock/add
router.route("/add").post((req,res)=>{

    const ProductName = req.body.ProductName;
    const GenericName = req.body.GenericName;
    const Dosage=req.body.Dosage;
    const ReferenceNo =Number(req.body.ReferenceNo);
    const Category =req.body.Category;
    const Type = req.body.Type;
    const MfgDate =req.body.MfgDate;
    const ExpDate = req.body.ExpDate;
    const Description = req.body.Description;
    const Quantity =req.body.Quantity;
    const Price=req.body.Price;
    const Image = req.body.Image;

    const newInventory= new inventory({
        ProductName,
        GenericName,
        Dosage,
        ReferenceNo,
        Category,
        Type,
        MfgDate: new Date(dateString),
        ExpDate,
        Description,
        Quantity,
        Price,
        Image
    })

    newInventory.save().then(()=>{
        res.json("Item added")
    }).catch((err)=>{
        console.log(err);
    })

})

//fetch
http://localhost:8070/stock/
router.route("/").get((req,res)=>{

    inventory.find().then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err)
    })

})

//update
http://localhost:8070/stock/update/6509d95e5f350c5fdfa76eb6
router.route("/update/:id").put(async(req,res)=>{
    let itemId = req.params.id;

    const{
        ProductName,
        GenericName,
        Dosage,
        ReferenceNo,
        Category,
        Type,
        MfgDate,
        ExpDate,
        Description,
        Quantity,
        Price,
        Image
    } = req.body;
    
    const updateItem= {
        ProductName,
        GenericName,
        Dosage,
        ReferenceNo,
        Category,
        Type,
        MfgDate,
        ExpDate,
        Description,
        Quantity,
        Price,
        Image
    }
    const update = await inventory.findByIdAndUpdate(itemId, updateItem).then(()=>{
        res.status(200).send({status: "updated successfully"})
    }).catch ((error)=>{
        console.log(error);
        res.status(500).send({status:"update error"})
    })

})

//delete
http://lacalhost:8070/stock/delete/6509d95e5f350c5fdfa76eb6
router.route("/delete/:id").delete(async(req,res)=>{
    let itemId = req.params.id;

    await inventory.findByIdAndDelete(itemId).then(()=>{
        res.status(200).send({ststus:"Deleted Successfully"})
    }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status:"Error Delete"})
    })
})

//get a one item details
router.route("/getByName/:name").get(async(req,res)=>{
    let productName=req.params.name;
    await inventory.findOne({ProductName: productName}).then((stock)=>{
        res.status(200).send({status:"Item fetched",stock})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get Item"});
    })
})

//for a search bar
router.route("/search").get(async (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request query parameters
  
    try {
      const items = await inventory.find({
        $or: [
          { ProductName: { $regex: searchQuery, $options: "i" } }, // 
          { Category: { $regex: searchQuery, $options: "i" } }, 
        ],
      });
  
      res.status(200).json({ status: "Items found", items });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error searching items" });
    }
  });

  //fetch specific fields
router.route("/fields").get(async (req, res) => {
    try {
     
      const fieldsToRetrieve = ["ProductName", "ReferenceNo", "Quantity", "Price"];
  
      
      const items = await inventory.find({}, fieldsToRetrieve);
  
      res.status(200).json({ status: "Items found", items });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error fetching items" });
    }
  });
  

module.exports = router;
