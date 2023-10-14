import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link,useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Update() {

  const { referenceNo } = useParams();
  const [updatedItem, setUpdatedItem] = useState({});
  const [itemDetails, setItemDetails] = useState({});
  const navigate = useNavigate();

 
  
    useEffect(() => {
        axios
          .get(`http://localhost:8070/stock/getByRef/${referenceNo}`)
          .then((response) => {
            setItemDetails(response.data.stock);
            setUpdatedItem(response.data.stock);
          })
          .catch((err) => console.log(err));
      }, [referenceNo]);

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedItem({
          ...updatedItem,
          [name]:value,
        });
      };

      const handleUpdate = (event) => {
        event.preventDefault();
        
        axios
          .put(`http://localhost:8070/stock/update/${referenceNo}`, updatedItem)
          .then((response) => {
            
            alert("Item updated successfully");
            navigate(`/item/${referenceNo}`);
          })
          .catch((error) => {
            console.error(error);
            alert("Error updating item. Please try again.");
          });
      };

return(
    <div>
        <h2>Update</h2>
        <div className="container">
            <form onSubmit={handleUpdate}>
 <div className="mb-3">
          <label htmlFor="Type" className="form-label">
          Brand Name
          </label>       
          <input
            type="text"
            className="form-control"
            id="ProductName"
            name="ProductName"
            value={updatedItem.ProductName || ""}
            onChange={handleInputChange}
          />
</div>
<div className="mb-3">
          <label htmlFor="Type" className="form-label">
          Generic Name
          </label>
          <input
            type="text"
            className="form-control"
            id="GenericName"
            name="GenericName"
            value={updatedItem.GenericName || ""}
            onChange={handleInputChange}
          />
</div>
<div className="mb-3">
          <label htmlFor="Type" className="form-label">
          Dosage Strength
          </label>
          <input
            type="text"
            className="form-control"
            id="Dosage"
            name="Dosage"
            value={updatedItem.Dosage || ""}
            onChange={handleInputChange}
          />
</div>
<div className="mb-3">
          <label htmlFor="Type" className="form-label">
          Category
          </label>
          <input
            type="text"
            className="form-control"
            id="Category"
            name="Category"
            value={updatedItem.Category || ""}
            onChange={handleInputChange}
            
          />
</div>
<div className="mb-3">
          <label htmlFor="Type" className="form-label">
          Type
          </label>
        <select
            className="form-select"
            id="Type"
            name="Type"
            value={updatedItem.Type || ""}
            onChange={handleInputChange}
          >
              <option value="">Select the type here</option>
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
          <label htmlFor="Type" className="form-label">
          Manufacture Date
          </label>
          <input
            type="Date"
            className="form-control"
            id="MfgDate"
            name="MfgDate"
            value={updatedItem.MfgDate || ""}
            onChange={handleInputChange}
          />
</div>
<div className="mb-3">
          <label htmlFor="Type" className="form-label">
          Expire Date
          </label>
          <input
            type="Date"
            className="form-control"
            id="ExpDate"
            name="ExpDate"
            value={updatedItem.ExpDate || ""}
            onChange={handleInputChange}
          />
</div>
<div className="mb-3">
          <label htmlFor="Type" className="form-label">
          Quantity
          </label>
          <input
            type="Number"
            className="form-control"
            id="Quantity"
            name="Quantity"
            value={updatedItem.Quantity || ""}
            onChange={handleInputChange}
          />
</div>
<div className="mb-3">
          <label htmlFor="Type" className="form-label">
          Unit Price(Rs)
          </label>
          <input
            type="text"
            className="form-control"
            id="Price"
            name="Price"
            min="0" 
            pattern="[0-9]+(\.[0-9]{0,2})?"
            value={updatedItem.Price || ""}
            onChange={handleInputChange}
          />

</div>
<div className="mb-3">
          <label htmlFor="Type" className="form-label">
          description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="Description"
            name="Description"
            value={updatedItem.Description || ""}
            onChange={handleInputChange}
          />
</div>
 

  <button type="submit" className="btn btn-primary">Update</button>
  
</form>
        </div>
          <button onClick={() => navigate(`/item/${referenceNo}`)}>Back</button>
    </div>
);
}
export default Update;