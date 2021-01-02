import React from 'react';
import {Toast} from "react-bootstrap";

const MovieToast = (props) => {
    const toastCss = {
        position: "fixed",
        top: "60px",
        right: "20px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 0 rgba(0, 0, 0, 0.19)",
        zIndex: 1
    }

    return (
        <div style={toastCss}>
            <Toast show={props.children.show} className={props.children.type === "success" ? "border border-success bg-success text-white" : "border border-danger bg-danger text-white"}>
                <Toast.Header closeButton={false} className={props.children.type === "success" ? "bg-success text-white" : "bg-danger text-white"}>
                    <strong className="mx-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>
                    {props.children.message}
                </Toast.Body>
            </Toast>
        </div>
    );
};

export default MovieToast;