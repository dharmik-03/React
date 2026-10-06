import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
    return (
        <div
            style={{
                minHeight: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Spinner
                animation="border"
                role="status"
                style={{
                    color: "black",
                    width: "50px",
                    height: "50px",
                }}
            >
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>
        </div>
    );
};

export default Loading;