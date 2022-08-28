import React from 'react'
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useContext } from "react";
import {NameContext} from "./Index.js";



export default function Qr() {
  
    const {name,url} = useContext(NameContext);
    const handleDownloadImage = async () => {
      const element = document.getElementById("print"),
        canvas = await html2canvas(element),
        data = canvas.toDataURL("image/jpg", 1.0, canvas.width, canvas.height),
        link = document.createElement("a");
      link.href = data;
      link.download = "downloaded-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const qrcode = (
      <QRCodeCanvas
        id="qrCode"
        value={url}
        size={300}
        bgColor={"#FFFFFF"}
        level={"H"}
      />
    );
  return (
    <div>
      <div id="print">
        {name}
        <br></br>
        {qrcode}
      </div>
      <Button variant="success" type="button" onClick={handleDownloadImage}>
        Download
      </Button>
    </div>
  );
}
