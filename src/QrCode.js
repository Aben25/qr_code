import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  RefinementList,
  Panel,
  Pagination,
} from "react-instantsearch-dom";
import html2canvas from "html2canvas";
import { Button, Card, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const searchClient = algoliasearch(
  "5DGIE39UOX",
  "68998baf7f780eeee9f1569b3394911b"
);

const QrCode = ({ contact }) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("John Doe");

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

  function Hit({ hit }) {
    return (
      <div>
        <div className="hit-name">
          <Highlight attribute="name" hit={hit} />
        </div>
        <div className="hit-description">
          <Highlight attribute="Name" hit={hit} />
        </div>
        <div className="Email">{hit.Email}</div>
        <Button 
          variant="secondary"
          onClick={() => {
            setUrl(window.location.href + "" + hit.FirstName);
            setName(hit.Name);
          }}
        >
          Generate QR code
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <div id="print">
        {name}
        <br></br>
        {qrcode}
      </div>
      <Button variant="success" type="button" onClick={handleDownloadImage}>
        Download
      </Button>
      <InstantSearch searchClient={searchClient} indexName="info">
        <Configure hitsPerPage={3} />
        <div className="search-panel">
          <div className="search-panel__filters">
            <Panel header="Search for contact information">
              <RefinementList attribute="Search for contact information" />
            </Panel>
          </div>

          <div className="search-panel__results">
            <SearchBox
              className="searchbox"
              translations={{
                placeholder: "",
              }}
            />
            <Hits hitComponent={Hit} />
          </div>
        </div>
      </InstantSearch>
    </Container>
  );
};

export default QrCode;
