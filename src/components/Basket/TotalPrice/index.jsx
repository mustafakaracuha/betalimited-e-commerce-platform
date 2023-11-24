import React from "react";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyProducts,
  getTotalPrice,
} from "../../../store/features/basket/basketSlice";

function index() {
  const dispatch = useDispatch();
  const { myProducts, totalPrice } = useSelector((state) => state.basket);

  const calculateTotalPrice = (products) => {
    return products?.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  useEffect(() => {
    getMyBasketProduct();
  }, []);

  const getMyBasketProduct = () => {
    dispatch(getMyProducts())
      .unwrap()
      .then((oResult) => {
        if (oResult) {
          let totalPrice = calculateTotalPrice(oResult);
          dispatch(getTotalPrice(totalPrice.toFixed(2)));
        }
      })
      .catch((oError) => {
        console.log(oError);
      });
  };

  return (
    <div className="w-[25rem] max-sm:w-[23rem] fixed bottom-10 max-sm:right-7 h-[10rem] bg-gray-100 rounded-xl flex items-start justify-center">
      <div className="w-full px-5">
        <div className="flex items-center justify-between">
          <p className="text-lg mt-3 mb-1">Total Price</p>
          <p className="text-lg mt-3 mb-1">${totalPrice}</p>
        </div>
        <Divider light />
        <div className="w-full mt-3">
          {myProducts.map((product) => (
            <div className="flex items-center justify-between" key={product.id}>
              <p className="w-[20rem] text-md text-gray-500">{product.name}</p>
              <span>{product.quantity + "X" + "$" + product.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default index;
