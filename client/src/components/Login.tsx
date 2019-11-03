import styled from 'styled-components'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import React, { useState } from 'react';
import { login, register } from '../actions';

const Form = styled.div``;
const FieldContainer = styled.div``;
const InputEmail = styled.input``;
const InputPassword = styled.input``;
const FieldName = styled.label``;
const SignIn = styled.button``;
const SignUp = styled.button``;

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ onSignIn: login, onSignUp: register }, dispatch);

export const Login = (props: { onSignIn: (...p: Parameters<typeof login>) => void, onSignUp: (...p: Parameters<typeof register>) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <Form>
        <FieldContainer>
            <FieldName>Email</FieldName>
            <InputEmail placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FieldContainer>
        <FieldContainer>
            <FieldName>Password</FieldName>
            <InputPassword type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FieldContainer>
        <FieldContainer>
            <SignIn onClick={() => props.onSignIn(email, password)}>Sign In</SignIn>
            or
            <SignUp onClick={() => props.onSignUp(email, password)}>Sign Up</SignUp>
        </FieldContainer>
    </Form>
}

export default connect(null, mapDispatchToProps)(Login);