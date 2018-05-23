import React from 'react'
import About from './About/About'
import ThreeD from './ThreeD/ThreeD'
import Header from './Header/Header'
import Projects from './Projects/Projects'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      large: true
    }
  }

  componentDidMount () {
    if (window.innerWidth < 450) {
      this.setState({
        large: false
      })
    }
  }

  render () {
    window.addEventListener('resize', this.updateSize)
    return (
      <div className = 'page'>
        <Header />
        {this.state.large &&
        <ThreeD />}
        <canvas id = 'myCanvas'>
        </canvas>
        <Projects />
        <About />
      </div>
    )
  }
}

export default App
