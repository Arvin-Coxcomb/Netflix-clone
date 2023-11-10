import React, { useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage'
import Header from '../components/Header'
import { firebaseAuth } from '../utils/firebase-config';
import {useNavigate} from "react-router-dom"
import {onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
export default function Login() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email : "",
        password : ""
    })
    const handleLogIn = async () =>{
        try{
            const {email, password} = formValues;
            await signInWithEmailAndPassword(firebaseAuth,email,password);
        }
        catch(err){
            console.log(err);
        }
    }
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser) navigate("/");
    })
  return (
    <Container>
      <BackgroundImage />
        <div className="content">
          <Header />
          <div className="form-container flex column j-center a-center">
            <div className="form flex column j-center a-center">
              <div className="title">
                <h3>Login</h3>
              </div>
              <div className="container flex column">

                   <input type = 'email' placeholder='Email Address' name = "email" value = {setFormValues.email} 
                    onChange = {(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}
                    />
                    <input type = 'password' placeholder='Password' name = "password" value = {setFormValues.password} 
                    onChange = {(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>

                   <button onClick={handleLogIn}>Log In</button>


              </div>
            </div>
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
        
        .form-container{
          gap : 2rem;
          height : 85vh;
          .form{
            gap : 2rem;
            padding : 2rem;
            width : 25vw;
            background-color : #000000b0;
            color : white;

            .container{
              gap : 2rem;
              input{
                padding : 0.5rem 1rem;
                width : 15rem;
                outline : none;
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
    }
`
