// Bootstrap date picker
var startDateFilter;
var endDateFilter;
var exist_cpu_load, exist_ram_usage, exist_hdd_usage, exist_ping_usage;

$(document).ready(function() {

    exist_cpu_load = document.getElementById('cpu_load');
    exist_ram_usage = document.getElementById('ram_usage');
    exist_hdd_usage = document.getElementById('hdd_usage');
    exist_ping_usage = document.getElementById('ping_usage');

    // Create the RAM usage Graph
  if(exist_cpu_load !== null) {
    cpu_load = new Chart(exist_cpu_load.getContext('2d'), {
        type: 'line',
        solidBackgroundColor: true,
        backgroundColor: '#212120',
        data: {
            labels: [],
            datasets: [
                {
                    label: __('1m'),
                    data: [],
                    backgroundColor: 'rgba(215, 215, 0, 0.8)',
                    borderColor: 'rgba(215, 215, 0, 0.7)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    pointHitRadius: 3
                },
                {
                    label: __('5m'),
                    data: [],
                    backgroundColor: 'rgba(242, 161, 0, 0.8)',
                    borderColor: 'rgba(242, 161, 0, 0.7)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    pointHitRadius: 3
                },
                {
                    label: __('15m'),
                    data: [],
                    backgroundColor: 'rgba(242, 0, 0, 0.8)',
                    borderColor: 'rgba(242, 0, 0, 0.7)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    pointHitRadius: 3
                },
            ]
        },
        options: {
            animation: false,
            layout: { padding: { left: 0, right: 50, top: 0, bottom: 0 } },
            crosshairs: { color: 'gray' },
            responsive: true,
            tooltips: {
                mode: 'x-axis',
                backgroundColor: 'rgba(80, 80, 80, 0.9)',
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
                    }
                },
            },
            maintainAspectRatio: false,
            legend: { onClick: null, display: true },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        beginAtZero: true,
                        // autoSkipPadding: 50
                    },
                    gridLines: {
                        color: 'rgba(60,60,60,1)',
                        lineWidth: 1
                    }
                }],
                yAxes: [{
                    position: "left",
                    scaleLabel: {
                        display: true,
                        labelString: __('Load percentage')
                    },
                    gridLines: {
                        color: 'rgba(60,60,60,1)',
                        lineWidth: 1
                    }
                }],
            },
            elements: { line: { tension: 0, } }
        }
    });
  }

    // Create the HDD usage Graph
if(exist_ram_usage !== null) {
    ram_usage = new Chart(exist_ram_usage.getContext('2d'), {
        type: 'line',
        solidBackgroundColor: true,
        backgroundColor: '#212120',
        data: {
            labels: [],
            datasets: [
                {
                    label: __('Used'),
                    data: [],
                    backgroundColor: 'rgba(100, 100, 250, 0.7)',
                    borderColor: 'rgba(100, 100, 250, 0.7)',
                    borderWidth: 1,
                    fill: 'origin',
                    pointRadius: 0,
                    pointHitRadius: 0
                },
                {
                    label: __('Cached'),
                    data: [],
                    backgroundColor: 'rgba(242, 161, 0, 0.7)',
                    borderColor: 'rgba(242, 161, 0, 0.7)',
                    borderWidth: 1,
                    // fill: 'origin',
                    pointRadius: 0,
                    pointHitRadius: 0
                },
                {
                    label: __('Max'),
                    data: [],
                    backgroundColor: 'rgba(242, 0, 0, 1)',
                    borderColor: 'rgba(242, 0, 0, 1)',
                    borderWidth: 3,
                    fill: false,
                    pointRadius: 0,
                    pointHitRadius: 0,
                    yAxisID: 'right'
                },
            ]
        },
        options: {
            elements: { 
                line: { 
                    tension: 1, 
                    fill: '-1'
                },
            },
            animation: false,
            layout: { padding: { left: 0, right: 50, top: 0, bottom: 0 } },
            crosshairs: { color: 'gray' },
            responsive: true,
            tooltips: {
                mode: 'x-axis',
                backgroundColor: 'rgba(80, 80, 80, 0.9)',
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel) + ' GB';
                    }
                },
            },
            maintainAspectRatio: false,
            legend: { onClick: null, display: true },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        beginAtZero: true,
                        // autoSkipPadding: 50
                    },
                    gridLines: {
                        color: 'rgba(60,60,60,1)',
                        lineWidth: 1
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) { if(Number.isInteger(value)) { return numberWithCommas(value) + ' GB'; } }
                        //function (value) { return numberWithCommas(value) + ' GB'; },
                    },
                    position: "left",
                    scaleLabel: {
                        display: true,
                        labelString: __('Used RAM')
                    },
                    gridLines: {
                        color: 'rgba(60,60,60,1)',
                        lineWidth: 1
                    }
                },{
                    id: 'right',
                    stacked: false,
                    ticks: {
                        display: false,
                        beginAtZero: true,
                        // callback: function (value) { if(Number.isInteger(value)) { return numberWithCommas(value) + ' GB'; } }
                        //function (value) { return numberWithCommas(value) + ' GB'; },
                    },
                    position: "right",
                    scaleLabel: {
                        display: false,
                    },
                    gridLines: {
                        color: 'rgba(60,60,60,1)',
                        lineWidth: 1
                    }
                }],
            }
        }
    });
  }

    // Create the HDD Graph
  if(exist_hdd_usage !== null) {
    hdd_usage = new Chart(exist_hdd_usage.getContext('2d'), {
        type: 'line',
        solidBackgroundColor: true,
        backgroundColor: '#212120',
        data: {
            labels: [],
            datasets: [
                {
                    label: __('Used'),
                    data: [],
                    backgroundColor: 'rgba(100, 100, 250, 0.7)',
                    borderColor: 'rgba(100, 100, 250, 1)',
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 0,
                    pointHitRadius: 3,
                    steppedLine: true
                },
                {
                    label: __('Max'),
                    data: [],
                    backgroundColor: 'rgba(242, 0, 0, 1)',
                    borderColor: 'rgba(242, 0, 0, 1)',
                    borderWidth: 3,
                    fill: false,
                    pointRadius: 0,
                    pointHitRadius: 0,
                    steppedLine: true
                },
            ]
        },
        options: {
            animation: false,
            layout: { padding: { left: 0, right: 50, top: 0, bottom: 0 } },
            crosshairs: { color: 'gray' },
            responsive: true,
            tooltips: {
                mode: 'x-axis',
                backgroundColor: 'rgba(80, 80, 80, 0.9)',
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel) + ' GB';
                    }
                },
            },
            maintainAspectRatio: false,
            legend: { onClick: null, display: true },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        beginAtZero: true,
                        // autoSkipPadding: 50
                    },
                    gridLines: {
                        color: 'rgba(60,60,60,1)',
                        lineWidth: 1
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) { if(Number.isInteger(value)) { return numberWithCommas(value) + ' GB'; } }
                        //function (value) { return numberWithCommas(value) + ' GB'; },
                    },
                    position: "left",
                    scaleLabel: {
                        display: true,
                        labelString: __('Used HDD')
                    },
                    gridLines: {
                        color: 'rgba(60,60,60,1)',
                        lineWidth: 1
                    }
                }],
            },
            elements: { line: { tension: 0 } }
        }
    });
  }

    // Create the Ping Graph
  if(exist_ping_usage !== null) {
    ping_usage = new Chart(exist_ping_usage.getContext('2d'), {
        type: 'line',
        solidBackgroundColor: true,
        backgroundColor: '#212120',
        data: {
            labels: [],
            datasets: [
                {
                    label: __('8.8.8.8'),
                    data: [],
                    backgroundColor: 'rgba(0, 215, 0, 0.7)',
                    borderColor: 'rgba(0, 215, 0, 0.8)',
                    fill: false,
                    borderWidth: 1,
                    pointRadius: 0
                }
            ]
        },
        options: {
            animation: false,
            layout: { padding: { left: 0, right: 50, top: 0, bottom: 0 } },
            crosshairs: { color: 'gray' },
            responsive: true,
            tooltips: {
                mode: 'x-axis',
                backgroundColor: 'rgba(80, 80, 80, 0.9)',
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
                    }
                },
            },
            maintainAspectRatio: false,
            legend: { onClick: null, display: true },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        beginAtZero: true,
                        // autoSkipPadding: 50
                    },
                    gridLines: {
                        color: 'rgba(60,60,60,1)',
                        lineWidth: 1
                    }
                }],
                yAxes: [{
                    position: "left",
                    scaleLabel: {
                        display: true,
                        labelString: __('Ping time ( ms )')
                    },
                    gridLines: {
                        color: 'rgba(60,60,60,1)',
                        lineWidth: 1
                    }
                }],
            },
            elements: { line: { tension: 0, } }
        }
    });
  }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    var start = moment();
    var end = moment();

    function callbackDateFilter(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        startDateFilter = start.format('Y-MM-DD');
        endDateFilter   = end.format('Y-MM-DD');

        statistics.setDate(startDateFilter, endDateFilter);
        if(exist_cpu_load !== null) { statistics.ajaxResult('getCPUGraphData', cpu_load, 'cpuLoadGraph'); }
        if(exist_ram_usage !== null) { statistics.ajaxResult('getRAMGraphData', ram_usage, 'ramUsageGraph'); }
        if(exist_hdd_usage !== null) { statistics.ajaxResult('getHDDGraphData', hdd_usage, 'hddUsageGraph'); }
        if(exist_ping_usage !== null) { statistics.ajaxResult('getPingGraphData', ping_usage, 'pingUsageGraph'); }

    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        showDropdowns: true,
        ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        'Last 12 Months': [moment().subtract(12, 'months'), moment()],
        'This Year': [moment().startOf('year'), moment().endOf('year')],
        'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
        }},
        callbackDateFilter
    );

    callbackDateFilter(start, end);

});