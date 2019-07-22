import * as THREE from 'three';
import { Interaction } from 'three.interaction';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  ShadowMaterial,
  SpotLight,
  WebGLRenderer,
} = THREE;

const GLTFLOADER = new GLTFLoader();

const CAMERA_RADIUS = 80;
const CAMERA_ELEVATION = 45;
const CAMERA_FOV = 25;

const TILE_SIZE = 8;

const WHITE = 'white';
const BLACK = 'black';

const MATERIAL = (color = 0xcdcdcd) => {
  return new MeshStandardMaterial({
    color: color,
    metalness: 0.35,
    roughness: 0.35,
    wireframe: false
  });
};

export default class ThreeScene {
  constructor(container) {
    this.scene = new Scene();

    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor( 0xffffff, 0 );

    this.setupBoard();
    this.setupReflection();
    this.setupLights();
    this.setUpCamera();
    this.animate();

    this.selectedPiece = null;
    this.currentlyShownTargets = null;

    container.appendChild( this.renderer.domElement );

    new Interaction(this.renderer, this.scene, this.camera);
  }

  setupBoard = () => {
    this.board = new Object3D();
    const tiles = new Group();

    const setupBoardColumns = row => {
      for (let col = 0; col < 8; col ++) {
        const color = (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ? 0xffffff : 0x000000;
        const tile = new Mesh( new BoxGeometry( TILE_SIZE, 1, TILE_SIZE ), MATERIAL(color) );

        tile.receiveShadow = true;
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

  setupPiece = (piece) => {
    const modelURL = () => {
      switch (piece.type) {
        case 'king':
        return '/models/king/model.gltf';
        case 'queen':
        return '/models/queen/model.gltf';
        case 'rook':
        return '/models/rook/model.gltf';
        case 'knight':
        return '/models/knight/model.gltf';
        case 'bishop':
        return '/models/bishop/model.gltf';
        default:
        return '/models/pawn/model.gltf';
      }
    }

    GLTFLOADER.load(modelURL(), (gltf) => {
      const scene = gltf.scene;

      const x = -TILE_SIZE * (3.5 - piece.position.x);
      const y = 0;
      const z = TILE_SIZE * (3.5 - piece.position.y);

      scene.position.set(x, y, z);

      setting(scene, piece.side);

      scene.mappingId = piece;

      this.chessPieces.add(scene);
    });

    const setting = (scene, side) => {
      const model = scene.children[0];

      model.receiveShadow = true;
      model.castShadow = true;

      model.scale.set(25, 25, 25);
      model.position.set(-15.5, -7, -15);

      model.material = MATERIAL(side === BLACK ? 0x000000 : 0xffffff);

      model.cursor = 'pointer';
      model.on('click', () => this.selectedPiece = piece);
    }
  }

  update = data => {
    console.log(this.chessPieces.children)
    this.chessPieces.children.forEach(piece => {
    })
  }

  showPossibleTargets = (targets) => {
    this.currentlyShownTargets = null;
    console.log(targets)
  }

  /* ENVIRONMENT STUFF
  --------------------------------------*/
  setupReflection = () => {
    const geometry = new PlaneBufferGeometry( 100, 100 );
    const surface = new Mesh( geometry, new ShadowMaterial());
    surface.opacity = 0.5;
    surface.position.set( 0, -10, 0 );
    surface.receiveShadow = true;
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

    // this.scene.add( new AmbientLight( 0xffffff ) );
  }

  setUpCamera = () => {
    this.camera = new PerspectiveCamera( CAMERA_FOV, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.set( 0, CAMERA_ELEVATION, CAMERA_RADIUS );
    this.camera.lookAt( 0, 0, 0 );
    this.camera.setFocalLength(CAMERA_FOV);
  }

  animate = () => {
    requestAnimationFrame( this.animate );

    // this.board.rotation.z += 0.01;

    this.renderer.render( this.scene, this.camera );
  }


  /* ENVIRONMENT INTERACTIONS
  --------------------------------------*/
  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  rotate = (rotation) => {
    const xOffset = rotation.x * 30;
    const zOffset = Math.sqrt(CAMERA_RADIUS ** 2 - xOffset ** 2);
    this.camera.position.set( xOffset, CAMERA_ELEVATION - rotation.y * 5, zOffset );
    this.camera.lookAt( 0, 0, 0 );
  }

  zoom = (level) => {
    const fovLevel = CAMERA_FOV + level;

    this.camera.setFocalLength(fovLevel);
  }
}