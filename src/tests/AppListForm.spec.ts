import { mount } from '@vue/test-utils';
import AppListForm from '../../src/components/AppListForm.vue';

describe('AppListForm.vue', () => {
  it('insert new todo', (done) => {
    const wrapper = mount(AppListForm);
    const todoTitle = 'New todo';
    wrapper.find('[data-test="form-input"]').setValue(todoTitle);
    wrapper.get('[data-test="submit-button"]').trigger('submit');
    
    setTimeout(async () => {
      const title = (wrapper.emitted()['onAddItem'] as any)[0][0];
      expect(title).toBe(todoTitle);
      
      done();
    }, 550)
    
  })
})
