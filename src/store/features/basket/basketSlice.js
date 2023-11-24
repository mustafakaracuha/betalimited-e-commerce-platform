import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  isLoading: false,
  totalPrice : ""
};


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearMyProducts: (state) => {
      state.myProducts = [];
    },
    getTotalPrice: (state,action) => {
      state.totalPrice = action.payload;
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
        state.myProducts = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getMyProducts.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Add my products
    builder.addCase(addBasketProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addBasketProducts.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addBasketProducts.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Delete my products
    builder.addCase(deleteBasketProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBasketProducts.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteBasketProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { clearMyProducts,getTotalPrice } = productsSlice.actions;
export default productsSlice.reducer;
