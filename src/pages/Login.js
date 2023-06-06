import { React, useState } from "react";
import axios from "axios";
import { server } from "../server";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../css/index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post(`${server}/login`, {
        email,
        password,
      });
      const token = post.data.accessToken;
      sessionStorage.setItem("accessToken", token);
      navigate("/dashboard");
    } catch (error) {
      setMsg(error.response.data.msg);
      setShow(true);
    }
  };
  return (
    <div className="login-wrap">
      <div className="login-card">
        <h1>Welcome Back!</h1>

        <form onSubmit={loginHandler} className="mt-4">
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Type your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Type your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="text-center">
            <button className="btn">Sign In</button>
          </div>
        </form>
      </div>
      {msg === null ? (
        ""
      ) : (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Sorry</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="text-danger d-flex align-items-center">
              <i className="fa-solid fa-circle-exclamation"></i>
              <div className="ps-3">{msg}</div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Login;
