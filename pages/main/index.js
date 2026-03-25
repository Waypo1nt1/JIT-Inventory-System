import { ServiceCardComponent } from "../../components/service-card/index.js";
import { ServicePage } from "../service/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://placehold.co/600x400/eaf1f8/1937FF?text=Cross-Docking", 
                title: "Кросс-докинг",
                text: "Прямая перегрузка товара без долгосрочного хранения. Идеально для JIT.",
                price: 15000,
                modelUrl: "models/Truck.glb" 
            },
            {
                id: 2,
                src: "https://placehold.co/600x400/eaf1f8/1937FF?text=Customs+Clearance",
                title: "Таможенное оформление",
                text: "Быстрая очистка грузов для бесперебойных международных поставок.",
                price: 25000,
                modelUrl: "models/Pallet.glb"
            },
            {
                id: 3,
                src: "https://placehold.co/600x400/eaf1f8/1937FF?text=JIT+Delivery",
                title: "JIT-Доставка",
                text: "Точная доставка к определенному часу прямо на конвейер производства.",
                price: 30000,
                modelUrl: "models/Truck.glb"
            },
            {
                id: 4,
                src: "https://placehold.co/600x400/eaf1f8/1937FF?text=Inventory+Audit",
                title: "Аудит запасов",
                text: "Проверка оборачиваемости товаров и оптимизация складских остатков.",
                price: 10000,
                modelUrl: "models/Pallet.glb"
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
                <h2 class="text-center mb-4" style="color: #1937FF; font-weight: bold; border-bottom: 2px solid #E31836; padding-bottom: 10px;">Каталог логистических услуг</h2>
                
                <div class="row mb-4">
                    <div class="col-md-8 offset-md-2 d-flex">
                        <input type="text" id="search-input" class="form-control me-2" placeholder="Введите название услуги...">
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
        const servicePage = new ServicePage(this.parent, cardId);
        servicePage.render();
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
            const card = new ServiceCardComponent(this.pageRoot);
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