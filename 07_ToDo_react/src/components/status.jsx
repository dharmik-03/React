import React from 'react'

const Status = ({ todo }) => {

    const totalTask = todo.length
    const completedTask = todo.filter(item => item.completed).length
    const remainTask = totalTask - completedTask

    return (
        <div className="container mb-4">
            <div className="row g-3">

                <div className="col-md-4">
                    <div className="card stats-card text-center shadow-sm">
                        <div className="card-body">
                            <h5>Total Tasks</h5>
                            <h2>{totalTask}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card stats-card text-center shadow-sm">
                        <div className="card-body">
                            <h5>Completed</h5>
                            <h2 className="text-success">{completedTask}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card stats-card text-center shadow-sm">
                        <div className="card-body">
                            <h5>Remaining</h5>
                            <h2 className="text-danger">{remainTask}</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Status