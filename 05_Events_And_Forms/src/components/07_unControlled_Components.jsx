import { useRef } from "react";

function UncontrolledForm() {
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(nameRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        ref={nameRef}
        placeholder="Enter name"
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;