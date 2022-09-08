import React from "react";

export default function Spin() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
