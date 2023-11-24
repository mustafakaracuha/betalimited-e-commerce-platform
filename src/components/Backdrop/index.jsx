import React from "react";
import Backdrop from "@mui/material/Backdrop";

import logo from "../../assets/logo/logo-light.png";

function index({ isLoading }) {
  return (
    <div>
      <Backdrop
        className="flex items-center justify-center"
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={isLoading}
      >
          <img src={logo} width={210} className="animate-pulse" />
      </Backdrop>
    </div>
  );
}

export default index;
