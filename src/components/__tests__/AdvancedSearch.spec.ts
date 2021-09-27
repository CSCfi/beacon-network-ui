import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import AdvancedSearch from "@/components/AdvancedSearch.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
const elem = document.createElement("div");
if (document.body) {
  document.body.appendChild(elem);
}

describe("AdvancedSearch.vue Example search", () => {
  const wrapper = mount(AdvancedSearch, {
    localVue,
    router,
    attachTo: elem,
  });
  it("Search works", async () => {
    const buttonExample = wrapper.find("[data-testid=exampleButton]");
    const buttonSearch = wrapper.find("[data-testid=searchTest]");

    expect(buttonExample.exists()).toBe(true);
    expect(buttonSearch.exists()).toBe(true);

    buttonExample.trigger("click");
    await wrapper.vm.$nextTick();
    buttonSearch.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe(
      "/results?searchType=advanced&coordType=range&includeDatasetResponses=HIT&assemblyId=GRCh38&referenceName=MT&referenceBases=TTACTAAAGT&startMin=189&startMax=199&endMin=199&endMax=209&variantType=MNP"
    );
  });

  it("All inputs exist and are filled correctly", async () => {
    // Varian location inputs
    const assemblyInput = wrapper.find("[data-testid=assemblyInput]");
    const chromosomeOption = wrapper.find(
      "[data-testid=chromosomeOption]:checked"
    );
    const coordType = wrapper.find("[data-testid=coordTypeRange]");
    const minStart = wrapper.find("[data-testid=minStart]");
    const maxStart = wrapper.find("[data-testid=maxStart]");
    const minEnd = wrapper.find("[data-testid=minEnd]");
    const maxEnd = wrapper.find("[data-testid=maxEnd]");

    // Varian transformation inputs

    const referenceBases = wrapper.find("[data-testid=referenceBases]");
    const alternateBases = wrapper.find("[data-testid=alternateBases]");
    const variantOption = wrapper.find("[data-testid=variantOption]:checked");

    expect(assemblyInput.exists()).toBe(true);
    expect(chromosomeOption.exists()).toBe(true);
    expect(coordType.exists()).toBe(true);
    expect(minStart.exists()).toBe(true);
    expect(maxStart.exists()).toBe(true);
    expect(minEnd.exists()).toBe(true);
    expect(maxEnd.exists()).toBe(true);
    expect(referenceBases.exists()).toBe(true);
    expect(alternateBases.exists()).toBe(true);
    expect(variantOption.exists()).toBe(true);

    expect((assemblyInput.element as HTMLInputElement).value).toBe("GRCh38");
    expect(chromosomeOption.attributes().value).toBe("MT");
    expect(variantOption.attributes().value).toBe("MNP");
    // why HTMLInputElement is used -> https://stackoverflow.com/questions/66622773/get-input-value-react-testing-library
    expect((minStart.element as HTMLInputElement).value).toBe("190");
    expect((maxStart.element as HTMLInputElement).value).toBe("200");
    expect((minEnd.element as HTMLInputElement).value).toBe("200");
    expect((maxEnd.element as HTMLInputElement).value).toBe("210");
    expect((referenceBases.element as HTMLInputElement).value).toBe(
      "TTACTAAAGT"
    );
    expect((alternateBases.element as HTMLInputElement).value).toBe("");
  });
  it("Form can be reset", async () => {
    const buttonReset = wrapper.find("[data-testid=resetButton]");
    expect(buttonReset.exists()).toBe(true);
    buttonReset.trigger("click");
    await wrapper.vm.$nextTick();
    // Varian location inputs
    const assemblyInput = wrapper.find("[data-testid=assemblyInput]");
    const chromosomeOption = wrapper.find(
      "[data-testid=chromosomeOption]:checked"
    );
    const coordType = wrapper.find("[data-testid=coordTypeRange]");
    const start = wrapper.find("[data-testid=start]");
    const end = wrapper.find("[data-testid=end]");

    // Varian transformation inputs

    const referenceBases = wrapper.find("[data-testid=referenceBases]");
    const alternateBases = wrapper.find("[data-testid=alternateBases]");
    const variantOption = wrapper.find("[data-testid=variantOption]:checked");

    expect(assemblyInput.exists()).toBe(true);
    expect(chromosomeOption.exists()).toBe(true);
    expect(coordType.exists()).toBe(true);
    expect(start.exists()).toBe(true);
    expect(end.exists()).toBe(true);
    expect(referenceBases.exists()).toBe(true);
    expect(alternateBases.exists()).toBe(true);
    expect(variantOption.exists()).toBe(true);

    expect((assemblyInput.element as HTMLInputElement).value).toBe("");
    expect(chromosomeOption.attributes().value).toBe("1");
    expect(variantOption.attributes().value).toBe("Unspecified");

    expect((start.element as HTMLInputElement).value).toBe("0");
    expect((end.element as HTMLInputElement).value).toBe("0");
    expect((referenceBases.element as HTMLInputElement).value).toBe("");
    expect((alternateBases.element as HTMLInputElement).value).toBe("");
  });
});

describe("AdvancedSearch.vue with bad input", () => {
  const wrapper = mount(AdvancedSearch, {
    localVue,
    router,
    attachTo: elem,
  });
  it("it displays error message", async () => {
    const buttonSearch = wrapper.find("[data-testid=searchTest]");
    expect(buttonSearch.exists()).toBe(true);
    buttonSearch.trigger("click");
    await wrapper.vm.$nextTick();
    const errorMessage = wrapper.find("[data-testid=errorMessage]");
    expect(errorMessage.element.innerHTML).toContain(
      " Reference Base(s) must be given, possible values are: A, T, C, G,"
    );
  });
});
