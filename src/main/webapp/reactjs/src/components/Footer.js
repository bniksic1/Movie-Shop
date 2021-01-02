import React from 'react'
import {Col, Container, Navbar} from "react-bootstrap"

const Footer = () => {
    let fullYear = new Date().getFullYear()
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>{fullYear}-{fullYear + 1}, All Rights Reserved by <b>Benjamin Nikšić</b></div>
                    </Col>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer