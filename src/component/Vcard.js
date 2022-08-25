import React from "react";
import vcard from "vcard-generator";
import { saveAs } from "file-saver";
import { Button, Card, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Vcard({ FirstName, Name, LastName, Email, Phone, ParentMemberName }) {
  var FileSaver = require("file-saver");
  var blob = new Blob(
    [
      `BEGIN:VCARD
VERSION:3.0
N:${LastName};${FirstName};;;
FN:${Name} ${LastName}
EMAIL;type=INTERNET;type=pref:${Email}
END:VCARD
`,
    ],
    {
      type: "text/vcard;charset=utf-8",
    }
  );
  function saveAsFile() {
    saveAs(blob, `${FirstName}.vcf`);
  }
  console.log(Phone);
  return (
    <Container>
      <Row className="justify-center m-5">
        <Col> </Col>
        <Col sm={6}>
          <Card border="info" style={{ width: "23rem", textAlign: "left" }}>
            <Card.Header> {Name}</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>First Name: {FirstName}</ListGroup.Item>
                <ListGroup.Item>Company: {ParentMemberName}</ListGroup.Item>

                <ListGroup.Item>Email: {Email}</ListGroup.Item>
                <ListGroup.Item>Phone: {Phone}</ListGroup.Item>

                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
              <Button onClick={saveAsFile}>Download vCard</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col> </Col>
      </Row>
    </Container>
  );
}
