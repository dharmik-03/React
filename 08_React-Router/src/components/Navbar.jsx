import { Link } from "react-router-dom";

function Navbars() {
  return (
    <ul
      style={{
        display: "flex",
        gap: "30px",
        listStyle: "none",
        padding: "20px",
        margin: 0,
        backgroundColor: "#222",
      }}
    >
      <li>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          to="/about"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          About
        </Link>
      </li>

      <li>
        <Link
          to="/service"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          Service
        </Link>
      </li>

      <li>
        <Link
          to="/product/101"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          Product
        </Link>
      </li>
    </ul>
  );
}

export default Navbars;