import React, {useState} from  "react";

function CounterFunction(){

    let [number,setNumber] = useState(0)

    function increment(){
        setNumber(++number)
    }

    return(
        <dev>
            <hh3>Functional Component</hh3>
            <h3>Counter={number}</h3>
            <button onClick={e=>increment()}>Increment</button>
        </dev>
    )
}
export default CounterFunction;