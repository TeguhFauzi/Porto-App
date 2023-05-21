import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
<Typewriter
  options={{
    strings: [
      "Full Stack Developer",
      "Front End Developer",
      "Back End Developer",
      "Sometimes i do power, sometimes dunno",
    ],
    autoStart: true,
    loop: true,
    deleteSpeed: 20,
    typeSpeed: 50,
    delay: 10 // ubah delay menjadi lebih pendek
  }}
/>


  );
}

export default Type;
