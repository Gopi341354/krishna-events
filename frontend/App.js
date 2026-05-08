import React, { useState } from "react";
import "./App.css";
import { QRCodeCanvas } from "qrcode.react";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketId, setTicketId] = useState(null);

  const bookTicket = async () => {

    const ticket = {
      name: name,
      email: email,
      eventName: "Krishna Events"
    };

    const res = await fetch("http://localhost:8080/book", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(ticket)
    });

    const data = await res.json();

    setTicketId(data.id);
  };

  return (

    <div className="container">

      <h1>Krishna Events</h1>

      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={bookTicket}>
        Book Ticket
      </button>

      {
        ticketId && (

          <div className="qr-box">

            <h2>Your QR Ticket</h2>

            <QRCodeCanvas
              value={ticketId.toString()}
              size={200}
            />

            <p>Ticket ID : {ticketId}</p>

          </div>
        )
      }

    </div>
  );
}

export default App;