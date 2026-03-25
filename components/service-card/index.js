export class ServiceCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    cleanServiceData(arr) {
        return arr.filter(item => item !== false && item !== undefined && item !== '' && item !== 0 && item !== null);
    }

    checkServiceCompatibility(arr1, arr2) {
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
        const rawTags = [data.title.split(' ')[0], "", null, "JIT", false, 0, undefined];

        const cleanTags = this.cleanServiceData(rawTags);
        
        const standardJitTags = ["JIT", cleanTags[0]]; 
        const isCompatible = this.checkServiceCompatibility(cleanTags, standardJitTags);

        const badgesHtml = cleanTags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('');
        const compatibilityBadge = isCompatible 
            ? `<span class="badge bg-success mt-2">100% Совместимо</span>` 
            : `<span class="badge bg-warning text-dark mt-2">Требует настройки</span>`;

        return (
            `
            <div class="col d-flex justify-content-center">
                <div class="card h-100 w-100" style="max-width: 300px;">
                    <img class="card-img-top" src="${data.src}" alt="Услуга" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" style="color: #1937FF; font-weight: bold;">${data.title}</h5>
                        <div class="mb-2">
                            ${badgesHtml}
                            <br>
                            ${compatibilityBadge}
                        </div>
                        <p class="card-text">${data.text}</p>
                        <h6 class="mt-auto mb-3">Цена: ${data.price} ₽</h6>
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                    </div>
                </div>
            </div>
            `
        );
    }

    addListeners(data, listener) {
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}