import React, { Fragment } from "react";
import spinner from "./loading.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        padding: "1rem",
        width: "200px",
        margin: "auto",
        display: "block",
      }}
      alt='Spinner '
    />
  </Fragment>
);
