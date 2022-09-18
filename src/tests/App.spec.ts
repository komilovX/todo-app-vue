import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { useStore } from '../store'

describe('App.vue', () => {
  it('renders inital todo count', () => {
    const wrapper = mount(App);
    
    const todo = wrapper.get('[data-test="title"]');
    
    expect(todo.text()).toBe('Todo List')
  })

  it('renders ptodo title', () => {
    const wrapper = mount(App);
    const todoCount = wrapper.get('[data-test="todo-count"]');
    
    expect(todoCount.text()).toContain('0 more to do, 0 done')
  })
  
  it('check status buttons style', (done) => {
    const wrapper = mount(App);
    const allButton = wrapper.get('[data-test="all-button"]');
    const activeButton = wrapper.get('[data-test="active-button"]');
    const doneButton = wrapper.get('[data-test="done-button"]');
    
    activeButton.trigger('click');

    setTimeout(() => {
      expect(activeButton.classes()).toContain('btn-primary');
      expect(allButton.classes()).not.toContain('btn-primary');
      expect(doneButton.classes()).not.toContain('btn-primary');
      done()
    }, 550)
  })

  // it('insert new todo', (done) => {
  //   const wrapper = mount(App);
  //   const todoTitle = 'New todo';
  //   wrapper.find('[data-test="form-input"]').setValue(todoTitle)
    
  //   const button = wrapper.get('[data-test="submit-button"]')
    
    
  //   button.trigger('click')
    
  //   setTimeout(async () => {
  //     console.log('button', button);
  //     const item = wrapper.find<HTMLInputElement>('[data-test="form-input"]')
  //     console.log('item', item);
  //     // console.log('wrapper', wrapper.html());
      
  //     done()
  //   }, 550)
    
  // })
})
