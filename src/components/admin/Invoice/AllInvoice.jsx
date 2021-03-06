import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidenav from "../Sidenav";
import { useSelector, useDispatch } from "react-redux";
import { LoadService } from "../../actions/index";
import LoaderTemplate from "../templates/LoaderTemplate";
import TitleTemplate from "../templates/TitleTemplate";

const Invoice = () => {
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const [searchSuccessful, setsSarchSuccessful] = useState(false);
  const [searchID, setSearchID] = useState("");
  const [searchText, setSearchText] = useState("");

  const results = useSelector((state) => state.service);
  const dispatch = useDispatch();
  

  useEffect(() => {
    
    const url = "https://sukriti-invoice-server.herokuapp.com/api/admindashboard/invoice";
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
          console.log("response in get AllInvoice is: ", response);
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
        <LoaderTemplate
          title={`Invoice`}
          isAdd={true}
          link={`/admindashboard/invoice/add`}
          content={`Loading`}
        />
      )}
      {!isLoading && !searchSuccessful && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <TitleTemplate
              title={`Invoice`}
              link={`/admindashboard/invoice/add`}
              isAdd={true}
            />
            <div className="content ">
              <input size="25" className="searchInput" type="text" onChange={(e) => setSearchText(e.target.value)} />
              <button type="button" className="searchButton" onClick={searchHandler}>Search</button>
            
              <ul>
                {results.map((result) => (
                  <li key={result._id}>
                    <p>{result.invoiceNumber}</p>
                    <Link to={`/admindashboard/invoice/${result._id}`}>
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
              <TitleTemplate
                title={`Invoice`}
                link={`/admindashboard/invoice/add`}
                isAdd={true}
              />

              <div >
                <Link to={`/admindashboard/invoice/${searchID}`}>
                  <h1>Click to open the searched Invoice</h1>
                  {/* <i className="material-icons">&#xe872;</i> */}
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
