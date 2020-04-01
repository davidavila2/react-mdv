import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() { 
  return (
    <div className="header-container">
      <div className="header-wrapper">
        <button>
        <FontAwesomeIcon icon="bars" />
        </button>
        <p style={{ paddingLeft: '1em', fontSize: '20px'}}>Todo List App</p>
      </div>

      <div className="logout-btn">
        <button>
        <FontAwesomeIcon icon="user" />
        </button>
      </div>
    </div>
  );
}

export default Header;