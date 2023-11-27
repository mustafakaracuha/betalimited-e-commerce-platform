import React from "react";
import { motion } from "framer-motion";

import Banana from "../../../assets/images/banana.png";

function index() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="w-full h-screen flex flex-col items-center justify-center"
    >
      <img width={80} src={Banana} className="mb-5" />
      <p className="text-lg font-medium">This product not found</p>
    </motion.div>
  );
}

export default index;
