import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Qr from "./Qr";
import Algo from "./Algo";
import { useState, createContext, useContext } from "react";

export const NameContext = createContext();


export default function Index() {
const [url, setUrl] = useState(window.location.href);
const [name, setName] = useState("John Doe");

  return (
    <Container>
      <Row className="justify-center m-5">
        <Col> </Col>
        <Col sm={6}>
          <NameContext.Provider value={{name,url, setUrl,setName}}>
            <Qr />
             <Algo />
          </NameContext.Provider>
        </Col>
        <Col> </Col>
      </Row>
    </Container>
  );
}
