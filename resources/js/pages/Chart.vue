<template>
  <div>
    <h1>Burndown Chart</h1>
    <el-row>
      <el-col v-if="chart">
        <burndown-chart :chartdata="chartDynamicData" v-if="renderComponent"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      t: null,
      renderComponent: true
    };
  },
  methods: {
    ...mapActions(['getBurndownChart']),
    forceRerender() {
      // Remove burndown-chart from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    }
  },
  watch: {
    chart(data) {
      this.forceRerender();
    }
  },
  computed: {
    ...mapGetters(['chart']),
    chartDynamicData() {
      return {
        labels: this.chart.labels,
        datasets: [
          {
            label: 'Data One',
            borderColor: '#409eff',
            backgroundColor: 'rgba(64, 158, 255, 0.1)',
            data: this.chart.data
          }
        ]
      };
    }
  },
  mounted() {
    this.getBurndownChart();
    // Refresh every minute
    this.$nextTick(function() {
      this.t = window.setInterval(() => {
        this.getBurndownChart();
      }, 60000);
    });
  },
  beforeDestroy() {
    // Stop requesting chart data
    clearInterval(this.t);
  }
};
</script>
