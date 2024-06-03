import React, { useState } from 'react';
import styled from 'styled-components';
import { FaLaptopCode, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
    const [bar, setBar] = useState(false);

    const handleNavClick = () => {
        if (window.innerWidth <= 640) {
            setBar(false);
        }
    };

    return (
        <Container bar={bar}>
            <Logo>
                <span className='green'><FaLaptopCode/></span>
                <h1>Samir</h1>
            </Logo>
            <Nav bar={bar}>
                <span><a href="#home" onClick={handleNavClick}>Home</a></span>
                <span><a href="#service" onClick={handleNavClick}>Services</a></span>
                <span><a href="#project" onClick={handleNavClick}>Projects</a></span>
                <span><a href="#client" onClick={handleNavClick}>Testimonials</a></span>
                <span><a href="#footer" onClick={handleNavClick}>Portfolio</a></span>
            </Nav>
            <div onClick={() => setBar(!bar)} className="bars">
                {bar ? <FaTimes /> : <FaBars />}
            </div>
        </Container>
    );
}

export default Header;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1280px;
    width: 80%;
    margin: 0 auto;
    padding: 1.5rem 0;
    position: relative;
    animation: header 500ms ease-in-out;
    @media(max-width: 840px){
        width: 90%;
    }
    .bars{
        display: none;
        cursor: pointer;
    }
    @media(max-width:640px){
        .bars{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            z-index: 100;
            svg {
                font-size: 1.5rem;
                color: ${props => props.bar ? "#fff" : "#000"};
            }
        }
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    span{
        font-size: 1.8rem;
    }

    h1{
        font-weight: 600;
        font-size: 1.2rem;
    }
`;

const Nav = styled.div`
    position: fixed;
    right: ${props => props.bar ? "0" : "-100%"}; /* Adjusted positioning */
    top: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.17);
    width: ${props => props.bar ? "50%" : 0}; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    gap: 2rem;
    font-weight: 700;
    transition: right 400ms ease-in-out, width 400ms ease-in-out; /* Added width transition */
    z-index: 99;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px); 
    @media(min-width: 641px) {
        position: absolute;
        right: 0;
        width: auto;
        background-color: transparent;
        flex-direction: row;
        gap: 1rem;
        top: auto;
        bottom: auto;
        box-shadow: none;
    }

    span {
        margin-left: 1rem;
        a {
            color: #fff;
            text-decoration: none;
            font-weight: 400;
            position: relative;

            :before {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: -5px;
                height: 2px;
                background-color: #fff;
                transform: scale(0);
                transform-origin: right;
                transition: transform 400ms ease-in-out;
            }

            :hover:before {
                transform: scale(1);
                transform-origin: left;
                color: #60ebe4;
            }

            :hover {
                color: #60ebe4;
            }
        }
    }
`;
