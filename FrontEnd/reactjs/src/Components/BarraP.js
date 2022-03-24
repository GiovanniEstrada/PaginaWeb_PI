import React from "react";

const navBar = ({titulo}) =>{
    return (
        <nav className="navbar navbar-dark bg-secondary">
            <div className="container">
                <a className="navbar-brand" href="#!">
                  {titulo}
                </a>
            </div>
        </nav>
    );
}

export default navBar;