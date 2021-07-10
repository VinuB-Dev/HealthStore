import "./Signup.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { signup } from "../../Services/auth.service";
import { useUser } from "../../context/user/userContext";
import { addTokenToStorage } from "../../Utils";

export default function Login() {
  let from = "";
  const navigate = useNavigate();
  const { state } = useLocation();
  from = state?.from;
  const { userDispatch } = useUser();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    "confirm password": ""
  });

  const [confirmpasswordValid, updateConfirmPasswordValid] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(!confirmpasswordValid);
  }, [confirmpasswordValid]);

  const submit = async (e) => {
    e.preventDefault();
    updateConfirmPasswordValid(
      userData["confirm password"] === userData["password"]
    );
    console.log(userData);
    if (!error) {
      const response = await signup({
        name: userData["name"],
        email: userData["email"],
        password: userData["password"]
      });
      if (response.success) {
        addTokenToStorage(response.token);
        userDispatch({
          type: "UPDATE_USER_LOGIN",
          payload: {
            isLoggedIn: true,
            name: response.name
          }
        });
        navigate(from || "/");
      } else {
        console.log("tuss");
      }
    }
  };

  function onChangeHandler(e) {
    setUserData({
      ...userData,
      [e.currentTarget.id]: JSON.parse(JSON.stringify(e.currentTarget.value))
    });
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submit}>
        <h3>Signup</h3>
        <h3
          style={{
            display: confirmpasswordValid ? "none" : "block",
            color: "red"
          }}
        >
          Password dont match
        </h3>
        <label>Name</label>
        <input
          id="name"
          value={userData.name}
          type="text"
          required
          placeholder="Enter Name"
          autoComplete="off"
          onChange={onChangeHandler}
        />
        <label>Email</label>
        <input
          id="email"
          value={userData.email}
          type="email"
          required
          placeholder="Enter Email"
          autoComplete="off"
          onChange={onChangeHandler}
        />
        <label>Password</label>
        <input
          id="password"
          value={userData.password}
          type="password"
          required
          placeholder="Enter Password"
          onChange={onChangeHandler}
        />
        <label>Confirm Password</label>
        <input
          id="confirm password"
          value={userData["confirm password"]}
          type="password"
          required
          placeholder="Enter Password"
          onChange={onChangeHandler}
        />
        <button type="submit" className="link_btn">
          <RiLoginBoxFill />
          Signup
        </button>
      </form>
    </div>
  );
}
