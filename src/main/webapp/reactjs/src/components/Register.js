import React, {useState} from 'react';
import {Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faPhone, faSignInAlt, faUndo, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
    const initialState = {
        name: '',
        email: '',
        password: '',
        contact: ''
    };
    const [state, setState] = useState(initialState);
    const {name, email, password, contact} = state;

    const resetLoginForm = () => {
        setState(initialState);
    }

    const inputChangeHandle = (ev) => {
        setState({
            ...state,
            [ev.target.name]: ev.target.value
        });
    }

    return (
        <Row className="justify-content-md-center">
            <Col xs={5}>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faSignInAlt} />{' '}Login
                    </Card.Header>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUser}/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl required autoComplete="off" type="text" name="name" value={name} style={{width: "370px"}}
                                                 className="bg-dark text-white " placeholder="Enter Name" onChange={inputChangeHandle}/>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faEnvelope}/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl required autoComplete="off" type="text" name="email" value={email} style={{width: "370px"}}
                                                 className="bg-dark text-white" placeholder="Enter Email Address" onChange={inputChangeHandle}/>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faLock}/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl required autoComplete="off" type="password" name="password" value={password} style={{width: "370px"}}
                                                 className="bg-dark text-white " placeholder="Enter Password" onChange={inputChangeHandle}/>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faPhone}/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl required autoComplete="off" type="text" name="contact" value={contact} style={{width: "370px"}}
                                                 className="bg-dark text-white " placeholder="Enter Contact Number" onChange={inputChangeHandle}/>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{textAlign: 'right'}}>
                        <Button size="sm" type="button" variant="success"
                                disabled={!name.length || !email.length || !password.length || !contact.length}>
                            <FontAwesomeIcon icon={faUserPlus}/> Register
                        </Button>
                        {' '}
                        <Button size="sm" type="button" variant="info"
                                disabled={!name.length && !email.length && !password.length && !contact.length  } onClick={resetLoginForm}>
                            <FontAwesomeIcon icon={faUndo}/> Reset
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
};

export default Register;