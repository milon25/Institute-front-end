// import React from 'react'
// import Sidebar from '../assets/components/Sidebar'

// const PDF = () => {
//   return (
//     <div className='main'>

//         <div className='left'>
//             <Sidebar/>
//         </div>

//         <div className='right'>







//         </div>
      
//     </div>
//   )
// }

// export default PDF








import React, { useEffect } from 'react'
import Sidebar from '../assets/components/Sidebar'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { GiConsoleController } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';


const Book = () => {
  let navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [name, setBookName] = useState("");
  const [writer, setWriter] = useState("");
  const [serial, setSerial] = useState("");
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);

const [department, setDepartment] = useState("");
const [bookList, setBookList] = useState([]);



const handleChange = (e)=>{
    setFile(e.target.files[0])

}

const handleShow = () => setShow(true);

const handleCloseShow = () => {

  setShow(false);
  setUpdate(false)
}


const handleCreateBook = async () => {
  if (!name || !department || !writer || !serial || !file) {
    alert("⚠️ Please fill in all fields and select a file!");
    return;
  }

  setLoading(true);





  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("name", name);
  formData.append("department", department);
  formData.append("writer", writer);
  formData.append("serial", serial);

  try {
    await axios.post("http://localhost:5000/uploadbook", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("✅ Book created successfully!");

    const { data } = await axios.get("http://localhost:5000/allbook");
    setBookList(data);

    setShow(false);
    setBookName("");
    setDepartment("");
    setWriter("");
    setSerial("");
    setFile({});
  } catch (err) {
    console.error(err);
    alert("❌ Failed to create book. Please check backend or inputs.");
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

  axios.get("http://localhost:5000/allbook").then((data)=>{
    setBookList(data.data)
  })

},[])

let handleDelete = (id)=>{
  console.log(id)
  axios.post("http://localhost:5000/deletebook",{
    id: id
  }).then(()=>{

    alert("✅ Book deleted successfully!");

    axios.get("http://localhost:5000/allbook").then((data)=>{
   setBookList(data.data);
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
        Add a Book
      </Button>

      <Modal show={show} onHide={handleCloseShow}>
        <Modal.Header closeButton>

          {/* <Modal.Title>{update ? "Edit Student" : "Add Student"}</Modal.Title> */}

        </Modal.Header>
        <Modal.Body>

          <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Book Name</Form.Label>
        <Form.Control onChange={(e)=> setBookName(e.target.value)} type="text" placeholder="Enter book name" value={name}/>

        
      </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Department</Form.Label>
        <Form.Control onChange={(e)=> setDepartment(e.target.value)}  type="text" placeholder="Enter Department name" value={department} />
        
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Writer</Form.Label>
        <Form.Control onChange={(e)=> setWriter(e.target.value)}  type="text" placeholder="Enter writer" value={writer}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Serial</Form.Label>
        <Form.Control onChange={(e)=> setSerial(e.target.value)}  type="text" placeholder="Enter serial" value={serial} />
        </Form.Group>


         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Upload</Form.Label>
        <Form.Control onChange={handleChange} type="file" />
        </Form.Group>

    



     
     
    </Form></Modal.Body>
        

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseShow}>
    Cancel
  </Button>

   { (
    <Button disabled={loading} variant="primary" onClick={handleCreateBook}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        "Create Book"
      )}
    </Button>
  )}

  
</Modal.Footer>





      </Modal>
      
      
       <Table striped bordered hover>
      <thead>

       
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Department</th>
          <th>Writer</th>
          <th>Serial</th>
          <th>
            Acttions
          </th>
          <th>
            DELETE
          </th>
          
        </tr>
      </thead>

       <tbody>
         {bookList.map((item,index) => (

          
        <tr>
          <td> {index+1} </td>
          <td> {item.name} </td>
          <td> {item.department} </td>
          <td> {item.writer} </td>
          <td> {item.serial} </td>
          <td><Link to={`http://localhost:5000/${item.url}`} target='_blank'>Read</Link></td>

          
          
          <td>
           
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

export default Book

