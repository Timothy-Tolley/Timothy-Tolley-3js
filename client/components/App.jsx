import React from 'react'
import About from './About/About'
import ThreeD from './ThreeD/ThreeD'
import Header from './Header/Header'
import Projects from './Projects/Projects'

class App extends React.Component {
  render () {
    return (
      <div className = 'page'>
        <Header />
        <ThreeD />
        <canvas id = 'myCanvas'>
        </canvas>
        <Projects />
        <About />
      </div>
    )
  }
}

export default App
