import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import SingleEmployee from './SingleEmployee'

function AllEmployees() {
    const baseurl = 'http://127.0.0.1:8000';
    const [allEmployees, setAllEmployees] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState({});
    const [departmentData, setDepartmentData] = useState({});
    const [roleData, setRoleData] = useState({});
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        axios.get(`${baseurl}/employee/`)
            .then(function (response) {
                setAllEmployees(response.data);
                console.log(response.data);
            })
            // setSelected(false);
    }, []);
    
    function updateEmpDetails(data) {
        console.log(data)
        setSelectedEmp(data);
        axios.get(`${baseurl}/department/${data.dept_id}`)
        .then(function (response) {
            setDepartmentData(response.data);
            // console.log(response.data);  
        });
        axios.get(`${baseurl}/role/${data.role_id}`)
        .then(function (response) {
            setRoleData(response.data);
            console.log(response.data);
        });
        setSelected(true);

    }

    return (
        <div>
            <Navbar />
            {
                (isSelected==true)?<SingleEmployee formInfo={selectedEmp} setSelected={setSelected}/>:
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <div class="container-emp">
                    <div class="text-emp">
                        All Employees
                    </div>
                    {
                        <div className="row ">
                            {
                                allEmployees.map((data) => (
                                    
                                    <ul>
                                        <button onClick={() => updateEmpDetails(data)}>

                                        <li class="list-group-item">{data.emp_id}. {data.emp_fname} {data.emp_lname}</li>
                                        </button>
                                    </ul>
                                    // </button>
                                ))
                            }
                        </div>
                    }
                </div>
                
            </div>
            }
            

        </div>
    )
}

export default AllEmployees