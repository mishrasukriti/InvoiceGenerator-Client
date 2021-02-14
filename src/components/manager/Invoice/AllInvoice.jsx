import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidenav from "../Sidenav";
import { useSelector, useDispatch } from "react-redux";
import { LoadService } from "../../actions/index";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Invoice = () => {
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const [searchSuccessful, setsSarchSuccessful] = useState(false);
  const [searchID, setSearchID] = useState("");
  const [searchText, setSearchText] = useState("");

  const results = useSelector((state) => state.service);
  const dispatch = useDispatch();

  useEffect(() => {
    const url =
      "http://localhost:4050/api/managerdashboard/invoice";

    const getInvoice = async () => {
      const token = localStorage.getItem("token");
      axios({
        url: url,
        method: "get",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          dispatch(LoadService(response.data));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getInvoice();
  }, [dispatch]);

  const searchHandler = (e) => {
    e.preventDefault();
    
    const text = searchText;
    setSearchText("");
    const url = "http://localhost:4050/api/managerdashboard/searchInvoice";
    axios({
      url: url,
      method: "post",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      data: { "invoiceNumber": text }
    })
      .then((response) => {
        console.log("response in searchHandler is: ", response);
        setsSarchSuccessful(true);
        setSearchID(response.data[0]._id);
        setLoading(false);

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }


  return (
    <React.Fragment>
      {isLoading && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">Invoices</div>
              <Link to="/managerdashboard/invoice/add">
                <button type="button">
                  Add <i className="material-icons">&#xe147;</i>
                </button>
              </Link>
            </div>
            <hr />
            <div className="content">
              <div className="loading">
                <Loader type="Audio" color="#897eff" height={100} width={100} />
                <p>Loading Invoice...</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !searchSuccessful && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">Invoices</div>
              <Link to="/managerdashboard/invoice/add">
                <button type="button">
                  Add <i className="material-icons">&#xe147;</i>
                </button>
              </Link>
            </div>
            <hr />
            <div className="content ">
              <input size="25" className="searchInput" type="text" onChange={(e) => setSearchText(e.target.value)} />
              <button type="button" className="searchButton" onClick={searchHandler}>Search</button>
            
              <ul>
                {results.map((result) => (
                  <li key={result._id}>
                    <p>{result.invoiceNumber}</p>
                    <Link to={`/managerdashboard/invoice/${result._id}`}>
                      <i className="material-icons">&#xe5c8;</i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {
        searchSuccessful && (
          <div className="dashboard">
            <div className="sidebar">
              <Sidenav />
            </div>
            <div className="main-content">
              <div className="header">
                <div className="title">Invoices</div>
                <Link to="/managerdashboard/invoice/add">
                  <button type="button">
                    Add <i className="material-icons">&#xe147;</i>
                  </button>
                </Link>
              </div>
              <hr />
              <div className="content">
                <Link to={`/managerdashboard/invoice/${searchID}`}>
                  <h1>Click to open the searched Invoice</h1>
                  
                </Link>
              </div>
            </div>
          </div>
        
        )
      }

    </React.Fragment>
  );
};

export default Invoice;
