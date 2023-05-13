import React, { useState } from "react";

const NumberInput = (props: any) => {
  const handleChange = (e: any) => {
    if (isNaN(Number(e))) return;
    // setValue(e);
    props.onChange(e);
  };

  return (
    <input
      className={` ${
        isNaN(props.value) || props.value < props.min || props.value > props.max
          ? "border-[red]"
          : "focus:border-indigo"
      } ${props.className}`}
      value={props.value}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      onBlur={props.onBlur}
    ></input>
  );
};
export default NumberInput;
