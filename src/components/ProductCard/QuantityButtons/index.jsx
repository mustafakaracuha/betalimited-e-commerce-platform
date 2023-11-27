import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import {
  increaseCount,
  decreaseCount,
} from "../../../store/features/products/productsSlice";

function index({ product }) {
  const dispatch = useDispatch();
  const productQuantity = useSelector(
    (state) =>
      state.products.products.find((item) => item.id === product.id).quantity
  );

  const handleIncrease = () => {
    dispatch(increaseCount({ id: product.id }));
  };

  const handleDecrease = () => {
    dispatch(decreaseCount({ id: product.id }));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {productQuantity !== 0 && (
        <>
          <button
            onClick={handleDecrease}
            className="w-10 h-10 text-[30px] text-gray-500 flex items-center justify-center bg-white transition-all duration-300 hover:text-rose-400 rounded-xl active:scale-110"
          >
            -
          </button>
          <motion.p
            className="mt-1 mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{type: 'spring', duration: 0.3 }}
          >
            {productQuantity}
          </motion.p>
        </>
      )}
      <button
        onClick={handleIncrease}
        className="w-10 h-10 text-[30px] text-gray-500 flex items-center justify-center bg-white transition-all duration-300 hover:text-blue-400 rounded-xl active:scale-110"
      >
        +
      </button>
    </div>
  );
}

export default index;
