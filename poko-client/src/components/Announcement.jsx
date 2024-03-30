import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;
const Announcement = () => {
  return (
    <div>
      <Container>Super Deal! Free Delivery on order above #20,000</Container>
    </div>
  );
};

export default Announcement;
