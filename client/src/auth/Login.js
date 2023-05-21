import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../auth/AuthContext";
import { API, setAuthToken } from "../config/api";

function LoginModal({
  handleCloseLoginModal,
  handleSuccessfulLogin,
}) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const MySwal = withReactContent(Swal);
  const [state, dispatch] = useContext(AuthContext);

  const { email, password } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", userData);

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
      handleSuccessfulLogin();
      setAuthToken(localStorage.token);
      MySwal.fire({
        title: <strong>Good job!</strong>,
        icon: "success",
      });
    } catch (error) {
      MySwal.fire({
        title: <strong>Fail to Login!</strong>,
        icon: "error",
      });
      console.log("login failed : ", error);
    }
  });

  return (
    <Modal show={true} onHide={handleCloseLoginModal} keyboard={false}>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mb-1">
            <label htmlFor="email-user" className="col-form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email-user"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="password-user" className="col-form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password-user"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <Button className="login mt-4" type="submit">
            Login
          </Button>
        </form>
      </Modal.Body>

    </Modal>
  );
}

export default LoginModal;
