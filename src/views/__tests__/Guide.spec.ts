import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Guide from "@/views/GuidePage.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe("Guide.vue", () => {
  it('"Return button works', async () => {
    const wrapper = mount(Guide, {
      localVue,
      router,
    });
    const returnButton = wrapper.find("[data-testid=returnButton]");
    expect(returnButton.exists()).toBe(true);
    returnButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/");
    wrapper.destroy();
  });
  it("First test button works", async () => {
    const wrapper = mount(Guide, {
      localVue,
      router,
    });
    const testButton1 = wrapper.find("[data-testid=testButton1]");
    expect(testButton1.exists()).toBe(true);
    testButton1.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe(
      "/results?includeDatasetResponses=HIT&assemblyId=GRCh38&referenceName=1&start=104431389&referenceBases=C&variantType=INS"
    );
    wrapper.destroy();
  });
  it("Second test button works", async () => {
    const wrapper = mount(Guide, {
      localVue,
      router,
    });
    const testButton2 = wrapper.find("[data-testid=testButton2]");
    expect(testButton2.exists()).toBe(true);
    testButton2.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe(
      "/results?includeDatasetResponses=HIT&assemblyId=GRCh38&referenceName=MT&start=7599&referenceBases=G&alternateBases=A"
    );
    wrapper.destroy();
  });
  it("Third test button works", async () => {
    const wrapper = mount(Guide, {
      localVue,
      router,
    });
    const testButton3 = wrapper.find("[data-testid=testButton3]");
    expect(testButton3.exists()).toBe(true);
    testButton3.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe(
      "/results?includeDatasetResponses=HIT&assemblyId=GRCh38&referenceName=MT&start=194&referenceBases=TTACTAAAGT&alternateBases=NNNNNNNNGT"
    );
    wrapper.destroy();
  });
});
