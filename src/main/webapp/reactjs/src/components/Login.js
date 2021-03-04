import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt, faUndo} from "@fortawesome/free-solid-svg-icons";
import {authenticateUser} from "../services/user/auth/authActions";
import {connect} from 'react-redux';

const Login = (props) => {
    const initialState = {
        email: '',
        password: '',
        error: ''
    };
    const [state, setState] = useState(initialState);
    const [isFirstMount, setIsFirstMount] = useState(true);
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
    }, [props.login.isLoggedIn]);

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