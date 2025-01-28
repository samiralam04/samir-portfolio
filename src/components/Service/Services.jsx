import React from "react";
import { MdDevices } from "react-icons/md";
import {  MdSettings } from "react-icons/md";
import { MdBugReport } from "react-icons/md";
import styled from "styled-components";
import Card from "./Card";
import { Slide } from "react-awesome-reveal";


const Services = () => {
  return (
    <Container id="service">
      <Slide direction="down">
        <h4>
          My <span className="green">services</span>
        </h4>
        <h1>What I Do</h1>
      </Slide>
      <Cards>
        <Slide direction="left">
          <Card
            Icon={MdDevices}
            title={"Frontend Development"}
            disc={`Designing responsive and user-friendly interfaces using modern tools like HTML, CSS, JavaScript, and frameworks like React to enhance user experiences.`}
          />
        </Slide>
        <Slide direction="up">
          <Card
            Icon={ MdSettings}
            title={"Backend Development"}
            disc={`Creating secure and efficient server-side applications with Java Servlets and PostgreSQL for seamless data handling and application logic.`}
          />
        </Slide>
        <Slide direction="right">
          <Card
            Icon={MdBugReport}
            title={"Debugging and Optimization"}
            disc={`Identifying and resolving bugs, improving code performance, and optimizing applications to ensure smooth and error-free functionality.`}
          />
        </Slide>
      </Cards>
    </Container>
  );
};

export default Services;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  @media (max-width: 840px) {
    width: 90%;
  }

  h1 {
    padding-top: 1rem;
  }
`;
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 4rem;
  gap: 1rem;
`;
