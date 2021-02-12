import React from "react";
import Employee from "../assets/user.png";
import Manager from "../assets/manager.png";
import Admin from "../assets/king.png";
import logo from "../assets/logo.png";
import banner from "../assets/banner.jpg";
import invprv from "../assets/inv_preview.jpg"
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
          <img className="banner" src={banner} alt=""/>
        </div>
        <div className="crm_content">
          <div className="land-cc">
            <p><b>Quick Easy Invoice</b><br/>Create professional invoices instantly without any hassle of re-entering data the second time.<br/>
            <br/><b>Email & Track Invoices</b><br/>Send invoice via email and get to know when the invoice was opened.<br/><br/>
            <b>Easy Access Anywhere</b><br/>Easy to use dashboard for mobile and desktop. Get email alerts in real-time. </p>
            </div>
          <div className="text-center">
            <img src={invprv} className="land-contentimg" alt=""/>
          </div>
        </div>
        <footer>
          Copyrights @ zoho invoice 2021
        </footer>
       
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
