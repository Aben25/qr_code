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
      <NameContext.Provider value={{ name, url, setUrl, setName }}>
        <Row className="">
          <Col sm={4}>
            <Qr />
          </Col>
          <Col sm={8}>
            <Algo />
          </Col>
        </Row>
      </NameContext.Provider>
    </Container>
  );
}
