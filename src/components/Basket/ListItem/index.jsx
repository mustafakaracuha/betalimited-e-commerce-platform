import React from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";

import offerFruits from "../../../assets/images/offerfruits.png";
import lemon from "../../../assets/images/lemon.png";
import strawberry from "../../../assets/images/strawberry.png";
import {
  deleteBasketProducts,
  getMyProducts,
  getTotalPrice,
} from "../../../store/features/basket/basketSlice";

function index({product }) {
  const dispatch = useDispatch();

  const calculateTotalPrice = (products) => {
    return products?.reduce((total, product) => {
      return product.quantity * product.price + total;
    }, 0);
  };

  const handeDeleteMyProduct = (product) => {
    dispatch(deleteBasketProducts(product.productId))
      .unwrap()
      .then((oResult) => {
        if (oResult) {
          dispatch(getMyProducts())
            .unwrap()
            .then((oResult) => {
              if (oResult) {
                let totalPrice = calculateTotalPrice(oResult);
                dispatch(getTotalPrice(totalPrice));
              }
            })
            .catch((oError) => {
              console.log(oError);
            });
        }
      })
      .catch((oError) => {
        console.log(oError);
      });
  };

  return (
    <ListItem disablePadding>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ type: "spring", duration: 0.5, delay: 0.3 }}
      >
        <div className="w-full h-26 bg-gray-100 p-3 rounded-xl mt-5 group cursor-pointer transition-all duration-300 hover:bg-blue-100 hover:shadow-xl hover:shadow-gray-100 relative">
          <div className="w-full flex items-center justify-between px-2">
            <div className="flex items-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-white">
                <img
                  className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                  src={
                    product.name === "Offer Fruits"
                      ? offerFruits
                      : product.name === "Lemon"
                      ? lemon
                      : product.name === "Fresh Strawberry"
                      ? strawberry
                      : ""
                  }
                  width={
                    product.name === "Offer Fruits"
                      ? 140
                      : product.name === "Fresh Strawberry"
                      ? 60
                      : 60
                  }
                />
              </div>
              <div>
                <p className="ml-4 text-lg">{product.name}</p>
                <p className="ml-4 text-gray-400">
                  {"Quantity:" + " " + product.quantity}
                </p>
              </div>
            </div>
            <p>
              ${product.price}
              {product.quantity >= 1 && (
                <button
                  onClick={() => handeDeleteMyProduct(product)}
                  className="w-10 h-10 bg-rose-100 transition-all duration-300 hover:bg-rose-200 flex items-center justify-center p-1 rounded-xl absolute -top-3 -right-3 ring-4 ring-white"
                >
                  <DeleteIcon className="!text-[1.3rem] text-rose-400" />
                </button>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </ListItem>
  );
}

export default index;
