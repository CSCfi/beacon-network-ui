import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Footer from "@/components/Footer.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const wrapper = mount(Footer, {
  localVue,
  router,
});

describe("Footer.vue internal links", () => {
  it('"How to use Beacon Network" router-link works', async () => {
    const link = wrapper.find("[data-testid=quide]");

    expect(link.exists()).toBe(true);
    link.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/guide");
  });
  it('"Join the Network" router-link works', async () => {
    const link = wrapper.find("[data-testid=join]");

    expect(link.exists()).toBe(true);
    link.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/join");
  });
  it('"For Developers" router-link works', async () => {
    const link = wrapper.find("[data-testid=docs]");

    expect(link.exists()).toBe(true);
    link.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/docs");
  });
  it('"API Documentation" router-link works', async () => {
    const link = wrapper.find("[data-testid=apiDocs]");

    expect(link.exists()).toBe(true);
    link.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/docsapi");
  });
  it('"Accessibility Statement" router-link works', async () => {
    const link = wrapper.find("[data-testid=accessibility]");

    expect(link.exists()).toBe(true);
    link.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/accessibility");
  });
});
describe("Footer.vue external links", () => {
  // External links cannot be viewed and therefore these just check the href value
  it('"Beacon Project" router-link works', async () => {
    expect(wrapper.find("[data-testid=beaconProject]").attributes().href).toBe(
      "https://beacon-project.io/"
    );
  });
  it('"ELIXIR Europe" router-link works', async () => {
    expect(wrapper.find("[data-testid=elixirSite]").attributes().href).toBe(
      "https://elixir-europe.org/"
    );
  });
  it('"GA4GH" router-link works', async () => {
    expect(wrapper.find("[data-testid=ga4gh]").attributes().href).toBe(
      "https://www.ga4gh.org/"
    );
  });
  it('"GA4GH Discovery" router-link works', async () => {
    expect(wrapper.find("[data-testid=ga4ghDiscovery]").attributes().href).toBe(
      "https://ga4gh-discovery.github.io/"
    );
  });
});
