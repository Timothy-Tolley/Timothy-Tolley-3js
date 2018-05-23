import uuid from 'uuid'
import React from 'react'
import {connect} from 'react-redux'
import {CSSTransition} from 'react-transition-group'

import './projects.css'
import {projects} from '../../data/projects.js'
import {setVideo, activate} from '../../actions/setVideo'

class Projects extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: projects,
      1: {
        active: false,
        tech: false,
        description: false,
        link: false
      },
      2: {
        active: false,
        tech: false,
        description: false,
        link: false
      },
      3: {
        active: false,
        tech: false,
        description: false,
        link: false
      },
      4: {
        active: false,
        tech: false,
        description: false,
        link: false
      },
      5: {
        active: false,
        tech: false,
        description: false,
        link: false
      }

    }
    this.handleTech = this.handleTech.bind(this)
    this.handleLink = this.handleLink.bind(this)
    this.handleVideo = this.handleVideo.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
  }

  handleVideo (video, id) {
    this.props.dispatch(setVideo(video))
    this.props.dispatch(activate())
    this.setState({
      ...this.state,
      [id]: {
        active: !this.state[id].active,
        description: this.state[id].description,
        tech: this.state[id].tech,
        link: this.state[id].link
      }
    })
  }

  handleTech (id) {
    this.setState({
      ...this.state,
      [id]: {
        active: this.state[id].active,
        description: this.state[id].description,
        tech: !this.state[id].tech,
        link: this.state[id].link
      }
    })
  }

  handleDescription (id) {
    this.setState({
      ...this.state,
      [id]: {
        active: this.state[id].active,
        description: !this.state[id].description,
        tech: this.state[id].tech,
        link: this.state[id].link
      }
    })
  }

  handleLink (id) {
    this.setState({
      ...this.state,
      [id]: {
        active: this.state[id].active,
        description: this.state[id].description,
        tech: this.state[id].tech,
        link: !this.state[id].link
      }
    })
  }

  render () {
    return (
      <div className = 'projects-container'>
        <p className = 'projects-main'> PROJECTS </p>
        {this.state.projects.map(project => {
          return (
            <div className = 'project-div' key = {project.id}>
              <p className = 'project-header' onClick = {() => this.handleVideo(project.video, project.id)} > {project.name} </p>
              <CSSTransition
                in={this.state[project.id].active}
                timeout={200}
                classNames="initial"
                unmountOnExit
              >
                <div className = 'initial-dropdown'>
                  <p className = 'dropdown-sigil' onClick = {() => this.handleDescription(project.id)}>
                  DESCRIPTION
                  </p>
                  <CSSTransition
                    in={this.state[project.id].description}
                    timeout={200}
                    classNames="initial"
                    unmountOnExit
                  >
                    <div className = 'description-cont'>
                      <p className = 'description'>
                        {project.description}
                      </p>
                      <p className = 'description'>
                        {project.build}
                      </p>
                      <p className = 'description'>
                        {project.design}
                      </p>
                      <video src = {project.video} className = 'desciption-gif' autoPlay = {window.innerWidth < 450} playsInline = {true}/>
                    </div>
                  </CSSTransition>
                  <p className = 'dropdown-sigil' onClick = {() => this.handleLink(project.id)}>
                  LINK
                  </p>
                  <CSSTransition
                    in={this.state[project.id].link}
                    timeout={200}
                    classNames="initial"
                    unmountOnExit
                  >
                    <a href = {project.link} target = '_blank' rel="noopener noreferrer" className = 'link link-content'>
                      {project.link}
                    </a>
                  </CSSTransition>
                  <p className = 'dropdown-sigil' onClick = {() => this.handleTech(project.id)}>
                  TECHNOLOGY USED
                  </p>
                  <CSSTransition
                    in={this.state[project.id].tech}
                    timeout={200}
                    classNames="initial"
                    unmountOnExit
                  >
                    <div className = 'tech-div'>
                      {project.tech.map(techItem => {
                        return (
                          <p key = {uuid()} className = 'tech'>
                            {techItem}
                          </p>
                        )
                      })}
                    </div>
                  </CSSTransition>
                </div>
              </CSSTransition>
            </div>
          )
        })
        }
      </div>
    )
  }
}

export default connect()(Projects)
