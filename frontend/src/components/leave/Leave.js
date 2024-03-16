import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import DatePicker from "react-multi-date-picker";
import axios from 'axios';

function Leave() {
  const [formInfo, setFormInfo] = useState({});
  const [currentEmpId, setCurrentEmpId] = useState('');
  const [leaveApprover, setLeaveApprover] = useState()
  const [leaveDate, setLeaveDate] = useState();
  const baseurl = 'http://127.0.0.1:8000'

  useEffect(() => {
    let id = sessionStorage.getItem('token')
    console.log(id)
    setCurrentEmpId(id)
    axios.get(`${baseurl}/employee/${id}`)
            .then(function (response) {
              setLeaveApprover(response.data['emp_manager'])
              // console.log('chh',response.data['emp_manager'])
            })
      
    setFormInfo({
          ...formInfo, emp_id:id, approver: leaveApprover
        })
  }, []);
  useEffect(() => {

    console.log('changed',leaveApprover)
  }, [leaveApprover]);


  function handleSubmit(e) {
    e.preventDefault();
    setFormInfo({
      ...formInfo, 'leave_dates':leaveDate, approver: leaveApprover
    })
    formInfo['approver'] = leaveApprover
    axios.post(`${baseurl}/leave/`, formInfo)
      .then(function (response) {
          console.log(response)
          alert('added the leave')
      })
  }

  function handleChange(e) {
    e.preventDefault();
    setFormInfo({
      ...formInfo, [e.target.name]: e.target.value, 'leave_dates':leaveDate
    })
  }



  return (
    <>
      <Navbar />
      <div className="mx-auto col-10 col-md-8 col-lg-6">
        <div class="container-emp">
          <div class="text-emp">
            Apply for Leaves
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

              <label for="leave_dates">Select Dates</label>
              <div class="input-data">
                {/* <input type="date" id='end_date' name='end_date' onChange={handleChange} /> */}
                <DatePicker value={leaveDate} mode='multiple' date_panel='enable' format='YYYY/MM/DD' id='leave_dates' name='leave_dates' multiple='true' onChange={setLeaveDate} required/>
              </div>
            </div>

            <div class="form-row">

              <div class="input-data">
                <input type="text" id='leave_reason' name='leave_reason' onChange={handleChange} required />

                <div class="underline"></div>
                <label for="">Leave reason</label>
              </div>
            </div>

            <div class="form-row">
              <div class="input-data textarea">

                {/* <h4 className='text-danger'>{overallFormError}</h4> */}
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

export default Leave