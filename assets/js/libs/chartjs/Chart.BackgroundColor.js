Chart.plugins.register({
  beforeDraw: function(chartInstance) {
    if(typeof chartInstance.config.solidBackgroundColor != 'undefined' && chartInstance.config.solidBackgroundColor) {
      var ctx = chartInstance.chart.ctx;
      ctx.fillStyle = chartInstance.config.backgroundColor;
      ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
    }
  }
});