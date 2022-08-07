import React, { useContext, useReducer, useState } from 'react';
import { getError } from '../util';
import axios from 'axios';
import { Store } from '../store';
import styled from 'styled-components';


const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true };
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false };
  
      default:
        return state;
    }
  };



export default function Profile() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      alert('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      alert(getError(err));
    }
  };
  return (
    <div>
        <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Group className="mb-3" inputId="name">
          <Label>Name</Label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Group>
        <Group className="mb-3" inputId="name">
          <Label>Email</Label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Group>
        <Group className="mb-3" inputId="password">
          <Label>Password</Label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Group>
        <Group className="mb-3" inputId="password">
          <Label>Confirm Password</Label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </form>

    </div>
  )
}


const Group=styled.div`


`
const Label=styled.label`

`
const Button=styled.button``