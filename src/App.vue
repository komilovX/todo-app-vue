<template>
  <div class="max-w-2xl mx-auto py-4 grid gap-4 relative">
    <div class="flex justify-between items-end">
      <h1 class="text-3xl font-bold" data-test="title">
        Todo List
      </h1>
      <span class="text-sm text-gray-600" data-test="todo-count">
        {{activeTodosCount}} more to do, {{doneTodosCount}} done
      </span>
    </div>
    <AppListFilter @input="onSerch($event)" @onListTypeChange="listTypeChange($event)"/>
    <div v-if="todos.length" class="grid gap-2">
      <AppListItem
        v-for="todo of todos" 
        :key="todo.id" 
        :todo="todo"
        @onEdit="editTodo($event)"
        @onRemove="removeTodo($event)"
        @onComplete="completeTodo($event)"
        @onRecover="recoverTodo($event)"
        data-test="todo-item"
      />
    </div>
    <h1 class="text-xl font-bold" v-else>
      No todos
    </h1>
    <AppListForm @onAddItem="addTodo($event)" />

    <AppDialog title="Edit Todo" v-if="isDialogOpen" @close="isDialogOpen = false">
      <input v-model="selectedTodo.title" type="text" class="app-input" />
      <button
        @click="updateTodo()"
        class="btn btn-plain-success mt-2">
        Update
      </button>
    </AppDialog>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, reactive, ref } from "vue";
  import AppListFilter, { ButtonType } from "./components/AppListFilter.vue";
  import AppListForm from "./components/AppListForm.vue";
  import AppListItem from "./components/AppListItem.vue";
  import AppDialog from "./components/AppDialog.vue";
  import { ITodo } from "./models";

  import { useStore } from './store'

  export default defineComponent({
    components: {
      AppListFilter,
      AppListForm,
      AppListItem,
      AppDialog
    },

    setup() {
      const store = useStore();
      const listType = ref<ButtonType>('all');
      const searchText = ref<string>('');
      const selectedTodo = reactive<Omit<ITodo, 'isDone'>>({ title: '', id: -1});
      const isDialogOpen = ref<boolean>(false);
      

      const allTodos = computed(() => store.getState().todos);
      const activeTodos = computed(() => allTodos.value.filter(item => item.isDone === false));
      const doneTodos = computed(() => allTodos.value.filter(item => item.isDone === true));
      const activeTodosCount = computed(() => activeTodos.value.length);
      const doneTodosCount = computed(() => doneTodos.value.length);
      
      const todos = computed(() => {
        let items: ITodo[] = allTodos.value as ITodo[];

        if (listType.value == 'active') {
          items = activeTodos.value;
        }
        if (listType.value == 'done') {
          items = doneTodos.value;
        }
        if (searchText.value) {
          items = items.filter(item => item.title.toLowerCase().includes(searchText.value.toLowerCase()));
        }
        
        return items;
      })
      
      const addTodo = (title: string) => {
        return store.addTodo(title);
      }

      const removeTodo = (id: number) => {
        return store.removeTodo(id);
      }

      const completeTodo = (id: number) => {
        return store.completeTodo(id);
      }

      const updateTodo = () => {
        store.updateTodo(selectedTodo.id, selectedTodo.title);
        isDialogOpen.value = false
      }

      const onSerch = (text: string) => {
        searchText.value = text;
      }

      const editTodo = (id: number) => {
        const todo = allTodos.value.find(item => item.id === id);
        if (todo) {
          selectedTodo.id = todo.id
          selectedTodo.title = todo.title
          isDialogOpen.value = true
        }
      }
      
      const recoverTodo = (id: number) => {
        return store.recoverTodo(id);
      }

      const listTypeChange = (buttonType: ButtonType) => {
        listType.value = buttonType;
        searchText.value = '';
      }

      onMounted(() => {
        store.getTodos();
      })
      
      return { 
        todos,
        activeTodosCount,
        doneTodosCount,
        searchText,
        isDialogOpen,
        selectedTodo,
        updateTodo,
        recoverTodo,
        onSerch,
        listTypeChange,
        addTodo,
        removeTodo,
        completeTodo,
        editTodo
      }
    }
  })
</script>