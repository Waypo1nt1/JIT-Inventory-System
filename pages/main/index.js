import { SupplyCardComponent } from "../../components/supply-card/index.js";
import { SupplyPage } from "../supply/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://placehold.co/600x400/eaf1f8/1937FF?text=Zavod+PromStal",
                title: "Завод ПромСталь",
                text: "Надежный поставщик листового металла и арматуры.",
                minBatch: 500,
                deliveryTerms: "FOB (Доставка до порта)",
                modelUrl: "models/Truck.glb"
            },
            {
                id: 2,
                src: "https://placehold.co/600x400/eaf1f8/1937FF?text=OOO+TechnoDetal",
                title: "ООО ТехноДеталь",
                text: "Производство крепежных элементов и метизов по ГОСТ.",
                minBatch: 1000,
                deliveryTerms: "EXW (Самовывоз со склада)",
                modelUrl: "models/Pallet.glb"
            },
            {
                id: 3,
                src: "https://placehold.co/600x400/eaf1f8/1937FF?text=Global+Plastics",
                title: "Global Plastics",
                text: "Поставки промышленного пластика и полимеров.",
                minBatch: 250,
                deliveryTerms: "DDP (Доставка с оплатой пошлин)",
                modelUrl: "models/Truck.glb"
            }
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
            <div class="container mt-4">
                <h2 class="text-center mb-4" style="color: #1937FF; font-weight: bold; border-bottom: 2px solid #E31836; padding-bottom: 10px;">Реестр поставщиков JIT</h2>

                <div class="row mb-4">
                    <div class="col-md-8 offset-md-2 d-flex">
                        <input type="text" id="search-input" class="form-control me-2" placeholder="Введите название поставщика...">
                        <button id="search-btn" class="btn btn-primary">Поиск</button>
                    </div>
                </div>

                <div id="main-page" class="row row-cols-1 row-cols-md-3 g-4 justify-content-start"></div>
            </div>
            `
        );
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const supplyPage = new SupplyPage(this.parent, cardId);
        supplyPage.render();
    }

    filterData(query) {
        const allData = this.getData();
        const filteredData = [];
        let tempArray = [...allData];

        if (tempArray.length > 0) {
            do {
                let item = tempArray.shift();

                if (item.title.toLowerCase().includes(query.toLowerCase())) {
                    filteredData.push(item);
                }
            } while (tempArray.length > 0);
        }

        return filteredData;
    }

    renderData(data) {
        this.pageRoot.innerHTML = '';
        data.forEach((item) => {
            const card = new SupplyCardComponent(this.pageRoot);
            card.render(item, this.clickCard.bind(this));
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.renderData(this.getData());

        document.getElementById('search-btn').addEventListener('click', () => {
            const query = document.getElementById('search-input').value;
            const filtered = this.filterData(query);
            this.renderData(filtered);
        });
    }
}
