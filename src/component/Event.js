import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Menu,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  Panel,
  RefinementList,
} from "react-instantsearch-dom";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EventContext } from "../App";



const searchClient = algoliasearch(
  "5DGIE39UOX",
  "68998baf7f780eeee9f1569b3394911b"
);

const Hit = ({ hit }) => {
const setone_event = useContext(EventContext);
    const navigate = useNavigate();

  return (
    <div className="hit">
       <a onClick={({}) =>{  setone_event(hit);
   navigate("/qr");} }>
     <div>
       <div className="hit-name">
         <Highlight attribute="name" hit={hit} />
       </div>
       <div className="hit-description">
         <Highlight attribute="Name" hit={hit} />
       </div>
     </div>
   </a>
    </div>
  );
}




const Event = ({ seteventId }) => {
  return (
    <InstantSearch searchClient={searchClient} indexName="event_info">
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
          <Hits seteventId={seteventId} hitComponent={Hit} />
        </div>
      </div>
    </InstantSearch>
  );
};

export default Event;
