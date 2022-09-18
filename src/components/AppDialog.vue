<template>
    <div class="dialog-wrapper">
        <div class="dialog-container">
            <div class="flex items-center justify-between mb-2">
                <h1 class="text-2xl">{{title}}</h1>
                <i @click="$emit('close')" class="fa-solid fa-xmark cursor-pointer"></i>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['title'],
    emits: ['close']
})
</script>

<style scoped lang="scss">
    .dialog-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(1,1,1, 0.4);
    }
    .dialog-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 600px;
        padding: 12px;
        background: #fff;
        border-radius: 12px;
        padding: 1.2rem;
    }
</style>