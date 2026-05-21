import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { supplyUrls } from "../../modules/supplyUrls.js";

export class SupplyEditPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('supply-edit-page');
    }

    getHTML(data) {
        return (
            `
            <div class="container mt-4" id="supply-edit-page">
                <div class="card shadow-lg mx-auto" style="max-width: 600px; border: 2px solid #E31836;">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">Редактирование поставщика (ID: ${data.id})</h4>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Название поставщика</label>
                            <input type="text" class="form-control" value="${data.title}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Описание</label>
                            <textarea class="form-control" rows="3">${data.text}</textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label font-weight-bold">Минимальная партия</label>
                                <input type="number" class="form-control" value="${data.minBatch}">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label font-weight-bold">Условия доставки</label>
                                <input type="text" class="form-control" value="${data.deliveryTerms}">
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

    render() {
        this.parent.innerHTML = '';

        ajax.get(supplyUrls.getSupplyById(this.id), (data, status) => {
            if (status === 200 && data) {
                const html = this.getHTML(data);
                this.parent.insertAdjacentHTML('beforeend', html);

                const backButton = new BackButtonComponent(this.pageRoot);
                backButton.render(this.clickBack.bind(this));
            } else {
                console.error("Ошибка при загрузке данных для редактирования", status);
            }
        });
    }
}
