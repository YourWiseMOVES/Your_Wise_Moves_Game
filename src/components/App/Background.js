import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as THREE from 'three';

class Background extends Component {

    constructor(state) {
        super(state);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.moveSphereForward = this.moveSphereForward.bind(this);
        this.speedArchitect = this.speedArchitect.bind(this);
        //new
    }

    componentDidMount() {

        let i = 0;
        this.i = i;

        let counter = 1;
        this.counter = counter;

        let backwards=false;
        this.backwards = backwards;



        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            35,
            width / height,
            2,
            1000
        );
        camera.position.set(0, 0, 190);

        const renderer = new THREE.WebGLRenderer({ antialias: true })

        renderer.setViewport(0, 0, 200, 200)

        //---------------------LIGHTS-------------------------------------
        const light1 = new THREE.PointLight(0xffffff, .4);
        light1.position.set(-50, -15, 100)

        const light2 = new THREE.PointLight(0xffffff, .4);
        light2.position.set(50, 15, 100)

        const light3 = new THREE.PointLight(0xffffff, .8);
        light3.position.set(-10, 0, 160)

        const light4 = new THREE.PointLight(0xffffff, .8);
        light4.position.set(10, 0, 160)

        const light5 = new THREE.PointLight(0xffffff, .6);
        light5.position.set(8, 8, 140);
        scene.add(light1, light2, light3, light4, light5)
        //--------------------END LIGHTS-------------------------------------

        //background
        const backgroundTexture = new THREE.TextureLoader().load(require('./images/threebackground.jpg'));

        const geoBackground = new THREE.PlaneBufferGeometry(800, 800, 32);
        const matBackground = new THREE.MeshBasicMaterial({ map: backgroundTexture });
        const background = new THREE.Mesh(geoBackground, matBackground);
        background.receiveShadow = true;
        background.position.z = -20;
        background.position.y = -200;
        background.rotation.z = -Math.PI/6;
        scene.add(background);

        //------------------------------CLOUDS----------------------------------
        //clouds
        //Remember, you need a server for images to be loaded!
        const textureClouds1 = new THREE.TextureLoader().load(require('./images/clouds5.jpg'));

        const geoClouds1 = new THREE.SphereGeometry(60, 100, 100);
        const matClouds1 = new THREE.MeshPhongMaterial({ alphaMap: textureClouds1 });
        const clouds1 = new THREE.Mesh(geoClouds1, matClouds1);
        matClouds1.transparent = true;

        const textureClouds2 = new THREE.TextureLoader().load(require('./images/clouds2.jpg'));

        const geoClouds2 = new THREE.SphereGeometry(90, 100, 100);
        const matClouds2 = new THREE.MeshPhongMaterial({ alphaMap: textureClouds2 });
        const clouds2 = new THREE.Mesh(geoClouds2, matClouds2);
        matClouds2.transparent = true
        scene.add(clouds1, clouds2);
        //--------------------------END CLOUDS----------------------------------


        //--------------------------SPHERES----------------------------------
        const textureYinYang = new THREE.TextureLoader().load(require('./images/yinYang.jpg'));

        const geoYinYang = new THREE.SphereGeometry(10, 100, 100);
        const matYinYang = new THREE.MeshPhongMaterial({ map: textureYinYang, bumpMap: textureYinYang });
        const yinYang = new THREE.Mesh(geoYinYang, matYinYang);
        yinYang.overdraw = true;
        yinYang.castShadow = true;
        yinYang.receiveShadow = true;
        scene.add(yinYang);
        yinYang.position.set(0, 0, 120);

        const textureEarth = new THREE.TextureLoader().load(require('./images/earth.jpg'));

        const geoEarth = new THREE.SphereGeometry(10, 100, 100);
        const matEarth = new THREE.MeshPhongMaterial({ map: textureEarth, bumpMap: textureEarth });
        const earth = new THREE.Mesh(geoEarth, matEarth);
        earth.overdraw = true;
        earth.castShadow = true;
        scene.add(earth);
        earth.position.set(0, -40, 0);

        const textureMetal = new THREE.TextureLoader().load(require('./images/metal.jpg'));

        const geoMetal = new THREE.SphereGeometry(10, 100, 100);
        const matMetal = new THREE.MeshPhongMaterial({ map: textureMetal, bumpMap: textureMetal });
        const metal = new THREE.Mesh(geoMetal, matMetal);
        metal.overdraw = true;
        metal.castShadow = true;
        scene.add(metal);
        metal.position.set(-38, -12, 0);

        const textureWater = new THREE.TextureLoader().load(require('./images/water.jpg'));

        const geoWater = new THREE.SphereGeometry(10, 100, 100);
        const matWater = new THREE.MeshPhongMaterial({ map: textureWater, bumpMap: textureWater });
        const water = new THREE.Mesh(geoWater, matWater);
        water.overdraw = true;
        water.castShadow = true;
        scene.add(water);
        water.position.set(-24, 32, 0)

        const textureFire = new THREE.TextureLoader().load(require('./images/fire.jpg'));

        const geoFire = new THREE.SphereGeometry(10, 100, 100);
        const matFire = new THREE.MeshPhongMaterial({ map: textureFire, bumpMap: textureFire });
        const fire = new THREE.Mesh(geoFire, matFire);
        fire.overdraw = true;
        fire.castShadow = true;
        scene.add(fire);
        fire.position.set(38, -12, 0)

        const textureWood = new THREE.TextureLoader().load(require('./images/wood.jpg'));

        const geoWood = new THREE.SphereGeometry(10, 100, 100);
        const matWood = new THREE.MeshPhongMaterial({ map: textureWood, bumpMap: textureWood });
        const wood = new THREE.Mesh(geoWood, matWood);

        wood.overdraw = true;
        wood.castShadow = true;
        scene.add(wood);
        wood.position.set(24, 32, 0)
        //------------------------------END SPHERES----------------------------------

        //----------------------------CURVE PATH------------------------------------
        const createBezierCurve = (a, b, c, d) => {
            const curve = new THREE.CubicBezierCurve3(
                new THREE.Vector3(a.x, a.y, a.z), //starting point
                new THREE.Vector3(b.x, b.y, b.z),//control points, both
                new THREE.Vector3(c.x, c.y, c.z),//of these are necessary
                new THREE.Vector3(d.x, d.y, d.z), //ending point
            );
            const points = curve.getPoints(1256);

            return points
        }

        const pointsEarthOutside = createBezierCurve(
            { x: 0, y: -40, z: 0 },
            { x: 0, y: -30, z: 30 },
            { x: 0, y: -30, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsEarthInside = createBezierCurve(
            { x: 0, y: -40, z: 0 },
            { x: 0, y: 10, z: 30 },
            { x: 0, y: 10, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsFireOutside = createBezierCurve(
            { x: 38, y: -12, z: 0 },
            { x: 29, y: -9, z: 30 },
            { x: 29, y: -9, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsFireInside = createBezierCurve(
            { x: 38, y: -12, z: 0 },
            { x: -10, y: 3, z: 30 },
            { x: -10, y: 3, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsWoodOutside = createBezierCurve(
            { x: 24, y: 32, z: 0 },
            { x: 18, y: 24, z: 30 },
            { x: 18, y: 24, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsWoodInside = createBezierCurve(
            { x: 24, y: 32, z: 0 },
            { x: -6, y: -8, z: 30 },
            { x: -6, y: -8, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsWaterOutside = createBezierCurve(
            { x: -24, y: 32, z: 0 },
            { x: -18, y: 24, z: 30 },
            { x: -18, y: 24, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsWaterInside = createBezierCurve(
            { x: -24, y: 32, z: 0 },
            { x: 6, y: -8, z: 30 },
            { x: 6, y: -8, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsMetalOutside = createBezierCurve(
            { x: -38, y: -12, z: 0 },
            { x: -29, y: -9, z: 30 },
            { x: -29, y: -9, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsMetalInside = createBezierCurve(
            { x: -38, y: -12, z: 0 },
            { x: 10, y: 3, z: 30 },
            { x: 10, y: 3, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        this.pointsEarthOutside = pointsEarthOutside;
        this.pointsEarthInside = pointsEarthInside;
        this.pointsWoodOutside = pointsWoodOutside;
        this.pointsWoodInside = pointsWoodInside;
        this.pointsFireOutside = pointsFireOutside;
        this.pointsFireInside = pointsFireInside;
        this.pointsWaterOutside = pointsWaterOutside;
        this.pointsWaterInside = pointsWaterInside;
        this.pointsMetalOutside = pointsMetalOutside;
        this.pointsMetalInside = pointsMetalInside;

        //---------------------END CURVE PATH------------------------------------


        renderer.setClearColor('#112233');
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.background = background;

        this.clouds1 = clouds1;
        this.clouds2 = clouds2;

        this.yinYang = yinYang;
        this.earth = earth;
        this.fire = fire;
        this.metal = metal;
        this.water = water;
        this.wood = wood;

        this.mount.appendChild(this.renderer.domElement)
        this.start()
        // this.moveSphereForward(this.pointsMetalOutside, this.pointsMetalInside, this.metal)
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
            console.log('frame id is:', this.frameId);
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    animate() {
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
        this.camera.rotation.z -= .0004;
        this.clouds1.rotation.y += .001;
        this.clouds2.rotation.y += .001;

        this.yinYang.rotation.y += 0.00;
        this.earth.rotation.y += 0.001;
        this.fire.rotation.y += 0.001;
        this.metal.rotation.y += 0.001;
        this.water.rotation.y += 0.001;
        this.wood.rotation.y += 0.001;
    }

    speedArchitect = (max, subSteps) => {
        let blueprint = [];
        const speeds = [.01, .02, .04, .07, .12, .15, .18, .15, .12, .07, .04, .02, .01];
        let subSpeeds = speeds.map(speed => speed / subSteps);
        let currentPoint = 0;
        blueprint.push(currentPoint);
        for (let speed of subSpeeds) {
            for (let i = 0; i < subSteps; i++) {
                currentPoint = currentPoint + max * speed;
                blueprint.push(parseInt(currentPoint));
            }
        }
        return blueprint;
    }

    rotateBackground = (numOfSegments) => {
        this.background.rotation.z += (Math.PI/3) / numOfSegments;
    }

    moveSphereForward = (pointsArrayOutside, pointsArrayInside, sphere) => {

        const easedArray = this.speedArchitect(pointsArrayOutside.length, 16)
        if (this.i < easedArray.length - 1 && this.backwards === false) {
            let bPoint = easedArray[this.i];
            let b = pointsArrayOutside[bPoint];
            let ybPoint = easedArray[easedArray.length - (this.i + 1)];
            let yb = pointsArrayInside[ybPoint];
            sphere.position.x = b.x
            sphere.position.y = b.y
            sphere.position.z = b.z
            this.yinYang.position.x = yb.x;
            this.yinYang.position.y = yb.y;
            this.yinYang.position.z = yb.z;

            this.rotateBackground(easedArray.length);
            this.i = this.i + 1;
            requestAnimationFrame(() => this.moveSphereForward(pointsArrayOutside, pointsArrayInside, sphere));
        } else if (this.i === easedArray.length - 1 && this.backwards === false) {
            this.backwards = true;
            sphere.position.x = pointsArrayOutside[pointsArrayOutside.length - 1].x;
            sphere.position.y = pointsArrayOutside[pointsArrayOutside.length - 1].y;
            sphere.position.z = pointsArrayOutside[pointsArrayOutside.length - 1].z;
            this.yinYang.position.x = pointsArrayInside[0].x;
            this.yinYang.position.y = pointsArrayInside[0].y;
            this.yinYang.position.z = pointsArrayInside[0].z;
            this.i--;
            this.moveSphereBack(pointsArrayOutside, pointsArrayInside, sphere);
        }
    }

    moveSphereBack(pointsArrayOutside, pointsArrayInside, sphere) {

        const easedArray = this.speedArchitect(pointsArrayOutside.length, 16)
    
        if (this.i > 0 && this.backwards === true) {
            const bPoint = easedArray[this.i];
            const b = pointsArrayInside[bPoint];
            const ybPoint = easedArray[easedArray.length-(this.i+1)];
            const yb = pointsArrayOutside[ybPoint];
            sphere.position.x = b.x;
            sphere.position.y = b.y;
            sphere.position.z = b.z;
            this.yinYang.position.x = yb.x;
            this.yinYang.position.y = yb.y;
            this.yinYang.position.z = yb.z;
            this.i--;
            requestAnimationFrame(() => this.moveSphereBack(pointsArrayOutside, pointsArrayInside, sphere));
        } else if (this.backwards === true && this.i === 0) {
            this.backwards = false;
            this.counter = this.counter + 1;

            if (this.counter === 1){
            this.moveSphereForward(this.pointsMetalOutside, this.pointsMetalInside, this.metal)
            } else if (this.counter === 2){
            this.moveSphereForward(this.pointsWaterOutside, this.pointsWaterInside, this.water)
            } else if (this.counter === 3) {
            this.moveSphereForward(this.pointsWoodOutside, this.pointsWoodInside, this.wood)
            } else if (this.counter === 4) {
            this.moveSphereForward(this.pointsFireOutside, this.pointsFireInside, this.fire)
            } else if (this.counter === 5) {
            this.counter = 0
            this.moveSphereForward(this.pointsEarthOutside, this.pointsEarthInside, this.earth)
            }
        }
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div ref={(mount) => { this.mount = mount }} className="myCanvas"></div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(Background);