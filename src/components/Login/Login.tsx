import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBasicAuthHeader } from '../../utils/utils';
import { Alert, Button, Card, CardBody, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';

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
            setUsernameError("Please enter username");
        } else{
            setUsernameError("");
        }
        if (!password) {
            setPasswordError("Please enter password");
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
                sessionStorage.setItem('authHeader', authenticationHeader);
                console.log(response.data);
                const role = response.data.role;
                const userId = response.data.userId;
                sessionStorage.setItem('role', role);
                sessionStorage.setItem('userId', userId);
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
        <Container className="mt-5" style={{}}>
            <Row className="justify-content-center align-items-center">
                <Col md={7} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                        src="src/assets/pexels-tdcat-69866.jpg"
                        alt="Ticketguru login photo"
                        style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
                    />
                </Col>
                <Col md={4}>   
                    <Card style={{ border: "none" }}>
                    <h1 className="text-center" style={{marginBottom:"30px"}}>Welcome to Ticketguru</h1>
                        <CardBody>
                            {errorMessage && (
                                <Alert color="danger" className="mb-3">{errorMessage}</Alert>
                            )}
                            <Form onSubmit={onButtonClick}>
                                <FormGroup>
                                    <Label for="exUsername" className="text-start d-block">Username</Label>
                                    <Input
                                        name="username"
                                        id="exUsername"
                                        invalid={!!usernameError}
                                        value={username}
                                        onChange={(ev) => setUsername(ev.target.value)}
                                    />
                                    <FormFeedback>{usernameError}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exPassword" className="text-start d-block">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="exPassword"
                                        invalid={!!passwordError}
                                        value={password}
                                        onChange={(ev) => setPassword(ev.target.value)}
                                    />
                                    <FormFeedback>{passwordError}</FormFeedback>
                                </FormGroup>
                                <Button type="submit" color="success" style={{width:'50%', marginTop:'10px',borderRadius: '25px', background: 'linear-gradient(90deg, #28a745, #218838)', fontWeight: 'bold'}}>
                                    LOGIN
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
