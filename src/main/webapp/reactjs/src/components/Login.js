import React, {useState} from 'react';
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt, faUndo} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const initialState = {
        email: '',
        password: ''
    };
    const [state, setState] = useState(initialState);
    const {email, password} = state;

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
                    </Card.Body>
                    <Card.Footer style={{textAlign: 'right'}}>
                        <Button size="sm" type="button" variant="success"
                                disabled={!email.length || !password.length}>
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Button>
                        {' '}
                        <Button size="sm" type="button" variant="info"
                                disabled={!email.length && !password.length} onClick={resetLoginForm}>
                            <FontAwesomeIcon icon={faUndo}/> Reset
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;