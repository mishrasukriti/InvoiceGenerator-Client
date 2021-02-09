import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { DelService } from "../../actions/index";
import { Link, useHistory } from "react-router-dom";
import Sidenav from "../Sidenav";
import EditInvoice from "./EditInvoice";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Invoice = ({ match }) => {
  const history = useHistory();
  const results = useSelector((state) => state.service);
  // console.log("results in particular invoce is: ", results);
  const services = results.filter((result) => result._id === match.params.id);

  const successNotify = () => toast.success("Succesfully Generated Pdf");
  const failedNotify = () => toast.error("Oops..! Failed to Generated Pdf");


  console.log("services in particular invoce is: ", services);
  const [view, setView] = useState("noedit");

  const dispatch = useDispatch();

  const generatePDF = ()=>{ 
    const token = localStorage.getItem("token");
    const generatePdfURL = "http://localhost:4050/api/admindashboard/genearatePDF";
    
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const request = services[0];
    axios
      .post(generatePdfURL, request, {
        headers: headers,
      })
      .then((response) => {
        console.log("response in generatePDF is: ",response);
        successNotify();
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        failedNotify();
        //setLoading(false);
      });
  };
  

  const url = "http://localhost:4050/api/admindashboard/invoice";

  const delInvoice = (id) => {
    const token = localStorage.getItem("token");
    const response = {
      _id: id,
    };
    fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(response),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(DelService(id));
  };
  const convertDate = (date) => {
    const dates = new Date(date);
    const formattedDate = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(dates);
    return formattedDate;
  };

  return (
    <React.Fragment>
      <ToastContainer />
      {view === "noedit" && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">Invoice</div>
              <button
                  type="button"
                  onClick={() => history.push("/admindashboard/invoice")}
                >
                  Back
                  <i className="material-icons"> &#xe5c4;</i>
              </button>
            </div>
            <hr/>
            <div className="content">
              {services.map((result) => (
                <div key={result._id} className="cards">
                  <ul>
                    <li>
                      <b>Invoice Number</b>
                      <p>{result.invoiceNumber}</p>
                    </li>
                    <li>
                      <b>Client Name</b>
                      <p>{result.clientName}</p>
                    </li>
                    <li>
                      <b>Client Email</b>
                      <p>{result.clientEmail}</p>
                    </li>
                    <li>
                      <b>Client Number</b>
                      <p>{result.clientNumber}</p>
                    </li>
                    <li>
                      <b>Due Date</b>
                      <p>{convertDate(result.dueDate)}</p>
                    </li>
                    
                    <li>
                      <b>Total Balance</b>
                      <p>{result.totalPrice}</p>
                    </li>
                    
                  </ul>
                  <div className="button-container">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem("key", result._id);
                        setView("edit");
                      }}
                    >
                      Update
                      <i className="material-icons">&#xe3c9;</i>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem("key", result._id);
                        generatePDF();
                        // setView("edit");
                      }}
                    >
                      Generate Pdf
                      <i className="material-icons">picture_as_pdf</i>
                    </button>

                    <Link
                      onClick={() => delInvoice(result._id)}
                      to="/admindashboard/invoice"
                    >
                      <button type="button">
                        Delete
                        <i className="material-icons">&#xe872;</i>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {view === "edit" && <EditInvoice />}
    </React.Fragment>
  );
};

export default Invoice;
