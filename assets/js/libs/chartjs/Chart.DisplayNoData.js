// Display no data
Chart.plugins.register({
  afterDraw: function (chart) {
    
    var hasData = false;

    for (var datasetIndex = 0; datasetIndex < chart.data.datasets.length; datasetIndex++) {
      if(chart.data.datasets[datasetIndex].data.length > 0) {
        hasData = true;
      }
      
    }
    
    if (!hasData) {
      var ctx = chart.chart.ctx;
      var width = chart.chart.width;
      var height = chart.chart.height
      chart.clear();

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('😟', width / 2, height / 2.2);
      ctx.fillText('Sorry, we don\'t have data to display.', width / 2, height / 2);
      ctx.restore();
    }
  }
});