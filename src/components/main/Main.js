import React from "react";

import { Link } from "react-router-dom";
import "./Main.css";
const Main = () => {
  return (
    <div>
      <main className="Main">
        <header className="MainHeader">
          Ihr Umfrage Erstellungs-Service Polly
        </header>
        <div className="Ueberuns">
          <div className="MainArtikelTitel">Unsere Arten von Umfragen</div>
          <p className="MainArtikel">
            Nur mit Feedback können Sie sich weiterentwickeln! Darum sind wir
            für Sie da! Mit der Unterstützung von Polly dem UmfrageService,
            können sie im Handumdrehen ihre individuellen Umfragen erstellen.{" "}
          </p>
        </div>
        <div className="">
          <ul className="Anleitung">
            
            <li className="Acard c1">
              <div className="MainArtikelTitel">Erstellen</div>
              <p>
                Unter ihrem persönlichen Nutzer Account können Sie beliebig
                viele Umfragen anlegen. Dabei entscheiden Sie, wieviele Fragen
                Ihre individuelle Umfrage beinhaltet. Um die Bereitschaft zur
                Teilnahme durch ihre Kunden an der Umfrage zu erhöhen, sowie zur
                genaueren Analyse ihrer Marktdaten, haben unsere Erfahrungen
                gezeigt, das es sich anbietet nicht mehr als 4 Antwortoptionen
                zu geben. Weitere Best Practice Tipps zum Erstellungen ihrer
                Umfragen finden sie auf unserer{" "}
                <Link to="/hilfeseite" style={{ color: "yellow",textDecoration:"none" }}>
                  Hilfsseite(Link zur Hilfseite)
                </Link>
                .
              </p>
            </li>
            
            <li className="Acard c2">
              <div className="MainArtikelTitel">Teilen</div>
              <p>
                Nach dem Erstellen iher Umfrage erhalten Sie von uns ihren
                persönlichen Link, sowie einen QR Code, welchen Sie mit ihren
                Kunden teilen können. Damit bleibt die Umfrage für Ihre Kunden
                anonym. Unsere Erfahrungen haben gezeigt, das es Ihren Kunden so
                leichter fällt, offenes und ehrliches Feedback zu geben.
              </p>
            </li>
            <li className="Acard c3">
            <div className="MainArtikelTitel">Ergebnisse erhalten</div>
              <p>
                Mit Polly halten sie die Zufriedenheit Ihrer Kunden im Auge. Auf
                der Auswertungsseite ihrer Umfrage halten sie stets die aktuelle
                Teilnehmerzahl ihrer Umfrage im Blick. Die Verteilung der
                gewählten Antworten können sie immer aktuell und auf einen Blick
                auf unseren Antwortcharts nachvollziehen.
              </p>
            </li>
          </ul>
        </div>
        
      </main>
    </div>
  );
};

export default Main;
