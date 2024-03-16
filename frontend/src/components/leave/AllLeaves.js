import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import DatePicker from "react-multi-date-picker";

function AllReimbursements() {

    const [currentEmpId, setCurrentEmpId] = useState('');
    const [myLeaves, setMyLeaves] = useState([])
    const [leaveDate, setLeaveDate] = useState()
    const baseurl = 'http://127.0.0.1:8000'

    useEffect(() => {
        let id = sessionStorage.getItem('token');
        setCurrentEmpId(id)
        axios.get(`${baseurl}/leave/${id}`)
            .then(function (response) {
                let res = response.data;
                setMyLeaves(response.data);
                // setLeaveDate(response.data['leave_dates'].split(', '))
                // console.log(response.data);

            })
    }, []);


    return (
        <div>
            <Navbar />
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <div class="container-emp">
                    <div class="text-emp">
                        All Leaves
                    </div>
                    {
                        <div className="row ">

                            {
                                myLeaves.map((item) => (
                                  
                                    <div class="card mx-2 my-2 " style={{ width: "18rem" }}>
                                         <div class="card-body">
                                            <h4 class="card-title"><b>Reason:</b>{item.leave_reason}</h4>
                                            
                                            <h5><b>Dates:</b> {item.leave_dates.split(', ').map((element) => (
                                                new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(element) + ", "

                                            ))}</h5>
                                            <h5><b>Leave status:</b> {item.leave_status}</h5>
                                            </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AllReimbursements