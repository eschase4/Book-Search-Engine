import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import { createUser } from '../utils/API';
import { CREATE_USER } from '../utils/mutations'
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });;
  const [createUser, { data, error }] = useMutation(CREATE_USER)
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);


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
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
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
          Something went wrong with your signup!
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
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={formState.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
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
          disabled={!(formState.username && formState.email && formState.password)}
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

export default SignupForm;
