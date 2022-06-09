import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Home from "@/views/HomePage.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
const elem = document.createElement("div");
if (document.body) {
  document.body.appendChild(elem);
}
const wrapper = mount(Home, {
  localVue,
  router,
  attachTo: elem,
});
describe("Home.vue", () => {
  it("Advance search button in basic search changes form", async () => {
    const advancedSearchButton = wrapper.find("[data-testid=advanced]");
    const initialHtml = wrapper.html();
    advancedSearchButton.trigger("click");
    await wrapper.vm.$nextTick();
    const htmlAfterClick = wrapper.html();
    expect(htmlAfterClick).not.toEqual(initialHtml);
  });
  it("Basic search button in advanced search changes form", async () => {
    const basicSearchButton = wrapper.find("[data-testid=basic]");
    const initialHtml = wrapper.html();
    basicSearchButton.trigger("click");
    await wrapper.vm.$nextTick();
    const htmlAfterClick = wrapper.html();
    expect(htmlAfterClick).not.toEqual(initialHtml);
  });
});
