export class SupplyCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    cleanSupplyTerms(arr) {
        return arr.filter(item => item !== false && item !== undefined && item !== '' && item !== 0 && item !== null);
    }

    checkSupplyCompatibility(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const countMap = new Map();
        for (let item of arr1) {
            countMap.set(item, (countMap.get(item) || 0) + 1);
        }
        for (let item of arr2) {
            if (!countMap.has(item)) return false;
            let count = countMap.get(item);
            if (count === 1) countMap.delete(item);
            else countMap.set(item, count - 1);
        }
        return countMap.size === 0;
    }

    getHTML(data) {
        const rawTerms = [data.title.split(' ')[0], "", null, "Надежный", false, 0, undefined];
        const cleanTerms = this.cleanSupplyTerms(rawTerms);

        const standardJitTerms = ["Надежный", cleanTerms[0]];
        const isCompatible = this.checkSupplyCompatibility(cleanTerms, standardJitTerms);

        const badgesHtml = cleanTerms.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('');
        const compatibilityBadge = isCompatible
            ? `<span class="badge bg-success mt-2">Соответствует JIT</span>`
            : `<span class="badge bg-warning text-dark mt-2">Требует проверки</span>`;

        return (
            `
            <div class="col d-flex justify-content-center">
                <div class="card h-100 w-100" style="max-width: 300px;">
                    <img class="card-img-top" src="${data.src}" alt="Поставщик" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" style="color: #1937FF; font-weight: bold;">${data.title}</h5>
                        <div class="mb-2">
                            ${badgesHtml}<br>${compatibilityBadge}
                        </div>
                        <p class="card-text">${data.text}</p>
                        <h6 class="mt-auto">Условия: ${data.deliveryTerms}</h6>
                        <h6 class="mb-3">Мин. партия: ${data.minBatch} шт.</h6>

                        <button class="btn btn-primary btn-sm w-100 mb-2" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary btn-sm w-50" id="edit-card-${data.id}" data-id="${data.id}">Редактировать</button>
                            <button class="btn btn-outline-danger btn-sm w-50" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    }

    addListeners(data, clickListener, editListener, deleteListener) {
        document.getElementById(`click-card-${data.id}`).addEventListener("click", clickListener);
        document.getElementById(`edit-card-${data.id}`).addEventListener("click", editListener);
        document.getElementById(`delete-card-${data.id}`).addEventListener("click", deleteListener);
    }

    render(data, clickListener, editListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, clickListener, editListener, deleteListener);
    }
}
