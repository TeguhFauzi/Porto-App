import React from "react";
import Card from "react-bootstrap/Card";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify",fontSize:"15px" }}>
          <p className="experience">  Experience </p>
            <p className="crimson">Siwalima High School</p>
            - Achieved 2 silver medals in MSK
            Physics during my first year of high school. 
            <p className="crimson"> Nursing Study Program at Tual (SouthEast Moluccas)</p>
            - Before deciding to switch my career to Full Stack Developer,
            I had experience in the field of nursing. As a Nursing Diploma (D3)
            student, I gained experience through internships in various hospital
            departments, including pediatrics, male and female wards, and the
            emergency department. Some of the hospitals I interned at were "Hati
            Kudus Langgur" Hospital and "Karel Sadsuitubun Langgur" Regional
            General Hospital, as well as several primary health centers. My
            thesis title was "Care and Management of Skin Integrity Damage in
            Children due to Diarrhea."
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
