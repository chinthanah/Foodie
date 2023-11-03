import React, { useEffect, useState, useRef } from "react";
import { useCart, useDispatchCart, createContext } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem" }}>
        <img
          src={props.foodItems.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>

          <div className="container">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(parseInt(e.target.value, 10))}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
          </div>
          <hr></hr>
          <div
            className="btn bg-black text-white my-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
