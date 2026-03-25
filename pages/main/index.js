import { WarehouseCardComponent } from "../../components/warehouse-card/index.js";
import { WarehousePage } from "../warehouse/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://placehold.co/600x400/eaf1f8/1937FF?text=Moscow+Hub", 
                title: "Главный склад (Москва)",
                text: "Центральный узел распределения. JIT-поставки. Вместимость: 10000 паллет."
            },
            {
                id: 2,
                src: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=400&auto=format&fit=crop",
                title: "Резервный склад (СПб)",
                text: "Северо-западный логистический хаб. Вместимость: 5000 паллет."
            },
            {
                id: 3,
                src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400&auto=format&fit=crop",
                title: "Транзитный пункт (Казань)",
                text: "Поволжский сортировочный центр. Вместимость: 3000 паллет."
            },
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
            <div class="container mt-4">
                <h2 class="text-center mb-4" style="color: #1937FF; font-weight: bold; border-bottom: 2px solid #E31836; padding-bottom: 10px;">Система JIT: Активные склады</h2>
                <div id="main-page" class="row row-cols-1 row-cols-md-3 g-4 justify-content-center"></div>
            </div>
            `
        );
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const warehousePage = new WarehousePage(this.parent, cardId);
        warehousePage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const card = new WarehouseCardComponent(this.pageRoot);
            
            card.render(item, this.clickCard.bind(this));
        });
    }
}