import { reactive, readonly } from 'vue';
import { ITodo } from './models';

interface State {
    todos: ITodo[]
}

class Store {
    private state: State

    constructor(inital: State) {
        this.state = reactive(inital);
    }
    
    getState() {
        return readonly(this.state)
    }

    getTodos() {
        const todos = localStorage.getItem('todos');
        
        this.state.todos = todos ? JSON.parse(todos) : [];
    }

    addTodo(title: string) {
        const todo: ITodo = {
            id: Math.floor(Math.random() * 1000),
            title,
            isDone: false
        }

        this.state.todos = [...this.state.todos, todo];
        this.updateLocalStorage();
    }

    removeTodo(id: number) {
        this.state.todos = this.state.todos.filter(item => item.id !== id);
        this.updateLocalStorage();
    }

    completeTodo(id: number) {
        const index = this.state.todos.findIndex(item => item.id === id);
        
        if (index > -1) {
            this.state.todos = [
                ...this.state.todos.slice(0, index),
                {
                    ...this.state.todos[index],
                    isDone: true
                },
                ...this.state.todos.slice(index + 1)
            ];
            this.updateLocalStorage();
        }
    }

    recoverTodo(id: number) {
        const index = this.state.todos.findIndex(item => item.id === id);
        
        if (index > -1) {
            this.state.todos = [
                ...this.state.todos.slice(0, index),
                {
                    ...this.state.todos[index],
                    isDone: false
                },
                ...this.state.todos.slice(index + 1)
            ];
            this.updateLocalStorage();
        }
    }

    updateTodo(id: number, title: string) {
        const index = this.state.todos.findIndex(item => item.id === id);
        
        if (index > -1) {
            this.state.todos = [
                ...this.state.todos.slice(0, index),
                {
                    ...this.state.todos[index],
                    title
                },
                ...this.state.todos.slice(index + 1)
            ];
            this.updateLocalStorage();
        }
    }

    private updateLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
}

const store = new Store({
    todos: []
})

export function useStore() {
    return store
}