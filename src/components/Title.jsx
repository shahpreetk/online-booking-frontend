//@ts-check
import React from "react";

function Title({ title }) {
  return (
    <>
      <h4
        className="mt-5 mb-5"
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {title}
      </h4>
    </>
  );
}

export default Title;
