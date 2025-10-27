// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import Sidebar from '../assets/components/Sidebar'
// import Form from 'react-bootstrap/Form';
// import axios from 'axios';

// const Leave = () => {


//     const [show, setShow] = useState(false);
//     const [studentName, setStudentName] = useState("");
//     const [departmentName, setDepartmentName] = useState("");
//     const [studentId, setSelectedId] = useState("");
    
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     let handleSubmit = ()=>{
//         axios.post("https://localhost:5000/leave",{
//             studentName: studentName,
//             departmentName: departmentName,
//             studentId: studentId
//         }).then((data)=>{
//             console.log(data)

//         })
//     }

//     return (
//         <div>

//             <div className='main'>

//                 <div className='left'>

//                     <Sidebar />

//                 </div>
//                 <div className='right'>

//                     <Button variant="primary" onClick={handleShow} className="me-2">
//                         Create Leave
//                     </Button>
//                     <Offcanvas show={show} onHide={handleClose} placement='bottom' >
//                         <Offcanvas.Header closeButton>
//                             <Offcanvas.Title>Add Leave</Offcanvas.Title>
//                         </Offcanvas.Header>
//                         <Offcanvas.Body>
//                             <Form>
//                                 <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setStudentName(e.target.value)}>
//                                     <Form.Label>Student Name</Form.Label>
//                                     <Form.Control type="text" placeholder="Enter your name" />

//                                 </Form.Group>

//                                 <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setDepartmentName(e.target.value)}>
//                                     <Form.Label>Department Name</Form.Label>
//                                     <Form.Control type="text" placeholder="Enter Department name" />

//                                 </Form.Group>


//                                 <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setSelectedId(e.target.value)}>
//                                     <Form.Label>Student I'd</Form.Label>
//                                     <Form.Control type="text" placeholder="Enter your I'd" />
//                                 </Form.Group>





//                             </Form>
//                             <Button variant="primary" onClick={handleSubmit}>Submit Leave</Button>
//                         </Offcanvas.Body>
//                     </Offcanvas>

//                 </div>

//             </div>


//         </div>
//     )
// };

// export default Leave












import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sidebar from '../assets/components/Sidebar';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Leave = () => {
  const [show, setShow] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [studentId, setSelectedId] = useState("");
  const [leaveList, setLeaveList] = useState([]); // ✅ এখানে নতুন স্টেট যোগ করা হয়েছে

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ✅ Backend থেকে Leave ডেটা আনবে
  useEffect(() => {
    axios.get("https://institute-back-end.onrender.com/leave")
      .then((res) => setLeaveList(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = () => {
    axios.post("https://institute-back-end.onrender.com/leave", {
      studentname: studentName,
      departmentname: departmentName,
      studentid: studentId
    })
    .then((res) => {
      alert("✅ Leave Created Successfully!");
      setStudentName("");
      setDepartmentName("");
      setSelectedId("");
      setShow(false);

      // ✅ নতুন leave add হলে table আপডেট করো
      setLeaveList((prev) => [...prev, res.data]);
    })
    .catch((err) => {
      console.error(err);
      alert("❌ Error creating leave");
    });
  };

  return (
    <div className='main'>
      <div className='left'>
        <Sidebar />
      </div>
      <div className='right'>
        <Button variant="primary" onClick={handleShow} className="me-2">
          Create Leave
        </Button>

        <Offcanvas show={show} onHide={handleClose} placement='bottom'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Add Leave</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Department name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your ID"
                  value={studentId}
                  onChange={(e) => setSelectedId(e.target.value)}
                />
              </Form.Group>
            </Form>

            <Button variant="primary" onClick={handleSubmit}>
              Submit Leave
            </Button>
          </Offcanvas.Body>
        </Offcanvas>

        <Table bordered hover className='mt-4'>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Student ID</th>
              <th>Total Leave</th>
            </tr>
          </thead>
          <tbody>
            {leaveList.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.studentname}</td>
                <td>{item.departmentname}</td>
                <td>{item.studentid}</td>
                <td>{item.total || 1}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Leave;
