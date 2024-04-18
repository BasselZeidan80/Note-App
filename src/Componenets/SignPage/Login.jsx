import React, { useState } from "react";
import "./Signup.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function SignUp() {
  const [signInmsg, setSignInmsg] = useState();
  const [signInFailedmsg, setSignInFailedmsg] = useState();
  let navigate = useNavigate();
  let validationSchema = yup.object({
    email: yup.string().email("Please inter valid email"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "at least upperCase , lower case , one degit , special character allowed"
      )
      .required("password is required"),
  });

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: SignIn,
  });
  async function SignIn(values) {
    console.log(values);
    try {
      let { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
        values
      );
      console.log(data);
      setSignInmsg(data.msg);
      localStorage.setItem("userToken", data.token);
      navigate("/Home");
    } catch (error) {
      setSignInFailedmsg(error.response.data.msg);

      console.log(error);
    }
  }
  function clearMsgs() {
    setSignInmsg("");
    setSignInFailedmsg("");
  }
  return (
    <>
      <div id="Signup">
        <div className="container d-flex align-items-center ">
          <div className="formUi w-50">
            <h2>Login Now!</h2>

            <form onSubmit={registerFormik.handleSubmit}>
              <div className="formInputs">
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

                <div className="d-flex align-items-center justify-content-between mt-2 p-1">
                  <p>
                    Create a New account? <Link to="/SignUp">SignUp</Link>
                  </p>
                  {signInmsg ? <p>{signInmsg}</p> : null}
                  {signInFailedmsg ? <p>{signInFailedmsg}</p> : null}

                  <button type="submit" className="btn btn-primary">
                    Login
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
