import * as React from "react";

const LocalError = ({ error }) => {
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
  return <div />;
};

export default LocalError;
