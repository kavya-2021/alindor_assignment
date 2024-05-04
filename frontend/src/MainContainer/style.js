import styled from'styled-components';

export const Container = styled.div`
    display: flex;
    width : 100%;
    height : 100vh;
    border : 1px solid red;
`;

export const LeftSide = styled.div`
    width : 100%;
    border : 1px solid blue;
    display: flex;
    padding: 3rem;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
`;

export const RightSide = styled.div`
    width : 100%;
    height : 100%;
    border : 1px solid green;
`;

export const SubmitButton = styled.button`
    width: 21rem;
    height: 3rem;
    border: 0.5px solid #eceaea;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 8px;
    cursor: pointer;
    background-color: white;
    color : black;
    text-align: center;

    :disabled{
        cursor: not-allowed;
        background-color: #eceaea;
    }
`;

