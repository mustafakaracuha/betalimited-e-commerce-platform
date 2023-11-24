import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import StoreIcon from "@mui/icons-material/Store";

import ListItem from "./ListItem";
import TotalPrice from "./TotalPrice";

import {
  getMyProducts,
} from "../../store/features/basket/basketSlice";

function index({ open, setOpenBasket }) {
  const [dataFetch, setDataFetch] = useState(false);

  const dispatch = useDispatch();
  const { myProducts } = useSelector((state) => state.basket);

  useEffect(() => {
    setDataFetch(true);
    if (dataFetch === true && open === true) {
      dispatch(getMyProducts())
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
          <h1 className="text-3xl font-semibold mb-4">Basket</h1>
          <CloseIcon
            onClick={handleClose}
            className="text-gray-400 cursor-pointer"
            fontSize="large"
          />
        </div>
        <Divider light />
        {myProducts.length > 0 ? (
        <>
          <List
            sx={{
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              bgcolor: "background.paper",
            }}
          >
            {myProducts.map((product) => (
              <ListItem product={product} />
            ))}
          </List>
            <TotalPrice />
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
