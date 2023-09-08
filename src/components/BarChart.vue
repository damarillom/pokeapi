<template>
    <div>
        <canvas ref="barChart"></canvas>
    </div>
</template>
  
<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
  
export default {
    props: {
        data: Object,
        label: String,
    },
    setup(props) {
        const barChart = ref(null);
        onMounted(() => {
            if (barChart.value && props.data) {
                const ctx = barChart.value.getContext("2d");
                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: Object.keys(props.data),
                        datasets: [
                            {
                                label: props.label,
                                data: Object.values(props.data),
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                                borderColor: "rgba(75, 192, 192, 1)",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        });
  
        return {
            barChart,
        };
    },
  };
</script>