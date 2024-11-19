import React from "react";
import Image from "react-bootstrap/Image";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";


const NotFound = () => {
  return (
    <div className={`text-center ${styles.NotFound}`}>
      <Image
        src={NoResults}
        className={`${styles.NoResults}`}
        style={{ 
          cursor: 'pointer',
          borderRadius: '25%',
          height: '200px',
          width: '200px',
          border: '2px solid #fff',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          }} 
      />
      <p className="mt-4 text-center">Sorry, the page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;