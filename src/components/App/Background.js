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
        const geoBackground = new THREE.PlaneBufferGeometry(200, 200, 32);
        const matBackground = new THREE.MeshBasicMaterial({ color: 0xC0DFDF });
        const background = new THREE.Mesh(geoBackground, matBackground);
        background.receiveShadow = true;
        background.position.z = -20;
        scene.add(background);

        //------------------------------CLOUDS----------------------------------
        //clouds
        //Remember, you need a server for images to be loaded!
        const textureClouds = new THREE.TextureLoader().load('./images/clouds5.jpg');

        const geoClouds = new THREE.SphereGeometry(80, 100, 100);
        const matClouds = new THREE.MeshPhongMaterial({ alphaMap: textureClouds });
        const clouds1 = new THREE.Mesh(geoClouds, matClouds);
        matClouds.transparent = true

        const textureClouds2 = new THREE.TextureLoader().load('./images/clouds2.jpg');

        const geoClouds2 = new THREE.SphereGeometry(110, 100, 100);
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
        yinYang.position.set(0, 0, 90);

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
        fire.position.set(24, 32, 0)

        const textureWood = new THREE.TextureLoader().load(require('./images/wood.jpg'));

        const geoWood = new THREE.SphereGeometry(10, 100, 100);
        const matWood = new THREE.MeshPhongMaterial({ map: textureWood, bumpMap: textureWood });
        const wood = new THREE.Mesh(geoWood, matWood);

        wood.overdraw = true;
        wood.castShadow = true;
        scene.add(wood);
        wood.position.set(38, -12, 0)
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

        const pointsWoodOutside = createBezierCurve(
            { x: 38, y: -12, z: 0 },
            { x: 29, y: -9, z: 30 },
            { x: 29, y: -9, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsWoodInside = createBezierCurve(
            { x: 38, y: -12, z: 0 },
            { x: -10, y: 3, z: 30 },
            { x: -10, y: 3, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsFireOutside = createBezierCurve(
            { x: 24, y: 32, z: 0 },
            { x: 18, y: 24, z: 30 },
            { x: 18, y: 24, z: 70 },
            { x: 0, y: 0, z: 120 },
        )

        const pointsFireInside = createBezierCurve(
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
        //---------------------END CURVE PATH------------------------------------


        renderer.setClearColor('#112233');
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

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
        this.moveSphereForward(this.pointsEarthOutside, this.pointsEarthInside, this.earth)
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
        this.clouds1.rotation.y += .002;
        this.clouds2.rotation.y += .002;

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

    moveSphereForward = (pointsArrayOutside, pointsArrayInside, sphere) => {

        const easedArray = this.speedArchitect(pointsArrayOutside.length, 16)
        console.log('hello', this.i)
        let iplus = this.i
        if (iplus < easedArray.length - 1 && this.backwards === false) {
            let bPoint = easedArray[iplus];
            let b = pointsArrayOutside[bPoint];
            let ybPoint = easedArray[easedArray.length - (iplus + 1)];
            let yb = pointsArrayInside[ybPoint];
            sphere.position.x = b.x
            sphere.position.y = b.y
            sphere.position.z = b.z
            this.yinYang.position.x = yb.x;
            this.yinYang.position.y = yb.y;
            this.yinYang.position.z = yb.z;

            //i is not increasing by 1.
            let iplusplus = iplus +1;

            this.i = iplusplus;

            requestAnimationFrame(() => this.moveSphereForward(pointsArrayOutside, pointsArrayInside, sphere));
        } else if (iplus === easedArray.length - 1 && this.backwards === false) {
            this.backwards = true;
            sphere.position.x = pointsArrayOutside[pointsArrayOutside.length - 1].x;
            sphere.position.y = pointsArrayOutside[pointsArrayOutside.length - 1].y;
            sphere.position.z = pointsArrayOutside[pointsArrayOutside.length - 1].z;
            this.yinYang.position.x = pointsArrayInside[0].x;
            this.yinYang.position.y = pointsArrayInside[0].y;
            this.yinYang.position.z = pointsArrayInside[0].z;
            iplus--;
            // this.moveSphereBack(pointsArrayOutside, pointsArrayInside, sphere);
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