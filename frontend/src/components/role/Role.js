import React, { useState, useEffect } from 'react'
import axios from 'axios'
function Role() {

    const [formInfo, setFormInfo] = useState({});
    const [formErrors, setFormErrors] = useState({
        role_title: [],
        role_level: [],
        role_description: []
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
        e.preventDefault();
        axios.post(`${baseurl}/role/`, formInfo)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log('Error', error.response.data);
                setFormErrors(error.response.data)
            });
    }

    return (
        <div>
            <div>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="role_title">Role title</label>
                <input type="text" id='role_title' placeholder='Role title' name='role_title' onChange={handleChange} />
                {(formErrors.role_title.length !== 0)
                    ? <div>Role title: {formErrors.role_title.map((item) => (<div>{item}</div>))}</div>
                    : <></>}

                <label htmlFor="role_level">Role level</label>
                <input type="text" id='role_level' placeholder='Role level' name='role_level' onChange={handleChange} />
                {(formErrors.role_level.length !== 0)
                    ? <div>Role level: {formErrors.role_level.map((item) => (<div>{item}</div>))}</div>
                    : <></>}

                <label htmlFor="role_description">Role description</label>
                <input type="text" id='role_description' placeholder='Role description' name='role_description' onChange={handleChange} />
                {(formErrors.role_description.length !== 0)
                    ? <div>Role description: {formErrors.role_description.map((item) => (<div>{item}</div>))}</div>
                    : <></>}



                <button type="submit" > Submit</button>
            </form>
        </div>
    )
}

export default Role

