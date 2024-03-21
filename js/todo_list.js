/** Todo List - Vanilla JS */
class TodoApp {
    constructor(container) {
        this.container = container;
        this.tasks = JSON.parse(localStorage.getItem('todos') || '[]');
        this.render();
    }
    addTask(text) {
        this.tasks.push({ id: Date.now(), text, done: false });
        this.save();
        this.render();
    }
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) { task.done = !task.done; this.save(); this.render(); }
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.save(); this.render();
    }
    save() { localStorage.setItem('todos', JSON.stringify(this.tasks)); }
    render() {
        this.container.innerHTML = \`
            <div class="todo-input"><input type="text" id="taskInput" placeholder="Add a task..." />
            <button id="addBtn">Add</button></div>
            <ul class="todo-list">\${this.tasks.map(t => \`
                <li class="\${t.done ? 'done' : ''}">
                    <input type="checkbox" \${t.done ? 'checked' : ''} data-id="\${t.id}" />
                    <span>\${t.text}</span>
                    <button data-id="\${t.id}" class="delete">X</button>
                </li>\`).join('')}</ul>\`;
        this.bindEvents();
    }
    bindEvents() {
        const input = this.container.querySelector('#taskInput');
        this.container.querySelector('#addBtn').onclick = () => {
            if (input.value.trim()) { this.addTask(input.value.trim()); input.value = ''; }
        };
        input.onkeypress = (e) => { if (e.key === 'Enter') this.container.querySelector('#addBtn').click(); };
        this.container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.onchange = () => this.toggleTask(parseInt(cb.dataset.id));
        });
        this.container.querySelectorAll('.delete').forEach(btn => {
            btn.onclick = () => this.deleteTask(parseInt(btn.dataset.id));
        });
    }
}
