import React from 'react'
import { Outlet } from 'react-router-dom'

import Modal from 'react-bootstrap/Modal';


const Home = () => {
  return (
    <>

    <h3>Home Page</h3>
      <div  bg="dark" data-bs-theme="dark"
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header >
            <Modal.Title>This Is Home page</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>This Is Router Concept</p>
          </Modal.Body>

        </Modal.Dialog>
      </div>
    
       
    </>
  )
}

export default Home