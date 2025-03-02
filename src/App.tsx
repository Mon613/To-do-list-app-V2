import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './toDoList/toDoList.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import TodoListApp from './toDoList/toDoList'
import MyWeather from './weather/MyWeather'
// import WeatherWidget from './weather/blabla'
function App() {
  useEffect(() => { 
    console.log(navigator); 
}, []); 
  return (
    <div className='row'>
      <div className='tasks col-md-11 col-sm-11'>
        <TodoListApp />
      </div>
      <div className='weather col-md-1 col-sm-1'>
      <MyWeather/>
      </div>
    </div>
  )
}

export default App



