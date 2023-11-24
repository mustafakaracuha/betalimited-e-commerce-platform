import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";

import { searchGetProducts } from "../../store/features/products/productsSlice";

function index() {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();

  const handleSearchProduct = (searchValue) => {
    dispatch(searchGetProducts(searchValue));
  };

  return (
    <div className="flex items-center justify-center relative max-sm:hidden">
      <input
        type="search"
        className={`w-[20rem] h-10 opacity-25 focus:opacity-100 bg-white font-normal rounded-xl px-5 transition-all duration-300 ${
          isFocused && "pl-12 transition-all duration-300 text-gray-400"
        } placeholder:text-gray-400 border-none outline-none mr-4 relative`}
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => handleSearchProduct(e.target.value.toLowerCase())}
      />
      <SearchIcon
        className={`text-gray-400 absolute left-4 text-2xl bg-transparent  scale-0 opacity-0 transition-all duration-500 ${
          isFocused ? " scale-100 opacity-100 transition-all duration-500" : ""
        }`}
        color="inherit"
        size={20}
      />
    </div>
  );
}

export default index;
