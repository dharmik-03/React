import React from 'react'

const TodoTable = ({
  todo,
  editTODO,
  deleteTodo,
  toggleTaskCompleted
}) => {

  return (
    <div className="container mt-4">

      <div className="table-responsive">
        <table
          className="table table-bordered text-center align-middle"
          style={{ border: "2px solid #999" }}
        >

          <thead
            style={{
              backgroundColor: "lightgreen",
              fontSize: "18px",
              border: "1px solid #888"
            }}
          >
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Task</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody
            style={{
              backgroundColor: "lightblue"
            }}
          >
            {todo.map((item, index) => (
              <tr key={item.id}>

                <td>{index + 1}</td>

                <td>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTaskCompleted(item.id)}
                  />
                </td>

                <td>{item.task}</td>

                <td>{item.description}</td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => editTODO(index)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTodo(index)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default TodoTable