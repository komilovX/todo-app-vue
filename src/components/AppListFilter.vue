<template>
    <div class="list-filter">
        <input
            @input="onInputChange($event)" type="text" placeholder="type to search" class="app-input" />
        <div class="btn-group" data-test="filter-buttons">
            <button
                @click="changeActiveButton('all')"
                class="btn"
                :class="[activeButton === 'all' ? 'btn-primary' : 'btn-plain-primary']"
                data-test="all-button">
                All
            </button>
            <button
                @click="changeActiveButton('active')"
                class="btn"
                :class="[activeButton === 'active' ? 'btn-primary' : 'btn-plain-primary']"
                data-test="active-button">
                Active
            </button>
            <button
                @click="changeActiveButton('done')"
                class="btn"
                :class="[activeButton === 'done' ? 'btn-primary' : 'btn-plain-primary']"
                data-test="done-button">
                Done
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export type ButtonType = 'all' | 'active' | 'done'
export default defineComponent({
    emits: ['onListTypeChange', 'input'],
    data: () => ({
        activeButton: 'all' as ButtonType
    }),
    methods: {
        changeActiveButton(button: ButtonType) {
            this.activeButton = button
            this.$emit('onListTypeChange', button)
        },
        onInputChange(event: any) {
            this.$emit('input', event.target.value)
        }
    }
})
</script>

<style scoped lang="scss">
    .list-filter{
        display: grid;
        grid-template-columns: 1fr auto;
        column-gap: 12px;
    }
    .btn-group {
        .btn {
            border-radius: 0;
        }
    }
    .btn:not(:last-child) {
        border-right: none!important;
    }
</style>