export class WarehouseDetailsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="card mb-3 shadow-lg" style="max-width: 800px; border: 2px solid #E31836;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}" class="img-fluid rounded-start" alt="Склад" style="width: 100%; height: 300px; object-fit: cover;">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body d-flex flex-column h-100">
                            <h3 class="card-title" style="color: #1937FF; font-weight: bold;">${data.title}</h3>
                            <p class="card-text">${data.text}</p>
                            
                            <div class="mt-auto mb-3">
                                <span class="badge bg-success fs-7">Готов к приему</span>
                                <span class="badge bg-warning text-dark fs-7 ms-2">Загрузка 45%</span>
                            </div>
                            
                            <div>
                                <button class="btn btn-primary">Запросить поставку</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}