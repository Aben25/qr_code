import React from 'react'
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
import { Button, Card, ListGroup } from "react-bootstrap";
import { useContext } from "react";
import { NameContext } from "./Index.js";
export default function Hit({ hit}) {
const { setName, setUrl } = useContext(NameContext);



  return (
    <div>
      <div className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="Name" hit={hit} />
      </div>
      <div className="Name">{hit.FullName}</div>

      <div className="Email">{hit.Email}</div>
      {hit.Email.length === 0 ? null : (
        <Button
          variant="secondary"
          onClick={() => {
            setUrl(window.location.href + "" + hit.FirstName);
            setName(hit.FullName);
          }}
        >
          Generate QR codeP
        </Button>
      )}
    </div>
  );
}
