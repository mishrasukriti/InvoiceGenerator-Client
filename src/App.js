import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//ROUTES
import LandingPage from "./components/LandingPage";

// import InvoiceLandingPage from "./components/invoice/InvoiceLandingPage"

//ADMIN ROUTES
import AdminLogin from "./components/admin/AdminLogin";

import AdminServiceRequest from "./components/admin/ServiceRequest/ServiceRequest";
import AdminService from "./components/admin/ServiceRequest/Service";
import AdminAddServiceRequest from "./components/admin/ServiceRequest/AddForm";

import AdminAddUser from "./components/admin/User/AddUser";
import AdminAllUsers from "./components/admin/User/AllUser";

//MANAGER ROUTES
import ManagerLogin from "./components/manager/ManagerLogin";

import ManagerServiceRequest from "./components/manager/ServiceRequest/ServiceRequest";
import ManagerAddService from "./components/manager/ServiceRequest/AddForm";
import ManagerService from "./components/manager/ServiceRequest/Service";

import ManagerAddUser from "./components/manager/User/AddUser";
import ManagerAllUsers from "./components/manager/User/AllUser";


//EMPLOYEE ROUTES
import EmployeeLogin from "./components/employee/EmployeeLogin";

import EmployeeServiceRequest from "./components/employee/ServiceRequest/ServiceRequest";
import EmployeeAddService from "./components/employee/ServiceRequest/AddForm";
import EmployeeService from "./components/employee/ServiceRequest/Service";

import EmployeeChangePassword from "./components/employee/EmployeeChangePassword";
import ManagerChangePassword from "./components/manager/ManagerChangePassword";
import AdminChangePassword from "./components/admin/AdminChangePassword";

import AdminDashboardMain from './components/admin/dashboard/dash';
import ManagerDashboardMain from './components/manager/dashboard/dash';
import EmployeeDashboardMain from './components/employee/dashboard/dash';

import "./styles/style.css";
import AdminPasswordReset from "./components/admin/AdminPasswordReset";
import ManagerPasswordReset from "./components/manager/ManagerPasswordReset";
import EmployeePasswordReset from "./components/employee/EmployeePasswordReset";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>

          <Route path="/admindashboard/dashboardMain"  component={AdminDashboardMain} />
          <Route path="/managerdashboard/dashboardMain"  component={ManagerDashboardMain} />
          <Route path="/employeedashboard/dashboardMain"  component={EmployeeDashboardMain} />

          <Route path="/" exact component={() => <LandingPage />} />
          <Route path="/admin/passwordreset" exact component={() => <AdminPasswordReset />} />
          <Route path="/adminlogin" exact component={() => <AdminLogin />} />
          <Route path="/adminchangepassword" exact component={() => <AdminChangePassword />} />
          <Route
            path="/admindashboard/servicerequest"
            exact
            component={() => <AdminServiceRequest />}
          />
          <Route
            path="/admindashboard/servicerequest/add"
            exact
            component={() => <AdminAddServiceRequest />}
          />
          <Route
            path="/admindashboard/servicerequest/:id"
            exact
            component={AdminService}
          />
          
          <Route
            path="/admindashboard/allusers"
            exact
            component={AdminAllUsers}
          />
          <Route
            path="/admindashboard/adduser"
            exact
            component={AdminAddUser}
          />
          <Route
            path="/managerlogin"
            exact
            component={() => <ManagerLogin />}
          />
          <Route path="/managerchangepassword" exact component={() => <ManagerChangePassword />} />
          <Route
            path="/managerdashboard/servicerequest"
            exact
            component={() => <ManagerServiceRequest />}
          />
          <Route
            path="/managerdashboard/servicerequest/add"
            exact
            component={ManagerAddService}
          />
          <Route
            path="/managerdashboard/servicerequest/:id"
            component={ManagerService}
          />
          
          <Route path="/manager/passwordreset" exact component={() => <ManagerPasswordReset />} />
          <Route
            path="/managerdashboard/allusers"
            exact
            component={ManagerAllUsers}
          />
          <Route
            path="/managerdashboard/adduser"
            exact
            component={ManagerAddUser}
          />

          <Route
            path="/employeelogin"
            exact
            component={() => <EmployeeLogin />}
          />
          <Route path="/employeechangepassword" exact component={() => <EmployeeChangePassword />} />
          <Route
            path="/employeedashboard/servicerequest"
            exact
            component={() => <EmployeeServiceRequest />}
          />
          <Route
            path="/employeedashboard/servicerequest/add"
            exact
            component={EmployeeAddService}
          />
          <Route
            path="/employeedashboard/servicerequest/:id"
            exact
            component={EmployeeService}
          />
          
          <Route path="/employee/passwordreset" exact component={() => <EmployeePasswordReset />} />
          
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
