export class WarehouseCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="col d-flex justify-content-center">
                <div class="card h-100 w-100" style="max-width: 300px;">
                    <img class="card-img-top" src="${data.src}" alt="Склад" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" style="color: #1937FF; font-weight: bold;">${data.title}</h5>
                        
                        <div class="mb-2">
                            <span class="badge bg-success">В сети</span>
                            <span class="badge bg-primary">JIT-активен</span>
                        </div>
                        
                        <p class="card-text">${data.text}</p>
                        <button class="btn btn-primary mt-auto" id="click-card-${data.id}" data-id="${data.id}">Управление</button>
                    </div>
                </div>
            </div>
            `
        );
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}