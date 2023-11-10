import React, { useState } from 'react';
import styled from "styled-components"
import logo from "../assets/logo.png"
import {Link} from "react-router-dom"
import {FaSearch,FaPowerOff} from "react-icons/fa"
import {onAuthStateChanged, signOut} from "firebase/auth"
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';

export default function Navbar({isScrolled}) {
    const navigate = useNavigate();
   const links = [
    {name: "Home", link: "/" },
    {name: "TV Shows", link: "/tv"},
    {name: "Movies", link: "/movies"},
    {name: "My List", link: "/mylist" }
   ]

   const [showSearch, setShowSearch] = useState(false);
   const [inputHover, setInputHover] = useState(false);

   onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(!currentUser) navigate("/login");
}) 
  return (
    <Container>
        <nav className = {`flex ${isScrolled ? "scrolled" : ""}`}>
            <div className="left flex a-center">
                <div className="brand flex j-center a-center">
                    <img src={logo} alt = "logo"/>
                </div>
                <ul className='links flex'>
                   {links.map(({name,link})=>{
                        return(
                            <li><Link to={link}>{name}</Link></li>
                        )
                    })
                   }
                </ul>
            </div>
            <div className="right flex a-center">
                <div className={`search ${showSearch ? "show-search" : ""}`}>
                    <button
                    onFocus={()=>{setShowSearch(true)}}
                    onBlur = {()=>{
                        if(!inputHover) setShowSearch(false);
                    }}
                    >
                        <FaSearch /> 
                    </button>
                    <input type="text" placeholder='Search'
                     onMouseEnter={()=>setInputHover(true)} 
                     onMouseLeave={()=>setInputHover(false)}
                     onBlur = {()=>{
                        setInputHover(false);
                        setShowSearch(false);
                                 }}
                     />
                </div>
                <button onClick = {()=>signOut(firebaseAuth)}>
                    <FaPowerOff />
                </button>
            </div>
        </nav>
    </Container>
  )
}

const Container = styled.div`
    .scrolled{
        background-color : black;
    }
    nav{
        position : fixed;
        top : 0;
        height : 6.5rem;
        width : 100%;
        justify-content : space-between;
        align-items : center;
        z-index : 2;
        padding : 0 4rem;
        transition : 0.3s ease-in-out;

        .left{
            gap : 2rem;
            .brand{
                img{
                    height : 4rem;
                }
            }
            .links{
                list-style-type : none;
                gap : 2rem;
                li{
                    a{
                        text-decoration : none;
                        color : white;
                    }
                }
            }
        }
        .right{
            gap : 2rem;
            
            button{
                border : none;
                background-color : transparent;
                cursor : pointer;
                outline : none;
                svg{
                    color : #f34242;
                    font-size : 1.2rem;
                }
            }
            .search{
                display : flex;
                justify-content : center;
                align-items : center;
                gap : 0.4rem;   
                padding : 0.2rem;
                padding-left : 0.5rem;
                button{
                    background-color : transparent;
                    svg{
                        color : white;
                    }
                }
                input{
                    width : 0;
                    opacity : 0;
                    visiblity:hidden;
                    background-color :transparent;
                    transition : 0.3s ease-in-out;
                    border : none;
                    outline : none;
                    color: white;
                }
            }
            .show-search{
                border : 1px solid white;
                background-color : rgba(0,0,0,0.6);

                input{
                    width : 100%;
                   opacity : 1;
                   visibility : visible;
                   padding : 0.3rem;
                }
            }
        }
    }
`


