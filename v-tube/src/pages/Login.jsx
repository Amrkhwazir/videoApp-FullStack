import React, { useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import {auth, provider} from "../firebaseConfig";
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: calc(100vh - 20px);
    color: ${({theme}) => theme.text};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({theme}) => theme.bgLighter};
    border: 1px solid ${({theme}) => theme.soft};
    padding: 20px 50px;
    gap: 10px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 0px;
    margin-top: 0px;
`;
const SubTitle = styled.h2`
    font-size: 20px;
    font-weight: 300;
    margin-top: 0px;
`;
const Input = styled.input`
    border:1px solid ${({theme}) => theme.soft};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
    color: ${({theme}) => theme.text};

`;
const Button = styled.button`
    margin-top: 8px;
    padding: 8px 40px;
    background-color: transparent;
    border: 1.5px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 5px;
    font-weight: 500;   
    cursor: pointer;
`;
const More = styled.div`
    display: flex;
    font-size: 12px;
    margin-top: 5px;
    color: ${({theme}) => theme.text};
`;
const Links = styled.div`
    margin-left: 50px;
`;
const Link = styled.span`
    margin-left: 25px;
`;



const Login = () => {

        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const dispatch = useDispatch();
        const navigate = useNavigate();


// register user
const signupHandler = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
        const res = await axios.post("/api/auth/signup", {name, email, password});
        dispatch(loginSuccess(res.data));
        toast.success("You Registered Successfully😎🎉", {
            position: "top-right",
            theme: "light",
            autoClose: 1000,
        });
        <ToastContainer />

    } catch (err) {
        toast.error("Sorry! Try Again😥", {
            position: "top-right",
            theme: "light",
            autoClose: 1000,
        });
        <ToastContainer />
        dispatch(loginFailure());

  
    }

};


// login user
        const loginHandler = async (e) => {
            e.preventDefault();
            console.log(name, "name")
            console.log(password, "password")
            dispatch(loginStart());
            try {
                const res = await axios.post("/api/auth/signin", {email, password});
                console.log(res.data);
                toast.success("You Login Successfully😎🎉", {
                    position: "top-right",
                    theme: 'light',
                    autoClose: 1000,
                });
                <ToastContainer />
                dispatch(loginSuccess(res.data));
                  navigate("/");
            } catch (err) {
                toast.error("Sorry! Try Again😥", {
                    position: "top-right",
                    theme:"light" ,
                    autoClose: 1000,
                });
                <ToastContainer />
                dispatch(loginFailure());
            }
        };

//google login method
        const signInWithGoogle = () => {
            dispatch(loginStart())
            signInWithPopup(auth, provider)
            .then((result) => {
                axios.post("/api/auth/google",{
                    name: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL,
                }).then((res)=>{
                    dispatch(loginSuccess(res.data));
                    navigate("/");
                    toast.success("You Login Successfully😎🎉", {
                        position: "top-right",
                        theme: theme ? "light" : "dark",
                        autoClose: 1000,
                    });
                    <ToastContainer />
                })
            }).catch((error) => {
                
                toast.error("Sorry! Try Again😥", {
                    position: "top-right",
                    theme: "light",
                    autoClose: 1000,
                });
                <ToastContainer />
                dispatch(loginFailure(error));
            })
        }
  return (
    <Container>
        <Wrapper>
            <Title>Sign in</Title>
            <SubTitle>to continue to V-Tube</SubTitle>
            <Input placeholder='Email' type='text' onChange={e=> setEmail(e.target.value)}/>
            <Input type='Password' placeholder='Password' onChange={e=> setPassword(e.target.value)}/>
            <Button onClick={loginHandler}>Sign in</Button>
            <Title>or</Title>
            <Button onClick={signInWithGoogle}>Signin with Google</Button>
            <Title>or</Title>
            <Input type='text' placeholder='Username' onChange={e=> setName(e.target.value)}/>
            <Input placeholder='email' type='email'  onChange={e=> setEmail(e.target.value)}/>
            <Input type='Password' placeholder='Password' onChange={e=> setPassword(e.target.value)}/>
            <Button onClick={signupHandler}>Sign up</Button>
        </Wrapper>
        <More>
            English(USA)
            <Links>
            <Link>Help</Link>
            <Link>Privacy</Link>
            <Link>Terms</Link>
            </Links>
        </More>
    </Container>
  )
}

export default Login