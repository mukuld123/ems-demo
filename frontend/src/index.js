import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Protected from './utils/Protected'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import Department from './components/department/Department';
import Reimbursement from './components/reimbursement/Reimbursement';
import Role from './components/role/Role';
import Employee from './components/Employee/Employee';
import AllReimbursements from './components/reimbursement/AllReimbursements';
import Logout from './components/Auth/Logout';
import AllEmployees from './components/Employee/AllEmployees';
import Leave from './components/leave/Leave';
import AllLeaves from './components/leave/AllLeaves';
import LogTiming from './components/logTiming/LogTiming'
import LeavesManager from './components/leavesManager/LeavesManager';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/",
    element: <Protected><App /></Protected>,
  },
  {
    path: "/employee",
    element: <Employee />,
  },
  {
    path: "/department",
    element: <Protected><Department /></Protected>,
  },
  {
    path: "/reimbursement",
    element: <Protected><Reimbursement /></Protected>,
  },
  {
    path: "/role",
    element: <Protected><Role /></Protected>,
  },
  {
    path: "/all_reimbursements",
    element: <Protected><AllReimbursements /></Protected>,
  },
  {
    path: "/all_employees",
    element: <Protected><AllEmployees /></Protected>,
  },
  {
    path: "/leave",
    element: <Protected><Leave /></Protected>,
  },
  {
    path: "/all_leave",
    element: <Protected><AllLeaves /></Protected>,
  },
  {
    path: "/log_timing",
    element: <Protected><LogTiming /></Protected>,
  },
  {
    path: "/leaves_manager",
    element: <Protected><LeavesManager /></Protected>,
  },
  
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
