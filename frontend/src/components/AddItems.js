import React,{useState} from "react";
import axios from "axios";
import '../App.css';

function AddItems(){


  const [ProductName,setBName]=useState("");
  const [GenericName,setGName]=useState("");
  const [Dosage,setDos]=useState("");
  const [ReferenceNo,setRefNo]=useState("");
  const [MfgDate,setMfgDate]=useState("");
  const [ExpDate,setExpDate]=useState("");
  const [Quantity,setQuantity]=useState("");
  const [Price,setPrice]=useState("");
  const [Category,setCategory]=useState("");
  const [Type,setType]=useState("");
  const [Description,setDescription]=useState("");
  const [Image,setImage]=useState("");


  

  const [isReferenceNoUnique, setIsReferenceNoUnique] = useState(true);

  const sendData = (event) => {
    event.preventDefault();

    if (isReferenceNoUnique) {
      const newItem = {
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
        Image,
      };
      if (!isReferenceNoUnique) {
        alert("Reference Number is not unique. Please enter a unique reference number.");
        return;
      }

      axios
        .post("http://localhost:8070/stock/add", newItem)
        .then(() => {
          alert("Item added");
         
        })
        .catch((error) => {
          console.error(error);
          alert("Error adding item. Please try again.");
        });
    } else {
      alert("Reference Number is not unique. Please enter a unique reference number.");
    }
  };

  //  check reference number unique
  const checkReferenceNoUniqueness = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/check-reference-no/${ReferenceNo}`
      );

      // If the response indicates that the reference number is unique
      if (response.data.isUnique) {
        setIsReferenceNoUnique(true);
      } else {
        setIsReferenceNoUnique(false);
        alert("Reference Number already exists!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  

    return(
        <div className="container">
            <form onSubmit={sendData}>
              <h2>Enter Item Details</h2>
  <div className="mb-3">
    <label for="Bname" className="form-label">Brand Name</label>
    <input type="text" className="form-control" id="name" placeholder="Enter Brand Name" required
    onChange={(event)=>{
      setBName(event.target.value);
    }}/>
  </div>

  <div className="mb-3">
    <label for="Gname" className="form-label">Generic Name</label>
    <input type="text" className="form-control" id="name" placeholder="Enter Generic Name" 
    onChange={(event)=>{
      setGName(event.target.value);
    }}/>
    </div>

    <div className="mb-3">
    <label for="Bname" className="form-label">Dosage Strength</label>
    <input type="text" className="form-control" id="dosage"
    onChange={(event)=>{
      setDos(event.target.value);
    }}/>

  </div>
  <div className="mb-3">
    <label for="refNumber" className="form-label">Reference Number</label>
    <input type="Number" className="form-control" id="RefNumber" placeholder="Enter Reference Number" min="1" required
    onChange={(event)=>{
      setRefNo(event.target.value);
    }}  onBlur={checkReferenceNoUniqueness}/>
  </div>

  <div className="mb-3">
    <label for="mfgdate" className="form-label">Manufacture Date</label>
    <input type="Date" className="form-control" id="Date" 
    onChange={(event)=>{
      setMfgDate(event.target.value);
    }}/>
  </div>

  <div className="mb-3">
    <label for="expdate" className="form-label">Expire Date</label>
    <input type="Date" className="form-control" id="Date"
    onChange={(event)=>{
      setExpDate(event.target.value);
    }} />
  </div>

  <div className="mb-3">
    <label for="quantity" className="form-label">Quantity</label>
    <input type="Number" className="form-control" id="Qnt" pattern="[0-9]+" min="0" required
    onChange={(event)=>{
      setQuantity(event.target.value);
    }}/>
  </div>

  <div className="mb-3">
    <label for="refNumber" className="form-label">Unit Price(Rs)</label>
    <input type="text" className="form-control" id="price"  min="0" pattern="[0-9]+(\.[0-9]{0,2})?" required
    onChange={(event)=>{
      setPrice(event.target.value);
    }}/>
    </div>

  <div className="mb-3">
    <label for="category" className="form-label">Category</label>
    <input type="text" className="form-control" id="category" 
    onChange={(event)=>{
      setCategory(event.target.value);
    }}/>
  </div>

  <div>
  <label for="type" className="form-label">Type</label>
  <select className="form-select" aria-label="Default select example" required
   onChange={(event)=>{
    setType(event.target.value);
  }}>
  <option selected>Select the type here</option>
  <option value="1">Tablet</option>
  <option value="2">Capsule</option>
  <option value="3">Syrup</option>
  <option value="4">Inhalers</option>
  <option value="5">Drops</option>
  <option value="6">Tubes</option>
  <option value="7">Other</option>
  <option value="8"></option>
</select>
</div>

<div className="mb-3">
  <label for="FormControlTextarea1" className="form-label">Add a description</label>
  <textarea className="form-control" id="FormControlTextarea1" rows="3"
   onChange={(event)=>{
    setDescription(event.target.value);
  }}></textarea>
</div>

<div className="mb-3">
  <label for="image" className="form-label">Add a Image</label>
  <input className="form-control" type="file" id="image" accept=".jpg, .jpeg, .png"
   onChange={(event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(""); // Clear the image if no file is selected
    }
  }}/>
</div>

 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )

}
export default AddItems;