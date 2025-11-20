
import React, { useEffect } from 'react'
import Sidebar from '../assets/components/Sidebar'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { GiConsoleController } from 'react-icons/gi';
import { data, useNavigate } from 'react-router';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';


const Teacher = () => {
  let navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [teachername, setTeacherName] = useState("");
  const [departmentname, setDepartmentName] = useState("");
  const [teacherid, setTeacherId] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [teacherList, setTeacherList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState("");



const handleShow = () => setShow(true);

const handleCloseShow = () => {

  setShow(false);
  setUpdate(false)
}

const handleShowModal = (id) => {
  setUpdate(true)
  axios.get(`https://institute-back-end.onrender.com/teacher/${id}`).then((data)=>{
    console.log(data.data[0])

    setTeacherName(data.data[0].teachername)
    setDepartmentName(data.data[0].departmentname)
    setTeacherId(data.data[0].teacherid)
    setPhoneNumber(data.data[0].phonenumber)
     setSelectedId(id); 

     


  });
  setShow(true);
};




const handleCreateTeacher = async () => {
  if (!teachername || !departmentname || !teacherid || !phonenumber) {
    alert("⚠️ Please fill in all fields before creating a student!");
    return; 
  }

  setLoading(true);

  try {
    // notun student create
    await axios.post("https://institute-back-end.onrender.com/createteacher", {
      teachername,
      departmentname,
      teacherid,
      phonenumber,
    });

    alert("✅ Teacher created successfully!");

   
    const { data } = await axios.get("https://institute-back-end.onrender.com/allteacher");
    setTeacherList(data);

    //  modal off r rest korar jonne eita
    setShow(false);
    setTeacherName("");
    setDepartmentName("");
    setTeacherId("");
    setPhoneNumber("");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to create teacher. Please check backend.");
  } finally {
    // success
    setLoading(false);
  }
};




const handleUpdateTeacher = async () => {
  if (!teachername || !departmentname || !teacherid || !phonenumber) {
    alert("⚠️ Please fill in all fields before updating!");
    return;
  }

  setLoading(true);

  try {
    await axios.post("https://institute-back-end.onrender.com/updateteacher", {
      id: selectedId, // jake update korbo
      teachername,
      departmentname,
      teacherid,
      phonenumber,
    });

    alert("✅ Teacher updated successfully!");

    const { data } = await axios.get("https://institute-back-end.onrender.com/allteacher");
    setTeacherList(data);

    setShow(false);
    setUpdate(false);

    setTeacherName("");
    setDepartmentName("");
    setTeacherId("");
    setPhoneNumber("");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to update teacher!");
  } finally {
    setLoading(false);
  }
};




   useEffect(()=>{
      let user = localStorage.getItem("user")
      if(!user){
        navigate("/login")
      }
    },[])

useEffect(()=>{

  axios.get("https://institute-back-end.onrender.com/allteacher").then((data)=>{
    setTeacherList(data.data)
  })

},[])

let handleDelete = (id)=>{
  console.log(id)
  axios.post("https://institute-back-end.onrender.com/deleteteacher", { id })
.then(()=>{

    alert("✅ Teacher deleted successfully!");

    axios.get("https://institute-back-end.onrender.com/allteacher").then((data)=>{
   setTeacherList(data.data);
  });

  })
}
 
  return (
    <div>

       <div className='main'>

        <div className='left'>

          <Sidebar/>

        </div>
       <div className='right'>


        <div className="header-bar d-flex justify-content-between align-items-center">
          <h4>🧑‍🏫 Teacher Management</h4>
          <Button variant="primary" onClick={handleShow} className="create-btn">
            ➕ Add Teacher
          </Button>
        </div>
        
        
        
        {/* <Button variant="primary" onClick={handleShow}>
        Add a Teacher
      </Button> */}

      <Modal show={show} onHide={handleCloseShow}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Add Student</Modal.Title> */}

          <Modal.Title>{update ? "Edit Teacher" : "Add Teacher"}</Modal.Title>

        </Modal.Header>
        <Modal.Body>

          <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Teacher Name</Form.Label>
        <Form.Control onChange={(e)=> setTeacherName(e.target.value)} type="text" placeholder="Enter your name" value={teachername}/>
        
      </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Department Name</Form.Label>
        <Form.Control onChange={(e)=> setDepartmentName(e.target.value)}  type="text" placeholder="Enter Department name" value={departmentname} />
        
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Teacher I'd</Form.Label>
        <Form.Control onChange={(e)=> setTeacherId(e.target.value)}  type="text" placeholder="Enter your I'd" value={teacherid}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control onChange={(e)=> setPhoneNumber(e.target.value)}  type="text" placeholder="Enter phone number" value={phonenumber} />
        </Form.Group>


     
     
    </Form></Modal.Body>
         {/* { <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
         
          <Button variant="primary" onClick={handleClose}>
            Create Student
          </Button>
        </Modal.Footer> }  */}






        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseShow}>
    Cancel
  </Button>
  {update ? (
    <Button disabled={loading} variant="primary" onClick={handleUpdateTeacher}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        "Update Teacher"
      )}
    </Button>
  ) : (
    <Button disabled={loading} variant="primary" onClick={handleCreateTeacher}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        "Create Teacher"
      )}
    </Button>
  )}

  
</Modal.Footer>





      </Modal>
      
      
       <Table striped bordered hover>
      <thead>

       
        <tr>
          <th>#</th>
          <th>Teacher Name</th>
          <th>Department</th>
          <th>Teacher Id</th>
          <th>Phone number</th>
          <th>
            Acttions
          </th>
          
        </tr>
      </thead>

       <tbody>
         {teacherList.map((item,index) => (

          
        <tr>
          <td> {index+1} </td>
          <td> {item.teachername} </td>
          <td> {item.departmentname} </td>
          <td> {item.teacherid} </td>
          <td> {item.phonenumber} </td>
          <td>
            <Button variant="success" onClick={() => handleShowModal(item._id)}>Edit</Button>

          
             <Button variant="info" onClick={()=> handleDelete(item._id)}>Delete</Button>
             </td>
        </tr>
        
        ))}
      </tbody>
     
    </Table></div>

       </div>
       
      
    </div>
  )
}

export default Teacher
