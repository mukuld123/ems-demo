import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

function Reimbursement() {

    const [formInfo, setFormInfo] = useState({});
    const [currentEmpId, setCurrentEmpId] = useState('');
    const [formErrors, setFormErrors] = useState({
        emp_id: [],
        ticket_status: [],
        ticket_amount: [],
        ticket_reason: [],
        date_raised: [],
        date_passed: []
    });
    const [overallFormError, setOverallFormError] = useState('')
    const [employeeData, setEmployeeData] = useState([]);        // list of dict
    const baseurl = 'http://127.0.0.1:8000'

    useEffect(() => {
        console.log('formInfo', formInfo);
    }, [formInfo]);
    useEffect(() => {

        axios.get(`${baseurl}/employee/`)
            .then(function (response) {
                setEmployeeData(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log('Error', error.response.data);
            });

        let id = sessionStorage.getItem('token')
        // console.log(id)
        var currDate = new Date();
        setCurrentEmpId(id)
        setFormInfo({
            ...formInfo, emp_id:id, date_raised:`${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()}`
        })

    }, []);


    function handleChange(e) {
        e.preventDefault();
        setFormInfo({
            ...formInfo, [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`${baseurl}/reimbursement/`, formInfo)
            .then(function (response) {
                console.log(response)
                alert('added the reimbursement')
                setOverallFormError('')
                setFormErrors({})
            })
            .catch(function (error) {
                console.log('Error', error.response.data);
                // console.log(typeof (error.response.data));
                if (typeof (error.response.data == 'string')) {
                  setOverallFormError('Please enter all details');
                }
                setFormErrors(error.response.data);
            });
            axios.get(`${baseurl}/reimbursement/${currentEmpId}`)
            .then(function (response) {
              console.log('res',response);
            })
    }


    return (
        <>
        <Navbar />
        <div className="mx-auto col-10 col-md-8 col-lg-6 content">
      <div class="container-emp">
        <div class="text-emp">
          Reimbursement
        </div>
        <form className='form-emp' onSubmit={handleSubmit}>
          <div class="form-row">
            <div class="input-data">
              <input type="text" disabled id='emp_id' name='emp_id' onChange={handleChange} />

              <div class="underline"></div>
              <label for="">Employee id: {currentEmpId}</label>

            </div>

          </div>

          <div class="form-row">
            <div class="input-data">
            <select className='form-select form-select-lg mb-3' name="ticket_status" id="ticket_status" onChange={handleChange} >
                <option value="none" selected disabled hidden>Ticket Status</option>
                <option>Initiated </option>
                <option>In progress </option>
                <option>Rejected </option>
                <option>Approved </option>

                </select>
              
            </div>
            <div class="input-data">
            <input type="number" id='ticket_amount' name='ticket_amount' onChange={handleChange} required />
          
              <div class="underline"></div>
              <label for="">Ticket Amount</label>
            </div>
          </div>

          <div class="form-row">
            
            <div class="input-data">
            <input type="text" id='ticket_reason' name='ticket_reason' onChange={handleChange} required />
          
              <div class="underline"></div>
              <label for="">Ticket Reason</label>
            </div>
          </div>

          <div class="form-row">
              <label for="date_raised">Raised on</label>
            <div class="input-data">
              <input type="date" id='date_raised' name='date_raised' onChange={handleChange} disabled />
            </div>
              {/* <label for="date_passed">Passed on</label>
            <div class="input-data">
              <input type="date" id='date_passed' name='date_passed' onChange={handleChange} disabled/> 
            </div> */}
          </div>
         

          <div class="form-row">
            <div class="input-data textarea">

            <h4 className='text-danger'>{overallFormError}</h4>
              <div class="form-row submit-btn">
                <div class="input-data">
                  <div class="inner"></div>
                  <input type="submit" value="submit" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      
    </div>

    </>

        
    )
}

export default Reimbursement