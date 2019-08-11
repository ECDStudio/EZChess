import React, { Component } from 'react';
import * as THREE from 'three';
import { Interaction } from 'three.interaction';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const {
  AmbientLight,
  BoxBufferGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  SpotLight,
  WebGLRenderer,
} = THREE;

const GLTFLOADER = new GLTFLoader();

const CAMERA_RADIUS = 60;
const CAMERA_ELEVATION = 45;
const CAMERA_FOV = 25;

const TILE_SIZE = 6;

const TO_3D_COORD = coord => (
  TILE_SIZE * (3.5 - coord)
)

const BLACK = 'black';
const EASE_FACTOR = 0.1;

const MATERIAL = (color = 0xcdcdcd) => {
  return new MeshStandardMaterial({
    color: color,
    metalness: 0.35,
    roughness: 0.35,
    wireframe: false
  });
};

export default class ThreeScene extends Component {
  constructor(container) {
    super();

    this.gltfs = {};

    this.targetRotation = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0 };

    this.targetZoom = 0;
    this.zoomLevel = 0;

    this.currentlyShownTargets = [];

    this.state = {
      selectedPiece: null,
    }
  }

  componentDidMount() {
    this.scene = new Scene();

    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor( 0xffffff, 0 );

    this.setupBoard();
    this.loadModels();
    this.setupLights();
    this.setUpCamera();

    new Interaction(this.renderer, this.scene, this.camera);
    this.renderer.render( this.scene, this.camera );
    this.stage.appendChild( this.renderer.domElement );

    this.raf = window.requestAnimationFrame( this.onTick );

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mousewheel', this.handleMouseWheel);
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mousewheel', this.handleMouseWheel);
    window.removeEventListener('resize', this.resize);
  }

  componentDidUpdate(prevProps) {
    const { game, view } = this.props;

    if (prevProps.view !== view)
      this.updateView(view);
    else
      this.updatePieces(game);
  }

  loadModels = () => {
    const types = ['king', 'queen', 'rook', 'knight', 'bishop', 'pawn'];

    types.forEach(type => {
      GLTFLOADER.load(`/models/${ type }.glb`, (gltf) => {
        this.gltfs[type] = gltf;
        let allLoaded = true;
        types.forEach(type => {
          if (!this.gltfs[type]) allLoaded = false;
        })
        if (allLoaded) {
          for (let player of Object.values(this.props.game.players)) {
            for (let piece of Object.values(player.pieces))
              this.setupPiece(piece)
          }
        }
      })
    })
  }

  setupPiece = (piece) => {
    const scene = this.gltfs[piece.type].scene.clone();
    const model = scene.children[0];

    const x = -TO_3D_COORD(piece.position.x);
    const y = 0;
    const z = TO_3D_COORD(piece.position.y);

    scene.position.set(x, y, z);
    scene.mappingId = piece;

    model.material = MATERIAL(piece.side === BLACK ? 0x000000 : 0xffffff);
    model.receiveShadow = true;
    model.castShadow = true;

    model.cursor = 'pointer';
    model.on('click', () => this.handlePieceClick(piece));

    // Captured
    if (piece.position.x === -1 && piece.position.y === -1)
      scene.visible = false;

    this.chessPieces.add(scene);
    this.renderer.render( this.scene, this.camera );
  }

  updatePieces = data => {
    this.chessPieces.children.forEach(piece => {
      for (let player of Object.values(data.players)) {
        for (let target of Object.values(player.pieces)) {
          if (target.uid !== piece.mappingId.uid) continue;
          this.handlePieceAction(piece, target);
        }
      }
    })
  }

  handlePieceAction = (piece, target) => {
    const targetX = -TO_3D_COORD(target.position.x);
    const targetY = TO_3D_COORD(target.position.y);
    const { x, z } = piece.position;

    // Stay
    if (x === targetX && z === targetY) return;

    // Captured
    if (target.position.x === -1 && target.position.y === -1)
      piece.visible = false;
    else piece.visible = true;

    // Regular movement
    let move;
    (move = () => {
      requestAnimationFrame(move);
      piece.position.x += (targetX - piece.position.x) * EASE_FACTOR;
      piece.position.z += (targetY - piece.position.z) * EASE_FACTOR;
      this.renderer.render( this.scene, this.camera );
    })();
  }

  handlePieceClick = piece => {
    const { game, view } = this.props;

    if (piece.side !== view) return;
    this.setState({
      selectedPiece: piece,
    }, () => {
      this.currentlyShownTargets = [];
      console.log(piece.availableMoves(game))
    })
  }

  /* ENVIRONMENT STUFF
  --------------------------------------*/
  setupBoard = () => {
    this.board = new Object3D();
    const tiles = new Group();

    const whiteMaterial = MATERIAL(0xffffff);
    const blackMaterial = MATERIAL(0x000000);
    const ogTile = new Mesh( new BoxBufferGeometry( TILE_SIZE, 1, TILE_SIZE ) );
    ogTile.receiveShadow = true;

    const setupBoardColumns = row => {
      for (let col = 0; col < 8; col ++) {
        const tile = ogTile.clone();

        tile.material = (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ? whiteMaterial : blackMaterial;
        tile.position.set( (- TILE_SIZE * 3.5) + (TILE_SIZE * col), 0, (- TILE_SIZE * 3.5) + (TILE_SIZE * row));

        tiles.add(tile);
      }
    }

    for (let i = 0; i <= 7; i ++)
      setupBoardColumns(i);

    this.board.add(tiles)
    this.scene.add(this.board);

    this.chessPieces = new Group();
    this.board.add(this.chessPieces)
  }

  setupLights = () => {
    const mainLight = new DirectionalLight( 0xffffff, 0.25 );
    mainLight.castShadow = true;
    mainLight.position.set( 0, 100, 0 );
    mainLight.lookAt( 0, 0, 0 );
    Object.assign(mainLight.shadow.camera, {
      top: -100,
      right: 100,
      left: -100,
      bottom: 100,
    });
    Object.assign(mainLight.shadow.mapSize, {
      width: 5000,
      height: 5000,
    });
    // this.scene.add( mainLight );

    const setupSpotLights = (intensity, x, y, z) => {
      const spotLight = new SpotLight( 0xffffff, intensity );
      spotLight.castShadow = true;
      spotLight.position.set(x, y, z);
      Object.assign(spotLight.shadow.mapSize, {
        width: 5000,
        height: 5000,
      });
      this.scene.add( spotLight );
    }

    setupSpotLights(0.5, 0, 50, 0);
    // setupSpotLights(0.5, 0, 20, 25);
    // setupSpotLights(0.5, 0, 20, -25);

    this.scene.add( new AmbientLight( 0xffffff, 0.5 ) );
  }

  setUpCamera = () => {
    this.camera = new PerspectiveCamera( CAMERA_FOV, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.set( 0, CAMERA_ELEVATION, CAMERA_RADIUS );
    this.camera.lookAt( 0, 0, 0 );
    this.camera.setFocalLength(CAMERA_FOV);
  }


  /* ENVIRONMENT INTERACTIONS
  --------------------------------------*/
  onTick = () => {
    const { rotate, zoom } = this;

    this.raf = window.requestAnimationFrame( this.onTick );

    // Mouse move triggers rotation
    this.rotation = {
      x: this.rotation.x + ((this.targetRotation.x - this.rotation.x) * EASE_FACTOR),
      y: this.rotation.y + ((this.targetRotation.y - this.rotation.y) * EASE_FACTOR),
    }

    if (
      this.rotation.x.toFixed(3) !== this.targetRotation.x.toFixed(3) ||
      this.rotation.y.toFixed(3) !== this.targetRotation.y.toFixed(3)
    ) {
      const xOffset = this.rotation.x * 30;
      const zOffset = Math.sqrt(CAMERA_RADIUS ** 2 - xOffset ** 2);
      this.camera.position.set( xOffset, CAMERA_ELEVATION - this.rotation.y * 5, zOffset );
      this.camera.lookAt( 0, 0, 0 );
      this.renderer.render( this.scene, this.camera );
    }

    // Mouse scroll triggers zoom
    this.zoomLevel = this.zoomLevel + ((this.targetZoom - this.zoomLevel) * EASE_FACTOR);

    if (this.zoomLevel !== this.targetZoom) {
      const fovLevel = CAMERA_FOV + this.zoomLevel;

      this.camera.setFocalLength(fovLevel);
      this.renderer.render( this.scene, this.camera );
    }
  }

  handleMouseMove = e => {
    const { innerWidth, innerHeight } = window;

    this.targetRotation = {
      x: (e.clientX - innerWidth / 2) / innerWidth * 2,
      y: (e.clientY - innerHeight / 2) / innerHeight * 2,
    }
  }

  handleMouseWheel = e => {
    this.targetZoom = this.targetZoom - e.deltaY;
    this.targetZoom = Math.min(this.targetZoom, 25);
    this.targetZoom = Math.max(this.targetZoom, -2);
  }

  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  updateView = (side) => {
    const toRadians = (degrees) => (degrees * Math.PI / 180);
    const toDegrees = (radians) => (radians * 180 / Math.PI);

    switch (side) {
      case '':
      this.board.targetRotate = 0;
      break;
      case 'white':
      this.board.targetRotate = 90;
      break;
      case 'black':
      this.board.targetRotate = -90;
      break;
    }

    let rotate;
    (rotate = () => {
      requestAnimationFrame(rotate);
      const currentDegrees = toDegrees(this.board.rotation.y);
      this.board.rotation.y = toRadians(currentDegrees + (this.board.targetRotate - currentDegrees) * EASE_FACTOR);
      this.renderer.render( this.scene, this.camera );
    })();
  }

  render() {
    return (
      <div ref={ el => this.stage = el } />
    )
  }
}