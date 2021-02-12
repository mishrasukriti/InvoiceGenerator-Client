import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidenav from "../Sidenav";
import { useSelector, useDispatch } from "react-redux";
import { LoadService } from "../../actions/index";
import LoaderTemplate from "../templates/LoaderTemplate";

const Invoice = () => {
  const token = localStorage.getItem("token");
  const spAccessValue = localStorage.getItem("spAccessValue");

  const [isLoading, setIsLoading] = useState(true);
  const [searchSuccessful, setsSarchSuccessful] = useState(false);
  const [searchID, setSearchID] = useState("");
  const [searchText, setSearchText] = useState("");

  const results = useSelector((state) => state.service);
  const dispatch = useDispatch();

  useEffect(() => {
    const getInvoice = async () => {
      const url =
        "https://sukriti-invoice-server.herokuapp.com/api/employeedashboard/invoice";
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
          setIsLoading(false);
          dispatch(LoadService(response.data));
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    };
    getInvoice();
  }, [dispatch]);

  const searchHandler = (e) => {
    e.preventDefault();

    const text = searchText;
    setSearchText("");
    const url = "https://sukriti-invoice-server.herokuapp.com/api/admindashboard/searchInvoice";
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
        setIsLoading(false);

      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

  }


  return (
    <React.Fragment>
      {isLoading && <LoaderTemplate title={`Service Request`} />}
      {!isLoading && !searchSuccessful && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">Invoices</div>

              {/* Added ADD BUTTON to add a Invoice by Employee */}
              {
                (spAccessValue === "Yes") && (<Link to="/employeedashboard/invoice/add">
                  <button type="button">
                    Add <i className="material-icons">&#xe147;</i>
                  </button>
                </Link>)
              }

            </div>
            <hr />
            <div className="content ">
              <input size="25" className="searchInput" type="text" onChange={(e) => setSearchText(e.target.value)} />
              <button type="button" className="searchButton" onClick={searchHandler}>Search</button>
            
              <ul>
                {results.map((result) => (
                  <li key={result._id}>
                    <p>{result.invoiceNumber}</p>
                    <Link to={`/employeedashboard/invoice/${result._id}`}>
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

                {/* Added ADD BUTTON to add a Invoice by Employee */}
                {
                  (spAccessValue === "Yes") && (<Link to="/employeedashboard/invoice/add">
                    <button type="button">
                      Add <i className="material-icons">&#xe147;</i>
                    </button>
                  </Link>)
                }

              </div>
              <hr />
              
              <div className="content">
                <Link to={`/admindashboard/invoice/${searchID}`}>
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
