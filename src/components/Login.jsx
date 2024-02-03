import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../features/selectedUserSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    validateForm();
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      setErrors({ ...errors, email: "" });
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    } else {
      setErrors({ ...errors, email: "" });
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      setErrors({ ...errors, password: "" });
    }

    setErrors(newErrors);

    return isValid;
  };

  const myUsers = useSelector((state) => state.users.users);

  useEffect(() => {
    setUsers(myUsers);
  }, [myUsers]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    validateForm();

    const selectedUser = users.find((user) => user.email === formData.email);

    if (selectedUser && selectedUser.password === formData.password) {
      console.log("check Login successful");
      setFormData({ email: "", password: "" });
      dispatch(setUser(selectedUser));
      navigate("/welcome");
    } else {
      console.log("check Invalid email or password");
      setErrors({
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
      <form onSubmit={handleFormSubmit}>
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
          onChange={handleInputChange}
          value={formData.email}
          name="email"
          errorMessage={errors.email}
        />
        {errors.email && <p className="text-danger">{errors.email}</p>}
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          name="password"
        />

        {errors.password && <p className="text-danger">{errors.password}</p>}

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name="flexCheck"
            id="flexCheckDefault"
            label="Remember me"
            onChange={handleInputChange}
            value={formData.remember}
          />
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn className="mb-4" type="submit">
          Sign in
        </MDBBtn>

        <div className="text-center">
          <p>
            Not a member?{" "}
            <Link to={"/register"} href="!#" type="submit">
              Register
            </Link>
          </p>
          <p>
            or <Link to="/register">sign up</Link>
          </p>
        </div>
      </form>

      {errors.email && (
        <Alert
          variant="danger"
          className="fixed-top top-0"
          dismissible
          onClose={() => console.log("Alert closed!")}
        >
          {errors.email}
        </Alert>
      )}
    </MDBContainer>
  );
};

export default Login;
