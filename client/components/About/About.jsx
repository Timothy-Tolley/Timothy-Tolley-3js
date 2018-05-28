import React from 'react'
import {CSSTransition} from 'react-transition-group'

import './about.css'

class About extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      about: false,
      contact: false
    }
    this.handleAbout = this.handleAbout.bind(this)
    this.handleContact = this.handleContact.bind(this)
  }

  handleAbout () {
    this.setState({
      ...this.state,
      about: !this.state.about
    })
  }

  handleContact () {
    this.setState({
      ...this.state,
      contact: !this.state.contact
    })
  }

  render () {
    return (
      <div className = 'aboutContainer'>
        <p className = 'about-header' onClick = {this.handleAbout}>
          ABOUT
        </p>
        <CSSTransition
          in={this.state.about}
          timeout={200}
          classNames="open"
          unmountOnExit
        >
          <div className = 'about-div'>
            <p className = 'about-content'>
            Hey there, welcome to my site! I&#8217;m Tim, a Freelance Web Developer who&#8217;s pretty keen to get my name out into the world and start creating for interesting people in interesting places. I&#8217;ve been through a fullstack development bootcamp in Auckland, New Zealand, and I&#8217;ve been able to use those skills to make the projects you can see on the left of your screen as well as a bunch more that you can see on see on my Github profile below, along with my LinkedIn profile and other contact details. Please feel free to get in touch! I would love to hear from you!
            </p>
            <p className = 'cv-link'>
              <a href="/docs/freelance-cv.pdf" download="Timothy-Tolley-CV" className = 'press-kit-link'>
            Downloadable CV
              </a>
            </p>
          </div>
        </CSSTransition>
        <p className = 'about-header' onClick = {this.handleContact}>
          CONTACT
        </p>
        <CSSTransition
          in={this.state.contact}
          timeout={200}
          classNames="open"
          unmountOnExit
        >
          <div className = 'contact-div'>
            <p className = 'link contact-content'>
              <a href = 'https://github.com/timothy-tolley' target = '_blank' rel="noopener noreferrer" className = 'link contact-content'>
            Github
              </a>
            </p>
            <p className = 'link contact-content'>
              <a href = 'https://linkedin.com/in/timothy-tolley' target = '_blank' rel="noopener noreferrer" className = 'link contact-content'>
            Linkedin
              </a>
            </p>
            <p className = 'contact-content'>
            +64 21 1832013
            </p>
            <p className = 'contact-content'>
              <a href = 'mailto: timothytolley@outlook.com' className = 'link'> timothytolley@outlook.com </a>
            </p>
          </div>
        </CSSTransition>
      </div>
    )
  }
}

export default About
