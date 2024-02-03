import { useEffect, useState } from "react";
import { Details, Login, Register, Welcome } from "./components";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsers as saveUsers } from "./features/usersSlice";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsers = localStorage.getItem("formdata");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    dispatch(saveUsers(users));
  }, [users]);

  return (
    <div
      className="app 
      d-flex
      justify-content-center
      align-items-center
    "
      style={{ minHeight: "100vh" }}
    >
      <AppRouter />
    </div>
  );
};

export default App;
