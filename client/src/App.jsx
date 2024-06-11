import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import Hero from './components/Hero'

const products = [{
  id:3432423432,
  name:"Product 1",
  price:2.33
},
{
  id:3432423432,
  name:"Product 2",
  price:6.77
}]

function App() {
  return (
    <>
      <Header />
      {products.map(product=>(
        <Hero {...product} />
      ))}
      <Footer />
    </>
  )
}

export default App
