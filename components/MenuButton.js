import React, { Component } from 'react';

function MenuButton(props) {

      return (
        <div>
            <div className="hamburger" tabIndex="0" role="button" onClick={props.open} onKeyPress={props.open}>
                <div className="hamburgerline"></div>
                <div className="hamburgerline"></div>
                <div className="hamburgerline"></div>
            </div>
          <div>
          </div>
        </div>
      );
    }

export default MenuButton;
