import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar';
import './Department.css'
function Department() {

    const [formInfo, setFormInfo] = useState({});
    const [formErrors, setFormErrors] = useState({
        dept_name: [],
        description: []
    });
    const baseurl = 'http://127.0.0.1:8000'

    useEffect(() => {
        console.log('formInfo', formInfo);
    }, [formInfo]);


    function handleChange(e) {
        e.preventDefault();
        setFormInfo({
            ...formInfo, [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        // e.preventDefault();  
        axios.post(`${baseurl}/department/`, formInfo)
            .then(function (response) {
                console.log(response)
                alert(`Added Department ${formInfo.dept_name}`)
                setFormInfo({})
            })
            .catch(function (error) {
                console.log('Error', error.response.data);
                setFormErrors(error.response.data)
            });
    }

    return (
        <>
        <Navbar />
        <div id='body' class="container2">
            <div className="login-container">

                <div class="login-content">
                    <form class="login-form" onSubmit={handleSubmit}>
                        <input type="text" id='dept_name' class="input-field" placeholder='Department_name' name='dept_name' onChange={handleChange} />
                        {(formErrors.dept_name != undefined &&  formErrors.dept_name.length !== 0)
                            ? <div className='text-center text-light'>{formErrors.dept_name.map((item) => (<div>{item}</div>))}</div>
                            : <></>}

                        <textarea type="textarea" class="input-field" id='description' placeholder='description' name='description' onChange={handleChange} />
                        {(formErrors.description!=undefined && formErrors.description.length !== 0)
                            ? <div className='text-center text-light' >{formErrors.description.map((item) => (<div>{item}</div>))}</div>
                            : <></>}



                        <button type="submit" class="login-button"> Submit</button>

                    </form>
                </div>
            </div>
        </div></>
    )
}

export default Department