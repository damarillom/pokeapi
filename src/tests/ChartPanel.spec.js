import ChartPanel from "@/components/ChartPanel.vue"
import { mount } from "@vue/test-utils"

describe("ChartPanel", () => {
    it("renders properly", () => {
        const list = {
            key1: 'Value 1',
            key2: 'Value 2'
        };
        const wrapper = mount(ChartPanel, { 'props': { 'title': 'Testing title', 'list': list, 'label': 'Testing label' } });
        expect(wrapper.text()).toContain('Testing title');
        const input1 = wrapper.find('.inputkey1');
        expect(input1.element.getAttribute('label')).toBe('key1');
        expect(input1.element.getAttribute('model-value')).toBe(list.key1);
        const input2 = wrapper.find('.inputkey2');
        expect(input2.element.getAttribute('label')).toBe('key2');
        expect(input2.element.getAttribute('model-value')).toBe(list.key2);
    });
})