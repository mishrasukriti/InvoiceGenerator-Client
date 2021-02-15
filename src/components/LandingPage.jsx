import React from "react";
import Employee from "../assets/user.png";
import Manager from "../assets/manager.png";
import Admin from "../assets/king.png";
import logo from "../assets/logo.png";
import banner from "../assets/banner.webp";
// import invprv from "../assets/inv_preview.jpg"
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="landing-page">
        <div className="navbar-container">
          <nav>
            <div><img className="logoimg" src={logo} alt=""/> </div>
            <div className="navlist-container">
             
              <Link to="/employeelogin">
              <div><img src={Employee} alt=""/></div> <div>Employee </div>
              </Link>
              <Link to="/managerlogin">
              <div><img src={Manager} alt=""/></div> <div>Manager</div> 
              </Link>
              <Link to="/adminlogin">
              <div><img src={Admin} alt=""/></div>
              <div>Admin </div>
              </Link>
            </div>
          </nav>
        </div>
       
        <div className="headliner-container">
          <img style={{position: "relative", top: "-92px"}} className="banner" src={banner} alt=""/>
        </div>
      
        <footer>
          Copyrights @ INVOICE GEN 2021
        </footer>
       
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
