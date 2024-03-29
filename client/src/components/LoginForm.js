// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginForm = () => { //may need to intake props
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { data, error }] = useMutation(LOGIN_USER)

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: '',
      password: '',
    });
  };


  return (
    <>
      {data ? (
        <p>
          Success!
        </p>
      ) : (
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your login credentials!
          </Alert>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your username'
              name='username'
              onChange={handleInputChange}
              value={formState.username}
              required
            />
            <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={formState.password}
              required
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!(formState.username && formState.password)}
            type='submit'
            variant='success'>
            Submit
          </Button>
        </Form>
      )}

      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </>
  );
};

export default LoginForm;
