import React, {useState} from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import './Auth.css'

function NewLogin() {
    const [emp_id, setEmpId] = useState()
    const [password, setPassword] = useState()
    const [formErrors, setFormErrors] = useState([])
    const navigate = useNavigate();
    const baseurl = 'http://127.0.0.1:8000'

    function handleSubmit(e){
        e.preventDefault()
        let errors = []
        if(emp_id === undefined || emp_id === ''){
        errors.push('Please enter Employee id')
        }
        if(password === undefined || password.length < 8){
        errors.push("Password can't be less than 8 characters")
        }
        setFormErrors(errors)
        if(errors.length == 0){
          axios.post(`${baseurl}/login/`,{'emp_id':emp_id, 'password':password})
          .then(function (response) {
            console.log(response)
            if(response.data.msg === 'successful'){
              sessionStorage.setItem('token', emp_id)
              navigate('/')
              // console.log('hii')
            }
            else{
              errors.push("Incorrect credentials")
            }
          })
          .catch(function (error) {
            console.log('Error', error.response.data);
            // setFormErrors(error.response.data);
          });



        // var user = sessionStorage.getItem(emp_id);
        // if(user == password){
        //     sessionStorage.setItem('token', emp_id)
        //     navigate('/')
        //     console.log('hii')
        // }
        // else{
        //     errors.push("Incorrect credentials")
        // }
    }
}
  return (<>
        {/* <Navbar/>   */}
    <div id='body' class="container2">
    

    <div class="login-container">

      <div class="login-content">
        <h1 class="welcome-text">Log In</h1>
        <form class="login-form" onSubmit={handleSubmit}>
          <input className='input' type="text" placeholder="Employee id" class="input-field" value={emp_id} onChange={(e)=>setEmpId(e.target.value)} />
          <input className='input' type="password" placeholder="Password" class="input-field" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit" class="login-button">Login</button>
        </form>
        <div className='text-center text-light'>
          {
            formErrors.map(element => (
              <div >{element}</div> 
            ))
          }
          Don't have an Account? <a href='/register'>Register</a>
        </div>
      </div>
    </div>
  </div>
  </>

  )
}

export default NewLogin