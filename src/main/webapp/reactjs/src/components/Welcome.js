import React from 'react';
import {Button, Jumbotron} from "react-bootstrap";

const Welcome = () => {
    return (
        <div>
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome to Movie Store</h1>
                <blockquote className="blockquote">
                    <p>
                        When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.
                    </p>
                    <footer className="blockquote-footer">
                        Nora Ephron (When Harry met Sally)
                    </footer>
                </blockquote>
                <p className="mb-0">
                    <Button variant="primary">Movies of the Year</Button>
                </p>
            </Jumbotron>
        </div>
    );
};

export default Welcome;