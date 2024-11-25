import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBasicAuthHeader } from '../../utils/utils';
import { Alert, Button, Card, CardBody, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const onButtonClick = async (e: { preventDefault: () => void; }) => {

        e.preventDefault();

        setUsernameError('');
        setPasswordError('');
        setErrorMessage('');

        if (!username) {
            setUsernameError("Username is required");
        } else{
            setUsernameError("");
        }
        if (!password) {
            setPasswordError("Password is required");
        } else {
            setPasswordError("")
        }
        if (!username || !password) return;

        try {
            const authenticationHeader = getBasicAuthHeader(username, password);

            const response = await axios.post('http://localhost:8080/api/login', {
                username: username,
                password: password,
            });

            if (response.status === 200) {
                localStorage.setItem('authHeader', authenticationHeader);

                const role = response.data.role;
                localStorage.setItem('role', role);
                if (role === "ADMIN"){
                    navigate("/admin")
                } else{
                    navigate('/user');
                }
            }

        } catch (error) {
            setErrorMessage('Incorrect login credentials.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <CardBody>
                            {errorMessage && (
                                <Alert color="danger" className="mb-3">
                                    {errorMessage}
                                </Alert>
                            )}
                            <Form onSubmit={onButtonClick}>
                                <FormGroup>
                                    <Label for="exUsername">Username</Label>
                                    <Input
                                        name="username"
                                        id="exUsername"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(ev) => setUsername(ev.target.value)}
                                    />
                                    {usernameError && (
                                        <FormText color="danger">{usernameError}</FormText>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exPassword">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="exPassword"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(ev) => setPassword(ev.target.value)}
                                    />
                                    {passwordError && (
                                        <FormText color="danger">{passwordError}</FormText>
                                    )}
                                </FormGroup>
                                <Button type="submit" color="success">
                                    Login
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
