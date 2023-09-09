import Coupons from "@/components/Coupons.vue"
import { mount } from "@vue/test-utils"

describe("Coupons", () => {
    it("renders properly", () => {
        const wrapper = mount(Coupons, { });
        expect(wrapper.text()).toContain("How many coupons each coupon type has?");
		expect(wrapper.text()).toContain("Number of coupons with discount, the minimum discount, maximum discount and average discount for percent-off coupons");
		expect(wrapper.text()).toContain("Number of coupons with discount, the minimum discount, maximum discount and average discount for dollar-off coupons");
		const select = wrapper.find('.select');
        expect(select.element.getAttribute('modelvalue')).toBe('All');
		let coupon_types = wrapper.vm.$data.coupon_types;
		expect(coupon_types['percent-off']).toBe(89);
		expect(coupon_types['buy-one-get-one']).toBe(2);
		expect(coupon_types['null']).toBe(44);
		expect(coupon_types['dollar-off']).toBe(11);
		expect(coupon_types['free-gift']).toBe(2);
		expect(coupon_types['free-shipping']).toBe(43);
		let percent_off_statistics = wrapper.vm.$data.percent_off_statistics;
		expect(percent_off_statistics['Number of coupons']).toBe(89);
		expect(percent_off_statistics['Minimum discount']).toBe(8);
		expect(percent_off_statistics['Maximum discount']).toBe(80);
		expect(percent_off_statistics['Average discount']).toBe(39.39325842696629);
		let dollar_off_statistics = wrapper.vm.$data.dollar_off_statistics;
		expect(dollar_off_statistics['Number of coupons']).toBe(11);
		expect(dollar_off_statistics['Minimum discount']).toBe(10);
		expect(dollar_off_statistics['Maximum discount']).toBe(150);
		expect(dollar_off_statistics['Average discount']).toBe(45.90909090909091);
    });

	test('Test getListKeysAppereances method', () => {
		const wrapper = mount(Coupons);
		let list = [{ 'key': 'a' }, { 'key': 'e' }, { 'key': 'a' }];
		let list_appareances = wrapper.vm.getListKeysAppereances(list, 'key');
		expect(list_appareances['a']).toBe(2);
		expect(list_appareances['e']).toBe(1);
	});

	test('Test getFilteredCoupons method', () => {
		const wrapper = mount(Coupons);
		let list = [{ 'key': 'a', 'test': 'test1' }, { 'key': 'e', 'test': 'test1' }, { 'key': 'a', 'test': 'test2' }];
		let filtered_coupons = wrapper.vm.getFilteredCoupons(list, 'key', 'a');
		expect(filtered_coupons.length).toBe(2);
		expect(filtered_coupons[0]).toBe(list[0]);
		expect(filtered_coupons[1]).toBe(list[2]);
	});

	test('Test getFilteredCoupons method', () => {
		const wrapper = mount(Coupons);
		let list = [{ 'key': 'a', 'test': 'test1' }, { 'key': 'e', 'test': 'test1' }, { 'key': 'a', 'test': 'test2' }];
		let filtered_coupons = wrapper.vm.getFilteredCoupons(list, 'key', 'a');
		expect(filtered_coupons.length).toBe(2);
		expect(filtered_coupons[0]).toBe(list[0]);
		expect(filtered_coupons[1]).toBe(list[2]);
	});

	test('Test getMaxValue method', () => {
		const wrapper = mount(Coupons);
		let list = [{ 'key': 'a', 'count': 1 }, { 'key': 'e', 'count': 99 }, { 'key': 'a', 'count': 50 }];
		let max = wrapper.vm.getMaxValue(list, 'count');
		expect(max).toBe(99);
	});

	test('Test getMinValue method', () => {
		const wrapper = mount(Coupons);
		let list = [{ 'key': 'a', 'count': 1 }, { 'key': 'e', 'count': 99 }, { 'key': 'a', 'count': 50 }];
		let min = wrapper.vm.getMinValue(list, 'count');
		expect(min).toBe(1);
	});

	test('Test getAverageValue method', () => {
		const wrapper = mount(Coupons);
		let list = [{ 'key': 'a', 'count': 1 }, { 'key': 'e', 'count': 99 }];
		let avg = wrapper.vm.getAverageValue(list, 'count');
		expect(avg).toBe(50);
	});

	test('Test getStatisticsDict method', () => {
		const wrapper = mount(Coupons);
		let list = [{ 'key': 'a', 'value': 0 }, { 'key': 'e', 'value': 100 }, { 'key': 'i', 'value': 25 }, { 'key': 'o', 'value': 75 }];
		let statistics = wrapper.vm.getStatisticsDict(list, 'count');
		expect(statistics['Number of coupons']).toBe(4);
		expect(statistics['Minimum discount']).toBe(0);
		expect(statistics['Maximum discount']).toBe(100);
		expect(statistics['Average discount']).toBe(50);
	});

	test('Test getListGroupByKey method', () => {
		const wrapper = mount(Coupons);
		let list = [{ 'key': 'a', 'value': 0 }, { 'key': 'e', 'value': 100 }, { 'key': 'a', 'value': 25 }, { 'key': 'i', 'value': 75 }];
		let grouped_list = wrapper.vm.getListGroupByKey(list, 'key');
		expect(grouped_list['a'].length).toBe(2);
		expect(grouped_list['e'].length).toBe(1);
		expect(grouped_list['i'].length).toBe(1);
	});

	test('Test getAllData method', () => {
		const wrapper = mount(Coupons);
		wrapper.vm.$data.retailler = 'Nordstrom  & Promo Codes';
		wrapper.vm.getAllData();
		let coupon_types = wrapper.vm.$data.coupon_types;
		expect(coupon_types['percent-off']).toBe(14);
		expect(coupon_types['null']).toBe(30);
		expect(coupon_types['dollar-off']).toBe(2);
		expect(coupon_types['free-gift']).toBe(2);
		expect(coupon_types['free-shipping']).toBe(34);
		let percent_off_statistics = wrapper.vm.$data.percent_off_statistics;
		expect(percent_off_statistics['Number of coupons']).toBe(14);
		expect(percent_off_statistics['Minimum discount']).toBe(10);
		expect(percent_off_statistics['Maximum discount']).toBe(50);
		expect(percent_off_statistics['Average discount']).toBe(34.5);
		let dollar_off_statistics = wrapper.vm.$data.dollar_off_statistics;
		expect(dollar_off_statistics['Number of coupons']).toBe(2);
		expect(dollar_off_statistics['Minimum discount']).toBe(75);
		expect(dollar_off_statistics['Maximum discount']).toBe(150);
		expect(dollar_off_statistics['Average discount']).toBe(112.5);
	});
});


