import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import StoreIcon from "@mui/icons-material/Store";

import ListItem from "./ListItem";
import TotalPrice from "./TotalPrice";
import {
  getMyProducts,
  getTotalPrice,
} from "../../store/features/basket/basketSlice";

function index({ open, setOpenBasket }) {
  const [dataFetch, setDataFetch] = useState(false);

  const dispatch = useDispatch();
  const { myProducts } = useSelector((state) => state.basket);

  const calculateTotalPrice = (products) => {
    return products?.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  useEffect(() => {
    setDataFetch(true);
    if (dataFetch === true && open === true) {
      dispatch(getMyProducts())
        .unwrap()
        .then((oResult) => {
          if (oResult) {
            let totalPrice = calculateTotalPrice(oResult);
            dispatch(getTotalPrice(totalPrice));
          }
        })
        .catch((oError) => {
          toast.error(oError);
        });
    }
    return () => {
      setDataFetch(false);
    };
  }, [open]);

  const handleClose = () => {
    setOpenBasket(false);
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={handleClose}
      className="drawer-basket"
    >
      <div className="w-[30rem] h-auto bg-white p-10 max-sm:!mx-auto">
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 5 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.3 }}
            className="text-3xl font-semibold mb-4"
          >
            Basket
          </motion.h1>
          <CloseIcon
            onClick={handleClose}
            className="text-gray-400 cursor-pointer"
            fontSize="large"
          />
        </div>
        <Divider light />
        {myProducts.length >= 1 ? (
          <>
            <List
              sx={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                bgcolor: "background.paper",
              }}
            >
              {myProducts.map(
                (product) =>
                  product.quantity >= 1 && <ListItem key={product.id} product={product} />
              )}
            </List>
            {myProducts.map(
              (product) =>
                product.quantity >= 1 && <TotalPrice key={product.id} myProducts={myProducts} />
            )}
          </>
        ) : (
          <div className="w-full p-14 flex flex-col items-center justify-center rounded-xl">
            <StoreIcon className="!text-[4rem] text-gray-400" />
            <p className="text-gray-400">Cart empty, please add items.</p>
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default index;
