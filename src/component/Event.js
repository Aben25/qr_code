import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Menu,
  SearchBox,
  Hits,
  Highlight,
  Index,
  saveObjects,
  clearObjects,
} from "react-instantsearch-dom";
import React, { useState, useEffect } from "react";
import Save from "./Save";


const searchClient = algoliasearch(
  "5DGIE39UOX",
  "68998baf7f780eeee9f1569b3394911b"
);




const Event = () => {
    const [event, setEvent] = useState([]);

    useEffect(() => {
      fetch("https://connect.artba.org/api/events", {
        Meethod: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic d2SuLwamTRQfEWqAuwBQ4zSTiSlq34mrICTaMeAIPS4=",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setEvent(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);
console.log(event);
<Save event={event}/>
    const Hit = ({ hit }) => (
        
      <p>
        <Highlight attribute="name" hit={hit} tagName="mark" />
      </p>
    );


    // var data = [];
    // console.log(data); //
    // console.log(typeof data);
    // for (var i = 0; i < contact.length; i++) {
    //   data.push(contact[i].Attendees[0]);
    // }

    

    // index.clearObjects();
    // index.saveObjects(event, { autoGenerateObjectIDIfNotExist: true });





    return (
      <InstantSearch indexName="event_info" searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    );
}

export default Event;
