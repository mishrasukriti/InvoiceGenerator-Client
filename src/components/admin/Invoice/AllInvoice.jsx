import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidenav from "../Sidenav";
import { useSelector, useDispatch } from "react-redux";
import { LoadService } from "../../actions/index";
import LoaderTemplate from "../templates/LoaderTemplate";
import TitleTemplate from "../templates/TitleTemplate";

const Invoice = () => {
  const [isLoading, setLoading] = useState(true);
  const results = useSelector((state) => state.service);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("inside useEffect");
    const url =
      "http://localhost:4050/api/admindashboard/invoice";
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
          console.log("response in get AllInvoice is: ",response);
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
      {!isLoading && (
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
            <div className="content">
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
    </React.Fragment>
  );
};

export default Invoice;
