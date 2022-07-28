import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 12%;
`;
export const Title = styled.p`
  font-size: 42px;
`;

export const Input = styled.input`
font-size: 18px;
padding: 10px;
margin: 10px;
background: papayawhip;
border: none;
border-radius: 3px;
::placeholder {
  color: palevioletred;
}
`;
export const Button = styled.button`
font-size: 18px;
padding: 10px;
margin: 10px;
background: papayawhip;
border: none;
border-radius: 3px;
align-items: center;
`;
