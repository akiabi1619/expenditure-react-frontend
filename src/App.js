import logo from './logoreact.png';
import './App.css';
import React , {useState} from 'react'
import Header from './Header';
//function App(){
const StateTutorial = () => {
  const [inputValue,setinputValue] = useState("");


return (
    <>
    
    <Header />
    
    <body>
    
     
    
     
     <section>
    <nav>
       <ul>
        <li><a href="#">London</a></li>
        <li><a href="#">Paris</a></li>
        <li><a href="#">Tokyo</a></li>
      </ul>
    </nav>
  
    <article>
      <article>
     <h1>London</h1>
      <p>London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
      <p>Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.</p>
      </article>
      a<article>
   </article>
    </section>


    
   </body>  

   </>
  );
} ;

export default StateTutorial;
