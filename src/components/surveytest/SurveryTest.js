import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import Danke2 from "../../components/danke/Danke2";
import "./SurveyTest.css";

const ServeryTest = (props) => {
  const { id } = useParams();

  const [antwortOption, setAntwortOption] = useState([]);
  const [antwortListe, setAntwortListe] = useState([]);
  const [display, setDisplay] = useState(false);
  const [umfrageTitel, setUmfrageTitel] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/umfrage/${id}`)

      .then((response) => {
        console.log(response);
        console.log(response.data);
        setAntwortOption(response.data);
        setUmfrageTitel(response.data[0].titel);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line
  }, []);

  const addAntwortToListe = (antwortArgument, frageIDArgument) => {
    const aktuelleAntworten = [...antwortListe];
    const neueAktuelleAntworten = aktuelleAntworten.filter(
      (objekt) => objekt.frageID !== frageIDArgument
    );
    neueAktuelleAntworten.push({
      frageID: frageIDArgument,
      antwort: antwortArgument,
    });

    setAntwortListe(neueAktuelleAntworten);
  };

  const payload = { antworten: antwortListe };

  //    Payload Daten muss wie unten sein.

  //  const payload ={
  //   "antworten":[
  //      {"frageID": "6083cec026d9b59b5a1615b3","antwort" : "Zu Fuß" },
  //      {"frageID": "6083cec026d9b59b5a1615b4","antwort":"Japanisch"},
  //      ]
  //   }

  const surveySend = (e) => {
    axios
      .post(`${process.env.REACT_APP_BACKENDURL}/antwort`, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setDisplay(true);
  };

  return (
    <div>
      {display ? (
        <Danke2 />
      ) : (
        <main className="SurveyTest">
          <header className="SurveyHeader">
            Bitte teilen Sie uns Ihre Meinung mit.
          </header>
          <div className="SurveyList">
            <ul style={{ listStyleType: "none" }}>
              <div className="SurveyTitel" style={{ fontWeight: "bold", textAlign:"center" }}>
                {umfrageTitel}
              </div>
              <form action="" onSubmit={surveySend}>
                {antwortOption.map((frg, indexfrage) => {
                  return (
                    <li key={indexfrage}>
                      <p
                          style={{
                          fontSize: "15px",
                          margin: "0",
                          marginTop: "20px",
                          marginBottom:"10px",
                          fontWeight: "bold",
                          textAlign:"center",
                          color:"#0069D9"
                        }}
                      >
                        {frg.frage}{" "}
                      </p>
                      {frg.antworten.map((antwort, indexantwort) => {
                        return (
                          <div key={indexantwort} className="AuswahlsListe">
                            <p style={{ display: "none" }}>{frg._id}</p>
                            {/* <label >{ant}</label> */}
                            <input
                              id={frg._id}
                              type="radio"
                              name={indexfrage}
                              value={antwort}
                              onChange={() =>
                                addAntwortToListe(antwort, frg._id)
                              }
                              key={indexantwort}
                            />
                            <span className="SelectionText">{antwort}</span>
                          </div>
                        );
                      })}
                    </li>
                  );
                })}
                
                <div className="d-flex justify-content-center">
                  <Button color="primary mt-3">Senden</Button>
                </div>
              </form>
            </ul>
          </div>
        </main>
      )}
    </div>
  );
};

export default withRouter(ServeryTest);
