import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import Modal from "react-modal";
import { withRouter, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Modal.css";
import axios from "axios";

const Login = (props) => {
  const [modalIsOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    props.history.push("/");
  };

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    successMessage: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // login mit email und password
  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length) {
      const payload = {
        email: state.email,
        password: state.password,
      };
      console.log(payload);
      axios
        .post(`${process.env.REACT_APP_BACKENDURL}/user/login`, payload)
        .then((response) => {
          console.log(response);
          localStorage.setItem("user_token", response.data.token);
          localStorage.setItem("user_name", response.data.name);

          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,

              // "SuccessMessage":"Login successful. Redirecting to home page.."
            }));

            props.setOutApp(true);

            redirectToUser();
            console.log(null);
          } else {
            alert(`Some error occurred`);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Invalid Email or Password");
        });
    } else {
      alert("Please enter valid name and password");
    }
  };

  const redirectToUser = () => {
    const userPage = localStorage.getItem("user_token");
    console.log(userPage);
    if (userPage) {
      props.history.push("./userpage");
    } else {
      props.history.push("/");
    }
  };

  const redirectToRegister = () => {
    props.history.push("./signup");
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    sendDetailsToServer();
  };

  const responseSuccessGoogle = (response) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKENDURL}/user/googlelogin`,
      // url: `http://localhost:5000/user/googlelogin`,
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log(response);
      localStorage.setItem("google_id", response.data.token);
      localStorage.setItem("user_name", response.data.name);
      localStorage.setItem("umfrage_id", response.data.token);
      const userPageGoogle = localStorage.getItem("google_id");
      console.log(userPageGoogle);
      if (userPageGoogle) {
        props.setOutApp(true);
        props.history.push("./userpage");
      } else {
        props.history.push("/");
      }
    });
  };

  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
        contentLabel="Selected Option"
      >
        <h1>Anmeldung</h1>
        <Link to="/">
          <i onClick={closeModal} className="closeBtn fas fa-times"></i>
        </Link>

        <Form action="" className="form">
          <FormGroup className="">
            <Label htmlFor="InputEmail">E-mail</Label>
            <Input
              type="email"
              className=""
              id="email"
              placeholder="bitte E-Mail eingeben"
              value={state.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="">
            <Label htmlFor="InputPassword">Passwort</Label>
            <Input
              type="password"
              className=""
              id="password"
              placeholder="bitte Passwort eingeben"
              value={state.password}
              onChange={handleChange}
            />
          </FormGroup>
          <div class="d-flex justify-content-center">
            <Button color="primary" onClick={handleSubmitClick}>
              Anmelden
            </Button>
          </div>
        </Form>

        <div className="">{state.successMessage}</div>
        <div className="G_login">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLECLIENTID}
            buttonText="Anmelden mit Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="mt-2">
          <span className="modalText">Noch kein Nutzerkonto? </span>
          <span className="loginText" onClick={() => redirectToRegister()}>
            Registrierung
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(Login);
