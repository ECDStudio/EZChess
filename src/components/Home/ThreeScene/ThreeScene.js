import React, { Component } from 'react';
import * as THREE from 'three';
import { Interaction } from 'three.interaction';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import socketIOClient from "socket.io-client";

import { API } from 'constants.js';

import Chess from 'models/Chess';

import { KING, QUEEN, ROOK, KNIGHT, BISHOP, PAWN, BLACK } from 'models/constants';

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

const MATERIAL = (color = 0xcdcdcd) => {
  return new MeshStandardMaterial({
    color: color,
    metalness: 0.35,
    roughness: 0.35,
    wireframe: false
  });
};

const EASE_FACTOR = 0.15;

export default class ThreeScene extends Component {
  constructor(container) {
    super();

    this.gltfs = {};

    this.targetRotation = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0 };

    this.targetZoom = 0;
    this.zoomLevel = 0;

    this.currentTargets = [];

    this.game = new Chess();
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
    window.addEventListener('resize', this.resize);

    const socket = socketIOClient(API);
    socket.on('FromAPI', data => {
      this.game.update(data);
      this.updatePieces(this.game);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.resize);
    this.raf = null;
    this.renderer = null;
    this.scene = null;
  }

  componentDidUpdate(prevProps) {
    const { view } = this.props;

    if (prevProps.view !== view) this.updateView(view);
  }

  loadModels = () => {
    const types = [ KING, QUEEN, ROOK, KNIGHT, BISHOP, PAWN ];

    types.forEach(type => {
      GLTFLOADER.load(`/models/${ type }.glb`, (gltf) => {
        this.gltfs[type] = gltf;
        let allLoaded = true;
        types.forEach(type => {
          if (!this.gltfs[type]) allLoaded = false;
        })
        if (allLoaded) {
          for (let player of Object.values(this.game.players)) {
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

    model.material = MATERIAL(piece.side === BLACK ? 0x232323 : 0xffffff);
    model.receiveShadow = false;
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
    let moves;
    (moves = () => {
      requestAnimationFrame(moves);
      this.chessPieces.children.forEach(piece => {
        for (let player of Object.values(data.players)) {
          for (let target of Object.values(player.pieces)) {
            if (target.uid !== piece.mappingId.uid) continue;
            this.handlePieceAction(piece, target);
          }
        }
      })
    })();
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
    piece.position.x += (targetX - piece.position.x) * EASE_FACTOR;
    piece.position.z += (targetY - piece.position.z) * EASE_FACTOR;
    if (this.renderer) this.renderer.render( this.scene, this.camera );
  }

  handlePieceClick = piece => {
    const { view } = this.props;
    const { game } = this;

    if (piece.side !== view) return;
    if (!game.players[Object.keys(game.players).find(player => (game.players[player].side === piece.side))].isTurn) return;

    this.clearTargets();

    piece.availableMoves(game).forEach(target => this.handleSetupTarget(piece, target));
    this.currentTargets.forEach(target => this.board.add(target));
  }

  handleSetupTarget = (piece, target) => {
    const { updateGame } = this.props;
    const { game } = this;

    const targetPrompt = new Mesh( new BoxBufferGeometry( TILE_SIZE, 0.1, TILE_SIZE ) );
    targetPrompt.material = MATERIAL(0x75b0ed);
    targetPrompt.position.set( (- TILE_SIZE * 3.5) + (TILE_SIZE * target.x), 0.5, (- TILE_SIZE * 3.5) + (TILE_SIZE * (7 - target.y)));

    targetPrompt.cursor = 'pointer';
    targetPrompt.on('click', () => {
      piece.toPosition(game, target);
      game.switchTurn();
      updateGame(game);
      this.clearTargets();
    });

    this.currentTargets.push(targetPrompt);
  }

  clearTargets = () => {
    this.currentTargets.forEach(target => {
      this.board.remove(target);
      target.geometry.dispose();
      target.material.dispose();
    });
    this.currentTargets = [];
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
    this.board.add(this.chessPieces);

    this.updateView(this.props.view);
  }

  setupLights = () => {
    const mainLight = new DirectionalLight( 0xffffff, 0.1 );
    mainLight.castShadow = true;
    mainLight.position.set( 0, 100, 0 );
    mainLight.lookAt( 0, 0, 0 );
    Object.assign(mainLight.shadow.camera, {
      top: -50,
      right: 50,
      left: -50,
      bottom: 50,
    });
    Object.assign(mainLight.shadow.mapSize, {
      width: 250,
      height: 250,
    });
    this.scene.add( mainLight );

    const setupSpotLights = (intensity, x, y, z, castShadow = false) => {
      const spotLight = new SpotLight( 0xffffff, intensity );
      spotLight.castShadow = castShadow;
      spotLight.position.set(x, y, z);
      Object.assign(spotLight.shadow.mapSize, {
        width: 500,
        height: 500,
      });
      this.scene.add( spotLight );
    }

    setupSpotLights(0.25, 0, 50, 0, true);
    setupSpotLights(0.25, 0, 25, 30);
    setupSpotLights(0.25, 0, 25, -30);

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
    }

    // Mouse scroll triggers zoom
    this.zoomLevel = this.zoomLevel + ((this.targetZoom - this.zoomLevel) * EASE_FACTOR);

    if (this.zoomLevel !== this.targetZoom) {
      const fovLevel = CAMERA_FOV + this.zoomLevel;

      this.camera.setFocalLength(fovLevel);
    }

    // from this.updateView()
    const toRadians = (degrees) => (degrees * Math.PI / 180);
    const toDegrees = (radians) => (radians * 180 / Math.PI);

    const currentDegrees = toDegrees(this.board.rotation.y);
    this.board.rotation.y = toRadians(currentDegrees + (this.board.targetRotate - currentDegrees) * EASE_FACTOR);
    
    if (this.renderer) this.renderer.render( this.scene, this.camera );
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
    switch (side) {
      case 'white':
      this.board.targetRotate = 90;
      break;
      case 'black':
      this.board.targetRotate = -90;
      break;
      default:
      this.board.targetRotate = 0;
      break;
    }
  }

  render() {
    return (
      <div ref={ el => this.stage = el } onWheel={ this.handleMouseWheel } />
    )
  }
}