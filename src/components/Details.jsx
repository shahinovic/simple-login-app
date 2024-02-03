import Button from "react-bootstrap/Button";

import { BiEdit as Edit } from "react-icons/bi";
import { BsCheck2Circle as Check } from "react-icons/bs";
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/selectedUserSlice";

const Details = () => {
  const loginUser = useSelector((state) => state.selectedUser.selectedUser);
  console.log("🚀 ~ Details ~ loginUser:", loginUser);
  const [schoolObj, setSchoolObj] = useState({
    userPhoto: "",
    birthday: "",
    idCode: "",
    jobTitle: "",
    clientProfile: "",
    reminderProfile: "",
    description: "",
    name: loginUser.name,
    email: loginUser.email,
    phone: "",
    website: "",
    streetAddress: "",
    city: "",
    zip: "",
    state: "",
    country: "",
  });
  const [edit, setEdit] = useState(true);

  const [birthday, setBirthday] = useState(schoolObj.birthday);
  const [idCode, setIdCode] = useState(schoolObj.idCode);
  const [jobTitle, setJobTitle] = useState(schoolObj.jobTitle);
  const [clientProfile, setClientProfile] = useState(schoolObj.clientProfile);
  const [reminderProfile, setReminderProfile] = useState(
    schoolObj.reminderProfile
  );
  const [description, setDescription] = useState(schoolObj.description);
  const [name, setName] = useState(schoolObj.name);
  const [email, setEmail] = useState(schoolObj.email);
  const [phone, setPhone] = useState(schoolObj.phone);
  const [website, setWebsite] = useState(schoolObj.website);
  const [streetAddress, setStreetAddress] = useState(schoolObj.streetAddress);
  const [city, setCity] = useState(schoolObj.city);
  const [zip, setZip] = useState(schoolObj.zip);
  const [state, setState] = useState(schoolObj.state);
  const [country, setCountry] = useState(schoolObj.country);

  const handleEditToggle = () => setEdit(!edit);

  const handleBirthdayChange = (e) => setBirthday(e.target.value);
  const handleIdCode = (e) => setIdCode(e.target.value);
  const handleJobTitle = (e) => setJobTitle(e.target.value);
  const handleClientProfile = (e) => setClientProfile(e.target.value);
  const handleReminderProfile = (e) => setReminderProfile(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleWebsite = (e) => setWebsite(e.target.value);
  const handleStreetAddress = (e) => setStreetAddress(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleZip = (e) => setZip(e.target.value);
  const handleState = (e) => setState(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.selectedUser.selectedUser);

  const editLocalStorage = (loginUser) => {
    const storedUsers = localStorage.getItem("formdata");
    const usersArray = JSON.parse(storedUsers);
    const index = usersArray.findIndex(
      (user) => user.email === loginUser.email
    );
    console.log("🚀 ~ editLocalStorage ~ index:", index);
    if (index !== -1) {
      usersArray[index] = loginUser;
      console.log(
        "🚀 ~ editLocalStorage ~ usersArray[index]:",
        usersArray[index]
      );
      console.log("🚀 ~ editLocalStorage ~ usersArray:", usersArray);
      localStorage.setItem("formdata", JSON.stringify(usersArray));
    }
  };

  const handleDone = () => {
    setSchoolObj({
      birthday: birthday,
      idCode: idCode,
      jobTitle: jobTitle,
      clientProfile: clientProfile,
      reminderProfile: reminderProfile,
      description: description,
      name: name,
      email: email,
      phone: phone,
      website: website,
      streetAddress: streetAddress,
      city: city,
      zip: zip,
      state: state,
      country: country,
    });
    dispatch(
      setUser({
        birthday: birthday,
        idCode: idCode,
        jobTitle: jobTitle,
        clientProfile: clientProfile,
        reminderProfile: reminderProfile,
        description: description,
        name: name,
        email: email,
        phone: phone,
        website: website,
        streetAddress: streetAddress,
        city: city,
        zip: zip,
        state: state,
        country: country,
      })
    );

    editLocalStorage(user);

    handleEditToggle();
  };

  const handleCancel = () => {
    setBirthday(schoolObj.birthday);
    setIdCode(schoolObj.idCode);
    setJobTitle(schoolObj.jobTitle);
    setClientProfile(schoolObj.clientProfile);
    setReminderProfile(schoolObj.reminderProfile);
    setDescription(schoolObj.description);
    setName(schoolObj.name);
    setEmail(schoolObj.email);
    setPhone(schoolObj.phone);
    setWebsite(schoolObj.website);
    setStreetAddress(schoolObj.streetAddress);
    setCity(schoolObj.city);
    setZip(schoolObj.zip);
    setState(schoolObj.state);
    setCountry(schoolObj.country);

    handleEditToggle();
  };
  return (
    <div className="school px-2 bg-light rounded-2" dir="rtl">
      {edit && (
        <Row className="justify-content-between">
          <Col md={3} className="d-flex align-items-center">
            <Button className="edit w-100 " onClick={() => handleEditToggle()}>
              <Edit /> Edit info
            </Button>
          </Col>
          <Col md={3} className="d-flex align-items-center">
            <Link to="/welcome" className="w-100">
              <Button variant="secondary" className=" w-100 ">
                <span>Back</span>
                <IoArrowBack className="me-2 fs-5" />
              </Button>
            </Link>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={6}>
          <div className="card text-center px-3 py-5">
            <h2 className="card-title fw-bold">Personal info</h2>
            <fieldset disabled={edit} className="w-100">
              <Form.Group className="mb-3" controlId="birthday">
                <Form.Label>birthday</Form.Label>
                <Form.Control
                  type="date"
                  className="text-center"
                  placeholder="Enter birthday"
                  onChange={handleBirthdayChange}
                  value={birthday}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="idCode">
                <Form.Label>ID code</Form.Label>
                <Form.Control
                  type="number"
                  className="text-center"
                  placeholder="Enter id Code"
                  onChange={handleIdCode}
                  value={idCode}
                />
              </Form.Group>
              <h2>Person setting</h2>
              <Form.Group className="mb-3" controlId="website">
                <Form.Label>Job title</Form.Label>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Enter job title"
                  onChange={handleJobTitle}
                  value={jobTitle}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="website">
                <Form.Label>Client profile</Form.Label>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Enter client profile"
                  onChange={handleClientProfile}
                  value={clientProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="website">
                <Form.Label>Reminder profile</Form.Label>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Enter Reminder profile"
                  onChange={handleReminderProfile}
                  value={reminderProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="website">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handleDescription}
                  value={description}
                />
              </Form.Group>
            </fieldset>
          </div>
        </Col>

        <Col md={6}>
          <div className="card text-center px-3 py-5">
            <div className="card-head">
              <h2>Contact info</h2>
            </div>
            <fieldset disabled={edit} className="w-100">
              <Form.Group className="mb-3" controlId="schoolAddress">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Enter full name"
                  onChange={handleName}
                  value={name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="schoolEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  className="text-center"
                  placeholder="Enter email"
                  onChange={handleEmail}
                  value={email}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="schoolEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  className="text-center"
                  placeholder="Enter phone number"
                  onChange={handlePhone}
                  value={phone}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="schoolEmail">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Enter website"
                  onChange={handleWebsite}
                  value={website}
                />
              </Form.Group>
              <h2>Address</h2>
              <Form.Group className="mb-3" controlId="schoolEmail">
                <Form.Label>Street address</Form.Label>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Enter street address"
                  onChange={handleStreetAddress}
                  value={streetAddress}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="schoolEmail">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Enter city"
                  onChange={handleCity}
                  value={city}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="schoolEmail">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Enter zip"
                  onChange={handleZip}
                  value={zip}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="schoolEmail">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Enter state"
                  onChange={handleState}
                  value={state}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="schoolEmail">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Enter country"
                  onChange={handleCountry}
                  value={country}
                />
              </Form.Group>
            </fieldset>
          </div>
        </Col>
      </Row>
      {!edit && (
        <Row>
          <Col md={6} className="d-flex justify-content-center">
            <Button
              className="edit"
              onClick={() => handleDone()}
              disabled={edit}
            >
              <Check /> Done
            </Button>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="edit"
              onClick={() => handleCancel()}
              disabled={edit}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Details;
