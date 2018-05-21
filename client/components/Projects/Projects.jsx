import uuid from 'uuid'
import React from 'react'
import {connect} from 'react-redux'

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
              {this.state[project.id].active && <div className = 'initial-dropdown'>
                <p className = 'dropdown-sigil' onClick = {() => this.handleDescription(project.id)}>
                  DESCRIPTION
                </p>
                {this.state[project.id].description && <div className = 'description-cont'>
                  <p className = 'description'>
                    {project.description}
                  </p>
                  <p className = 'description'>
                    {project.build}
                  </p>
                  <p className = 'description'>
                    {project.design}
                  </p>
                </div>
                }
                <p className = 'dropdown-sigil' onClick = {() => this.handleLink(project.id)}>
                  LINK
                </p>
                {this.state[project.id].link &&
                <a href = {project.link} target = '_blank' rel="noopener noreferrer" className = 'link link-content'>
                  {project.link}
                </a>}
                <p className = 'dropdown-sigil' onClick = {() => this.handleTech(project.id)}>
                  TECHNOLOGY USED
                </p>
                {this.state[project.id].tech && <div className = 'tech-div'>
                  {project.tech.map(techItem => {
                    return (
                      <p key = {uuid()} className = 'tech'>
                        {techItem}
                      </p>
                    )
                  })}
                </div>}
              </div>
              }
            </div>
          )
        })
        }
      </div>
    )
  }
}

export default connect()(Projects)
