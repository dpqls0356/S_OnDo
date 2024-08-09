import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Btn = styled.button`
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  width: 10%;
  height: fit-content;
  z-index: 20;
  pointer-events: all;
`;
export default function ClickBtn({ handleClick }) {
  return <Btn onClick={handleClick}>Click!</Btn>;
}
