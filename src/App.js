import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vcard from "./component/Vcard.js";
import React, { useState, useEffect, createContext } from "react";
import Index from "./component/Index.js";
import Event from "./component/Event";

export const EventContext = createContext();


const algoliasearch = require("algoliasearch");



const client = algoliasearch("5DGIE39UOX", "2014bcb9d00a8d90fdde4520df78b5b9");
const index = client.initIndex('contact_info');
const e_index = client.initIndex("event_info");


function App() {

const [contact, setContact] = useState([]);
const [event, setEvent] = useState([]);
const [ one_event, setone_event ] = useState();


useEffect(() => {
 fetch("https://connect.artba.org/api/events", {
   Meethod: "GET",
   headers: {
     "Content-Type": "application/json",
     Authorization: "Basic d2SuLwamTRQfEWqAuwBQ4zSTiSlq34mrICTaMeAIPS4=",
   },
 })
   .then((response) => response.json())
   .then((event) => {
     setEvent(event);
     console.log("event"+event);
   })
   .catch((err) => {
     console.log(err.message);
   });

     console.log("evenaftert" + event);
     console.log("eventId" + one_event);

  fetch(`https://connect.artba.org/api/registrations?eventId=${one_event}`, {
    Meethod: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic d2SuLwamTRQfEWqAuwBQ4zSTiSlq34mrICTaMeAIPS4=",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      setContact(res["Results"]);
      console.log(res["Results"]);
    })
    .catch((err) => {
      console.log(err.message);
    });
}, []);

var data = [];
console.log(data); //
console.log(typeof data);
for (var i = 0; i < contact.length; i++) {
  data.push(contact[i].Attendees[0]);
};
e_index.clearObjects();
e_index.saveObjects(event,{ autoGenerateObjectIDIfNotExist: true });

index.clearObjects();
console.log("event from page"+data);
index.saveObjects(data, { autoGenerateObjectIDIfNotExist: true });

 if (data === undefined) {
   return <>Still loading...</>;
 }
  const routeComponents = data.map(
    ({
      FullName,
      FirstName,
      AttendeeUniqueID,
      LastName,
      Email,
      Phone,
      CompanyName,
    }) => (
      <Route
        path={FirstName}
        key={AttendeeUniqueID}
        element={
          <Vcard
            FullName={FullName}
            FirstName={FirstName}
            LastName={LastName}
            Email={Email}
            ParentMemberName={CompanyName}
            Phone={Phone}
          />
        }
      />
    )
  );

  return (
    <div className="App">
      <EventContext.Provider value={{ one_event, setone_event }}>
        <BrowserRouter>
          <Routes>{routeComponents}</Routes>
          <Routes>
            <Route path="/" element={<Event />} />
            <Route path="/qr" contact={contact} element={<Index />} />
          </Routes>
        </BrowserRouter>
      </EventContext.Provider>
    </div>
  );
}

export default App;
