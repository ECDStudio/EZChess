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

const CAMERA_RADIUS = 80;
const CAMERA_ELEVATION = 45;
const CAMERA_FOV = 25;

const TILE_SIZE = 8;

const WHITE = 'white';
const BLACK = 'black';

export default class Stage {
    constructor(container) {
        this.scene = new Scene();

        this.renderer = new WebGLRenderer({ alpha: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor( 0xffffff, 0 );

        this.setupBoard();
        this.setupPieces();
        this.setupReflection();
        this.setupLights();
        this.setUpCamera();
        this.animate();

        container.appendChild( this.renderer.domElement );

        new Interaction(this.renderer, this.scene, this.camera);
    }

    setupBoard = () => {
        const material = (color = 0xcdcdcd) => {
            return new MeshStandardMaterial({
                color: color,
                metalness: 0.35,
                roughness: 0.35,
                wireframe: false
            });
        };

        this.board = new Object3D();
        const tiles = new Group();

        const setupBoardColumns = row => {
            for (let col = 0; col < 8; col ++) {
                const color = (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ? 0xffffff : 0x000000;
                const tile = new Mesh( new BoxGeometry( TILE_SIZE, 1, TILE_SIZE ), material(color) );

                tile.receiveShadow = true;
                tile.position.set( (- TILE_SIZE * 3.5) + (TILE_SIZE * col), 0, (- TILE_SIZE * 3.5) + (TILE_SIZE * row));

                tiles.add(tile);
            }
        }

        for (let i = 0; i <= 7; i ++)
            setupBoardColumns(i);

        this.board.add(tiles)
        this.scene.add(this.board);
    }

    setupPieces = () => {
        const gltfLoader = new GLTFLoader();

        const setupPiece = (model, type, i, color) => {
            const piece = model.children[0];
            piece.receiveShadow = true;
            piece.castShadow = true;

            if (color === BLACK) 
                piece.material.color = { r: 0.15, g: 0.15, b: 0.15 };
            else piece.material.color = { r: 0.9, g: 0.9, b: 0.9 };

            piece.cursor = 'pointer';
            piece.on('click', () => this.selectedPiece = model.chessId);

            model.chessId = {
                player: color,
                piece: `${ type }${ i + 1 }`,
            };
            this.board.add(model);
        }

        const setupPawns = (i, color) => {
            gltfLoader.load('/models/pawn/model.gltf', (gltf) => {
                const model = gltf.scene;

                const x = color === WHITE ? -TILE_SIZE * 2.5 : TILE_SIZE * 2.5;
                const y = 0;
                const z = TILE_SIZE * (3.5 - i);

                model.position.set(x, y, z);

                model.children[0].scale.set(25, 25, 25);
                model.children[0].position.set(-15.5, -7, -15);

                setupPiece(model, 'pawn', i, color);
            });
        }

        [ WHITE, BLACK ].forEach(color => {
            for (let i = 0; i < 8; i ++) {
                setupPawns(i, color);
            }
        })
    }

    showPossibleTargets = (targets) => {
        targets.forEach(target => {
            const x = target.x - TILE_SIZE * 3.5;
            const y = 6;
            const z = TILE_SIZE * (3.5 - target.y);
        })
    }


    /* ENVIRONMENT STUFF
    --------------------------------------*/
    setupReflection = () => {
        const geometry = new PlaneBufferGeometry( 100, 100 );
        const surface = new Mesh( geometry, new ShadowMaterial());
        surface.opacity = 0.5;
        surface.position.set( 0, -10, 0 );
        surface.receiveShadow = true;
        // this.scene.add( surface );
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
        this.scene.add( mainLight );

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
        setupSpotLights(0.5, 0, 20, 25);
        setupSpotLights(0.5, 0, 20, -25);

        this.scene.add( new AmbientLight( 0xffffff ) );
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