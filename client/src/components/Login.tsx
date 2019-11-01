import styled from 'styled-components'
import React from 'react';

const Form = styled.div``;
const FieldContainer = styled.div``;
const InputEmail = styled.input``;
const InputPassword = styled.input``;
const FieldName = styled.label``;
const SignIn = styled.button``;
const SignUp = styled.button``;

export default function Login() {
    return <Form>
        <FieldContainer>
            <FieldName>Email</FieldName>
            <InputEmail placeholder="Enter your email" type="email" />
        </FieldContainer>
        <FieldContainer>
            <FieldName>Password</FieldName>
            <InputPassword type="password" />
        </FieldContainer>
        <FieldContainer>
            <SignIn>Sign In</SignIn>
            or
            <SignUp>Sign Up</SignUp>
        </FieldContainer>
    </Form>
}