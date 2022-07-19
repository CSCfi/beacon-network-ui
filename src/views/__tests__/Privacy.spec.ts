import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Privacy from "@/views/PrivacyPage.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const wrapper = mount(Privacy, {
  localVue,
  router,
});

describe("Privacy.vue", () => {
  it('"Return button works', async () => {
    const returnButton = wrapper.find("[data-testid=returnButton]");

    expect(returnButton.exists()).toBe(true);
    returnButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/");
  });
});
