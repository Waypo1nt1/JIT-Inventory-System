import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class SupplyPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.camera = null;
        this.controls = null;
    }

    getData() {
        const allData = [
            { id: 1, src: "https://placehold.co/600x400/eaf1f8/1937FF?text=Zavod+PromStal", title: "Завод ПромСталь", text: "Надежный поставщик листового металла и арматуры.", minBatch: 500, deliveryTerms: "FOB (Доставка до порта)", modelUrl: "models/Truck.glb" },
            { id: 2, src: "https://placehold.co/600x400/eaf1f8/1937FF?text=OOO+TechnoDetal", title: "ООО ТехноДеталь", text: "Производство крепежных элементов и метизов по ГОСТ.", minBatch: 1000, deliveryTerms: "EXW (Самовывоз со склада)", modelUrl: "models/Pallet.glb" },
            { id: 3, src: "https://placehold.co/600x400/eaf1f8/1937FF?text=Global+Plastics", title: "Global Plastics", text: "Поставки промышленного пластика и полимеров.", minBatch: 250, deliveryTerms: "DDP (Доставка с оплатой пошлин)", modelUrl: "models/Truck.glb" },
            { id: 4, src: "https://placehold.co/600x400/eaf1f8/1937FF?text=SibMet+Holding", title: "СибМет Холдинг", text: "Крупнейший сибирский дистрибьютор цветных сплавов.", minBatch: 2000, deliveryTerms: "FCA (Франко-перевозчик)", modelUrl: "models/Pallet.glb" },
            { id: 5, src: "https://placehold.co/600x400/eaf1f8/1937FF?text=AutoGlass+Pro", title: "AutoGlass Pro", text: "Специализированное автомобильное стекло для сборочных линий.", minBatch: 100, deliveryTerms: "CIF (Стоимость и фрахт)", modelUrl: "models/Truck.glb" }
        ];
        return allData.find(item => item.id == this.id);
    }

    mergeRequestOptions(...objects) {
        const result = {};
        for (let obj of objects) {
            for (let key in obj) {
                if (!(key in result)) {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    }

    getHTML(data, finalRequest) {
        return (
            `
            <div class="container mt-4">
                <div id="supply-page" class="d-flex flex-column align-items-center">
                    <div class="card mb-3 shadow-lg w-100" style="max-width: 1000px; border: 2px solid #E31836;">
                        <div class="row g-0">
                            <div class="col-md-7 d-flex flex-column" style="background: #e6ebf5; position: relative;">
                                <canvas id="viewer-canvas" style="width: 100%; height: 400px; display: block;"></canvas>

                                <div class="d-flex justify-content-center p-2 bg-light border-top">
                                    <div class="btn-group me-3" role="group">
                                        <button id="zoom-in" class="btn btn-outline-primary btn-sm">+</button>
                                        <button id="zoom-out" class="btn btn-outline-primary btn-sm">-</button>
                                    </div>
                                    <div class="btn-group" role="group">
                                        <button id="view-front" class="btn btn-outline-secondary btn-sm">Спереди</button>
                                        <button id="view-back" class="btn btn-outline-secondary btn-sm">Сзади</button>
                                        <button id="view-left" class="btn btn-outline-secondary btn-sm">Слева</button>
                                        <button id="view-right" class="btn btn-outline-secondary btn-sm">Справа</button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-5">
                                <div class="card-body d-flex flex-column h-100">
                                    <h3 id="model-title" class="card-title" style="color: #1937FF; font-weight: bold;">${data.title}</h3>
                                    <p class="card-text">${data.text}</p>

                                    <div class="mt-4 p-3 border rounded" style="background-color: #eaf1f8;">
                                        <h5>Сформированная Заявка (JIT):</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li><b>Завод-получатель:</b> ${finalRequest.factoryLine}</li>
                                            <li><b>Объем заказа:</b> ${finalRequest.orderVolume} шт.</li>
                                            <li><b>Условия поставки:</b> ${finalRequest.deliveryTerms}</li>
                                            <li><b>Доставка:</b> ${finalRequest.urgency}</li>
                                        </ul>
                                    </div>

                                    <div class="mt-auto pt-3">
                                        <button class="btn btn-primary btn-lg w-100">Оформить заявку</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    renderModel(modelUrl) {
        const canvas = document.getElementById('viewer-canvas');
        if (!canvas) return;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xe6ebf5);

        this.camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 2, 5);

        this.controls = new OrbitControls(this.camera, renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.target.set(0, 1, 0);

        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
        dirLight.position.set(4, 10, 8);
        scene.add(dirLight);

        const loader = new GLTFLoader();

        const fallbackGeom = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const fallbackMat = new THREE.MeshStandardMaterial({ color: 0xE31836 });
        const cube = new THREE.Mesh(fallbackGeom, fallbackMat);
        cube.position.y = 0.75;

        if (modelUrl) {
            loader.load(
                modelUrl,
                (gltf) => {
                    const model = gltf.scene;
                    scene.add(model);
                },
                undefined,
                (error) => {
                    console.error('Ошибка загрузки модели:', error);
                    scene.add(cube);
                }
            );
        } else {
            scene.add(cube);
        }

        document.getElementById('zoom-in').onclick = () => {
            const vec = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
            this.camera.position.addScaledVector(vec, -0.5);
            this.controls.update();
        };
        document.getElementById('zoom-out').onclick = () => {
            const vec = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
            this.camera.position.addScaledVector(vec, 0.5);
            this.controls.update();
        };

        const distance = () => this.camera.position.distanceTo(this.controls.target);

        const setCameraDirection = (dir) => {
            const d = distance();
            let x = 0, y = 2, z = 0;
            if (dir === "front") { x = 0; z = d; }
            if (dir === "back") { x = 0; z = -d; }
            if (dir === "left") { x = -d; z = 0; }
            if (dir === "right") { x = d; z = 0; }
            this.camera.position.set(x, y, z);
            this.controls.target.set(0, 1, 0);
            this.controls.update();
        };

        document.getElementById('view-front').onclick = () => setCameraDirection('front');
        document.getElementById('view-back').onclick = () => setCameraDirection('back');
        document.getElementById('view-left').onclick = () => setCameraDirection('left');
        document.getElementById('view-right').onclick = () => setCameraDirection('right');

        const resizeRendererToDisplaySize = () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
            }
            return needResize;
        };

        const animate = () => {
            requestAnimationFrame(animate);
            this.controls.update();
            renderer.render(scene, this.camera);
        };

        animate();
        window.addEventListener('resize', resizeRendererToDisplaySize);
    }

    render() {
        this.parent.innerHTML = '';
        const data = this.getData();

        const myFactoryNeeds = { orderVolume: 2500, factoryLine: "Цех сборки №2", urgency: "Точно-в-срок (JIT)" };
        const supplierBaseConfig = { orderVolume: data.minBatch, deliveryTerms: data.deliveryTerms };

        const finalRequest = this.mergeRequestOptions(supplierBaseConfig, myFactoryNeeds);

        const html = this.getHTML(data, finalRequest);
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(document.getElementById('supply-page'));
        backButton.render(this.clickBack.bind(this));

        setTimeout(() => this.renderModel(data.modelUrl), 0);
    }
}
