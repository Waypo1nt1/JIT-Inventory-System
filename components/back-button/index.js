export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener);
    }

    getHTML() {
        return (
            `
            <button id="back-button" class="btn mb-3" type="button" style="background-color: #e0e0f2; color: #333; font-weight: bold;">← Вернуться к списку</button>
            `
        );
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}