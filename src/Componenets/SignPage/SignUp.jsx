import React, { useState } from "react";
import "./Signup.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function SignUp() {
  const [signUpmsg, setSignupMsg] = useState();
  const [signUpFailedmsg, setsignUpFailedmsg] = useState();
  let navigate = useNavigate();
  let validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "minimum 3 characters")
      .max(40, "maximum 40 chars")
      .required("name is required"),
    email: yup.string().email("Please inter valid email"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "at least upperCase , lower case , one degit , special character allowed"
      )
      .required("password is required"),
    age: yup
      .number()
      .min(16, "your under age")
      .max(95, "its not for you age")
      .required("age is required"),
    phone: yup
      .string()
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "please enter number"
      )
      .required("phone is Required"),
  });

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },

    validationSchema,
    // validate: function (values) {
    //   console.log(values);
    //   console.log(registerFormik.errors);
    // },
    // validate: function (values) {
    //   const errors = {};
    //   if (values.name.length < 2) {
    //     errors.name = "Name must be more than 4 characters";
    //   }
    //   if (!values.email.includes("@") && !values.email.includes(".")) {
    //     errors.email = "enter a Valid email.";
    //   }
    //   if (values.password.length < 6 && values.password.length > 12) {
    //     errors.password = "Password must be at least 6 ch";
    //   }
    //   // if (!values.age.match(/^[1-9][0-9]$/)) {
    //   //   errors.age = "Age must be above 10 years old.";
    //   // }

    //   if (values.phone.length >= 14) {
    //     errors.phone = "phone must be more than 7 numbers";
    //   }
    //   return errors;
    // },

    onSubmit: registerNow,
  });
  async function registerNow(values) {
    console.log(values);
    try {
      let { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
        values
      );
      console.log(data);
      setSignupMsg(data.msg);
      navigate("/Login");
      // return true;
    } catch (error) {
      setsignUpFailedmsg(error.response.data.msg);

      console.log(error);
    }
  }
  function clearMsgs() {
    setSignupMsg("");
    setsignUpFailedmsg("");
  }
  return (
    <>
      <div id="Signup">
        <div className="container d-flex align-items-center ">
          <div className="formUi w-50">
            <h2>Sign Up Now!</h2>

            <form onSubmit={registerFormik.handleSubmit}>
              <div className="formInputs">
                <input
                  onFocus={clearMsgs}
                  type="text"
                  placeholder="name"
                  className="form-control m-1"
                  id="name"
                  name="name"
                  onBlur={registerFormik.handleBlur}
                  onChange={registerFormik.handleChange}
                  value={registerFormik.values.name}
                />
                {registerFormik.touched.name ? (
                  <p>{registerFormik.errors.name}</p>
                ) : (
                  ""
                )}

                <input
                  onFocus={clearMsgs}
                  type="email"
                  placeholder="Email"
                  className="form-control m-1"
                  id="email"
                  name="email"
                  onBlur={registerFormik.handleBlur}
                  onChange={registerFormik.handleChange}
                  value={registerFormik.values.email}
                />

                {registerFormik.touched.email ? (
                  <p>{registerFormik.errors.email}</p>
                ) : null}
                <input
                  onFocus={clearMsgs}
                  type="password"
                  placeholder="password"
                  className="form-control m-1"
                  id="password"
                  name="password"
                  onBlur={registerFormik.handleBlur}
                  onChange={registerFormik.handleChange}
                  value={registerFormik.values.password}
                />
                {registerFormik.touched.password ? (
                  <p>{registerFormik.errors.password}</p>
                ) : (
                  ""
                )}

                <input
                  onFocus={clearMsgs}
                  type="number"
                  placeholder="age"
                  className="form-control m-1"
                  id="age"
                  name="age"
                  onBlur={registerFormik.handleBlur}
                  onChange={registerFormik.handleChange}
                  value={registerFormik.values.age}
                />
                {registerFormik.touched.age ? (
                  <p>{registerFormik.errors.age}</p>
                ) : (
                  ""
                )}
                <input
                  onFocus={clearMsgs}
                  type="text"
                  placeholder="phone"
                  className="form-control m-1"
                  id="phone"
                  name="phone"
                  onBlur={registerFormik.handleBlur}
                  onChange={registerFormik.handleChange}
                  value={registerFormik.values.phone}
                />
                {registerFormik.touched.phone ? (
                  <p>{registerFormik.errors.phone}</p>
                ) : (
                  ""
                )}
                <div className="d-flex align-items-center justify-content-between mt-2 p-1">
                  <p>
                    have already an account? <Link to="/Login">Login</Link>
                  </p>
                  {signUpmsg ? <p>{signUpmsg}</p> : null}
                  {signUpFailedmsg ? <p>{signUpFailedmsg}</p> : null}

                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
