import { useState, useEffect } from "react";
import axios from "axios";
import '../Stock.css';
import { Link } from "react-router-dom";

function Stock(){

    const[items,setItems]= useState([])
    useEffect(()=>{
        axios.get("http://localhost:8070/stock/fields")
        .then((response) => {
            setItems(response.data.items);
        })
            .catch((err) => console.log(err));
    },[])
    console.log(items);

    return(
        <div className="container">
            <h1>Stock</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Reference No</th>
                        <th>Product Name</th>
                        <th>Available Stock</th>
                        <th>Price(Rs)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(item =>(
                            <tr key={item.ReferenceNo}>
                                <td>{item.ReferenceNo}</td>
                                <td>{item.ProductName}</td>
                                <td>{item.Quantity}</td>
                                <td>{item.Price}</td>
                                <td>
                <Link to={`/item/${item.ReferenceNo}`}>View Details</Link>
              </td>
                            
                            </tr>
                        )) 
                    }
                </tbody>
            </table>
        </div>
    )


}

export default Stock;