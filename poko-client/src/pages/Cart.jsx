import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 60vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQj/xAA7EAABAwIDBQYEBAUEAwAAAAABAAIDBBEFEiEGEzFBUSIyYXGRoRRCgcEVUtHhByNicrEzY5LwJDRT/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAUBBv/EAC4RAAICAgEDAwIEBwEAAAAAAAABAgMEESESQVEFMWETIjKBkaEjQmKx0fDxFP/aAAwDAQACEQMRAD8A7iiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCLBr8VpMPaDVTNYTwBOqxY9oaN7GPLrRv7ruIU1XNraRVK+uL02TCKiORsjA9hDmEXBCrUC0IiIAiIgCIiAIiIAiIgCIiAIi810QGLWYhT0MQkq5WxtJsLheUeJUta29LURyC/ylct/i1NVvxWB1DLnEcOWSNpALTcn68RwWl4XtTVU8945t1O03LxpmHR3Qaea2QxlKCe+TBZkzjN9KTSPpG5Xq0zZbbimxWnYKppikuWOcdO0PBbiHAi4t9FibXU490dDpl0qTXD5RUiIvTwLHrKplHSS1M3ciYXu+iuvkDGuc4gAczyXLv4o7XR/hslDQyXa7vvGl/AKyqtzfwU3WqtfLOdbV7U1GJ4s6R0rspda3KxXQqmUbmFgtu2NytBNhoFx/CcKrcbrBFAw7sayTOHZjHU/Yc10vEatz3Mhp7FjG27WlrCxJvw811Mfcm/BycmKSUV7m57G4+xg+EqZBldJljdfQG3BbwuCYXVGsxalpqUnd59HDmb9p3t7Lr2yWK/ieHuLnhz4pC068uRWbMqSfXE2YVstdEvyJ5ERYDoBERAEREAREQBERAEREAWBjVW6hwqoqWC5jbf91nrUdvq4DDJMMYRvaiM87HTp56qM5KK22WVVysmoxWzkO1+Kx5txC4STT6ueXXyjr66WWo913AuLrEX1/6eRKyqqirjVWFHVHiw3iNwOWqu0+DYnPJcU+4bzfM8RtHXiuhHIrcVuXt5Zklh3KbShy/CJTB8SdRQRND/AOYG3JPXouo7L/xFjlENLjbNzI4WZOAcrj08/BcbMbYqh0IlY97eO7cHC/gRxUhA1x7MZu3po4emqlTg1alJPfVyRzfULZ9EGuno41/k+kmVtPJFvGTxFlr5g4EKIxPaiko2uEQdLIByabLjmH1NRR9mncAS7ulxt5c1mvxuqYDvKmJpJvcO+5KsjgRT5eznz9Qsa1FaJ/GtocaxJrmwUz428s53YHrZaw7Zpk0nxONV29eNTFELADzP6LFrMabIHB2IgHnu3tbf/vmo+giOKY1TU0ss0kcsoa4OkJu1XuqCj8IprdkpfLJ2rxTDqGnNNS5Y4m92KE3JPU+Pmteq8TmqwQQWRki7L6u6XP24BY9dTPoayaklaGvjcW/3a8Vt2yOzeQNxPEo8jR2oo5NOHzO8F7O2NcN9i6vHblrueUFKdn8Ekr6huSuqmiKGPnGD97fZTGwGNGhrXCU2gfZjs2nkR+i1fGcSdjWJPla4imgGWMHpfj5kq7SS7pjGMPavfzXMzsh008/il+x2vSsFZV/9Ef3Z35rw9rXsIc12oI5qtadsJjXxMBoZnXfGLsPh0W4rHXNTj1ItyKJUWOEgiIplIREQBERAEREAREQFDnhjS55AA4nouA7fY/8AFY1UuFLWOa15YHsHZIB5dV13butNBs7LKJGMLpGsu51r35LkFfK6sjcY4o21Lfle4gO+o4H1BWLJnyotcHZ9Mp+2Vilz+prcFW6U5iydobxaeI8uqsVtdO1l4wADqb6uHkqpp5jIWyU0MbhcWEmY3+l1izNkmkL3SEEi1gdFuxMNuX3w4KM/1JdGqrefCWv+FVGG1EdmvOccWnQhSFHWT0VO6OjOV7+84vtf2WDTwQCVkuQ528DdZr3Zj9l3IRaXJ8tZPngwDv3uLpI5C4m5JublXWMazvgDwsL+iyHNLuA9lS6OzbjQ8zxIU9Hn1NlJfdpbYOB5OaD7BSmy0zKbH6KWRwEbZACelwR91gQu3Xdc36tCx4yc0smUtDpLtHTr7gryS2teT1PXPg7Y+kp5ZWyyU8TpG6Ne6NpI+q1bbfGXBgwmjdeeSwnIN7Dk2/ueg0WtN2pxo0+4+LOTLlzZRnt/dxWLS9i8kjiZZOBdyHMk9Vz1SqU7LHwjbGcsiSqqXLMgMZHG2NtyBc3A4nndXYnkO07VrHTkqsOoKrEnBlNEbWIMl7MF/FblhGz1JQFs1TaqqeLbjsNPUDmuLYrMqxzfsfWV2UenUqpPb/uzM2CwuqhlZitWXQ07WndtcLOlJFuHRdIp52VEe8jOi0czSP1zG/VbJgcojhyPcALXWuFEa4aicXJyJZFnXImUVDHteLsIIRDOVoiIAiIgCIiAK26RrGlzyGtAuSVXdc/2mxiuq4KylpKhkQJLWZ2aC3I+HVVW2qtbZoxseV8tIg/4h4lTY7npt7KYInAsyDS48CtEgEFKw02aqlbwtJJa3gLWPusmbD8XEpFZitO0EdqOOM6+Vreqj8Yw+E0zXx1VxH3jfKSD/lZa3O2arczuOurHqdsa3tL82v8AfgpxOKl3MXwMUUV75o2uJcfE6qLuS27G5j5qRw2kEbXEgHNob8wslzWmPdgMLOjWWX1GNRKutRlLZ8Vl5dd1znGPSvCIWmbVVMhyuMcbe85g9rrMe8RkRx2fMeV9As0ObGAGtAA4DosSF0FO4uMUj3ng7e2IV6joy9am/YvxYXNIzNUSuHhwKplg+HbqXPA5PH3V1+KSSsyFmbxL7H2CsPkMmpY2/M66+69eht9yywhxIA1HeHRVBpcdSfJXWx8G2AHJTWCbP1GJODiDHADq8jveSjKSgtyPUnOWoojsNw+eunywsLraacLrcsM2YjZaSvfvLG+6HdH15qeocPgoadsFMwNa3nzPmrs8ohYH20LwD1APNcrIs+s0ux18WMsdNxfL7iONkTQyFjY2N4NaLAKipk3TGvaOyHDP5HS6uZuqZA9jmOGjgWnyKq1os2X6dutiDqdFnmobHH2RqRYAKIoHytBp33L4zlBtxHIrZsJwpxc2eqFrd1vVHLR4SeFxPio2CXvE5ivFmW0siqB6iIgCIiAIiofII2FzyGtAuSUBqe3O1I2fZTxPima2qJa2djMwDvy+a5lNj1NLJLLThtREXFz3w99hPNzSPdbRtrjMeL1EbaZjnspw7KM1uPF1vLT16rmOM4W5z/iads0UnXu291dZ6TO2PU3p+D3D9chRPoUE157ktWRvxSlIoKx0czb5Y5G2cRzF1AU3xYkeKuQtjjBL7i1rDmsKOqrojffEvFuLdVKSbyqpXfEyEvewF7wLk6j7L3BwpVv74p+POy31T1ONyX0pSTfDXbRfjqJZYc9NDHkta7nanxsrM81XHrkiDDwdY2/ysummbazXx25BzSLLM3x7QETXEC/Ze0gDyXc6eD5vhP2IZjquRgdliseNgdPdWH5ySJGWI4kXt5ealpXRNjMjyY2O+UCxd5D78FgySPqHZsuUDuga5VFonteCwGH5Vm0lLLM8MiY57zwaBclZuDYLUYjJlhbZgPakPALoWEYPTYVDaEZpC3tyHi79PJZ7b1Xx3LqqJWc+yITBtk2R5ZsSs944Rch5nmtpYxrGta0WDRYWFrKmpzmle2FxEgaSD4qinlE0LJRwc26507JTe5HSrrjWtRKYJXPa/eWD43lrgPPT1FlVI3eMLCNCLFUvjc2dsjQbSDK8HqBcH0upjD8GqJ+04ZGdSoN6JkPTtf2muAL2uLT0UtQYXPUm4aQ3qVsFLg1HA4vEZc4/mUiGgCwAA6KDkCPpMIpach5ja+YfOVIWQC3BeqICIiAIi8ugPV5fRRuIY3RUGk8wL/yM1K1XFtsnyt3dC0xD819VfVjWWey4Mt2XVV7vk27EMVpaBhM0gz8mDiVp+0u1HxNK+nhbumP4m+rx08FqdVickji4yXJ49pRkspe7tFp8Dcrq04MK9OXLOXbm228LhFyapANmtssGVz3nUP4cLryQtYQXuaL8BzP0QagOAMTbddf2W1yRnSUSLkwtji+XNYHiOenFe7prY7aCNzeRuLeBWc9rHsbnO7j1sD91iEtDQ2NuUXNgABe6p1yXdTa2zFiyQnWaJreosbfRVS14sRC3M4C2d3D6BUz5S7M7U8zzK8pKKesnZHTRPkeeGUXUZPRbHktC8jzI67jzcTdbXs9sw+ryz1gMcfJvAuUxgGydPQ5Zq7LJUcm/Kw9PErZY3tNwxwIBsR+XwWC3J/lgbacbvP8AQtwwwUcccUTWsbwYwc/3VvEmudT7yK+8hcJR424j0uqquMyR3bpIwhzD4hSuF4bNWhrspbF+Zwssbfdm4wIiJmNdHrmsQOdipDDNnqkv/mWjiccwvy8LLZKHC6ShZlp4gPE6lZllW5HpiUmHU1MzKyMO1vd+pWXZeoongREQBERAEREBS9+VpNibC9gLrm2ObYVFXK+KlcYYASLDi7zW+4u1/wADI6Nzg9lnNIPBc+2hoGYvSy1NMwMxSNpdZg0qW8x/d/lacWUFP70Zcuuydf8ADZq1XWVDtRM1x6vFvdYb6uq6Qf8AM/oos4o0Am9ra+SodXA/MV2lNHD+lNdjOlqav5HUw82ud+iw3TYjI3K6aBo/pZY+vFY0lYDwcrTqsnhdeOXyXRhJdiQjk3V7xhj7Xcb3zeN+J+y9NV2S0kgHjZR/xTrnKy7gbgefH1WRT4ViFdIRTQyOYT2X2s314KLmkuSSpcmeGdgcXXJI5uOYj6Klr5aiRsdOx75HC2VguT6LZ8L2JYHiTEpw7T/Th5+bv2W2UVHTUTN1RU7Ih/tixPmeJ9VmnlxXEeTXDCk+ZGm4RsdVT5ZMScadh4RixkP2C3KhoKPCoMlLEI2k94m5J8TzV+IuklkjsYzG6xuOOl7q++niljdFbPmFs3Cyx2Wyn+I3V1Rr9ilpNxrw5K1HTyNrzu2EtmHaDeTh+2n0Uvh2C1dRG10zRHfib/ZbHQYdDRN7Au+1s3gqHLXsWkZhmCG7ZqsAW1DT91PgWtbgOSWXqrAREQBERAEREAREQBERAWKt8TYXiZ1muaQVz+seyOufBHIWyA5mDgXDqF0KenjnZkkbccvBc72k/hnPic/xNHjEkUoOZuYd0+FuCi20ycenuRWIbPYTiUjpammfHO49qWnfkJ822Lb+NlGu2Gws9yprfq5n6KSn2d27o2QMIo8QbFKHOdG/dvkaL9k8ufRXPiMUp/8A3tmcUi8YWtlHq0q+N8kuGVSpg37EG7YOjv8Ay6yoFuIc1pV2HYrDmf6ssr/Nwb/gLNxTGGtw+fcUOItqMoLQaN7cxDhzsR7q9HtNhQZcmpjP9VLILeyn/wCib7kfow8FMOBYPQRiQxNa1pAzv146D3UwxjQAGtAsCFC1O0eET0kkLm1MrZGFjgKd3A+YVeG4+19PCx9JK6XKGkk6XVbnv3ZYo69kSEjpo8Rha4f+PKwgEDuSA8/Me4UnGwN0YP1VmCoimFnM0vfQXUtDDe2Vt7qLsJaMJtK50udztcuU3563/X1UhR5aZ2cAPd1ssyLC5XCxAH9yyW4WPmkH0Cj1NjgtNxOW98nZ6rJGJMtctF/Netw2INsXFXDQQEWs71Xg4LYxOP8AL7qo4lEq/goR8p58+qo/D4z8xTk84KTibB8nuqDiZ/8Anb3V12HsPAn1Vr8Lbycf8oe8FAxQ/kHosiLEGO7wyq1+Hf1D1/ZeDDnc3koODPjlZJ3HAq4rEEDIe7cK+vSIREQBERAF5ZeogPLBLL1EB5YKl0TH95jT5gKtEBivw6hk79HTu84mn7Kn8Kw6wHwNNp/tNWYiAxRh1G3hTxjyCusp4o7ZGAWV1EAREQHltV6iIAiIgPLL1EQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB//2Q==" />
                <Details>
                  <ProductName>
                    <b>Product:</b> JESSIE THUNDER
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 4646337536
                  </ProductId>
                  <ProductColor color="blue" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ 40</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            <Product>
              <ProductDetail>
                <Image src="data:image/jpeg;base64,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" />
                <Details>
                  <ProductName>
                    <b>Product:</b> Sketchers
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 4646337536
                  </ProductId>
                  <ProductColor color="pink" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ 40</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 86</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 4</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -2</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 86</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
