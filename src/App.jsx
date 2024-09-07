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

 const [person, setPerson] = useState({
  firstName: "John",
  secondName: "Doe",
  age: 18,
 })
 const [count,setCount] = useState(0)

 const incrementAge = () => {
  setPerson({...person,age: person.age+1})
 }
 const incrementCount = () => {
  setCount(count+1)
 }

  return <>
    <p>Age de John : {person.age}</p>
    <button onClick={incrementAge}>Gagner une année</button>
    <button onClick={incrementCount}>Incrémentation de {count}</button>






  </>
}

export default App
