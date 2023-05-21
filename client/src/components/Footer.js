import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import LoginModal from "../auth/Login";
import Swal from "sweetalert2";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  const [state, dispatch] = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleShowLoginModal = () => setShowLoginModal(true);

  const handleSuccessfulLogin = () => {
    setLoginData({ email: "", password: "" });
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'LOGOUT' });
        Swal.fire('Logged out successfully', '', 'success');
      }
    });
  }
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="6" className="footer-copywright">
          <h3>Teguh Fauzi</h3>
        </Col>
        <Col md="6" className="footer-copywright">
          Copyright
          {!state.isLogin && (
            <button className="log" onClick={handleShowLoginModal}>
              ©
            </button>
          )}
          {state.isLogin && (
            <button className="log" onClick={handleLogout}>
              Logout
            </button>
          )}
          &nbsp;{year}
        </Col>
      </Row>
      {showLoginModal && (
        <LoginModal
          show={showLoginModal}
          handleCloseLoginModal={() => setShowLoginModal(false)}
          loginData={loginData}
          setLoginData={setLoginData}
          handleSuccessfulLogin={handleSuccessfulLogin}
        />
      )}
    </Container>
  );
}

export default Footer;
