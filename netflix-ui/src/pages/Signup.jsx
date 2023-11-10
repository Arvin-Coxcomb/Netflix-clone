import React, { useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage'
import Header from '../components/Header'
import { firebaseAuth } from '../utils/firebase-config';
import {useNavigate} from "react-router-dom"
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
export default function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email : "",
        password : ""
    })
    const handleSignIn = async () =>{
        try{
            const {email, password} = formValues;
            await createUserWithEmailAndPassword(firebaseAuth,email,password);
        }
        catch(err){
            console.log(err);
        }
    }
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser) navigate("/");
    })
  return (
    <Container showPassword = {showPassword}>
        <BackgroundImage />
        <div className="content">
        <Header login/>
            <div className="body flex column j-center a-center">
                <div className="text flex column">
                    <h1>Unlimited movies, TV shows and more</h1>
                    <h4>Watch anywhere. Cancel anytime</h4>
                    <h6>Ready to watch? Enter your email to create or restart membership</h6>
                </div>
                <div className='form'>
                    <input type = 'email' placeholder='Email Address' name = "email" value = {setFormValues.email} 
                    onChange = {(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}
                    />
                   {showPassword && <input type = 'password' placeholder='Password' name = "password" value = {setFormValues.password} 
                    onChange = {(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>}
                    {!showPassword && <button onClick={()=>{setShowPassword(true)}}>Get Started</button>}
                </div>
                <button onClick = {handleSignIn}>Sign Up</button>
            </div>
        </div>
    </Container>

  )
}
const Container = styled.div`
    position : relative;
    .content{
        position : absolute;
        top : 0;
        left : 0;
        height : 100vh;
        width : 100vw;
        display : grid;
        grid-template-rows : 15vh 85vh;
        background-color : rgba(0,0,0,0.5);   

        .body{
            gap : 1rem;

            .text{
                gap : 1rem;
                text-align : center;
                font-size : 2rem;  

                h1{
                    padding : 0 25rem;
                }
            }
            .form{
                display : grid;
                grid-template-columns : ${({showPassword})=>showPassword ? "1fr 1fr" : "2fr 1fr"};
                width : 60%;
                input{
                    color : black;
                    border : 1px solid black;
                    outline : none;
                    padding : 1.5rem;
                    font-size : 1.2rem;
                }
                button{
                    padding : 0.5rem 1rem;
                    border : none;
                    background-color : #e50914;
                    color : white;
                    cursor : pointer;
                    border-radius : 0.2rem;
                    font-weight : bolder;
                    font-size : 1.05rem;
                  }
            }
            button{
                padding : 0.5rem 1rem;
                border : none;
                background-color : #e50914;
                color : white;
                cursor : pointer;
                border-radius : 0.2rem;
                font-weight : bolder;
                font-size : 1.05rem;
              }
        }
    }
`
