import React from 'react'

///old method

// const Props = (props) => {
//     return (
//         <>
//             <h1>name :- {props.name}</h1>
//         </>
//     )
// }


//new method

const Props = ({name}) => {
    return (
        <>
            <h1>name :- {name}</h1>
        </>
    )
}

export default Props