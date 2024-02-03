import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUsers } from "../features/usersSlice";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    subscribe: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    subscribe: "",
  });

  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // validateForm();
    if (user.name === "") {
      setErrors({
        ...errors,
        name: "Please enter your name",
      });
      setIsError(true);
      return;
    }
    if (user.email === "") {
      // alert("Please enter your email");
      setErrors({
        ...errors,
        email: "Please enter your email",
      });
      setIsError(true);
      return;
    }
    if (user.password === "") {
      // alert("Please enter your password");
      setErrors({
        ...errors,
        password: "Please enter your password",
      });
      setIsError(true);
      return;
    }

    if (user.repeatPassword === "") {
      // alert("Please repeat your password");
      setErrors({
        ...errors,
        repeatPassword: "Please repeat your password",
      });
      setIsError(true);
      return;
    }

    // Check if passwords match
    if (user.password !== user.repeatPassword) {
      // alert("Passwords do not match");
      setErrors({
        ...errors,
        repeatPassword: "Passwords do not match",
      });
      setIsError(true);
      return;
    }
    setIsError(false);

    // Save user to localStorage
    const storedUsers = localStorage.getItem("formdata");
    const usersArray = JSON.parse(storedUsers);
    usersArray.push(user);
    localStorage.setItem("formdata", JSON.stringify(usersArray));

    dispatch(setUsers([...users, user]));

    navigate("/");
  };
  return (
    <MDBContainer className="register">
      <MDBCard
        className="text-black  "
        style={{
          borderRadius: "25px",
        }}
      >
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <form onSubmit={handleRegister}>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    onChange={handleInputChange}
                    value={user.name}
                    name="name"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form2"
                    type="email"
                    onChange={handleInputChange}
                    value={user.email}
                    name="email"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={user.password}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    label="Repeat your password"
                    id="form4"
                    type="password"
                    onChange={handleInputChange}
                    value={user.repeatPassword}
                    name="repeatPassword"
                  />
                </div>

                <div className="mb-4">
                  <MDBCheckbox
                    value=""
                    id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                    onChange={handleInputChange}
                    checked={user.subscribe}
                    name="subscribe"
                  />
                </div>

                <MDBBtn className="mb-4" size="lg" onClick={handleRegister}>
                  Register
                </MDBBtn>
                <p>
                  have an account? <Link to="/"> Login</Link>
                </p>
              </form>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      {isError && (
        <Alert
          variant="danger"
          className="fixed-top top-0"
          dismissible
          onClose={() => {
            setIsError(false);
          }}
        >
          {isError &&
            Object.keys(errors).map((key) => {
              if (errors[key]) {
                return <p key={key}>{errors[key]}</p>;
              }
            })}
        </Alert>
      )}
    </MDBContainer>
  );
};

export default Register;
