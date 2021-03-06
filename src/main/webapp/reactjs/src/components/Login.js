import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faEye, faLock, faSignInAlt, faUndo} from "@fortawesome/free-solid-svg-icons";
import {authenticateUser} from "../services/user/auth/authActions";
import {connect} from 'react-redux';
import './Style.css';

const Login = (props) => {
    const initialState = {
        email: '',
        password: '',
        error: ''
    };
    const [state, setState] = useState(initialState);
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isFirstMount, setIsFirstMount] = useState(true);
    const [inputChange, setInputChange] = useState(true);
    const {email, password, error} = state;

    const resetLoginForm = () => {
        setState(initialState);
    }

    const inputChangeHandle = (ev) => {
        setState({
            ...state,
            [ev.target.name]: ev.target.value
        });
    }

    const validateUser = () => {
        props.authenticateUser(email, password);
        setInputChange(!inputChange);
    }

    const handlePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    }

    useEffect(() => {
        if(isFirstMount) {
            setIsFirstMount(false);
            return;
        }

        if(props.login.isLoggedIn)
            return props.history.push("/");
        else{
            resetLoginForm();
            setState({...state, error: 'Invalid email and password'});
        }
    }, [inputChange, props.login.isLoggedIn]);

    return (
        <Row className="justify-content-md-center">
            <Col xs={5}>
                {error.length && <Alert variant="danger">{error}</Alert>}
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
                                    <FormControl
                                        required
                                        autoComplete="off"
                                        type="text"
                                        name="email"
                                        value={email}
                                        style={{width: "370px"}}
                                        className="bg-dark text-white"
                                        placeholder="Enter Email Address"
                                        onChange={inputChangeHandle}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <InputGroup>
                                    <div className="password">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faLock}/>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            required
                                            autoComplete="off"
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            name="password"
                                            value={password} style={{width: "370px"}}
                                            className="bg-dark text-white "
                                            placeholder="Enter Password"
                                            onChange={inputChangeHandle}
                                        />
                                        <span className="faeye-icon" onClick={handlePasswordVisibility}><FontAwesomeIcon icon={faEye} className={isPasswordVisible ? 'text-info' : ''} /></span>
                                    </div>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{textAlign: 'right'}}>
                        <Button size="sm" type="button" variant="success" onClick={validateUser}
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

const mapStateToProps = state => ({
        login: state.auth
});

const mapDispatchToProps = dispatch => ({
    authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);