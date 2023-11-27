import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getMyBasketProducts,
  addMyBasketProducts,
  deleteMyBasketProducts,
} from "../../../api/basket/basket.service";

export const getMyProducts = createAsyncThunk("basket/myproducts", async () => {
  try {
    const data = await getMyBasketProducts();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue();
  }
});

export const addBasketProducts = createAsyncThunk(
  "basket/addProduct",
  async (product) => {
    try {
      const data = await addMyBasketProducts(product);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteBasketProducts = createAsyncThunk(
  "basket/deleteProduct",
  async (id) => {
    try {
      const data = await deleteMyBasketProducts(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  myProducts: [],
  isAddBasketLoading: false,
  isDeleteBasketLoading: false,
  totalPrice: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearMyProducts: (state) => {
      state.myProducts = [];
    },
    getTotalPrice: (state, action) => {
      state.totalPrice = action.payload.toFixed(2);
    },
  },
  extraReducers: (builder) => {
    //Get my products
    builder.addCase(getMyProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMyProducts.fulfilled, (state, action) => {
      if (action.payload === "Cart is empty.") {
        state.myProducts = [];
      } else {
        let newData = action.payload.filter((item) => item.quantity >= 1)
        state.myProducts = newData
      }
      state.isLoading = false;
    });
    builder.addCase(getMyProducts.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Add my products
    builder.addCase(addBasketProducts.pending, (state, action) => {
      state.isAddBasketLoading = true;
    });
    builder.addCase(addBasketProducts.fulfilled, (state, action) => {
      state.isAddBasketLoading = false;
      toast.success("Added to cart");
      
    });
    builder.addCase(addBasketProducts.rejected, (state, action) => {
      state.isAddBasketLoading = false;
    });

    // Delete my products
    builder.addCase(deleteBasketProducts.pending, (state, action) => {
      state.isDeleteBasketLoading = true;
    });
    builder.addCase(deleteBasketProducts.fulfilled, (state, action) => {
      state.isDeleteBasketLoading = false;
      toast.success("Your cart updated");
    });
    builder.addCase(deleteBasketProducts.rejected, (state, action) => {
      state.isDeleteBasketLoading = false;
    });
  },
});

export const { clearMyProducts, getTotalPrice } = productsSlice.actions;
export default productsSlice.reducer;
