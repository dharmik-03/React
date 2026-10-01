import React from "react";

const Loading = () => {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <h1
                style={{
                    fontSize: "32px",
                    color: "#333",
                    fontWeight: "600",
                }}
            >
                Loading....
            </h1>
        </div>
    );
};

export default Loading;