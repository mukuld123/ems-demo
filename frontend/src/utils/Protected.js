import {Navigate} from 'react-router-dom'

const Protected = (props) => {
  if(sessionStorage.getItem('token')){
    return props.children
  }
  alert('Please login first')
  return <Navigate to='/login' />
}

export default Protected