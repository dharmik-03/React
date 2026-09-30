import React from 'react'
import Card from 'react-bootstrap/Card';


const Footer = () => {

  return (


    <>


      <Card bg="dark" data-bs-theme="dark">
        <Card.Header>Footer</Card.Header>
        <Card.Body>
          <Card.Title>this is common footer</Card.Title>
          <Card.Text>
            this footer is common use in all router file
          </Card.Text>

        </Card.Body>
      </Card>
    </>
  )
}

export default Footer