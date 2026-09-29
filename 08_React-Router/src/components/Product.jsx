import React from 'react'
import Modal from 'react-bootstrap/Modal';


const Product = () => {
  return (

    <>
      <h3 >Product Page</h3>

      <div bg="dark" data-bs-theme="dark"
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header >
            <Modal.Title>This Is Product page</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>This Is Router Concept</p>
          </Modal.Body>

        </Modal.Dialog>
      </div>
    </>
  )
}

export default Product