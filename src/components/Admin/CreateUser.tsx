import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { createAppUser } from "../../utils/api";

interface CreateUserFormProps {
    toggleModal: () => void;
}

export default function CreateUserForm(props: CreateUserFormProps) {
    const [user, setUser] = useState({
        username: "",
        password: "",
        roleId: 2, // laitetaan rooliksi user oletuksena, mutta myös admin voidaan luoda
    });
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await createAppUser(user, props.toggleModal);
            setLoginErrorMessage("");
        } catch (error) {
            setLoginErrorMessage(error?.message);
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            {loginErrorMessage && (
                <Alert color="danger" className="mb-3">
                    {loginErrorMessage}
                </Alert>
            )}
            <FormGroup className="mb-1 px-2 text-start">
                <Label for="username" className="form-label p-1">
                    Username
                </Label>
                <Input
                    type="text"
                    id="username"
                    value={user.username}
                    placeholder="Enter username"
                    required
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
            </FormGroup>
            <FormGroup className="mb-1 px-2 text-start">
                <Label for="password" className="form-label p-1">
                    Password
                </Label>
                <Input
                    type="password"
                    id="password"
                    value={user.password}
                    placeholder="Enter password"
                    required
                    pattern=".{8,}"
                    title="Password has to be at least 8 characters long"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
            </FormGroup>
            <FormGroup className="mb-1 px-2 text-start">
                <Label for="role" className="form-label p-1">
                    Role
                </Label>
                <Input
                    type="select"
                    id="role"
                    value={user.roleId}
                    required
                    onChange={(e) => setUser({ ...user, roleId: Number(e.target.value) })}
                >
                    <option value={2}>User</option>
                    <option value={1}>Admin</option>
                </Input>
            </FormGroup>
            <hr className="my-4" />
            <div className="d-flex justify-content-around mt-4">
                <Button color="danger" onClick={props.toggleModal}>
                    Cancel
                </Button>
                <Button type="submit" color="success">
                    Create
                </Button>
            </div>
        </Form>
    );
}
