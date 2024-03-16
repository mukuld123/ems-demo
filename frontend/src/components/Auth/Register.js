import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [emp_id, setEmpId] = useState()
  const [password, setPassword] = useState()
  const [formErrors, setFormErrors] = useState([])
  const [dept, setDept] = useState('')
  const [role, setRole] = useState('')
  const [roleData, setRoleData] = useState([]);        // list of dict
  const [departmentData, setDepartmentData] = useState([]);
  const baseurl = 'http://127.0.0.1:8000'

  const navigate = useNavigate();

  useEffect(() => {

    axios.get(`${baseurl}/role/`)
      .then(function (response) {
        setRoleData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('Error', error.response.data);
        // setFormErrors(error.response.data);
      });

    axios.get(`${baseurl}/department/`)
      .then(function (response) {
        setDepartmentData(response.data);
      })
      .catch(function (error) {
        console.log('Error', error.response.data);

      });

  }, []);

  function handleSubmit(e) {
    e.preventDefault()
    let errors = []
    if (fname === undefined || fname === '') {
      errors.push('Please enter FirstName')
    }
    if (lname === undefined || lname === '') {
      errors.push('Please enter LastName')
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emp_id === undefined || emp_id.match(validRegex) === false) {
      errors.push('Please enter valid Employee id')
    }
    if (password === undefined || password.length < 8) {
      errors.push("Password can't be less than 8 characters")
    }

    
    // console.log("errors", errors)
    if (errors.length == 0) {
      sessionStorage.setItem(emp_id, password);
      // console.log("session is stored")
      navigate("/login");
    }

    let fullUrl = `${baseurl}/employee/`
    let formInfo = {
      emp_id: emp_id,
      emp_fname: fname,
      emp_lname: lname,
      emp_gender: null,
      emp_dob: null,
      emp_manager: null,
      emp_contact: null,
      emp_city: null,
      acc_no: null,
      ifsc_code: null,
      bank_name: null,
      dept_id: dept,
      role_id: role,
      contact_person_name: null,
      contact_person_relation: null,
    }
    axios.post(fullUrl, formInfo)
      .then(function (response) {
        console.log(response)
        setFormErrors({})
      })
      .catch(function (error) {
        console.log('Error', error.response.data);
        // console.log(typeof (error.response.data));
        errors.push("Enter all fields")
        // setFormErrors(error.response.data);
      });

      axios.post(`${baseurl}/register/`, {'emp_id':emp_id, 'password':password, 'emp_fname': fname, 'emp_lname':lname})
      .then(function (response) {
        console.log(response)
        setFormErrors({})
      })
      .catch(function (error) {
        console.log('Error', error.response.data);
        // console.log(typeof (error.response.data));
        errors.push("Enter all fields")
        // setFormErrors(error.response.data);
      });

      setFormErrors(errors)
  }


  return (<>
    {/* <Navbar /> */}
    <div id='body' class="container2">


      <div class="login-container">

        <div class="login-content">
          <h1 class="welcome-text">Register here</h1>
          <form class="login-form" onSubmit={handleSubmit}>
            <input className='input' type="text" placeholder="First Name" class="input-field" value={fname} onChange={(e) => setFname(e.target.value)} />
            <input className='input' type="text" placeholder="Last Name" class="input-field" value={lname} onChange={(e) => setLname(e.target.value)} />


            <input className='input' type="number" placeholder="emp_id" class="input-field" value={emp_id} onChange={(e) => setEmpId(e.target.value)} />
            <input className='input' type="password" placeholder="Password" class="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select name="dept_id" class="input form-select form-select-lg mb-3" id="dept_id" onChange={(e) => setDept(e.target.value)} >
              <option value="none" selected disabled hidden>Department</option>

              {
                departmentData.map((item) => (
                  <option>{item.dept_name}</option>
                ))
              }
            </select>
            <select name="role_id" class="input form-select form-select-lg mb-3" id="role_id" onChange={(e) => setRole(e.target.value)} >
              <option value="none" selected disabled hidden>Role</option>

              {
                roleData.map((item) => (
                  <option>{item.role_title}</option>
                ))
              }
            </select>

            <button type="submit" class="login-button">Register</button>
          </form>
          <div className='text-center text-light'>
            {
              formErrors.map(element => (
                <div >{element}</div>
              ))
            }

            Already have an Account? <a href='/login'>Log in</a>
          </div>
          
        </div>
      </div>
    </div>
  </>

  )
}

export default Register