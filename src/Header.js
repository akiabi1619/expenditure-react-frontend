import './App.css';
import logo from './logoreact.png';
import React , {useState} from 'react'


function Header() {
    const change = (e) =>{
        alert("in progress")
     };
    return (
        <header className="header">
            <div className="logo-container"> 
            
            <img src={logo} width={60} height={60} />
            <p className='text-below-logo'>EXPENDTRACK</p>
            
            </div>

            
            <input className='searchbar' placeholder = "enter expense"  />
            <button className='btn' onClick={change} >add expense </button>

            
        </header>
    );
}

export default Header;