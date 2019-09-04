import { app } from './context'
import Config from './Config'

module.exports = class InputManager {
  constructor () {
    this.app = app
    this.app.on('toggleVR', this.toggleVR.bind(this))

    this.iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

    this.raycaster = new THREE.Raycaster()
    this.intersected = []
    this.tempMatrix = new THREE.Matrix4()

    this.mouse = new THREE.Vector2()
    this.intersection = null

    this.colliders = []

    this.swipe = {
      sX: 0,
      sY: 0,
      eX: 0,
      eY: 0
    }
    this.addControllers()

    document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false)
    document.addEventListener('click', this.onClick.bind(this), false)
    document.addEventListener('touchstart', this.onTouchStart.bind(this), false)
    document.addEventListener('touchmove', this.onTouchMove.bind(this), false)
    document.addEventListener('touchend', this.onTouchEnd.bind(this), false)
  }

  toggleVR (bool) {
    this.controller1.visible = bool
    this.controller2.visible = bool
  }

  addControllers () {
    this.controller1 = this.app.renderer.vr.getController(0)
    this.controller1.addEventListener('selectstart', this.onSelectStart.bind(this))
    this.controller1.addEventListener('selectend', this.onSelectEnd.bind(this))
    this.app.scene.add(this.controller1)

    this.controller2 = this.app.renderer.vr.getController(1)
    this.controller2.addEventListener('selectstart', this.onSelectStart)
    this.controller2.addEventListener('selectend', this.onSelectEnd)
    this.app.scene.add(this.controller2)

    // helpers

    var geometryHelper = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)])
    var materialHelper = new THREE.LineBasicMaterial({ color: 0xffffff })
    var line = new THREE.Line(geometryHelper, materialHelper)
    line.name = 'line'
    line.scale.z = 5

    this.controller1.add(line.clone())
    this.controller2.add(line.clone())
  }

  // Colliders
  addCollider (collider) {
    if (collider) {
      this.colliders.push(collider)
    }
  }

  removeCollider (collider) {
    const index = this.colliders.indexOf(collider)
    if (index !== -1) {
      this.colliders.splice(index, 1)
    }
  }

  addColliders (colliders) {
    colliders.forEach(this.addCollider.bind(this))
  }

  resetColliders () {
    this.colliders = []
  }

  //   VR controller events
  onSelectStart (event) {
    var controller = event.target

    var intersections = this.getIntersections(controller)

    if (intersections.length > 0) {
      if (intersections[0].object.name === 'start') {
        this.app.emit('startgame')
      } else if (intersections[0].object.name.substr(0, 3) === 'way') {
        const newWay = parseInt(intersections[0].object.name.substr(3, 1), 10)
        this.app.emit('wayChanged', newWay)
      }
    }
  }

  onSelectEnd () {
  }

  // Mouse / Desktop methods
  onDocumentMouseMove (event) {
    event.preventDefault()
    if (!event.targetTouches) {
      this.mouse.x = (event.pageX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.pageY / window.innerHeight) * 2 + 1
      if (this.intersection) {
        this.app.renderer.domElement.style.cursor = 'pointer'
      } else {
        this.app.renderer.domElement.style.cursor = 'default'
      }
      this.doFallbackRaycast()
    }
  }

  onClick (event) {
    event.preventDefault()
    if (event.touches && this.iOS) {
      this.mouse.x = (event.pageX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.pageY / window.innerHeight) * 2 + 1
    } else {
      this.mouse.x = (event.pageX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.pageY / window.innerHeight) * 2 + 1
    }

    this.doFallbackRaycast()

    if (this.intersected.length) {
      if (this.intersected[0].name === 'start') {
        this.app.emit('startgame')
      } else if (this.intersected[0].name.substr(0, 3) === 'way') {
        const newWay = parseInt(this.intersected[0].name.substr(3, 1), 10)
        this.app.emit('wayChanged', newWay)
      }
    }
  }

  doFallbackRaycast () {
    this.cleanIntersected()

    this.raycaster.setFromCamera(this.mouse, this.app.camera)
    var intersections = this.raycaster.intersectObjects(this.colliders)
    this.intersection = (intersections.length) > 0 ? intersections[0] : null
    if (this.intersection !== null) {
      var object = this.intersection.object
      object.material.color.set(Config.wayColorOver)
      this.intersected.push(object)
    }
  }

  // Touch screen methods
  // Swipe on touch screens
  onTouchStart (e) {
    console.log('---start')
    var t = e.touches[0]
    this.swipe.sX = t.screenX
    this.swipe.sY = t.screenY
  }

  onTouchMove (e) {
    console.log('---move')
    var t = e.touches[0]
    // e.preventDefault()
    this.swipe.eX = t.screenX
    this.swipe.eY = t.screenY
  }

  onTouchEnd (e) {
    console.log('---')
    if ((((this.swipe.eX - 60 > this.swipe.sX) || (this.swipe.eX + 60 < this.swipe.sX)) && ((this.swipe.eY < this.swipe.sY + 60) && (this.swipe.sY > this.swipe.eY - 60) && (this.swipe.eX > 0)))) {
      if (this.swipe.eX > this.swipe.sX) {
        this.app.emit('wayLeft')
      } else {
        this.app.emit('wayRight')
      }
    } else {
      if (this.iOS) {
        this.onClick(e)
      }
    }
  }

  // common methods
  getIntersections (controller) {
    this.tempMatrix.identity().extractRotation(controller.matrixWorld)

    this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld)
    this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tempMatrix)

    return this.raycaster.intersectObjects(this.colliders)
  }

  intersectObjects (controller) {
    // Do not highlight when already selected

    if (controller.userData.selected !== undefined) return

    var line = controller.getObjectByName('line')
    var intersections = this.getIntersections(controller)

    if (intersections.length > 0) {
      var intersection = intersections[0]

      var object = intersection.object
      object.material.color.set(Config.wayColorOver)
      this.intersected.push(object)

      line.scale.z = intersection.distance
    } else {
      line.scale.z = 5
    }
  }

  cleanIntersected () {
    while (this.intersected.length) {
      var object = this.intersected.pop()
      object.material.color.set(Config.wayColor)
    }
  }

  updateVR () {
    this.cleanIntersected()

    this.intersectObjects(this.controller1)
    this.intersectObjects(this.controller2)
  }
}
