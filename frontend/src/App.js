import {useEffect} from 'react';
import axios from 'axios';
// import './App.css';
import Employee from './components/Employee/Employee';
import Department from './components/department/Department'
import Role from './components/role/Role';
import Reimbursement from './components/reimbursement/Reimbursement';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login'

function App() {
  const baseurl = 'http://127.0.0.1:8000'
  // const headers = {
  //   "Content-Type": "application/json"
  // };
  useEffect(() => {
      axios.get(`${baseurl}/`).then((response) => {
          console.log(response)

      });
  }, []);
  return (
    <div>
      {/* <Account /> */}
      {/* <Department /> */}
      {/* <Role /> */}
      <Employee />
      {/* <Reimbursement /> */}
      
    </div>
  );
}

export default App;
