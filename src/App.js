import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vcard from "./component/Vcard.js";
import React, { useState, useEffect } from "react";
import Index from "./component/Index.js";
const algoliasearch = require("algoliasearch");



const client = algoliasearch("5DGIE39UOX", "2014bcb9d00a8d90fdde4520df78b5b9");
const index = client.initIndex('contact_info');

function App() {

const [contact, setPosts] = useState([]);
useEffect(() => {
  fetch(
    "https://connect.artba.org/api/registrations?eventId=186a780b-7862-4542-9ada-13cd0f5e752f",
    {
      Meethod: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic d2SuLwamTRQfEWqAuwBQ4zSTiSlq34mrICTaMeAIPS4=",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      setPosts(data["Results"]);
      console.log(data["Results"]);
      console.log(typeof data["Results"]);
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

index.clearObjects();
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
      <BrowserRouter>
        <Routes>{routeComponents}</Routes>
        <Routes>
          <Route path="/" contact={contact} element={<Index/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
