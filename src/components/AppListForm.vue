<template>
    <Form ref="form" @submit="addItem" class="list-form" data-test="form">
        <Field v-model="title" type="text" name="title" :rules="validateEmail" v-slot="{ field, errorMessage }" >
            <div class="flex flex-col">
                <input v-bind="field" placeholder="What needs to be done" class="app-input" :class="{'app-input-error': errorMessage}" data-test="form-input">
                <span class="error-text">{{errorMessage}}</span>
            </div>
        </Field>
        <button
            type="submit"
            data-test="submit-button"
            class="btn btn-plain-primary">
            Add Item
        </button>
    </Form>
</template>

<script lang="ts">
import { Field, ErrorMessage, Form } from 'vee-validate';
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['onAddItem'],
    data() {
        return {
            title: ''
        }
    },
    components: {
        Field,
        ErrorMessage,
        Form
    },
    methods: {
        addItem(value: any) {
            if ('title' in value) {
                
                this.$emit('onAddItem', value.title);
                (this.$refs as any)?.form?.resetForm()
            }
        },
        validateEmail(value: any) {
            if (!value) {
                return 'This field is required';
            }
            
            return true;
        },
    }
})
</script>

<style scoped lang="scss">
    .list-form {
        display: grid;
        grid-template-columns: 1fr auto;
        column-gap: 12px;
        align-items: flex-start;
    }
</style>