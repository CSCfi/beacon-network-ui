import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Join from "@/views/JoinPage.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const wrapper = mount(Join, {
  localVue,
  router,
});

describe("Join.vue", () => {
  it("URL input works", async () => {
    const urlInput = wrapper.find("[data-testid=url]");

    expect(urlInput.exists()).toBe(true);
    urlInput.setValue("test");
    await wrapper.vm.$nextTick();
    expect((urlInput.element as HTMLInputElement).value).toBe("test");
  });
  it("apiKey input works", async () => {
    const apiKey = wrapper.find("[data-testid=apiKey]");

    expect(apiKey.exists()).toBe(true);
    apiKey.setValue("test");
    await wrapper.vm.$nextTick();
    expect((apiKey.element as HTMLInputElement).value).toBe("test");
  });
  it('"Return button works', async () => {
    const returnButton = wrapper.find("[data-testid=returnButton]");

    expect(returnButton.exists()).toBe(true);
    returnButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/");
  });
});
