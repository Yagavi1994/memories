import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message, className }) => {
  return (
    <div className={`${styles.Asset} p-4 ${className || ""}`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} 
      style={{ 
        cursor: 'pointer',
        borderRadius: '25%',
        height: '120px',
        width: '120px',
        border: '2px solid #fff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', 
        }} 
        />}
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Asset;
