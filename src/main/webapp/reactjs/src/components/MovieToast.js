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
            <Toast show={props.children.show} className="border border-success bg-success text-white">
                <Toast.Header closeButton={false} className="bg-success text-white">
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