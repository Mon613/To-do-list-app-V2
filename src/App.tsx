import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/toDoList/toDoList.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import TodoListApp from './components/toDoList/toDoList'
import MyWeather from './components/weather/MyWeather'
// import WeatherWidget from './weather/blabla'
function App() {
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



