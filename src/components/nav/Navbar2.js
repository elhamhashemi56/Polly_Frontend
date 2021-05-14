import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import PollyLogo from '../../img/pollylogo.png'
import { withRouter } from "react-router-dom";
const Navbar2 = (props) => {
  
  const [isMobile, setIsMobile] = useState(false)
  
 const logout =()=>{
   localStorage.removeItem("user_token")
   localStorage.removeItem("user_name")
   localStorage.removeItem("umfrage_id")
   localStorage.removeItem("google_id")
   
   props.setOutApp(false);
   props.history.push("/");
   
 } 

  return (
    <div className="navContainer">
    <nav className="navbar">
      <Link to="/"><img src={PollyLogo} alt="" className="Logo"/></Link>
      
      
      <ul className={isMobile ? "nav-links-mobile": "nav-links"}
      onClick={()=> setIsMobile(false)}
      >
       
       <Link to="/userpage" className="navMenu">
            <li>Benutzerseite</li>
        </Link>
        
        <Link to="/" className="navMenu">
            <li onClick={logout}>Ausloggen</li>
        </Link>
             </ul>
      <button className="mobile-menu-icon"
      onClick={()=>setIsMobile(!isMobile)}
      
      >
          {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
    </nav>
    </div>
  );
};

export default withRouter(Navbar2);