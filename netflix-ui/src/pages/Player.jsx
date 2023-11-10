import React from 'react'
import styled from "styled-components";
import {BsArrowLeft} from "react-icons/bs"
import { useNavigate } from 'react-router-dom';
export default function Player() {
    const navigate = useNavigate();
  return (
    <Container>
        <div className="player">
            <div className="back">
                <BsArrowLeft onClick = {()=>navigate(-1)}/>
            </div>
            <video src= "https://drive.google.com/file/d/1dXWehWRUC5zRV1RldQMoVHAUEOpsMJo1/view?usp=drive_link" autoPlay controls loop muted>Your Browser does not support the current video format.</video>
        </div>
    </Container>
  )
}

const Container = styled.div`
    .player{
        height : 100vh;
        width : 100vw;
        .back{
            position : absolute;
            padding : 2rem;
            z-index : 1;
            svg{
                font-size : 3rem;
                cursor : pointer;
            }
        }
        video{
            height : 100%;
            width : 100%;
            object-fit : cover;
        }
    }
`
