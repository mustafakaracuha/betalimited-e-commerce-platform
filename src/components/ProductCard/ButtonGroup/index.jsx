import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addBasketProducts } from "../../../store/features/basket/basketSlice";

function index({ product, setOpenBasket }) {
  const [loadingProductId, setLoadingProductId] = useState(null);
  const { sessionId } = useSelector((state) => state.auth);
  const { isAddBasketLoading } = useSelector((state) => state.basket);

  const dispatch = useDispatch();

  const handleAddProduct = (productId) => {
    setLoadingProductId(productId);

    dispatch(addBasketProducts(product))
      .unwrap()
      .then((oResult) => {
        if (oResult) {
          toast.success("Added to cart");
          setTimeout(() => {
            setLoadingProductId(null);
            setOpenBasket(true);
          }, 600);
        }
      })
      .catch((oError) => {
        toast.error(oError);
        setLoadingProductId(null);
      });
  };

  return (
    <ButtonGroup
      className="mt-5 mb-10 bg-white shadow-lg !rounded-xl transition-all duration-300 absolute -bottom-6"
      variant="countained"
      aria-label="Disabled elevation buttons"
    >
      <Button className="!text-gray-400">
        <VisibilityIcon />
      </Button>
      <Button className="!text-rose-400">
        <FavoriteIcon />
      </Button>
      {sessionId && (
        <Button
        onClick={() => handleAddProduct(product.id)}
          className="!text-blue-400"
          disabled={isAddBasketLoading}
        >
          {isAddBasketLoading && loadingProductId === product.id ? (
            <CircularProgress size={22} />
          ) : (
            <ShoppingCartIcon />
          )}
        </Button>
      )}
    </ButtonGroup>
  );
}

export default index;
