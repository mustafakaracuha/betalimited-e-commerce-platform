import React from "react";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

function index({ myProducts }) {
 
  const { totalPrice } = useSelector((state) => state.basket);


  return (
    <div className="w-[25rem] max-sm:w-[23rem] fixed bottom-10 max-sm:right-7 h-[10rem] bg-gray-100 rounded-xl flex items-start justify-center">
      <div className="w-full px-5">
        <div className="flex items-center justify-between">
          <p className="text-lg mt-3 mb-1">Total Price</p>
          <p className="text-lg mt-3 mb-1">${totalPrice}</p>
        </div>
        <Divider light />
        <div className="w-full mt-3">
          {myProducts.map(
            (product) =>
              product.quantity >= 1 && (
                <div
                  className="flex items-center justify-between"
                  key={product.id}
                >
                  <p className="w-[20rem] text-md text-gray-500">
                    {product.name}
                  </p>
                  <span>
                    {product.quantity + "X" + "$" + product.price.toFixed(2)}
                  </span>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default index;
