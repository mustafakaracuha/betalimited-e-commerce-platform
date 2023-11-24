import React,{useState} from "react";
import { useSelector } from "react-redux";

import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";

import SellIcon from "@mui/icons-material/Sell";
import Count from "./QuantityButtons";
import ButtonGroup from "./ButtonGroup";
import Basket from "../Basket";


import offerFruits from "../../assets/images/offerfruits.png";
import lemon from "../../assets/images/lemon.png";
import strawberry from "../../assets/images/strawberry.png";

function index({ product }) {
  const [ openBasket, setOpenBasket ] = useState(false) ;

  const productQuantity = useSelector(
    (state) =>
      state.products.products.find((item) => item.id === product.id).quantity
  );

  return (
    <div className="w-full h-full bg-gray-200 rounded-3xl p-5 transition-all duration-300 group cursor-pointer">
      <div className="w-full h-[19rem] bg-white flex flex-col items-center justify-center rounded-2xl relative">
        <Chip
          icon={<SellIcon className="text-lg !ml-2" />}
          color="error"
          label={product.discount}
          className=" absolute top-3 left-4"
        />
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
              ? 250
              : product.name === "Fresh Strawberry"
              ? 220
              : 170
          }
        />

        {productQuantity !== 0 && <ButtonGroup setOpenBasket={setOpenBasket} product={product}/>}
      </div>
      <div className="flex items-end justify-between">
        <div className="mt-6">
          <p className="ml-2 mb-3 text-xl text-gray-500">{product.name}</p>
          <div className="flex items-center ml-1 mt-2">
            <Rating value={product.rating} />
            <span className="text-gray-500 ml-1">({product.rating})</span>
          </div>
          <p className="ml-2 mt-3 text-lg text-black font-medium">
            ${product.price}{" "}
            <span className="text-gray-400 ml-1 line-through">
              ${product.originalPrice}
            </span>
          </p>
        </div>
        <Count product={product} />
        <Basket open={openBasket} setOpenBasket={setOpenBasket }/>
      </div>
    </div>
  );
}

export default index;
