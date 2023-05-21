import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avataaars.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub } from "react-icons/ai";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <br />
          <br />
          <Col md={12} className="home-about-social">
          <h1 className="findMe">
  <span style={{color: "#3b5998"}}>F</span>
  <span style={{color: "#e1306c"}}>I</span>
  <span style={{color: "#2ba7d0"}}>N</span>
  <span style={{color: "#f5af02"}}>D</span> 
  <span style={{color: "#0077b5"}}>ME</span> 
  <span style={{color: "#cb2027"}}>ON</span>
</h1>
            <ul className="home-about-social-links">
              <li>
                <a
                  href="https://github.com/TeguhFauzi"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/TeguhFauzi30"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/@tfauzyy/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/085280840143"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaWhatsapp />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
