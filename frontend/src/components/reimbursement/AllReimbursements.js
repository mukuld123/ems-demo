import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
function AllReimbursements() {

    const [currentEmpId, setCurrentEmpId] = useState('');
    const [myReimbursements, setMyReimbursements] = useState([])
    const baseurl = 'http://127.0.0.1:8000'

    useEffect(() => {
        let id = sessionStorage.getItem('token');
        setCurrentEmpId(id)
        axios.get(`${baseurl}/reimbursement/${id}`)
            .then(function (response) {
                setMyReimbursements(response.data)
                console.log(response.data);

            })
    }, []);


    return (
        <div>
            <Navbar />
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <div class="container-emp">
                    <div class="text-emp">
                        All Reimbursements
                    </div>
                    {
                        <div className="row ">

                            {
                                myReimbursements.map((item) => (
                                    <div class="card mx-2 my-2 " style={{ width: "18rem" }}>
                                        <div class="card-body">
                                            <h5 class="card-title">Rs. {item.ticket_amount}</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">{item.ticket_status}</h6>
                                            <p class="card-text">{item.ticket_reason}</p>
                                            <h5>Raised on: {item.date_raised}</h5>
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