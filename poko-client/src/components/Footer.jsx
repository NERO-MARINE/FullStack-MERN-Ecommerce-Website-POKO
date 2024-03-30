import React from "react";
import styled from "styled-components";
import Facebook from "@mui/icons-material/Facebook";
import X from "@mui/icons-material/X";
import Pinterest from "@mui/icons-material/Pinterest";
import Instagram from "@mui/icons-material/Instagram";
import { MailOutline, Phone, Room } from "@mui/icons-material";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#f9f4f4" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Poko</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem omnis
          corporis odit hic earum voluptatum atque vero, nisi dolorem harum.
        </Desc>
        <SocialContainer>
          <SocialIcon color="385999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <X />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>WishList</ListItem>
          <ListItem>Account</ListItem>
          <ListItem>Terms</ListItem>
          <ListItem>Woman Fashion</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 105 mkt road, Ugheli, Delta
          State
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +234 7064938397
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> info@poko.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" alt="payment" />
      </Right>
    </Container>
  );
};

export default Footer;
