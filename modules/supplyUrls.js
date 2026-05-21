class SupplyUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getSupplies(titleQuery = '') {
        if (titleQuery) {
            return `${this.baseUrl}/supplies?title=${encodeURIComponent(titleQuery)}`;
        }
        return `${this.baseUrl}/supplies`;
    }

    getSupplyById(id) {
        return `${this.baseUrl}/supplies/${id}`;
    }

    createSupply() {
        return `${this.baseUrl}/supplies`;
    }

    deleteSupplyById(id) {
        return `${this.baseUrl}/supplies/${id}`;
    }
}

export const supplyUrls = new SupplyUrls();
