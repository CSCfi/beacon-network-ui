import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import BasicSearch from "@/components/BasicSearch.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
const elem = document.createElement("div");
if (document.body) {
  document.body.appendChild(elem);
}
const wrapper = mount(BasicSearch, {
  localVue,
  router,
  attachTo: elem,
});
describe("Example search", () => {
  it("Can fill the form and do a search", async () => {
    const buttonExample = wrapper.find("[data-testid=exampleButton]");
    const buttonSearch = wrapper.find("[data-testid=searchButton]");

    const searchBar = wrapper.find("[data-testid=testBar]");
    expect(searchBar.exists()).toBe(true);
    expect(buttonExample.exists()).toBe(true);
    expect(buttonSearch.exists()).toBe(true);
    buttonExample.trigger("click");
    await wrapper.vm.$nextTick();
    buttonSearch.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe(
      "/results?searchType=basic&includeDatasetResponses=HIT&assemblyId=GRCh38&referenceName=MT&start=9&referenceBases=T&alternateBases=C"
    );
  });
});
