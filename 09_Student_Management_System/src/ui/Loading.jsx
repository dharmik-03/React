import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          color: "var(--link-color)",
          width: "44px",
          height: "44px",
          borderWidth: "3px",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Loading records...</span>
    </div>
  );
};

export default Loading;
