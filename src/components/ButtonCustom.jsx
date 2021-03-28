//@ts-check
import React from "react";
// bootstrap imports
import Button from "react-bootstrap/Button";
// styled components
import styled from "styled-components";

const ButtonStyle = styled.div`
  .custom-button {
    background-color: #a72429;
    box-sizing: border-box;
    color: #f1f5f9;
    font-weight: 700;
    margin: 0em 0.3em 0.3em 0;
    padding: 0.5em 1em;
    text-decoration: none;
    text-align: center;
    transition: all 0.15s;
    outline: none;

    &:hover{
      background-color: #ff9ba1;
      color: #a72429;
    }
  }
    .custom-button:not(:disabled):not(:disabled):active{
      background-color: #a72429;
      color: #ff9ba1;
    }
}
`;

const ButtonCustom = ({ buttonContent, size, block }) => {
  return (
    <>
      <ButtonStyle>
        <Button
          className="custom-button shadow-sm border-0 rounded"
          size={size ? size : "sm"}
          block={block ? block : ""}
        >
          {buttonContent}
        </Button>
      </ButtonStyle>
    </>
  );
};

export default ButtonCustom;
