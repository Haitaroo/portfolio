import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const title = "Bonjour les gens!"
const aFaire = [
  'Ranger la maison',
  'Nettoyer le sol',
  'Faire le menage'
]
function App() {

  const handleClick = () => {
    console.log();
    alert("J'ai cliqué sur le titre")
  }
  return <>
  <h1 onClick={handleClick}  className='Title' style={{color:'red', backgroundColor:'blue'}}>{title}</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet veniam quasi tempore, nulla quidem commodi, facere ab dolorem enim nisi quibusdam. Nostrum rerum facilis reiciendis veritatis quisquam saepe quis quas?</p>
    <ul>
      {aFaire.map(faire => (<li key={faire}>{faire}</li>))}
    </ul>






  </>
}

export default App
