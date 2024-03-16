import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

function Reimbursement() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentEmpId, setCurrentEmpId] = useState('');
  const [loginTime, setLoginTime] = useState();
  const [logoutTime, setLogoutTime] = useState();
  const baseurl = 'http://127.0.0.1:8000'

  // useEffect(() => {
  //     console.log('formInfo', formInfo);
  // }, [formInfo]);
  useEffect(() => {



    let id = sessionStorage.getItem('token')
    // console.log(id)
    var currDate = new Date();
    setCurrentEmpId(id)
    // setFormInfo({
    //     ...formInfo, emp_id:id
    // })
    axios.get(`${baseurl}/employee/${id}`)
      .then(function (response) {
        console.log('first', response.data)
        
      })

  }, []);


  function handleChange(e) {
    e.preventDefault();
    // setFormInfo({
    //     ...formInfo, [e.target.name]: e.target.value
    // })
  }

  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
    setLoginTime(Date.now())
  }
  function handleLogout(e) {
    e.preventDefault();
    setLoggedIn(false);
    setLogoutTime(Date.now())
    let formInfo = {
      'emp_id': currentEmpId,
      // 'date': new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(Date.now()),
      'login_timing': loginTime,
      'logout_timing': Date.now()
    }
    // console.log(formInfo)
    axios.post(`${baseurl}/logtiming/`, formInfo)
      .then(function (response) {
        console.log(response)
        alert('saved the timings')
      })

  }


  return (
    <>
      <Navbar />
      <div className="mx-auto col-10 col-md-8 col-lg-6">
        <div class="container-emp">
          <div class="text-emp">
            Login/ Logout
          </div>
          <form className='form-emp'>


            <div class="form-row">
              <label for="for_date">Date</label>
              <div class="input-data">
                <input type="date" id='for_date' name='for_date' onChange={handleChange} disabled />
              </div>

            </div>


            <div class="form-row">
              <div class="input-data textarea">


                {(!isLoggedIn) ? (<div class="form-row submit-btn">
                  <div class="input-data">
                    <div class="inner"></div>
                    <input type="button" value="Login" onClick={handleLogin} />
                  </div>
                </div>) : (
                  <>
                    <h2>Logged in at {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(loginTime)}</h2>
                    <div class="form-row submit-btn">
                      <div class="input-data">
                        <div class="inner"></div>
                        <input type="button" value="Logout" onClick={handleLogout} />
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>
          </form>
        </div>

      </div>

    </>


  )
}

export default Reimbursement