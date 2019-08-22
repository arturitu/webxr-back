import * as THREE from './three.module.js'

var fontData = { glyphs: { 0: { ha: 764, x_min: 51, x_max: 708, o: 'm 450 951 q 550 931 503 951 q 633 875 597 910 q 688 793 668 840 q 708 692 708 746 l 708 258 q 688 158 708 206 q 633 76 668 111 q 550 21 597 42 q 450 0 503 0 l 308 0 q 208 21 256 0 q 126 76 161 42 q 72 158 92 111 q 51 258 51 206 l 51 692 q 72 793 51 746 q 126 875 92 840 q 208 931 161 910 q 308 951 256 951 l 450 951 m 547 664 q 538 709 547 688 q 513 747 529 731 q 476 773 497 764 q 431 782 456 782 l 328 782 q 282 773 303 782 q 245 747 261 764 q 220 709 229 731 q 211 664 211 688 l 211 288 q 220 242 211 264 q 245 203 229 219 q 282 178 261 188 q 328 169 303 169 l 431 169 q 476 178 456 169 q 513 203 497 188 q 538 242 529 219 q 547 288 547 264 l 547 664 z ' }, 1: { ha: 471, x_min: 65, x_max: 361, o: 'm 65 774 l 175 946 l 361 946 l 361 0 l 200 0 l 200 774 l 65 774 z ' }, 2: { ha: 675, x_min: 31, x_max: 647, o: 'm 40 210 q 228 363 138 283 q 403 519 319 442 q 441 558 425 540 q 467 593 457 575 q 481 633 476 611 q 486 686 486 654 q 478 730 486 708 q 453 767 469 751 q 417 791 438 782 q 375 800 397 800 l 297 800 q 253 791 274 800 q 217 767 232 782 q 192 730 201 751 q 183 686 183 708 l 183 653 l 31 653 l 31 714 q 50 810 31 765 q 103 889 69 856 q 183 942 138 922 q 279 961 228 961 l 400 961 q 497 942 451 961 q 575 889 542 922 q 628 810 608 856 q 647 714 647 765 l 647 693 q 644 617 647 651 q 629 551 640 582 q 597 491 618 519 q 542 431 575 463 q 376 280 463 354 q 200 142 289 206 l 631 142 l 631 0 l 40 0 l 40 210 z ' }, 3: { ha: 699, x_min: 22, x_max: 703, o: 'm 656 783 q 667 640 681 710 q 594 515 654 569 l 586 506 l 594 497 q 650 413 632 458 q 650 160 703 286 q 599 80 632 115 q 524 25 567 44 q 460 3 492 10 q 396 -5 428 -3 q 332 -6 364 -7 q 265 -6 300 -6 q 171 14 215 -6 q 93 67 126 33 q 41 147 60 101 q 22 242 22 192 l 22 269 l 172 269 q 181 226 172 246 q 207 189 189 203 q 249 167 225 175 q 297 156 272 158 q 343 156 322 154 q 402 164 372 158 q 457 188 432 169 q 497 254 488 211 q 494 339 506 297 q 392 426 475 411 q 303 435 358 435 l 254 435 l 254 578 l 303 578 q 392 586 358 578 q 457 611 433 592 q 483 645 474 625 q 494 688 493 665 q 485 731 494 710 q 457 771 476 753 q 415 793 442 785 q 356 803 388 801 q 292 799 325 804 q 232 781 258 794 q 189 743 206 767 q 172 686 172 719 l 22 686 l 22 715 q 47 822 22 775 q 113 899 72 868 q 205 945 153 929 q 310 961 257 961 q 352 961 336 961 q 376 960 368 961 q 388 960 385 960 q 392 960 392 960 q 426 957 408 958 q 460 953 443 956 q 522 931 490 946 q 576 896 553 917 q 624 844 603 874 q 656 783 644 815 z ' }, 4: { ha: 778, x_min: 22, x_max: 756, o: 'm 611 333 l 756 333 l 756 189 l 611 189 l 611 0 l 449 0 l 449 186 l 22 186 l 22 333 l 329 946 l 611 946 l 611 333 m 449 333 l 449 817 l 200 333 l 449 333 z ' }, 5: { ha: 731, x_min: 35, x_max: 689, o: 'm 367 628 q 501 606 442 628 q 603 544 561 585 q 667 442 644 503 q 689 304 689 381 q 607 67 689 153 q 358 -19 525 -19 q 226 -1 286 -19 q 123 56 165 18 q 58 151 81 93 q 35 286 35 208 l 193 286 q 231 178 193 219 q 353 138 268 138 q 477 181 431 138 q 524 303 524 224 q 510 380 524 349 q 473 430 497 411 q 417 457 449 449 q 347 465 385 465 q 219 422 258 465 l 57 422 l 57 940 l 643 940 l 643 775 l 232 775 l 232 601 q 291 622 253 615 q 367 628 329 628 z ' }, 6: { ha: 771, x_min: 63, x_max: 719, o: 'm 336 -6 q 231 16 281 -6 q 143 75 181 38 q 84 163 106 113 q 63 269 63 213 l 63 314 l 63 325 l 63 681 q 84 787 63 736 q 143 875 106 838 q 231 934 181 913 q 336 956 281 956 l 456 956 q 556 936 510 956 q 635 883 601 917 q 690 803 669 849 q 717 704 711 758 l 542 704 q 515 767 535 742 q 454 792 496 792 l 338 792 q 260 756 289 792 q 232 671 232 721 l 232 569 q 336 590 283 590 l 444 590 q 551 569 501 590 q 638 510 601 547 q 697 422 675 472 q 719 314 719 371 l 719 269 q 697 163 719 213 q 638 75 675 113 q 551 16 601 38 q 444 -6 501 -6 l 336 -6 m 232 274 q 263 192 235 225 q 338 158 292 158 l 443 158 q 520 194 492 158 q 549 279 549 229 l 549 306 q 520 390 549 356 q 443 425 492 425 l 338 425 q 260 391 289 425 q 232 307 232 357 l 232 274 z ' }, 7: { ha: 732, x_min: 49, x_max: 683, o: 'm 49 935 l 683 935 l 517 0 l 339 0 l 472 764 l 225 764 l 225 622 l 49 622 l 49 935 z ' }, 8: { ha: 747, x_min: 51, x_max: 708, o: 'm 431 957 q 533 937 486 957 q 614 882 581 917 q 665 798 647 847 q 682 692 682 749 l 682 651 q 666 560 682 601 q 621 485 650 518 q 685 407 661 453 q 708 303 708 361 l 708 242 q 688 143 708 189 q 633 64 668 97 q 550 13 597 31 q 450 -6 503 -6 l 308 -6 q 208 13 256 -6 q 126 64 161 31 q 72 143 92 97 q 51 242 51 189 l 51 303 q 75 409 51 363 q 140 486 99 456 q 97 561 113 519 q 81 651 81 603 l 81 692 q 99 798 81 749 q 151 882 118 847 q 230 937 183 917 q 333 957 276 957 l 431 957 m 547 279 q 514 360 547 329 q 431 392 481 392 l 419 392 l 408 392 l 356 392 l 344 392 l 328 392 q 245 360 279 392 q 211 279 211 329 l 211 263 q 245 183 211 213 q 328 154 279 154 l 431 154 q 514 183 481 154 q 547 263 547 213 l 547 279 m 517 681 q 511 727 517 706 q 494 765 506 749 q 465 792 482 782 q 422 801 447 801 l 342 801 q 269 766 292 801 q 247 681 247 731 l 247 660 q 269 576 247 611 q 342 540 292 540 l 422 540 q 465 549 447 540 q 494 575 482 558 q 511 614 506 592 q 517 660 517 636 l 517 681 z ' }, 9: { ha: 710, x_min: 42, x_max: 665, o: 'm 436 957 q 535 937 492 957 q 608 882 579 917 q 651 798 636 847 q 665 692 665 749 l 665 569 q 643 444 665 501 l 558 0 l 403 0 l 461 307 q 448 306 454 306 q 436 306 442 306 l 272 306 q 173 326 215 306 q 101 381 131 346 q 56 464 71 415 q 42 569 42 513 l 42 692 q 56 798 42 749 q 101 882 71 847 q 173 937 131 917 q 272 957 215 957 l 436 957 m 496 683 q 478 763 496 733 q 413 792 461 792 l 296 792 q 230 763 247 792 q 213 683 213 733 l 213 579 q 230 499 213 529 q 296 469 247 469 l 413 469 q 478 499 461 469 q 496 579 496 529 l 496 683 z ' }, '×': { ha: 551, x_min: 31, x_max: 514, o: 'm 272 622 l 417 767 l 514 669 l 369 525 l 514 381 l 415 283 l 272 426 l 129 283 l 31 381 l 175 525 l 31 669 l 128 767 l 272 622 z ' }, '★': { ha: 1022, x_min: -12, x_max: 1035, o: 'm 640 636 l 1035 636 l 715 397 l 835 21 l 514 249 l 186 21 l 308 397 l -12 636 l 388 636 l 514 1008 l 640 636 z ' } }, familyName: 'Do Hyeon', ascender: 1111, descender: -278, underlinePosition: -104, underlineThickness: 69, boundingBox: { yMin: -242, xMin: -71, yMax: 1057, xMax: 1265 }, resolution: 1000 }

var font = new THREE.Font(fontData)
var camera, scene, renderer
var controller1, controller2

var raycaster; var intersected = []
var tempMatrix = new THREE.Matrix4()

var mouse = new THREE.Vector2()
var intersection = null

var isVRActive = false

// var bgColor = 0xdeb307;
var bgColor = 0x222222

var world

var startIcon

var ways = []
// var wayColor = 0xeebf2d
// var wayColorOver = 0xf4d36b
var wayColor = 0x333333
var wayColorOver = 0x444444
var wayLength = 200
var actualWay = 2
var newWay = 2
var correctWay = 2

var objsToIntersect = []

var scoreboard

var score = 0
var highscore
var highScoreItem
var units
var tens
var hundreds
var scoreMaterial
var scoreColor = 0xffffff
var highscoreColor = 0xffcc00

var tokens
var bigTokens
var colorArr = [
  0xfb39ca,
  0xfdca2a,
  0x2bca20,
  0xfc9125,
  0x0d6afc,
  0x6419cb,
  0xffffff,
  0xfa0018
]

var targetXpos = 0
var lerpSpeed = 0.9

// 0 - before start
// 1 - started
var gameStatus = 0

var solved = false
var gameSpeed = 10
var cycle = 0

var rewards

var prevTime = window.performance.now()

init()
animate()

function init () {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(bgColor)
  scene.fog = new THREE.Fog(bgColor, 0, 45)

  world = new THREE.Object3D()
  world.position.y = -1.7
  world.position.z = -8
  scene.add(world)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.layers.enable(1)
  // camera.rotation.y = Math.PI;
  scene.add(camera)

  var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75)
  light.position.set(0.5, 1, 0.75)
  scene.add(light)

  // start icon
  var test = new THREE.MeshBasicMaterial({
    color: wayColor
  })
  startIcon = new THREE.Mesh(new THREE.CircleBufferGeometry(0.35, 0), test)
  startIcon.position.set(0, 200, -5)
  startIcon.name = 'start'
  scene.add(startIcon)
  // reward
  rewards = new THREE.Group()
  var rewardMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
  for (var i = 0; i < 5; i++) {
    var rewardGeometry
    switch (i) {
      case 0:
        rewardGeometry = getRedwardGeometry(3)
        break
      case 1:
        rewardGeometry = getRedwardGeometry(4)
        break
      case 2:
        rewardGeometry = getRedwardGeometry(5)
        break
      case 3:
        rewardGeometry = getRedwardGeometry(6)
        break
      case 4:
        rewardGeometry = getRedwardGeometry(32)
        break
    }
    var reward = new THREE.Line(rewardGeometry, rewardMaterial)
    reward.name = i
    rewards.add(reward)
  }
  var shapes = font.generateShapes('×', 0.1)
  var rewardErrorGeometry = new THREE.ShapeBufferGeometry(shapes)
  rewardErrorGeometry.translate(-0.027, -0.041, 0)
  var rewardErrorMaterial = new THREE.MeshBasicMaterial()
  // var text = new THREE.Mesh( geometry, matLite );
  var rewardError = new THREE.Mesh(rewardErrorGeometry, rewardErrorMaterial)
  rewardError.name = 5
  rewards.add(rewardError)

  rewards.position.z = -0.5
  rewards.position.y = -0.05
  rewards.visible = false
  scene.add(rewards)

  // scoreboard
  scoreboard = new THREE.Group()
  scoreboard.position.set(0, 2.25, -5)

  scoreMaterial = new THREE.MeshBasicMaterial({
    color: 0xffcc00
  })

  var highScoreShape = font.generateShapes('★', 0.4)
  var highScoreGeometry = new THREE.ShapeBufferGeometry(highScoreShape)
  highScoreItem = new THREE.Mesh(highScoreGeometry, scoreMaterial)
  highScoreItem.position.x = -0.95
  highScoreItem.position.y = 0.05
  scoreboard.add(highScoreItem)

  setScoreboard(0, false)

  // units
  units = new THREE.Group()
  addDigits(units, 0)
  // tens
  tens = new THREE.Group()
  addDigits(tens, 1)
  // units
  hundreds = new THREE.Group()
  addDigits(hundreds, 2)

  scene.add(scoreboard)

  // tokens
  tokens = new THREE.Group()
  bigTokens = new THREE.Group()
  bigTokens.position.set(0, 1.7, -5)
  bigTokens.visible = false
  scene.add(bigTokens)
  for (i = 0; i < 5; i++) {
    var tokenGeometry
    switch (i) {
      case 0:
        // tokenGeometry = new THREE.SphereBufferGeometry(0.35,4,2)
        tokenGeometry = new THREE.RingBufferGeometry(0.25, 0.35, 3)
        break
      case 1:
        tokenGeometry = new THREE.RingBufferGeometry(0.25, 0.35, 4)
        break
      case 2:
        tokenGeometry = new THREE.RingBufferGeometry(0.25, 0.35, 5)
        break
      case 3:
        tokenGeometry = new THREE.RingBufferGeometry(0.25, 0.35, 6)
        break
      case 4:
        tokenGeometry = new THREE.RingBufferGeometry(0.25, 0.35, 32)
        break
    }
    var tokenMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    var token = new THREE.Mesh(tokenGeometry, tokenMaterial)
    var clonedToken = new THREE.Mesh(tokenGeometry, tokenMaterial)
    token.name = i
    clonedToken.name = i
    token.position.x = i * 2 - 4
    token.position.y = 1.5
    token.position.z = -50
    tokens.add(token)
    bigTokens.add(clonedToken)
    world.add(tokens)
  }

  showStartIcon()

  // ways
  var wayGeometry = new THREE.PlaneBufferGeometry(1.9, wayLength, 1, 1)
  wayGeometry.rotateX(-Math.PI / 2)
  for (i = 0; i < 5; i++) {
    var wayMaterial = new THREE.MeshBasicMaterial({ color: wayColor })
    var way = new THREE.Mesh(wayGeometry, wayMaterial)
    way.name = 'way' + i
    way.position.x = (i * 2) - 4
    way.position.y = 0.1
    way.position.z = 0
    ways.push(way)
    world.add(way)
  }

  objsToIntersect = ways.slice(0)
  objsToIntersect.push(startIcon)
  //

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.domElement.id = 'c'
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.vr.enabled = true
  document.body.appendChild(renderer.domElement)

  // WebXR
  document.body.appendChild(THREE.WEBVR.createButton(renderer, { referenceSpaceType: 'local' }))

  controller1 = renderer.vr.getController(0)
  controller1.addEventListener('selectstart', onSelectStart)
  controller1.addEventListener('selectend', onSelectEnd)
  scene.add(controller1)

  controller2 = renderer.vr.getController(1)
  controller2.addEventListener('selectstart', onSelectStart)
  controller2.addEventListener('selectend', onSelectEnd)
  scene.add(controller2)

  // raycaster
  raycaster = new THREE.Raycaster()

  // helpers

  var geometryHelper = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)])
  var materialHelper = new THREE.LineBasicMaterial({ color: 0xffffff })
  var line = new THREE.Line(geometryHelper, materialHelper)
  line.name = 'line'
  line.scale.z = 5

  controller1.add(line.clone())
  controller2.add(line.clone())

  window.addEventListener('resize', onWindowResize, false)
  document.addEventListener('mousemove', onDocumentMouseMove, false)
  document.addEventListener('click', onClick, false)

  highscore = window.localStorage.getItem('unboring.js13k.back')
  if (highscore !== null) {
    setScoreboard(highscore, true)
  } else {
    setScoreboard(0, true)
  }
}

// Build elements

function addDigits (group, positionIndex) {
  for (let i = 0; i <= 9; i++) {
    var digitShape = font.generateShapes(i.toString(), 0.5)
    var digitGeometry = new THREE.ShapeBufferGeometry(digitShape)
    var digitItem = new THREE.Mesh(digitGeometry, scoreMaterial)
    digitItem.name = i
    if (i !== 0) {
      digitItem.visible = false
    }
    group.add(digitItem)
    group.position.x = -0.5 + positionIndex * 0.37
    scoreboard.add(group)
  }
}

// controllers

function onSelectStart (event) {
  var controller = event.target

  var intersections = getIntersections(controller)

  if (intersections.length > 0) {
    var intersection = intersections[0]
    console.log(intersection.object)
    newWay = parseInt(intersection.object.name.substr(3, 1), 10)
  }
}

function onSelectEnd () {
}

// Scoreboard

function setScoreboard (val, highScore) {
  if (highScore) {
    highScoreItem.visible = true
    scoreboard.position.x = 0.1
    scoreboard.scale.set(1.5, 1.5, 1.5)
    scoreMaterial.color.set(highscoreColor)
  } else {
    highScoreItem.visible = false
    scoreboard.scale.set(1, 1, 1)
    scoreboard.position.x = -0.05
    scoreMaterial.color.set(scoreColor)
  }
}

// Mouse methods

function onDocumentMouseMove (event) {
  event.preventDefault()
  if (!event.targetTouches) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    doFallbackRaycast()
  }
}

function onClick (event) {
  event.preventDefault()

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  doFallbackRaycast()

  if (intersected.length) {
    if (intersected[0].name === 'start') {
      startGame()
    } else if (intersected[0].name.substr(0, 3) === 'way') {
      newWay = parseInt(intersected[0].name.substr(3, 1), 10)
    }
  }
}

// Intersection methods

function doFallbackRaycast () {
  cleanIntersected()

  raycaster.setFromCamera(mouse, camera)
  var intersections = raycaster.intersectObjects(objsToIntersect)
  intersection = (intersections.length) > 0 ? intersections[0] : null
  if (intersection !== null) {
    var object = intersection.object
    object.material.color.set(wayColorOver)
    intersected.push(object)
  }
}

function getIntersections (controller) {
  tempMatrix.identity().extractRotation(controller.matrixWorld)

  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld)
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix)

  return raycaster.intersectObjects(objsToIntersect)
}

function intersectObjects (controller) {
  // Do not highlight when already selected

  if (controller.userData.selected !== undefined) return

  var line = controller.getObjectByName('line')
  var intersections = getIntersections(controller)

  if (intersections.length > 0) {
    var intersection = intersections[0]

    var object = intersection.object
    object.material.color.set(wayColorOver)
    intersected.push(object)

    line.scale.z = intersection.distance
  } else {
    line.scale.z = 5
  }
}

function cleanIntersected () {
  while (intersected.length) {
    var object = intersected.pop()
    object.material.color.set(wayColor)
  }
}

// movement
function getTargetX (way) {
  return ((ways.length - 1) - way) * 2 - 4
}

// utils
function shuffle (array) {
  array.sort(() => Math.random() - 0.5)
}

function getRedwardGeometry (segmentCount) {
  var rewardGeometry = new THREE.Geometry()
  var radius = 0.05
  for (var i = 0; i <= segmentCount; i++) {
    var theta = (i / segmentCount) * Math.PI * 2
    rewardGeometry.vertices.push(
      new THREE.Vector3(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius,
        0))
  }
  return rewardGeometry
}

// Game logic
function showStartIcon () {
  startIcon.position.y = 1.7
}

function startGame () {
  startIcon.position.y = 200
  newCycle()
  gameStatus = 1
  score = 0
  setScoreboard(score, false)
}

function gameTick (delta) {
  world.position.z += gameSpeed * delta
  if (Math.abs(world.position.z) >= wayLength / 4 - 2 && !solved) {
    solve()
  }
  if (Math.abs(world.position.z) >= wayLength / 4 + 2 && !tokens.visible) {
    postSolved()
  }
  if (Math.abs(world.position.z) >= wayLength / 4 + 10) {
    newCycle()
  }

  if (rewards.visible) {
    var newScale = THREE.Math.lerp(2.5, rewards.scale.x, lerpSpeed)
    rewards.scale.set(newScale, newScale, newScale)
    rewards.position.z += 0.01
  }
}

function solve () {
  console.log('pre')
  if (tokens.children[actualWay].name === bigTokens.children[correctWay].name) {
    console.log('ok')
  } else {
    console.log('ko')
    for (var i = 0; i < rewards.children.length; i++) {
      if (i === rewards.children.length - 1) {
        rewards.children[i].visible = true
      } else {
        rewards.children[i].visible = false
      }
    }
  }
  tokens.visible = false
  solved = true
  rewards.scale.set(0.1, 0.1, 0.1)
  rewards.visible = true
}

function newCycle () {
  console.log(cycle, actualWay, tokens.children[actualWay].name, colorArr[actualWay], bigTokens.children[correctWay].name)
  cycle++
  correctWay = Math.floor(Math.random() * 5)
  for (var i = 0; i < rewards.children.length; i++) {
    if (rewards.children[i].name === correctWay) {
      rewards.children[i].visible = true
    } else {
      rewards.children[i].visible = false
    }
  }
  world.position.z = 0
  rewards.position.z = -0.5
  rewards.visible = false
  solved = false
  shuffle(tokens.children)
  shuffle(colorArr)
  for (i = 0; i < tokens.children.length; i++) {
    tokens.children[i].position.x = i * 2 - 4
    var tmpColor = colorArr[i]
    tokens.children[i].material.color.set(tmpColor)
    // tokens.children[i].material.emissive.set(tmpColor);
  }
  bigTokens.visible = true
  for (i = 0; i < bigTokens.children.length; i++) {
    if (bigTokens.children[i].name === correctWay) {
      bigTokens.children[i].visible = true
      var hexStr = '#' + bigTokens.children[i].material.color.getHexString()
      console.log(hexStr)
      document.querySelector('meta[name="theme-color"]').setAttribute('content', hexStr)
    } else {
      bigTokens.children[i].visible = false
    }
  }
}

function postSolved () {
  console.log('post')
  bigTokens.visible = false
  tokens.visible = true
}

function endGame (points) {
  window.localStorage.setItem('unboring.js13k.back', points)
}

//

function toggleVRActive () {
  controller1.visible = renderer.vr.isPresenting()
  controller2.visible = renderer.vr.isPresenting()
}
//

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
  renderer.setAnimationLoop(render)
}

function render () {
  var time = window.performance.now()
  var delta = (time - prevTime) / 1000

  if (gameStatus === 1) {
    gameTick(delta)
  }

  if (newWay !== actualWay) {
    actualWay = newWay
    targetXpos = getTargetX(newWay)
  }

  if (targetXpos !== world.position.x) {
    world.position.x = THREE.Math.lerp(targetXpos, world.position.x, lerpSpeed)
  }

  prevTime = time

  if (isVRActive !== renderer.vr.isPresenting()) {
    toggleVRActive()
  }
  if (renderer.vr.isPresenting()) {
    cleanIntersected()

    intersectObjects(controller1)
    intersectObjects(controller2)
    lerpSpeed = 0.75
  } else {
    lerpSpeed = 0.9
  }

  renderer.render(scene, camera)
}
