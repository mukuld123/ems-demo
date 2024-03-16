// import React, { useEffect, useState } from 'react'
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


// function Navbar() {


//     const [isLoggedIn, setLoggedIn] = useState(false);

//     useEffect(()=>{
//         let x = sessionStorage.getItem('token');
//         if(x == null) setLoggedIn(false);
//         else setLoggedIn(true)
//     },[sessionStorage.getItem('token')])
//     return (
//         <nav class="navbar navbar-expand-lg bg-body-tertiary " id='sidebar'>
//             <div class="container-fluid">
//                 <a class="navbar-brand" href="#">Emloyee Management</a>
//                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div class="collapse navbar-collapse" id="navbarText">
//                     <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li class="nav-item">
//                             <a class="nav-link active" aria-current="page" href="/employee">Details</a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" href="/reimbursement">Add Reimbursement</a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" href="/all_reimbursements">All Reimbursements</a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" href="/all_employees">All Employees</a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" href="/leave">Add Leave</a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" href="/all_leave">All Leaves</a>
//                         </li>
//                     </ul>
//                     {
//                         (isLoggedIn)?<><a class="nav-link" href="/logout">Logout</a></>: 
//                         <><span class="navbar-text">
//                         <a class="nav-link" href="/login">Login</a>
//                     </span>
//                     <span class='mx-4'>

//                         <a class="nav-link" href="/register">Register</a>
//                     </span>

//                     </>

//                     }

//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default Navbar

import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import axios from "axios";
function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [currentEmpId, setCurrentEmpId] = useState();
    const [canEdit, setCanEdit] = useState(false);
    const baseurl = 'http://127.0.0.1:8000';
    useEffect(() => {
        let x = sessionStorage.getItem('token');
        if (x == null) setLoggedIn(false);
        else{
            setLoggedIn(true)
            setCurrentEmpId(x);
        }
        let formInfo = {
            "emp_id": x
        }
        axios.post(`${baseurl}/group_details/`, formInfo)
            .then(function (response) {
                if(response.data.can_edit==true){
                    setCanEdit(true)
                    console.log('heyya')
                }

            })

    }, [sessionStorage.getItem('token')])
    useEffect(() =>{
        // e.preventDefault();
        
    },[currentEmpId])
    return (

        <Sidebar id="sidebar">

            <Menu>
                
                <MenuItem component={<Link to="/employee" />}> Profile </MenuItem>
                <MenuItem component={<Link to="/all_employees" />}> All Employees </MenuItem>
                <SubMenu label="Leaves">
                    <MenuItem component={<Link to="/leave" />}> Apply for leave </MenuItem>
                    <MenuItem component={<Link to="/all_leave" />}> Applied leaves </MenuItem>
                </SubMenu>
                <SubMenu label="Reimbursements">
                    <MenuItem component={<Link to="/reimbursement" />}> Apply for reimbursement </MenuItem>
                    <MenuItem component={<Link to="/all_reimbursements" />}> Applied reimbursements </MenuItem>
                </SubMenu>
                <MenuItem component={<Link to="/log_timing" />}> Login for the day </MenuItem>
                {(canEdit===true)?<MenuItem component={<Link to="/leaves_manager" />}> Manage leaves of employees </MenuItem>:<></>
                }
                <MenuItem component={<Link to="/logout" />}> User logout </MenuItem>
                
                </Menu>
        </Sidebar>
    );

}

export default Navbar;