import React from 'react'

const Internal = () => {
  return (
<>

<style>
    {`
    .h1{
    color:red
    }


    .box{
    height:100px;
    width:100px;
    background-color:yellow;
    color:black;
    padding:50px
    }

    `}
</style>



<h1 className='h1'>This is internal css</h1>
<br />
<div className="box">This is also internal css</div>

</>

)
}

export default Internal