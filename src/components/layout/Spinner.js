import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading"
        style={{
          marginLeft: "40vw",
          display: "block",
          marginTop: "40vh",
          marginBottom: "10px"
        }}
      />
    </div>
  );
}
