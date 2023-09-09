<template>
    <v-expansion-panel>
        <v-expansion-panel-title>{{ title }}</v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-row>
                <v-col md="5" cols="12">
                    <v-text-field 
                        v-for="(value, key) in list" 
                        :label="key" 
                        :model-value="value" 
                        :readonly="true" 
                        :key="key"
                        hide-details="auto"
                        :class="'input' + key"
                        :data-test="'text-field-' + key"
                    ></v-text-field>
                </v-col>
                <v-col md="7" cols="12">
                    <bar-chart :data="list" :label="label" :key="list"></bar-chart>
                </v-col>
            </v-row>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import BarChart from '@/components/BarChart.vue';
    export default {
        name: 'ChartPanel',
        components: {
            BarChart
        },
        props: {
            title: String,
            list: Object,
            label: String
        }

    }
</script>

