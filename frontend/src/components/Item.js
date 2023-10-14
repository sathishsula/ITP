import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Item() {
  const { referenceNo } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
 

  

  useEffect(() => {
    axios
      .get(`http://localhost:8070/stock/getByRef/${referenceNo}`)
      .then((response) => {
        setItemDetails(response.data.stock);
      })
      .catch((err) => console.log(err));
  }, [referenceNo]);


  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:8070/stock/delete/${referenceNo}`)
        .then(() => {
          alert("Item deleted");
          // Navigate to another route after deletion (e.g., the homepage)
          window.location.href = "/stock";
        })
        .catch((error) => {
          console.error(error);
          alert("Error deleting item. Please try again.");
        });
    }
  };
  

  return (
    <div>
      <h2>Item Details</h2>
      {itemDetails ? (
        <div>
          <p>Product Name: {itemDetails.ProductName}</p>
          <p>Reference No: {itemDetails.ReferenceNo}</p>
          <p>Generic Name: {itemDetails.GenericName}</p>
          <p>Dosage: {itemDetails.Dosage}</p>
          <p>Category: {itemDetails.Category}</p>
          <p>Type: {itemDetails.Type}</p>
          <p>Manufacture Date: {itemDetails.MfgDate}</p>
          <p>Expire Date: {itemDetails.ExpDate}</p>
          <p>Description: {itemDetails.Description}</p>
          <p>Available Quantity: {itemDetails.Quantity}</p>
          <p>Price per unit(Rs): {itemDetails.Price}</p>
          
          
          {itemDetails.Image && (
            <img
              src={`http://localhost:8070/images/${itemDetails.Image}`}
              alt="Item"
              style={{ maxWidth: "100%" }}
            />
          )}


          {/*update button*/}
          <Link to={`/update/${referenceNo}`} className="btn btn-primary">Update</Link> 
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>  
           

        </div>
       
      ) : (
        <p>Loading...</p>
      )}


    </div>
  );
}

export default Item;

