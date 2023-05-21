import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJsBadge,
  DiReact,
  DiCss3,
  DiSass,
  DiGit,
  DiNodejs,
  DiHtml5,
  DiBootstrap,
  DiGo,
  DiPostgresql,
  DiMysql,
} from "react-icons/di";
import { SiTypescript, SiJest, SiTailwindcss, SiGoland, SiGo } from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <DiHtml5/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiCss3 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiBootstrap />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTailwindcss />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiJsBadge />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiNodejs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <DiReact />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <SiGo />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <DiPostgresql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <DiMysql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiGit />
      </Col>
    </Row>
  );
}

export default Techstack;
