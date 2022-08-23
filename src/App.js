import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vcard from "./Vcard.js";
import QrCode from "./QrCode";
import React, { useState, useEffect } from "react";



function App() {

const [contact, setPosts] = useState([]);
useEffect(() => {
  fetch("https://connect.artba.org/api/members?pageSize=100", {
    Meethod: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic d2SuLwamTRQfEWqAuwBQ4zSTiSlq34mrICTaMeAIPS4=",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data['Results']);
      setPosts(data["Results"]);
    })
    .catch((err) => {
      console.log(err.message);
    });
}, []);

  const routeComponents = contact.map(
    ({
      FirstName,
      Name,
      UniqueID,
      LastName,
      Email,
      Phone,
      ParentMemberName,
    }) => (
      <Route
        path={FirstName}
        key={UniqueID}
        element={
          <Vcard
            FirstName={FirstName}
            LastName={LastName}
            Email={Email}
            ParentMemberName={ParentMemberName}
            Phone={Phone}
            Name={Name}
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
          <Route path="/" contact={contact} element={<QrCode />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
