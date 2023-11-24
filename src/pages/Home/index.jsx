import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import AppBar from "../../components/AppBar";
import ProductCard from "../../components/ProductCard";
import Backdrop from "../../components/Backdrop";

import { getAllProducts } from "../../store/features/products/productsSlice";
import { getMyProducts } from "../../store/features/basket/basketSlice";

import { useDispatch, useSelector } from "react-redux";

function index() {
  const [dataFetch, setDataFetch] = useState(false);
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.products);
  const { isLoggedIn } = useSelector((state) => state.auth);


  useEffect(() => {
    setDataFetch(true);
    if (dataFetch === true) {
      dispatch(getAllProducts())
      .unwrap()
      .then((oResult) => {
        if (oResult) {
          dispatch(getMyProducts());
        }
      })
      .catch((oError) => {
        console.log(oError)
      });
    }
    return () => {
      setDataFetch(false);
    };
  }, [dataFetch]);

  return (
    <div className="w-full min-h-screen overflow-hidden">
      <Backdrop isLoading={isLoading} />
      <AppBar />
      <Grid
        container
        spacing={{ xs: 1, md: 5, lg: 0 }}
        columnGap={{xs:0, lg:0, xl:0}}
        rowSpacing={{xs:0, lg:0, xl:0}}
        columnSpacing={{xs:-5, md:0}}
        columns={{ xs: 1, sm: 1, md: 8, lg: 12, xl: 12 }}
      >
        {products?.map((product, index) => (
          <Grid
            xs={1}
            sm={1}
            md={4}
            lg={3}
            xl={3}
            key={index}
            className="w-full !pt-28 !p-12"
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default index;
