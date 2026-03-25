import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { WarehouseDetailsComponent } from "../../components/warehouse-details/index.js";

export class WarehousePage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const allData = [
            { id: 1, src: "https://placehold.co/600x400/eaf1f8/1937FF?text=Moscow+Hub", title: "Главный склад (Москва)", text: "Центральный узел распределения. Обеспечивает логистику по всему центральному региону с использованием технологии Just-In-Time." },
            { id: 2, src: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop", title: "Резервный склад (СПб)", text: "Северо-западный хаб. Разгрузка портовых поставок и обеспечение бесперебойной цепочки снабжения." },
            { id: 3, src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop", title: "Транзитный пункт (Казань)", text: "Поволжский сортировочный центр. Оптимизация JIT-поставок на Урал и в Сибирь." },
        ];
        
        return allData.find(item => item.id == this.id);
    }

    get pageRoot() {
        return document.getElementById('warehouse-page');
    }

    getHTML() {
        return (
            `
            <div class="container mt-4">
                <div id="warehouse-page" class="d-flex flex-column align-items-center"></div>
            </div>
            `
        );
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const details = new WarehouseDetailsComponent(this.pageRoot);
        details.render(data);
    }
}