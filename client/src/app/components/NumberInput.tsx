import React, { useState } from "react";

const NumberInput = (props: any) => {
  const handleChange = (e: any) => {
    if (e[e.length - 1] !== "." && isNaN(Number(e))) return;
    props.onChange(e);
  };
  return (
    <input
      className={` ${
        isNaN(props.value) || props.value < props.min || props.value > props.max
          ? "border-[red]"
          : ""
      } ${props.className}`}
      value={props.value}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
    ></input>
  );
};
export default NumberInput;
