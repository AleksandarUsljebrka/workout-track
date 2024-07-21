
import {useState, useEffect} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { register } from "../../services/api";
import { FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";

const registrationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [successfullyRegister, setSuccessfullyRegister] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        await registrationSchema.validate(values, { abortEarly: false });

        const response = await register(values);
        if (response.data.successful) {
        setSuccessfullyRegister(true);
          toast.success("Successfully registered");
          
        }
      } catch (error) {
        toast.error("Register failed! Please check your credentials.");
      }
    },
  });
  useEffect(()=>{
    if (!successfullyRegister)
    {
      return
    }

    if(successfullyRegister){
      navigate("/login");
    }else{
      navigate("/");
    }
  },[ successfullyRegister])

  return (
    <div className="wrapper-register">
      <div className="form-box">
        <form onSubmit={formik.handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Username"
              required
            />
            <FaUser className="icon" />
            {formik.touched.username && formik.errors.username ? (
              <p className="error-message">{formik.errors.username}</p>
            ) : null}
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              required
            />
            <MdOutlineMail className="icon" />
            {formik.touched.email && formik.errors.email ? (
              <p className="error-message">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
              required
            />
            <RiLockPasswordFill className="icon" />
            {formik.touched.password && formik.errors.password ? (
              <p className="error-message">{formik.errors.password}</p>
            ) : null}
          </div>

          <button type="submit">Register</button>
          <div className="register">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
