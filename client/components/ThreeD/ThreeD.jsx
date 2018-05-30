import * as THREE from 'three'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import OrbitControls from 'orbit-controls-es6'

import './threed.css'

class ThreeD extends Component {
  constructor (props) {
    super(props)
    this.stop = this.stop.bind(this)
    this.start = this.start.bind(this)
    this.animate = this.animate.bind(this)
    this.handlePlane = this.handlePlane.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.handleComputer = this.handleComputer.bind(this)
    this.handleComputerScreen = this.handleComputerScreen.bind(this)
  }

  componentDidMount () {
    const myCanvas = document.getElementById('myCanvas')

    // cubemap
    const path = '/images/'
    const format = '.png'
    const urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ]
    const reflectionCube = new THREE.CubeTextureLoader().load(urls)
    reflectionCube.format = THREE.RGBFormat
    const refractionCube = new THREE.CubeTextureLoader().load(path)
    refractionCube.mapping = THREE.CubeRefractionMapping
    refractionCube.format = THREE.RGBFormat

    // scene
    const scene = new THREE.Scene()
    scene.background = reflectionCube

    // camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      5000
    )
    camera.position.z = 8
    camera.position.y = 2
    camera.position.x = 2
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: myCanvas,
      preserveDrawingBuffer: true
    })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setClearColor('#ffffff')
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.autoClearColor = false

    // model loader
    const loader = new THREE.JSONLoader()
    loader.load('/models/computer.json', this.handleComputer)
    const loader2 = new THREE.JSONLoader()
    loader2.load('/models/computer-screen.json', this.handleComputerScreen)
    const planeloader = new THREE.JSONLoader()
    planeloader.load('/models/plane.json', this.handlePlane)

    // light1
    const light = new THREE.DirectionalLight(0xffffff, 0.7, 600)
    light.position.y = 10
    light.position.x = 10
    // light.position.z = 10
    light.castShadow = true
    scene.add(light)
    // light 2
    const light2 = new THREE.PointLight(0xffffff, 0.7, 600)
    light2.position.y = 10
    light2.position.x = -10
    light2.position.z = -10
    light2.castShadow = true
    scene.add(light2)
    // Ambient Light
    const ambient = new THREE.AmbientLight(0xffffff)
    scene.add(ambient)

    // window resizing
    window.addEventListener('resize', this.onWindowResize, false)

    // regular texture
    const regMaterial = new THREE.MeshPhongMaterial({color: '#555F61', shininess: 100})
    const planeMaterial = new THREE.MeshPhongMaterial({color: 'black', shininess: 30})
    const regScreenMaterial = new THREE.MeshPhongMaterial({color: '#242836', shininess: 200})

    // Video texture
    const video = document.createElement('video')
    video.setAttribute('crossorigin', 'anonymous')
    video.load()
    video.play()
    video.muted = 'muted'
    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.generateMipmaps = false
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.format = THREE.RGBFormat
    this.movieMaterial = new THREE.MeshPhongMaterial({map: videoTexture, overdraw: true, side: THREE.DoubleSide})
    this.movieMaterial.map.needsUpdate = true

    // controls
    this.controls = new OrbitControls(camera)
    this.controls.rotateSpeed = 2
    this.controls.autoRotate = false
    this.controls.enableRotate = true
    this.controls.enableZoom = false
    this.controls.enablePan = false
    this.controls.minPolarAngle = Math.PI / 4
    this.controls.maxPolarAngle = Math.PI / 1.5
    this.controls.target.set(0, 0, 0)

    // attachments
    this.video = video
    this.scene = scene
    this.camera = camera
    this.loader = loader
    this.renderer = renderer
    this.regMaterial = regMaterial
    this.planeMaterial = planeMaterial
    this.regScreenMaterial = regScreenMaterial

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  onWindowResize (event) {
    const windowHeight = window.innerHeight
    const tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov / 2))
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.fov = (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight))
    this.camera.updateProjectionMatrix()
    this.camera.lookAt(this.scene.position)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.render(this.scene, this.camera)
  }

  componentWillUnmount () {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.video !== nextProps.video) {
      this.video.src = nextProps.video
      this.video.play()
      this.screenMesh.material = this.movieMaterial
      this.screenMesh.needsUpdate = true
    }
  }

  handlePlane (geometry) {
    this.planeMesh = new THREE.Mesh(geometry, this.planeMaterial)
    this.planeMesh.receiveShadow = true
    this.scene.add(this.planeMesh)
  }

  handleComputer (geometry) {
    this.computerMesh = new THREE.Mesh(geometry, this.regMaterial)
    this.computerMesh.castShadow = true
    this.computerMesh.recieveShadow = true
    this.scene.add(this.computerMesh)
  }

  handleComputerScreen (geometry) {
    let mat = null
    if (this.props.videoActive) {
      mat = this.movieMaterial
    } else {
      mat = this.regScreenMaterial
    }
    this.screenMesh = new THREE.Mesh(geometry, mat)
    this.screenMesh.castShadow = true
    this.scene.add(this.screenMesh)
  }

  start () {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop () {
    cancelAnimationFrame(this.frameId)
  }

  animate () {
    this.controls.update()
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene () {
    this.renderer.render(this.scene, this.camera)
  }

  render () {
    return (
      <div className = 'canvasDiv'
        style={{width: '600px', height: '600px'}}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    video: state.setVideo.video,
    videoActive: state.setActive.active
  }
}

export default connect(mapStateToProps)(ThreeD)
