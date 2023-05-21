import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/photoProfile.jpg";
import Home2 from "./Home2";
import Type from "./Type";
import Projects from "../Projects/Projects";
function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={4} className="home-header">
              <div className="headings">
                <a href="instagram.com/tfauzyy" className="main-name">
                  {" "}
                  <h3>Teguh Fauzi</h3>
                </a>
              </div>

              <div style={{ padding: "10px 50px 0 50px", textAlign: "left" }}>
              <div className="d-flex justify-content-center">
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid img-rounded"
                  style={{ maxHeight: "400px" }}
                />
                </div>
                <div className="block w-full lg-block">
                  <div class="types">
                    <Type />
                  </div>
                  <div class="block about">
                    <h2 style={{ color: "crimson",  textShadow: "2px 2px 4px #000000" }}>
                      About <span className="purple" style={{fontWeight:"bold" }}>me</span>
                    </h2>
                    Hello{" "}
                    <span className="wave" role="img" aria-labelledby="wave">
                      👋🏻
                    </span>
                    , I'm Teguh, 22 years old. I have a background in nursing
                    and switched careers to become a full stack developer in
                    2023. Prior to that, I self-taught myself HTML, CSS, and
                    JavaScript, but I felt unsure about the direction I wanted
                    to take. Therefore, I decided to join a bootcamp at DumbWays
                    Indonesia, where I learned Golang, SQL (using PostgreSQL and
                    MySQL), React JS, as well as several other frameworks and
                    libraries.
                  </div>
                </div>
              </div>
            </Col>

            <Col md={8}>
              <Projects />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
