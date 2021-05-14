import React from "react";
import {Link} from 'react-router-dom'
const Danke2 = () => {
  return (
    <div>
      <main className="Danke" style={{marginLeft:"20px"}}>
      <div className="Danke2Titel">Vielen Dank für Ihre Teilnahme bei Polly.</div>
      <p className="Danke2Text">
      Möchten Sie ihre eigene Umfrage erstellen? Dann <Link to="/signup" style={{ color: "blue", textDecoration:"none" }}>registrieren</Link> Sie sich bei uns und schon kann es losgehen.
      </p>
      </main>
    </div>
  );
};

export default Danke2;
