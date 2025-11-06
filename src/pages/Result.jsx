
// import React, { useEffect } from 'react'
// import Sidebar from '../assets/components/Sidebar'
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import Table from 'react-bootstrap/Table';
// import axios from 'axios';
// import { data } from 'react-router';
 


// const Result = () => {




//   const [studentList, setStudentList] = useState([]);
//   const [resultField, setResultField] = useState([]);
//   const [studentId, setStudentId] = useState("");
//   const [departmentName, setDepartmentName] = useState("");
//   const [resultList, setResultList] = useState([]);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);




// useEffect(()=>{

//   axios.get("https://institute-back-end.onrender.com/allstudent").then((data)=>{
//     console.log(data)
//     setStudentList(data.data)
//   })

// },[])

// let handleAddResult = ()=>{
//     setResultField([...resultField, {subject:"", result:""}])
// }

// let handleDelete = (id)=>{
//     let arr = resultField
//     arr.splice(id, 1);
//     setResultField([...arr])

// }


// let handleSubjectChange= (e,id)=>{
//     resultField[id].subject = e.target.value
//     console.log(resultField)
// }

// let handleResultChange= (e,id)=>{
//     resultField[id].result = e.target.value
//     console.log(resultField)
// }


// let handleSubmit = ()=>{
//   axios.post("https://institute-back-end.onrender.com/result",{
//    " departmentName": departmentName,
//    "studentid": studentId,
//    "result": resultField
//   }).then((data)=>{
//     console.log("milon", data)
//   })

// }


// useEffect(()=>{
//   axios.get("https://institute-back-end.onrender.com/result").then((data)=>{
//     setResultList(data.data)
//   })
// })


//   return (
//     <div>

//        <div className='main'>

//         <div className='left'>

//           <Sidebar/>

//         </div>
//        <div className='right'>

//         <>
//       <Button variant="primary" onClick={handleShow}>
//         Add Result
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title> Add Result </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
            
//              <Form.Label>Department</Form.Label>
//       <Form.Control
//         type="text"
//         id="inputPassword5"
//         aria-describedby="passwordHelpBlock"
//         onChange={(e)=>setDepartmentName(e.target.value)}
//       />

//       <br />

//        <Form.Select aria-label="Default select example" onChange={(e)=>setStudentId(e.target.value)}>
//       <option> Select Student </option>
//       {studentList.map(item=>(
//          <option value={item._id}> {item.studentname} </option>

//       ))};
     
//     </Form.Select>
//     <br />

//     <Button onClick={handleAddResult}> Add Result</Button>
//     {resultField.map((item,index)=>(


//  <div style={{display: "flex"}}>

//         <div className='left1'> <Form.Control
//         type="text"
//         id="inputPassword5"
//         aria-describedby="passwordHelpBlock"
//         onChange={(e)=>handleSubjectChange(e,index) }
//       /></div>

//         <div className='right1'> <Form.Control
//         type="text"
//         id="inputPassword5"
//         aria-describedby="passwordHelpBlock"
//         onChange={(e)=>handleResultChange(e,index) }
//       /> </div>

//         <Button onClick={()=> handleDelete(index)} variant='danger'>Delete</Button>

//       </div>

//     ))}

    
      
    
//       </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>



//  {/* table */}

//   <Table striped bordered hover size="sm">
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Student Name</th>
//           <th>Department Name</th>
//           <th>CGPa</th>
//         </tr>
//       </thead>
//       <tbody>

//         {resultList.map((item,index)=>{
//           <tr>
//           <td>{index+1}</td>
//           <td> {item.studentid.studentname} </td>
//           <td>{item.departmentname}</td>
//           <td>{item.cgpa}</td>
//         </tr>

//         })}
        
       
//       </tbody>
//     </Table>


//        </div>

//        </div>
       
      
//     </div>
//   )
// }

// export default Result







import React, { useEffect, useState } from "react";
import Sidebar from "../assets/components/Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";



const Result = () => {
  // local state
  const [students, setStudents] = useState([]);            // all students
  const [rows, setRows] = useState([]);                    // temporary subject rows in modal
  const [selectedStudent, setSelectedStudent] = useState("");
  const [dept, setDept] = useState("");
  const [records, setRecords] = useState([]);              // fetched results list
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedMap, setExpandedMap] = useState({});      // which rows expanded
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  //  students
  async function loadStudents() {
    try {
      const { data } = await axios.get("https://institute-back-end.onrender.com/allstudent");
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Students fetch error:", err);
    }
  }

  //published results
  async function loadResults() {
    try {
      const { data } = await axios.get("https://institute-back-end.onrender.com/result");
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Results fetch error:", err);
    }
  }

  useEffect(() => {
    loadStudents();
    loadResults();
  }, []);

  // Add a subject row in the modal
  const addRow = () => setRows(prev => [...prev, { subject: "", mark: "" }]);

  // Remove specific row
  const removeRow = (idx) => setRows(prev => prev.filter((_, i) => i !== idx));

  // update subject text
  const changeSubject = (idx, value) => {
    setRows(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], subject: value };
      return copy;
    });
  };

  // updatekorar jonne sudhu number dorkar
  const changeMark = (idx, value) => {
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === "") {
      setRows(prev => {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], mark: value };
        return copy;
      });
    }
  };

  // Submit new result
  const submitResult = async () => {
    // basic validation
    if (!dept.trim() || !selectedStudent || rows.length === 0) {
      alert("Department, student ar ekta subject result dorkar.");
      return;
    }

    // make payload and convert marks to numbers
    const payload = {
      departmentname: dept.trim(),
      studentid: selectedStudent,
      result: rows.map(r => ({ subject: r.subject || "", result: Number(r.mark) || 0 }))
    };

    setIsSubmitting(true);
    try {
      await axios.post("https://institute-back-end.onrender.com/result", payload);
      // success: reload results and reset modal
      await loadResults();
      setRows([]);
      setDept("");
      setSelectedStudent("");
      closeModal();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Result publish korte problem hoolo, Console check korun.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete a result by its document id
  const deleteResult = async (id) => {
    const ok = window.confirm("Nischit? Ei result delete kore chan");
    if (!ok) return;
    try {
      await axios.delete(`https://institute-back-end.onrender.com/result/${id}`);
      // locally remove so UI updated fast
      setRecords(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete korte problem holo.");
    }
  };

  // toggle expanded details
  const toggleDetails = (id) => {
    setExpandedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // small presentational helper for cgpa
  const showCgpa = (val) => {
    if (typeof val === "number") return val.toFixed(2);
    if (val === undefined || val === null) return "—";
    return String(val);
  };

  return (
    <div className="main">
      <div className="left"><Sidebar /></div>

      <div className="right">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h4 style={{ margin: 0 }}>Results</h4>
          <Button variant="primary" onClick={openModal}>Add Result</Button>
        </div>

        {/* Add Result Modal */}
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Publish Result</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Department</Form.Label>
              <Form.Control value={dept} onChange={(e) => setDept(e.target.value)} placeholder="e.g. CSE" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Student</Form.Label>
              <Form.Select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                <option value="">Select Student</option>
                {students.map(s => (
                  <option key={s._id} value={s._id}>{s.studentname}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <div style={{ marginTop: 10 }}>
              <Button size="sm" onClick={addRow}>Add Subject</Button>
            </div>

            {rows.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
                <Form.Control placeholder="Subject" value={r.subject} onChange={(e) => changeSubject(i, e.target.value)} />
                <Form.Control placeholder="Marks" value={r.mark} onChange={(e) => changeMark(i, e.target.value)} style={{ width: 120 }} />
                <Button variant="danger" size="sm" onClick={() => removeRow(i)}>Remove</Button>
              </div>
            ))}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Close</Button>
            <Button variant="primary" onClick={submitResult} disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Results table */}
        <div className="result-card">
          <Table striped bordered hover size="sm" className="leave-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Department</th>
                <th>CGPA</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "#666" }}>
                    No results found.
                  </td>
                </tr>
              )}

              {records.map((rec, idx) => (
                <React.Fragment key={rec._id || idx}>
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{rec.studentid?.studentname || "Unknown"}</td>
                    <td>{rec.departmentname || "—"}</td>
                    <td>{showCgpa(rec.cgpa)}</td>
                    <td style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                      <Button size="sm" variant="outline-primary" onClick={() => toggleDetails(rec._id)}>
                        {expandedMap[rec._id] ? "Hide" : "Details"}
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => deleteResult(rec._id)}>Delete</Button>
                    </td>
                  </tr>

                  {expandedMap[rec._id] && (
                    <tr className="details-row">
                      <td colSpan={5}>
                        <strong>Subjects:</strong>
                        <ul style={{ marginTop: 8 }}>
                          {(rec.result || []).map((s, i) => (
                            <li key={i}>{s.subject || "—"} — {s.result ?? "—"}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Result;
