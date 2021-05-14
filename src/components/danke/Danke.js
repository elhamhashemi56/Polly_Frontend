// import axios from 'axios'
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import QRCode from "qrcode.react";
import "./Danke.css"

const Danke = (props) => {
  useEffect(() => {}, []);

  const linkinfo = `${process.env.REACT_APP_FRONTENDURL}/antwort/${props.surveyId}`;

  return (
    <div>   
     <main className="Danke">
      <header className="DankeHeader">
      Vielen Dank für die Erstellung Ihrer Umfrage.
      </header>
      
      <div ClassName="DankeList">
      <div className="DankeMessage">Unter dem Link unten können Sie sich Ihre Umfrageergebnisse anzeigen lassen.</div>
      <Link to={`/antwort/${props.surveyId}`} target="_blank" >
        <div className="DankeLink">{linkinfo}</div>
      </Link>
            
      <div className="DankeMessage">Zur Umfrageteilnahme kopieren Sie bitte den unteren Link und senden diesen an Ihre Kunden.</div>
      
      
      <input
        id="copy"
        type="text"
        value={linkinfo}
        className = "DankeShareLink"
        />
      
      <div className="d-flex justify-content-center">
      <Button
        color="primary"
        onClick={(e) => {
          const copyText = document.querySelector("#copy");
          copyText.select();
          document.execCommand("copy");
        }}
        style={{marginLeft:"10px"}}
      >
        Link kopieren
      </Button>
      </div>
      
      
      <div className="DankeMessage">Sie können auch den QR Code unten an ihre Kunden weiterleiten.</div><br/>
      <div class="QrCode">
      <QRCode value={linkinfo}/>
      </div>
      </div>
      
      </main>
    </div>
  );
};

export default Danke;
