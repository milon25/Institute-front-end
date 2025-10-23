import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
// import './Sidebar.css';


const Sidebar = () => {
  let navigate = useNavigate()

  let handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }
  return (
    <div className='sidebar'>


      <div>

        <h2>Welcome {JSON.parse(localStorage.getItem("user")).username} </h2>
      </div>

      <div className='list'>

         <ListGroup>
      <ListGroup.Item> <Link to="/teacher">Teacher</Link></ListGroup.Item>
      <ListGroup.Item> <Link to="/student">Student</Link></ListGroup.Item>
      <ListGroup.Item><Link to="/pdf">PDF</Link></ListGroup.Item>
      <ListGroup.Item>Result</ListGroup.Item>
      <ListGroup.Item>Leave</ListGroup.Item>
    
    </ListGroup>

     <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </div>
      
    </div>
  )
}

export default Sidebar




