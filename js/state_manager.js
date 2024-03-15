/** Simple State Manager (Redux-like) */
class Store {
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = initialState;
        this.listeners = [];
    }
    getState() { return this.state; }
    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(l => l(this.state));
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return () => { this.listeners = this.listeners.filter(l => l !== listener); };
    }
}

const initialState = { count: 0, user: null, todos: [] };
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT': return { ...state, count: state.count + 1 };
        case 'DECREMENT': return { ...state, count: state.count - 1 };
        case 'SET_USER': return { ...state, user: action.payload };
        case 'ADD_TODO': return { ...state, todos: [...state.todos, action.payload] };
        default: return state;
    }
}

const store = new Store(reducer, initialState);
store.subscribe(state => console.log('State updated:', state));
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'SET_USER', payload: { name: 'Zhihao' } });
