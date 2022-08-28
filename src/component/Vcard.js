import React from "react";
import vcard from "vcard-generator";
import { saveAs } from "file-saver";
import { Button, Card, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Vcard({
  FirstName,
  FullName,
  LastName,
  Email,
  Phone,
  ParentMemberName,
}) {
  var FileSaver = require("file-saver");
  var blob = new Blob(
    [
      `BEGIN:VCARD
VERSION:3.0
N:${LastName};${FirstName};;;
FN:${FullName} ${LastName}
EMAIL;type=INTERNET;type=pref:${Email}
TEL;type=WORK,VOICE:${Phone}
ORG:${ParentMemberName}
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
  return (
    <Container>
      <Row className="justify-center">
        <Col sm={0}>
          <Card border="info" style={{ width: "23rem", textAlign: "left" }}>
            <Card.Header> {FullName}</Card.Header>
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
      </Row>
    </Container>
  );
}
