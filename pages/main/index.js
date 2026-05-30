import { SupplyCardComponent } from "../../components/supply-card/index.js";
import { SupplyPage } from "../supply/index.js";
import { SupplyEditPage } from "../supply-edit/index.js";
import { ajax } from "../../modules/ajax.js";
import { supplyUrls } from "../../modules/supplyUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [];
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

    clickEdit(e) {
        const cardId = e.target.dataset.id;
        const editPage = new SupplyEditPage(this.parent, cardId);
        editPage.render();
    }

    clickDelete(e) {
        const cardId = e.target.dataset.id;
        ajax.delete(supplyUrls.deleteSupplyById(cardId), (data, status) => {
            if (status === 204 || status === 200) {
                this.loadSupplies();
            } else {
                console.error("Ошибка при удалении", status);
            }
        });
    }

    renderData(items) {
        if (!this.pageRoot) return;
        this.pageRoot.innerHTML = '';
        items.forEach((item) => {
            const card = new SupplyCardComponent(this.pageRoot);
            card.render(
                item,
                this.clickCard.bind(this),
                this.clickEdit.bind(this),
                this.clickDelete.bind(this)
            );
        });
    }

    loadSupplies(query = '') {
        ajax.get(supplyUrls.getSupplies(query), (data, status) => {
            if (status === 200) {
                this.renderData(data);
            } else {
                console.error("Ошибка при загрузке данных", status);
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.loadSupplies();

        document.getElementById('search-btn').addEventListener('click', () => {
            const query = document.getElementById('search-input').value;
            this.loadSupplies(query);
        });
    }
}
