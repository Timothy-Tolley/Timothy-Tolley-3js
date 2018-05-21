import React from 'react'
// import Rwr from './Rwr/Rwr'
import ThreeD from './ThreeD/ThreeD'
// import Baby from './Baby/Baby'
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
        {/* <Rwr /> */}
        {/* <Baby /> */}
      </div>
    )
  }
}

export default App
