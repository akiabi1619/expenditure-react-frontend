import logo from './logoreact.png';
import './App.css';
import React , {useState} from 'react'
import Header from './Header';
import Navbar from './Navbar.jsx';
import { Box } from '@mui/material';
import Content from './Content.jsx';
import Table from './Table.jsx';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

//function App(){
const StateTutorial = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);


return (
    <>
    
    
      
      <Navbar>

      </Navbar>
      <Content></Content>
      
      
    
    

   </>
  );
} ;

export default StateTutorial;
