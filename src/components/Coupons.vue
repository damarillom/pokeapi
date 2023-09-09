<template>
    <v-container class="fill-height">
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-select
                        label="Retailer"
                        v-model="retailler"
                        :items="retaillers"
                        @update:modelValue="getAllData"
                        class="select"
                    ></v-select>
                    <v-expansion-panels v-model="panel" multiple>
                        <chart-panel
                            title="How many coupons each coupon type has?"
                            label="Coupon types"
                            :list="coupon_types"
                        ></chart-panel>
                        <chart-panel
                            title="Number of coupons with discount, the minimum discount, maximum discount and average discount for percent-off coupons"
                            label="Percent-Off Coupons"
                            :list="percent_off_statistics"
                        ></chart-panel>
                        <chart-panel
                            title="Number of coupons with discount, the minimum discount, maximum discount and average discount for dollar-off coupons"
                            label="Dollar-Off Coupons"
                            :list="dollar_off_statistics"
                        ></chart-panel>
                    </v-expansion-panels>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import coupons from "../assets/coupons.json";
    import ChartPanel from '@/components/ChartPanel.vue';
    
    export default {
        name: 'Coupons',
        components: {
            ChartPanel,
        },

        data() {
            return {
                panel: [0, 1],
                retailler: 'All',
                coupon_types: {},
                percent_off_coupons: [],
                percent_off_statistics: {},
                dollar_off_coupons: [],
                dollar_off_statistics: {},
                coupons_by_retailler: {},
            }
        },

        computed: {
            retaillers() {
                let rets = Object.keys(this.coupons_by_retailler);
                rets.push('All');
                return rets;
            }
        },

        methods: {
            getListKeysAppereances(list, key) {
                let appereances = {};
                list.forEach(function(item) {
                    if (!appereances[item[key]]) {
                        appereances[item[key]] = 1;
                    } else {
                        appereances[item[key]]++;
                    }
                });
                return appereances;
            },
            getFilteredCoupons(list, key, value) {
                let cs = list.filter(function(coupon) {
                    return coupon[key] == value;
                });
                return cs;
            },
            getMaxValue(list, key) {
                return Math.max(...list.map(o => o[key]))
            },
            getMinValue(list, key) {
                return Math.min(...list.map(o => o[key]))
            },
            getAverageValue(list, key) {
                let average = 0;
                if (list.length) {
                    const sum = list.reduce((aux, o) => {
                        return aux + o[key];
                    }, 0);
                    average = sum / list.length;
                }
                return average;
            },
            getStatisticsDict(list) {
                let statistics = {};
                statistics['Number of coupons'] = list.length;
                statistics['Minimum discount'] = this.getMinValue(list, 'value')
                statistics['Maximum discount'] = this.getMaxValue(list, 'value')
                statistics['Average discount'] = this.getAverageValue(list, 'value')
                return statistics;
            },
            getListGroupByKey(list, key) {
                let grouped_list = {};
                list.forEach(item => {
                    if (!grouped_list[item[key]]) {
                        grouped_list[item[key]] = [];
                    }
                    grouped_list[item[key]].push(item);
                });
                return grouped_list;
            },
            getAllData() {
                let list = coupons['coupons'];
                if (this.retailler != 'All') {
                    list = this.coupons_by_retailler[this.retailler];
                }
                this.coupon_types = this.getListKeysAppereances(list, 'promotion_type');
                this.percent_off_coupons = this.getFilteredCoupons(list, 'promotion_type', 'percent-off');
                this.percent_off_statistics = this.getStatisticsDict(this.percent_off_coupons);
                this.dollar_off_coupons = this.getFilteredCoupons(list, 'promotion_type', 'dollar-off');
                this.dollar_off_statistics = this.getStatisticsDict(this.dollar_off_coupons);
                
            },
        },

        mounted() {   
            this.coupons_by_retailler = this.getListGroupByKey(coupons['coupons'], 'coupon_webshop_name');         
            this.getAllData();
        }
    }
    

</script>