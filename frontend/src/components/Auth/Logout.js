import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();
    useEffect(()=>{
        sessionStorage.removeItem('token')
        navigate('/login')
    },[])
    return (
        <div>Logout</div>
    )
}

export default Logout