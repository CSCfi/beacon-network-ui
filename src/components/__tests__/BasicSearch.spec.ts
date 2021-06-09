import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import BasicSearch from '@/components/BasicSearch.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

const wrapper = mount(BasicSearch, {
  localVue,
  router
})

describe('BasicSearch.vue', () => {
  it('Example search works', async () => {
   const buttonExample = wrapper.find('#exampleButton');
   const buttonSearch = wrapper.find('#searchButton');

   expect(buttonExample.exists()).toBe(true)
   expect(buttonSearch.exists()).toBe(true) 
   buttonExample.trigger('click');
   await wrapper.vm.$nextTick();
   buttonSearch.trigger('click');
   await wrapper.vm.$nextTick();
   expect(wrapper.vm.$route.fullPath).toBe("/results?searchType=basic&includeDatasetResponses=HIT&assemblyId=GRCh38&referenceName=MT&start=9&referenceBases=T&alternateBases=C") 
  })
})
