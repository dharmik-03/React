import {useState} from 'react'

const OnChange_01 = () => {

  const [name,setName]=useState("")

  const handleChange=(e)=>{


    setName(e.target.value)

  }
    
  return (
    <>
  <input type="text" value={name} onChange={handleChange}  />
    <br />
    <br />
    <h1>{name}</h1>

    </>
  )
}

export default OnChange_01