import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
function LeavesManager() {

    const baseurl = 'http://127.0.0.1:8000';
    const [currentEmpId, setCurrentEmpId] = useState('');
    const [unApprovedLeaves, setUnapprovedLeaves] = useState([])
    useEffect(() => {
        let id = sessionStorage.getItem('token')
        var currDate = new Date();
        setCurrentEmpId(id)
        let formInfo = {
            "emp_id": id
        }
        function checkApprovedByMe(leave) {
            // console.log(employee)
            return id == leave.approver && leave.leave_status == 'Applied'
        }
        axios.get(`${baseurl}/leave/`)
            .then(function (response) {
                let res = response.data.filter(checkApprovedByMe)
                setUnapprovedLeaves(res)
                // console.log(res)
            })
    }, []);

    function verdictOnLeave(item, verdict){
        axios.put(`${baseurl}/leave/${item.id}`,{...item, 'leave_status': verdict})
            .then(function (response) {
                console.log(response)
            })
        alert(verdict)
    } 

    return (
        <div>
            <Navbar />
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <div class="container-emp">
                    <div class="text-emp">
                        Manage Leaves
                    </div>
                    {
                        <div className="row ">

                            {
                                unApprovedLeaves.map((item) => (

                                    <div class="card mx-2 my-2 " style={{ width: "22rem" }}>
                                        <form action="">
                                        <div class="card-body">
                                            <h4 class="card-title"><b>Reason:</b>{item.leave_reason}</h4>
                                            
                                            <h5><b>Dates:</b> {item.leave_dates.split(', ').map((element) => (
                                                new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(element) + ", "

                                            ))}</h5>
                                            <h5><b>Leave status:</b> {item.leave_status}</h5>
                                            <button type='submit' className='bg-success' onClick={() => verdictOnLeave(item,'accepted')}>Accept</button>
                                            <button type='submit' className='bg-danger' onClick={() => verdictOnLeave(item,'rejected')}>Reject</button>
                                        </div>
                                        </form>
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

export default LeavesManager