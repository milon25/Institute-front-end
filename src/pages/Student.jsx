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


const Student = () => {
  let navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [studentname, setStudentName] = useState("");
  const [departmentname, setDepartmentName] = useState("");
  const [studentid, setStudentId] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState("");



  // const handleClose = () => {

  //   axios.post("https://institute-back-end.onrender.com/createstudent",{

  //     studentname: studentname,
  //     departmentname: departmentname,
  //     studentid: studentid,
  //     phonenumber: phonenumber
  //   }).then(()=>{
  //     setShow(false)

  //   })

    
  // };


 



const handleShow = () => setShow(true);

const handleCloseShow = () => {

  setShow(false);
  setUpdate(false)
}

const handleShowModal = (id) => {
  setUpdate(true)
  // console.log(id)
  axios.get(`https://institute-back-end.onrender.com/student/${id}`).then((data)=>{
    console.log(data.data[0])

    setStudentName(data.data[0].studentname)
    setDepartmentName(data.data[0].departmentname)
    setStudentId(data.data[0].studentid)
    setPhoneNumber(data.data[0].phonenumber)
     setSelectedId(id); 

     


  });
  setShow(true);
};




const handleCreateStudent = async () => {
  
  if (!studentname || !departmentname || !studentid || !phonenumber) {
    alert("⚠️ Please fill in all fields before creating a student!");
    return; 
  }

  setLoading(true);

  try {
    // new student create
    await axios.post("https://institute-back-end.onrender.com/createstudent", {
      studentname,
      departmentname,
      studentid,
      phonenumber,
    });

    alert("✅ Student created successfully!");


    const { data } = await axios.get("https://institute-back-end.onrender.com/allstudent");
    setStudentList(data);

  
    setShow(false);
    setStudentName("");
    setDepartmentName("");
    setStudentId("");
    setPhoneNumber("");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to create student. Please check backend or inputs.");
  } finally {
   
    setLoading(false);
  }
};




const handleUpdateStudent = async () => {
  if (!studentname || !departmentname || !studentid || !phonenumber) {
    alert("⚠️ Please fill in all fields before updating!");
    return;
  }

  setLoading(true);

  try {
    await axios.post("https://institute-back-end.onrender.com/updatestudent", {
      id: selectedId, // update
      studentname,
      departmentname,
      studentid,
      phonenumber,
    });

    alert("✅ Student updated successfully!");

    const { data } = await axios.get("https://institute-back-end.onrender.com/allstudent");
    setStudentList(data);

    setShow(false);
    setUpdate(false);

    setStudentName("");
    setDepartmentName("");
    setStudentId("");
    setPhoneNumber("");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to update student!");
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

  axios.get("https://institute-back-end.onrender.com/allstudent").then((data)=>{
    setStudentList(data.data)
  })

},[])

let handleDelete = (id)=>{
  console.log(id)
  axios.post("https://institute-back-end.onrender.com/deletestudent",{
    id: id
  }).then(()=>{

    alert("✅ Student deleted successfully!");

    axios.get("https://institute-back-end.onrender.com/allstudent").then((data)=>{
   setStudentList(data.data);
  });

  })
}
 
  return (
    <div>

       <div className='main'>

        <div className='left'>

          <Sidebar/>

        </div>
       <div className='right'><Button variant="primary" onClick={handleShow}>
        Add a Student
      </Button>

      <Modal show={show} onHide={handleCloseShow}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Add Student</Modal.Title> */}

          <Modal.Title>{update ? "Edit Student" : "Add Student"}</Modal.Title>

        </Modal.Header>
        <Modal.Body>

          <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Student Name</Form.Label>
        <Form.Control onChange={(e)=> setStudentName(e.target.value)} type="text" placeholder="Enter your name" value={studentname}/>
        
      </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Department Name</Form.Label>
        <Form.Control onChange={(e)=> setDepartmentName(e.target.value)}  type="text" placeholder="Enter Department name" value={departmentname} />
        
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Student I'd</Form.Label>
        <Form.Control onChange={(e)=> setStudentId(e.target.value)}  type="text" placeholder="Enter your I'd" value={studentid}/>
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
    <Button disabled={loading} variant="primary" onClick={handleUpdateStudent}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        "Update Student"
      )}
    </Button>
  ) : (
    <Button disabled={loading} variant="primary" onClick={handleCreateStudent}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        "Create Student"
      )}
    </Button>
  )}

  
</Modal.Footer>





      </Modal>
      
      
       <Table striped bordered hover>
      <thead>

       
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Department</th>
          <th>Student Id</th>
          <th>Phone number</th>
          <th>
            Acttions
          </th>
          
        </tr>
      </thead>

       <tbody>
         {studentList.map((item,index) => (

          
        <tr>
          <td> {index+1} </td>
          <td> {item.studentname} </td>
          <td> {item.departmentname} </td>
          <td> {item.studentid} </td>
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

export default Student






