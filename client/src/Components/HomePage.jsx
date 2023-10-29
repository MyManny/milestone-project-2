
import React, { useState } from 'react';



export default function HomePage() {
    function handleButtonClick() {
        const plusButton = document.querySelector(".plus--btn");
        plusButton.classList.add("spin");
        
        setTimeout(() => {
          plusButton.classList.remove("spin");
        }, 1000);
      }   

    return (
      <div className="home--background">
        <div className="home--container">
        <svg
            className="plus--btn"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            onClick={handleButtonClick} 
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          <svg 
                className="book--btn"
                xmlns="http://www.w3.org/2000/svg"
                height="1em" 
                viewBox="0 0 448 512">
         <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
          </svg>
        </div>
      </div>
    );
  }