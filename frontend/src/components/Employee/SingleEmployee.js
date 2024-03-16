import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Employee.css'
import Navbar from '../Navbar/Navbar';
function Employee(props) {
    // console.log(this.props)
  const {formInfo, setSelected} = props;
  const [currentEmpId, setCurrentEmpId] = useState('');
  const [formErrors, setFormErrors] = useState({
    emp_id: [],
    emp_fname: [],
    emp_lname: [],
    emp_gender: [],
    emp_dob: [],
    emp_manager: [],
    emp_contact: [],
    emp_city: [],
    acc_no: [],
    ifsc_code: [],
    bank_name: [],
    dept_id: [],
    role_id: [],
    contact_person_name: [],
    contact_person_relation: [],
  });
  const [overallFormError, setOverallFormError] = useState('')
  const [roleData, setRoleData] = useState([]);        // list of dict
  const [departmentData, setDepartmentData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const baseurl = 'http://127.0.0.1:8000'


  useEffect(() => {
    console.log('formInfo', formInfo);
  }, [formInfo]);
  useEffect(() => {

    axios.get(`${baseurl}/role/`)
      .then(function (response) {
        setRoleData(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        // console.log('Error', error.response.data);
        // setFormErrors(error.response.data);
      });

    axios.get(`${baseurl}/department/`)
      .then(function (response) {
        setDepartmentData(response.data);
        // console.log(response.data);  
      })
      .catch(function (error) {
        // console.log('Error', error.response.data);
        // if (typeof (error.response.data) == Object) {
        //   console.log('this is an obj');
        // setFormErrors(error.response.data);
        // }
      });
      let id = sessionStorage.getItem('token')
      // console.log(id)
      setCurrentEmpId(id)
    //   setFormInfo({
    //     ...formInfo, emp_id:id
    //   })

    axios.get(`${baseurl}/employee/${id}`)
    .then(function (response) {
      // console.log('first',response.data)
    //   setFormInfo(response.data)
    })
    .catch(function (error) {
      // console.log('Something went wrong')
    });

    axios.get(`${baseurl}/managers/`)
      .then(function (response) {
        setManagerData(response.data);
        // console.log(response.data);
      })

  }, []);


  function handleChange(e) {
    e.preventDefault();
    console.log(e)
    // setFormInfo({
    //   ...formInfo, [e.target.name]: e.target.value
    // })
  }

  function handleSubmit(e) {
    e.preventDefault();
    // axios.post(`${baseurl}/employee/`, formInfo)
    //   .then(function (response) {
    //     console.log(response)
    //     setOverallFormError('')
    //     setFormErrors({})
    //   })
    //   .catch(function (error) {
    //     console.log('Error', error.response.data);
    //     // console.log(typeof (error.response.data));
    //     if (typeof (error.response.data == 'string')) {
    //       setOverallFormError('Please enter all details');
    //     }
    //     setFormErrors(error.response.data);
    //   });

    let fullUrl = `${baseurl}/employee/${currentEmpId}`
    console.log('second',formInfo)
      axios.put(fullUrl, formInfo)
      .then(function (response) {
        // console.log(response)
        alert('Saved Successfully')
        setOverallFormError('')
        setFormErrors({})
      })
      .catch(function (error) {
        // console.log('Error', error.response.data);
        // console.log(typeof (error.response.data));
        if (typeof (error.response.data == 'string')) {
          setOverallFormError('Please enter all details');
        }
        setFormErrors(error.response.data);
      });

  }

  return (<>
    <Navbar />

    <div className="mx-auto col-10 col-md-8 col-lg-6">
      <div class="container-emp">
        <div class="text-emp">
          Employee details
        </div>
        <form className='form-emp' onSubmit={handleSubmit}>
          <div class="form-row">
            <div class="input-data">
              <input type="text" disabled id='emp_id'  name='emp_id' onChange={handleChange} />

              <div class="underline"></div>
              <label for="">Employee id: {formInfo.emp_id}</label>

            </div>

          </div>
          <div class="form-row">
            <div class="input-data">
              {/* <input type="text" disabled id='emp_fname' value={formInfo.emp_fname} name='emp_fname' onChange={handleChange} required /> */}

              <div class="underline"></div>
              <label for="">First Name: {formInfo.emp_fname}</label>
            </div>
            <div class="input-data">
              {/* <input type="text" disabled id='emp_lname' value={formInfo.emp_lname} name='emp_lname' onChange={handleChange} required /> */}

              <div class="underline"></div>
              <label for="">Last Name: {formInfo.emp_lname}</label>
            </div>
          </div>

          <div class="form-row">
            <div class="input-data">
              {/* <select disabled className='form-select form-select-lg mb-3' value={formInfo.emp_gender} name="emp_gender" id="emp_gender" onChange={handleChange} >
                <option value="none" selected disabled hidden>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select> */}
              <label for="">Gender: {formInfo.emp_gender}</label>

            </div>
            <div class="input-data">
              {/* <input type="date" disabled id='emp_dob' value={formInfo.emp_dob} name='emp_dob' onChange={handleChange} /> */}

              <div class="underline"></div>
              <label for="emp_dob" >Date of birth: {formInfo.emp_dob} </label>
            </div>
          </div>

          <div class="form-row">
            
            
            <div class="input-data">
              {/* <select name="emp_manager" disabled value={formInfo.emp_manager} class="form-select form-select-lg mb-3" id="emp_manager" onChange={handleChange} >
                <option value="none" selected disabled hidden>Manager</option>

                {
                  managerData.map((item) => (
                    <option value={item.username}>{item.username}.{item.first_name} {item.last_name}</option>
                  ))
                }
              </select> */}
              <label for="emp_dob" >Manager: {formInfo.emp_manager} </label>
              <div class="underline"></div>
            
            </div>



            <div class="input-data">
              {/* <input type="tel" disabled id='emp_contact' value={formInfo.emp_contact} name='emp_contact' onChange={handleChange} required /> */}

              <div class="underline"></div>
              <label for="">Contact: {formInfo.emp_contact}</label>
            </div>
          </div>

          <div class="form-row">
            <div class="input-data">
              {/* <input type="text" disabled id='emp_city' value={formInfo.emp_city} name='emp_city' onChange={handleChange} required /> */}

              <div class="underline"></div>
              <label for="">City: {formInfo.emp_city}</label>
            </div>
            <div class="input-data">
              {/* <input type="text" disabled id='acc_no' value={formInfo.acc_no} name='acc_no' onChange={handleChange} required /> */}

              <div class="underline"></div>
              <label for="">Account number: {formInfo.acc_no}</label>
            </div>
          </div>

          <div class="form-row">
            <div class="input-data">
              {/* <input type="text" disabled id='ifsc_code' value={formInfo.ifsc_code} name='ifsc_code' onChange={handleChange} required /> */}
              <div class="underline"></div>
              <label for="">IFSC code: {formInfo.ifsc_code}</label>
            </div>

            <div class="input-data">
              {/* <input type="text" disabled id='bank_name' value={formInfo.bank_name} name='bank_name' onChange={handleChange} required /> */}
              <div class="underline"></div>
              <label for="">Bank name: {formInfo.bank_name}</label>
            </div>
          </div>

          <div class="form-row">
            <div class="input-data">
              {/* <select name="dept_id" disabled value={formInfo.dept_id} class="form-select form-select-lg mb-3" id="dept_id" onChange={handleChange} >
                <option value="none" selected disabled hidden>Department</option>

                {
                  departmentData.map((item) => (
                    <option>{item.dept_name}</option>
                  ))
                }
              </select> */}
              <div class="underline"></div>
              <label for="">Department: {formInfo.dept_id}</label>
            </div>

            <div class="input-data">
              {/* <select name="role_id" disabled value={formInfo.role_id} class="form-select form-select-lg mb-3" id="role_id" onChange={handleChange} >
                <option value="none" selected disabled hidden>Role</option>

                {
                  roleData.map((item) => (
                    <option>{item.role_title}</option>
                  ))
                }
              </select> */}
              <div class="underline"></div>
              <label for="">Role: {formInfo.role_id}</label>
            </div>
          </div>

          <div class="form-row">
            <div class="input-data">
              {/* <input type="text" disabled id='contact_person_name' value={formInfo.contact_person_name} name='contact_person_name' onChange={handleChange} required /> */}
              <div class="underline"></div>
              <label for="">Contact Person: {formInfo.contact_person_name}</label>
            </div>

            <div class="input-data">
              {/* <input type="text" disabled id='contact_person_relation' value={formInfo.contact_person_relation} name='contact_person_relation' onChange={handleChange} required /> */}
              <div class="underline"></div>
              <label for="">Contact Person Relation: {formInfo.contact_person_relation}</label>
            </div>
          </div>
              <button onClick={()=>{setSelected(false)}}>Go back</button>
         
        </form>
      </div>
      
    </div>

    {/* <div id='body' class="container2">
      <div class="login-container">

      <div class="login-content">
      <form class="login-form" onSubmit={handleSubmit}>
        <input type="text" class="input-field" id='emp_id' placeholder='Employee id' name='emp_id' onChange={handleChange} />
        {(formErrors.emp_id != undefined && formErrors.emp_id.length !== 0)
          ? <div>Employee id: {formErrors.emp_id.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        <input type="text" class="input-field" id='emp_fname' placeholder='First name' name='emp_fname' onChange={handleChange} />
        {(formErrors.emp_fname != undefined && formErrors.emp_fname.length !== 0)
          ? <div>First name: {formErrors.emp_fname.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        <input type="text" class="input-field" id='emp_lname' placeholder='Last name' name='emp_lname' onChange={handleChange} />
        {(formErrors.emp_lname != undefined && formErrors.emp_lname.length !== 0)
          ? <div>Last name: {formErrors.emp_lname.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        
        <select class="input-field" name="emp_gender" id="emp_gender" onChange={handleChange} >
          <option value="none" selected disabled hidden>Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        {(formErrors.emp_gender != undefined && formErrors.emp_gender.length !== 0)
          ? <div>Gender: {formErrors.emp_gender.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        <label htmlFor="emp_dob" className='text-light'>Date of birth</label>
        <input type="date" class="input-field" id='emp_dob' placeholder='' name='emp_dob' onChange={handleChange} />
        {(formErrors.emp_dob != undefined && formErrors.emp_dob.length !== 0)
          ? <div>Date of birth: {formErrors.emp_dob.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        <input type="text" class="input-field" id='emp_manager' placeholder='Manager' name='emp_manager' onChange={handleChange} />
        {(formErrors.emp_manager != undefined && formErrors.emp_manager.length !== 0)
          ? <div>Manager: {formErrors.emp_manager.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        <input type="tel" class="input-field" id='emp_contact' placeholder='Contact' name='emp_contact' onChange={handleChange} />
        {(formErrors.emp_contact != undefined && formErrors.emp_contact.length !== 0)
          ? <div>Contact: {formErrors.emp_contact.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        <input type="text" class="input-field" id='emp_city' placeholder='City' name='emp_city' onChange={handleChange} />
        {(formErrors.emp_city != undefined && formErrors.emp_city.length !== 0)
          ? <div>City: {formErrors.emp_city.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        <input type="text" class="input-field" id='acc_no' placeholder='Account number' name='acc_no' onChange={handleChange} />
        {(formErrors.acc_no != undefined && formErrors.acc_no.length !== 0)
          ? <div>Account number: {formErrors.acc_no.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        <input type="text" class="input-field" id='ifsc_code' placeholder='IFSC code' name='ifsc_code' onChange={handleChange} />
        {(formErrors.ifsc_code != undefined && formErrors.ifsc_code.length !== 0)
          ? <div>IFSC code: {formErrors.ifsc_code.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        <input type="text" class="input-field" id='bank_name' placeholder='Bank name' name='bank_name' onChange={handleChange} />
        {(formErrors.bank_name != undefined && formErrors.bank_name.length !== 0)
          ? <div>Bank name: {formErrors.bank_name.map((item) => (<div>{item}</div>))}</div>
          : <></>}


        <select name="dept_id" class="input-field" id="dept_id" onChange={handleChange} >
          <option value="none" selected disabled hidden>Select an Option</option>

          {
            departmentData.map((item) => (
              <option>{item.dept_name}</option>
            ))
          }
        </select>
        {(formErrors.dept_id != undefined && formErrors.dept_id.length !== 0)
          ? <div>Department: {formErrors.dept_id.map((item) => (<div>{item}</div>))}</div>
          : <></>}


        <select name="role_id" class="input-field" id="role_id" onChange={handleChange} >
          <option value="none" selected disabled hidden>Select an Option</option>

          {
            roleData.map((item) => (
              <option>{item.role_title}</option>
            ))
          }
        </select>
        {(formErrors.role_id != undefined && formErrors.role_id.length !== 0)
          ? <div>Role: {formErrors.role_id.map((item) => (<div>{item}</div>))}</div>
          : <></>}

        <input type="text" class="input-field" id='contact_person_name' placeholder='Contact Person Name' name='contact_person_name' onChange={handleChange} />
        {(formErrors.contact_person_name != undefined && formErrors.contact_person_name.length !== 0)
          ? <div>Contact Person Name: {formErrors.contact_person_name.map((item) => (<div>{item}</div>))}</div>
          : <></>}


        <input type="text" class="input-field" id='contact_person_relation' placeholder='Contact Person Relation' name='contact_person_relation' onChange={handleChange} />
        {(formErrors.contact_person_relation != undefined && formErrors.contact_person_relation.length !== 0)
          ? <div>Contact Person Relation: {formErrors.contact_person_relation.map((item) => (<div>{item}</div>))}</div>
          : <></>}


        <button type="submit" > Submit</button>
        {overallFormError}
      </form>
      </div>
      </div>
    </div>
     */}



  </>
  )
}

export default Employee