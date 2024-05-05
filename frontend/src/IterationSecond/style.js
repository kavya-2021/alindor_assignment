import { styled } from "styled-components";

export const MainContainer = styled.div`
   width : 100vw;
   height : 100vh;
`;

export const HeaderDiv = styled.div`
   width : 80%;
   margin : auto;
   margin-top : 2rem;
   margin-bottom : 3rem;
   color: #08c;
   font-size : 2.75rem;
`;

export const UploadsContainer = styled.div`
    width : calc(100%-4rem);
    display : flex ;
    gap : 2rem;
    padding : 0 2rem;
    justify-content : space-between ;
    align-items : center ;
    position : relative;
`;

export const CVUploadContainer = styled.div`
    width : 100%;
    height : 25rem;
    max-height : 90%;
    align-self : center;
    overflow-y : scroll;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const DeleteIcon = styled.div`
   width : 30px;
   height : 30px; 
   position : absolute;
   top : -4%;
   right : 50.5%;
   z-index : 1;
   cursor : pointer;
`;

export const SubmitButton = styled.button`
    width: 21rem;
    height: 3rem;
    border: 0.5px solid #08c;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 8px;
    cursor: pointer;
    background-color: white;
    color: #08c ; 
    text-align: center;
    margin : 2.5rem 0;

    :disabled{
        cursor: not-allowed;
        background-color: #eceaea;
    }
`;

export const JDUploadContainer = styled.div`
    width : 100%;
    height : 25rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    max-height : 90%;
    align-self : center;
    overflow-y : scroll;
`;

export const ResultContainer = styled.div`
   width : calc(75% - 4rem);
   height : 16rem;
   display : flex;
   padding : 0 2rem;
   align-item : center;
   gap : 3rem;
   margin : auto;
`;

export const RingContainer = styled.div`
    width : calc(100% - 2rem);
    height : calc(100% - 2rem);
`;

export const ExplanationContainer = styled.div`
    width : calc(100% - 2rem);
    height : calc(100% - 4rem);
    overflow-y : scroll ; 
    display : flex;
    justify-content : center;
    align-item : center;
    text-align : center;
    font-size :1.25rem ; 
    border : 1px solid red;
    padding : 1rem;
`;