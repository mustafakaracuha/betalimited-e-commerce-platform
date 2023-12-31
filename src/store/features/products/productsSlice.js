import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  allProducts,
  searchProducts,
} from "../../../api/products/products.service";

export const getAllProducts = createAsyncThunk(
  "products/allProducts",
  async () => {
    try {
      const data = await allProducts();
      data.map((item) => (item.quantity = 0));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const searchGetProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchValue) => {
    try {
      const data = await searchProducts(searchValue);
      data.map((item) => (item.quantity = 0));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increaseCount: (state, action) => {
      const { id } = action.payload;
      const product = state.products.find((item) => item.id === id);
    
      if (product) {
        if (product.quantity < 20) {
          product.quantity += 1;
        } else {
          toast.warning("Maximum product count reached");
        }
      }
    },
    decreaseCount: (state, action) => {
      const { id } = action.payload;
      const product = state.products.find((item) => item.id === id);

      if (product && product.quantity > 0) {
        product.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Search product
    builder.addCase(searchGetProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { increaseCount, decreaseCount } = productsSlice.actions;
export default productsSlice.reducer;
