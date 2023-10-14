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
        MfgDate,
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

// Update by ReferenceNo
router.route("/update/:referenceNo").put(async (req, res) => {
    const referenceNo = req.params.referenceNo;
  
    const {
      ProductName,
      GenericName,
      Dosage,
      Category,
      Type,
      MfgDate,
      ExpDate,
      Description,
      Quantity,
      Price,
      Image,
    } = req.body;
  
    const updateItem = {
      ProductName,
      GenericName,
      Dosage,
      Category,
      Type,
      MfgDate,
      ExpDate,
      Description,
      Quantity,
      Price,
      Image,
    };
  
    try {
      const updatedItem = await inventory.findOneAndUpdate(
        { ReferenceNo: referenceNo }, // Use ReferenceNo for matching
        updateItem,
        { new: true } // To return the updated document
      );
  
      if (!updatedItem) {
        return res.status(404).send({ status: "Item not found" });
      }
  
      console.log("Item updated successfully:", updatedItem);
      res.status(200).send({ status: "updated successfully", updatedItem });
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).send({ status: "update error" });
    }
  });
  

// DELETE
router.delete("/delete/:referenceNo", async (req, res) => {
    const referenceNo = req.params.referenceNo;
  
    try {
      // Find the item by referenceNo and delete it
      await inventory.findOneAndDelete({ ReferenceNo: referenceNo });
  
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting item" });
    }
  });


//get a one item details
router.route("/getByRef/:referenceNo").get(async(req,res)=>{
    let ReferenceNo=req.params.referenceNo;
    await inventory.findOne({ReferenceNo: ReferenceNo}).then((stock)=>{
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
