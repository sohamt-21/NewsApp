import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' Component={<News key="general"  pageSize={5} country="in" category="general"/>}/> 
            {/* <Route path='/business' element={<News pageSize={5} country="in" key="business" category="business"/>}/>
            <Route path='/entertaintment' element={<News pageSize={5} country="in" key="entertaintment" category="entertainement"/>}/>
            <Route path='/general' element={<News pageSize={5} country="in" key="general" category="general"/>}/>
            <Route path='/health' element={<News pageSize={5} country="in" key="health" category="health"/>}/>
            <Route path='/science' element={<News pageSize={5} country="in" key="science" category="science"/>}/>
            <Route path='/sports' element={<News pageSize={5} country="in" key="sports" category="sports"/>}/>
            <Route path='/technology' element={<News pageSize={5} country="in" key="technology" category="technology"/>}/> */}
          </Routes> 
        </Router>
      </div>
    ) 
  }
}