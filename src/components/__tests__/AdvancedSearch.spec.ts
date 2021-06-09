import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import AdvancedSearch from '@/components/AdvancedSearch.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

const wrapper = mount(AdvancedSearch, {
  localVue,
  router
})
describe('AdvancedSearch.vue', () => {
    it('Example search works', async () => {
     const buttonExample = wrapper.find('#exampleButton');
     const buttonSearch = wrapper.find('#searchButton');
     
     expect(buttonExample.exists()).toBe(true)
     expect(buttonSearch.exists()).toBe(true) 
     
     buttonExample.trigger('click');
     await wrapper.vm.$nextTick();
     buttonSearch.trigger('click');
     await wrapper.vm.$nextTick();
     
     expect(wrapper.vm.$route.fullPath).toBe("/results?searchType=advanced&coordType=range&includeDatasetResponses=HIT&assemblyId=GRCh38&referenceName=MT&referenceBases=TTACTAAAGT&startMin=189&startMax=199&endMin=199&endMax=209&variantType=MNP") 
    })
    
  })
  