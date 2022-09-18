<template>
    <div class="list-item rounded border border-gray-400 px-2 py-1">
        <h1 class="text-xl font-medium" :class="{'line-through': todo.isDone}">{{todo.title}}</h1>
        <div class="flex items-center gap-x-2">
            <button
                v-if="!todo.isDone"
                @click="onComplete(todo.id)"
                class="btn btn-plain-success">
                <i class="fa-solid fa-check"></i>
            </button>
            <button
                v-else
                @click="onRecover(todo.id)"
                class="btn btn-plain-success">
                <i class="fa-sharp fa-solid fa-repeat"></i>
            </button>
            <button
                @click="onEdit(todo.id)"
                class="btn btn-plain-primary">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button
                @click="onRemove(todo.id)"
                class="btn btn-plain-error">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['onRemove', 'onEdit', 'onComplete', 'onRecover'],
    props: {
        todo: {
            type: Object,
            required: true
        },
        
    },
    methods: {
        onComplete(id: number) {
            this.$emit('onComplete', id)
        },
        onEdit(id: number) {
            this.$emit('onEdit', id)
        },
        onRemove(id: number) {
            this.$emit('onRemove', id)
        },
        onRecover(id: number) {
            this.$emit('onRecover', id)
        },
    }
})
</script>

<style scoped lang="scss">
    .list-item {
        display: grid;
        grid-template-columns: 1fr auto;
        column-gap: 12px;
        align-items: center;
    }
</style>