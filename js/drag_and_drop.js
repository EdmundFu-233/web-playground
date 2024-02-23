/** Drag & Drop Utility */
class DragDrop {
    constructor(container, options = {}) {
        this.container = container;
        this.options = { dragClass: 'dragging', ...options };
        this.init();
    }
    init() {
        this.container.addEventListener('dragstart', (e) => {
            e.target.classList.add(this.options.dragClass);
            e.dataTransfer.setData('text/plain', e.target.id);
        });
        this.container.addEventListener('dragend', (e) => {
            e.target.classList.remove(this.options.dragClass);
        });
        this.container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = this.getDragAfterElement(e.clientY);
            const draggable = document.querySelector('.' + this.options.dragClass);
            if (afterElement) {
                this.container.insertBefore(draggable, afterElement);
            } else {
                this.container.appendChild(draggable);
            }
        });
    }
    getDragAfterElement(y) {
        const elements = [...this.container.querySelectorAll('.draggable:not(.dragging)')];
        return elements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            }
            return closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}
