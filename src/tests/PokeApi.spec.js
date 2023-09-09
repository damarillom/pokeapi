import PokeApi from "@/components/PokeApi.vue";
import { mount } from "@vue/test-utils";

describe("PokeApi", () => {
    test('Test clickedImg method', async () => {
        const wrapper = mount(PokeApi);
        expect(wrapper.vm.$data.actual_clicks).toBe(0);
        expect(wrapper.vm.$data.total_clicks).toBe(0);
        wrapper.vm.clickedImg();
        expect(wrapper.vm.$data.actual_clicks).toBe(1);
        expect(wrapper.vm.$data.total_clicks).toBe(1);
        wrapper.vm.$data.actual_clicks = 0
        wrapper.vm.clickedImg();
        expect(wrapper.vm.$data.actual_clicks).toBe(1);
        expect(wrapper.vm.$data.total_clicks).toBe(2);
    });
});