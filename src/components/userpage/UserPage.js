import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import "./UserPage.css";
import { Button } from "reactstrap";
import axios from "axios";
import {RiSurveyFill,RiDeleteBin6Line} from 'react-icons/ri'


const UserPage = (props) => {
  const [umfragen, setUmfragen] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("user_token");
    console.log(token);
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/umfrage`, { headers: headers })
      .then((response) => {
        console.log(response);
        console.log(response.data);

        setUmfragen(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [umfragen]);

  const GoCreate = () => {
    props.history.push("./umfrage");
  };

  const name = localStorage.getItem("user_name");
  console.log(name);

  console.log(umfragen);

  const saveUmfrageId = (id) => {
    localStorage.setItem("umfrage_id", id);
  };


  const deleteUmfrage = (id) => {
    console.log("click", id)
    let token = localStorage.getItem("user_token");
    console.log(token);
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    axios
    .delete(`${process.env.REACT_APP_BACKENDURL}/umfrage/${id}`, { headers: headers })
    .then((response) => {
      console.log(response);
      console.log(response.data);
      // setUmfragen(umfragen.filter((item) => item.id !== umfragen.id))
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <main className="UserPage">
        <header className="UserHeader">Wilkommen {name}</header>
        <div className="SubHeader">
          {umfragen.length > 0 ? (
            <p className='umfrageTitr'>Klicken Sie auf die Umfrage, um sich die Ergebnisse anzeigen zu lassen.</p>
          ) : (
              <p>Erstellen Sie ihre Umfrage</p>
            )}
        </div>
        <div className='centerContain'>
        <div className='umfrageContainer'>
          <div className="UmfrageListTitel">Ihre Umfragen</div>
          <div className='listTeil'>
          <ul className="UmfrageList">
            {umfragen.map((umf, index) => (

              <div className='divContainer'>
                <div className='loopContainer'>
                  <Link to="/auswertung" key={index} className="UserUmfrageList">
                    <div><RiSurveyFill className='iconServey2' /></div>
                    <div className='UserUmfrageListLi '><li onClick={() => saveUmfrageId(umf._id)} key={index} className='itemUmfrage' >
                      {umf.titel}
                    </li></div>
                  </Link>
                </div>
                <div className='div3'>
                  <button className='trash' onClick={()=>deleteUmfrage(umf._id)}><RiDeleteBin6Line className='delIcon' /></button>
                 
                </div>
              </div>
              
            ))}
             
          </ul>
          </div>
        </div>
        </div>
        <div class="d-flex justify-content-center">
          <Button
            color="primary"
            onClick={() => GoCreate()}
          // className="UserButton"

          >
            Neue Umfrage erstellen
        </Button>
        </div>
        <p className='hilfeTxt'>Um Ihre Umfrage zu löschen klicken Sie <RiDeleteBin6Line/>.</p>
      
      </main>

    </div>
  );
};

export default withRouter(UserPage);