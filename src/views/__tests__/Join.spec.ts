import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Join from '@/views/Join.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

const wrapper = mount(Join, {
    localVue,
    router
})

describe('Join.vue', () => {
    it('"Return button works', async () => {
     const returnButton = wrapper.find('#returnButton');
  
     expect(returnButton.exists()).toBe(true)
     returnButton.trigger('click');
     await wrapper.vm.$nextTick();
     expect(wrapper.vm.$route.fullPath).toBe("/") 
    })
})