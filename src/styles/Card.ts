import styled from "styled-components";

export const Div = styled("div")<{bgColor1: string, bgColor2: string}>`
    &{
        position: relative;
        width: 400px;
        height: 450px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px 30px;
        transition: 0.5s;
    }

    &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 50px;
        width: 50%;
        height: 100%;
        background: #fff;
        border-radius: 8px;
        transform: skewX(15deg);
        transition: 0.5s;
    }

    &::after{
        content: "";
        position: absolute;
        top: 0;
        left: 50px;
        width: 50%;
        height: 100%;
        background-color: #fff;
        border-radius: 8px;
        transform: skewX(15deg);
        transition: 0.5s;
        filter: blur(30px);
        transition: 0.5s;
    }

    &:hover::after,
    &:hover:before{
        transform: skewX(0deg);
        left: 20px;
        width: calc(100% - 90px);
    }

    &::after,
    &::before{
        background: linear-gradient(315deg, ${props => props.bgColor2}, ${props => props.bgColor1});
    }
`;

export const Span = styled("span")<{appearance: string}>`
    &{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
    }

    &::before{
        cursor: pointer;
        content: ${props => props.appearance};
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        font-size: 0.75rem;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 8px;
        border-radius: 50%;
        background: rgba(35, 109, 247, 0.1);
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: 0.5s;
        animation: animate 2s ease-in-out infinite;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }

    ${Div}:hover &::before{
        top: -50px;
        left: 50px;
        width: 80px;
        height: 80px;
        opacity: 1;
    }
`;

export const Types = styled("span")<{imageUrl1: string, imageUrl2: string, types: number}>`
    &{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
    }

    &::before{
        content: "";
        background-image: url(${props => props.imageUrl1});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        font-size: 0.75rem;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border: 8px;
        border-radius: 50%;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: 0.5s;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }

    ${Div}:hover &::before{
        bottom: -40px;
        right: ${props => props.types > 1 ? "120px" : "70px"};
        width: 70px;
        height: 70px;
        opacity: 1;
    }

    &::after{
        content: "";
        background-image: url(${props => props.imageUrl2});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        font-size: 0.75rem;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border: 8px;
        border-radius: 50%;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: 0.5s;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        display: ${props => props.types > 1 ? "flex" : "none"};
    }

    ${Div}:hover &::after{
        bottom: -40px;
        right: 40px;
        width: 70px;
        height: 70px;
        opacity: 1;
    }
`;

