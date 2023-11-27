import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";

import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { createSession, login } from "../../store/features/auth/authSlice";

import logo from "../../assets/logo/logo-dark.png";

function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const sessionId = sessionStorage.getItem("Session-ID");
    return sessionId !== null;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      return navigate("/products");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    if (
      values.username.toLowerCase() === "user" &&
      values.password.toLowerCase() === "user"
    ) {
      dispatch(createSession())
        .unwrap()
        .then((response) => {
          if (response) {
            dispatch(login(values.username));
            navigate("/products");
          } else {
            toast.error("Login failed");
          }
        })
        .catch((error) => {
          toast.error(error.response);
        });
    } else {
      toast.error("Invalid username or password");
      toast.info("user and user 😉", {
        delay: 1000,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center mx-auto">
      <div className="bg-white max-sm:shadow-none p-12 rounded-3xl shadow-xl shadow-gray-200 max-w-md w-full">
        <h2 className="text-3xl text-blue-500 font-bold mb-7 flex items-center justify-start">
          <img src={logo} className="mr-2" width={160} alt="" srcSet="" />{" "}
          <span>Fruiterer</span>
        </h2>
        <form
          className="flex flex-col items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4 w-full">
            <input
              id="username"
              placeholder="Username"
              className="w-full h-14 bg-gray-100 rounded-xl border-2 border-white transition-all duration-300 outline-none pl-4 focus:!border-blue-400"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 mt-2">{formik.errors.username}</div>
            )}
          </div>
          <div className="mb-4 w-full">
            <input
              placeholder="Password"
              id="password"
              type="password"
              className="w-full h-14 bg-gray-100 border-2 border-white transition-all duration-300 rounded-xl outline-none pl-4 focus:!border-blue-400"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 mt-2">{formik.errors.password}</div>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="!h-12 !mt-2 !rounded-xl !capitalize !text-lg"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default index;
