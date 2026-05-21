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
                <div class="card shadow-lg mx-auto" style="max-width: 600px; border: 2px solid #1937FF;">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">Редактирование поставщика (ID: ${data.id})</h4>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Название поставщика</label>
                            <input type="text" id="edit-title" class="form-control" value="${data.title}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Описание</label>
                            <textarea id="edit-text" class="form-control" rows="3">${data.text}</textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label font-weight-bold">Минимальная партия</label>
                                <input type="number" id="edit-minBatch" class="form-control" value="${data.minBatch}">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label font-weight-bold">Условия доставки</label>
                                <input type="text" id="edit-deliveryTerms" class="form-control" value="${data.deliveryTerms}">
                            </div>
                        </div>

                        <button id="save-btn" class="btn btn-outline-primary w-100 btn-lg mt-2">Сохранить изменения</button>
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

    clickSave() {
        const updatedData = {
            title: document.getElementById('edit-title').value,
            text: document.getElementById('edit-text').value,
            minBatch: Number(document.getElementById('edit-minBatch').value),
            deliveryTerms: document.getElementById('edit-deliveryTerms').value
        };

        ajax.patch(supplyUrls.updateSupplyById(this.id), updatedData, (data, status) => {
            if (status === 200 || status === 204) {
                alert('Данные поставщика успешно обновлены!');
                this.clickBack();
            } else {
                alert('Произошла ошибка при сохранении. Код: ' + status);
                console.error('Ошибка PATCH:', status);
            }
        });
    }

    render() {
        this.parent.innerHTML = '';

        ajax.get(supplyUrls.getSupplyById(this.id), (data, status) => {
            if (status === 200 && data) {
                const html = this.getHTML(data);
                this.parent.insertAdjacentHTML('beforeend', html);

                const backButton = new BackButtonComponent(this.pageRoot);
                backButton.render(this.clickBack.bind(this));

                document.getElementById('save-btn').addEventListener('click', this.clickSave.bind(this));
            } else {
                console.error("Ошибка при загрузки данных для редактирования", status);
            }
        });
    }
}
