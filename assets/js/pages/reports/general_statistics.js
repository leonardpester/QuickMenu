var startDateFilter;
var endDateFilter;
var obj;
var exist_average_calls, exist_call_statuses, exist_sip_codes, exist_ring_duration, exist_amd_statuses, exist_amd_time, exist_script_timers;

$(document).ready(function() {

  // Average calls graph
  // -----------------------
  exist_average_calls = document.getElementById('average_calls');
  exist_call_statuses = document.getElementById('call_statuses');
  exist_sip_codes = document.getElementById('sip_codes');
  exist_ring_duration = document.getElementById('ring_duration');
  exist_amd_statuses = document.getElementById('amd_statuses');
  exist_amd_time = document.getElementById('call_history_length');
  exist_script_timers = document.getElementById('script_timers');
  
  if(exist_average_calls !== null) {
    average_calls = new Chart(exist_average_calls.getContext('2d'), {
            type: 'bar',
            solidBackgroundColor: true,
            backgroundColor: '#212120',
            data: {
                labels: [],
                datasets: [
                    {
                        label: __('Max concurent calls'),
                        data: [],
                        backgroundColor: 'rgba(255, 45, 45, 0.9)', 
                        borderColor: 'rgba(255, 45, 45, 0.9)',
                        type: 'line',
                        fill: false
                    },
                    {
                        label: __('Talk'),
                        data: [],
                        backgroundColor: 'rgba(90, 245, 39, 0.9)'
                    },
                    {
                        label: __('AMD'),
                        data: [],
                        backgroundColor: 'rgba(255, 20, 142, 0.9)'
                    },
                    {
                        label: __('Ringing'),
                        data: [],
                        backgroundColor: 'rgba(0, 173, 255, 0.9)'
                    },
                    {
                        label: __('Intro'),
                        data: [],
                        backgroundColor: 'rgba(0, 255, 208, 0.9)'
                    },
                    {
                        label: __('Send MSG'),
                        data: [],
                        backgroundColor: 'rgba(242, 245, 39, 0.9)'
                    },
                ]
            },
            options: {
                animation: false,
                layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
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
                        stacked: true,
                        ticks: {
                            autoSkip: true,
                            beginAtZero: true,
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
                            callback: function (value) { if(Number.isInteger(value)) { return numberWithCommas(value); } }
                            //function (value) { return numberWithCommas(value); },
                        },
                        position: "left",
                        scaleLabel: {
                            display: true,
                            labelString: __('Number of concurent calls')
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

    // Calls per campaign graph
    // -----------------------
    // calls_per_campaign = new Chart(document.getElementById('calls_per_campaign').getContext('2d'), {
    //     type: 'bar',
    //     solidBackgroundColor: true,
    //     backgroundColor: '#212120',
    //     data: {
    //         labels: [],
    //         datasets: [
    //             {
    //                 label: __('1m'),
    //                 data: [],
    //                 backgroundColor: 'rgba(215, 215, 0, 0.8)',
    //                 borderColor: 'rgba(215, 215, 0, 0.7)',
    //                 borderWidth: 2,
    //                 fill: false,
    //                 pointRadius: 1,
    //                 pointHitRadius: 3
    //             },
    //             {
    //                 label: __('5m'),
    //                 data: [],
    //                 backgroundColor: 'rgba(242, 161, 0, 0.8)',
    //                 borderColor: 'rgba(242, 161, 0, 0.7)',
    //                 borderWidth: 2,
    //                 fill: false,
    //                 pointRadius: 1,
    //                 pointHitRadius: 3
    //             },
    //             {
    //                 label: __('15m'),
    //                 data: [],
    //                 backgroundColor: 'rgba(242, 0, 0, 0.8)',
    //                 borderColor: 'rgba(242, 0, 0, 0.7)',
    //                 borderWidth: 2,
    //                 fill: false,
    //                 pointRadius: 1,
    //                 pointHitRadius: 3
    //             },
    //         ]
    //     },
    //     options: {
    //         animation: false,
    //         layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
    //         crosshairs: { color: 'gray' },
    //         responsive: true,
    //         tooltips: {
                
    //             mode: 'x-axis',
    //             backgroundColor: 'rgba(80, 80, 80, 0.9)',
    //             callbacks: {
    //                 label: function (tooltipItem, data) {
    //                     return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
    //                 }
    //             },
    //         },
    //         maintainAspectRatio: false,
    //         legend: { onClick: null, display: true },
    //         scales: {
    //             xAxes: [{
    //                 stacked: true,
    //                 ticks: {
    //                     autoSkip: true,
    //                     beginAtZero: true,
    //                     // autoSkipPadding: 50
    //                 },
    //                 gridLines: {
    //                     color: 'rgba(60,60,60,1)',
    //                     lineWidth: 1
    //                 }
    //             }],
    //             yAxes: [{
    //                 stacked: true,
    //                 ticks: {
    //                     beginAtZero: true,
    //                     minStepSize: 1,
    //                     callback: function (value) { if (Math.floor(value) === value) { return numberWithCommas(value); } },
    //                 },
    //                 position: "left",
    //                 scaleLabel: {
    //                     display: true,
    //                     labelString: __('Load percentage')
    //                 },
    //                 gridLines: {
    //                     color: 'rgba(60,60,60,1)',
    //                     lineWidth: 1
    //                 }
    //             }],
    //         },
    //         elements: { line: { tension: 0, } }
    //     }
    // });

    // Call statuses graph
    // -----------------------
  if(exist_call_statuses !== null) {
    call_statuses = new Chart(document.getElementById('call_statuses').getContext('2d'), {
        type: 'bar',
        solidBackgroundColor: true,
        backgroundColor: '#212120',
        data: {
            labels: [],
            datasets: [
                {
                    label: __('ANSWERED'),
                    data: [],
                    backgroundColor: 'rgba(90, 200, 39, 0.9)'
                },
                {
                    label: __('NO ANSWER'),
                    data: [],
                    backgroundColor: 'rgba(255, 255, 2, 0.9)'
                },
                {
                    label: __('BUSY'),
                    data: [],
                    backgroundColor: 'rgba(200, 42, 42, 0.9)'
                },
                {
                    label: __('FAILED'),
                    data: [],
                    backgroundColor: 'rgba(70, 70, 70, 0.9)'
                },
            ]
        },
        options: {
            animation: false,
            layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
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
                    stacked: true,
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
                        minStepSize: 1,
                        callback: function (value) { if (Math.floor(value) === value) { return numberWithCommas(value); } },
                    },
                    position: "left",
                    scaleLabel: {
                        display: true,
                        labelString: __('Number of calls')
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

    // Sip codes graph
    // -----------------------
  if(exist_sip_codes !== null) {
    sip_codes = new Chart(document.getElementById('sip_codes').getContext('2d'), {
        type: 'bar',
        solidBackgroundColor: true,
        backgroundColor: '#212120',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            animation: false,
            layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
            crosshairs: { color: 'gray' },
            responsive: true,
            tooltips: {
                mode: 'x-axis',
                backgroundColor: 'rgba(80, 80, 80, 0.9)',
                callbacks: {
                    // title: function (tooltipItem, data) {
                    //     $.each(data, function(key, value) {
                    //         console.log(key, value);
                    //         if (key == 'datasets') {
                    //             delete value[0];
                    //             $.each(value, function(k, v) {
                                    
                    //             });
                    //         }
                    //     });
                    //     return tooltipItem[0].xLabel;
                    // },
                    label: function (tooltipItem, data) {
                        // for(let i= 0; i<70; i++) {
                        //     console.log('Data-' + i + ': ');
                        //     for (let j=0; j<9; j++)
                        // console.log(data.datasets[j].data[i]);
                        // }
                       
                        return tooltipItem.yLabel ? data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel) : '';
                    }
                }
            },
            maintainAspectRatio: false,
            legend: { onClick: null, display: true },
            scales: {
                xAxes: [{
                    stacked: true,
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
                        minStepSize: 1,
                        callback: function (value) {
                            if (Math.floor(value) === value) { return numberWithCommas(value); }
                        },
                    },
                    position: "left",
                    scaleLabel: {
                        display: true,
                        labelString: __('Sip Codes')
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

    // Ring duration graph
    // -----------------------
  if(exist_ring_duration !== null) {
    ring_duration = new Chart(document.getElementById('ring_duration').getContext('2d'), {
        type: 'line',
        solidBackgroundColor: true,
        backgroundColor: '#212120',
        data: {
            labels: [],
            datasets: [
                
                {
                    label: __('ANSWERED'),
                    data: [],
                    backgroundColor: 'rgba(90, 200, 39, 0.9)',
                    borderColor: 'rgba(90, 200, 39, 0.9)',
                    lineTension: 0.5,
                    fill: false,
                    type: 'line',
                    pointRadius: 0,
                    pointHoverRadius: 0
                },
                {
                    label: __('NO ANSWER'),
                    data: [],
                    backgroundColor: 'rgba(255, 255, 2, 0.9)',
                    borderColor: 'rgba(255, 255, 2, 0.9)',
                    lineTension: 0.5,
                    fill: false,
                    type: 'line',
                    pointRadius: 0,
                    pointHoverRadius: 0
                },
                {
                    label: __('Ring duration'),
                    data: [],
                    backgroundColor: 'rgba(0,132,186, 0.4)',
                    borderColor: 'rgba(0,132,186, 0.8)',
                    lineTension: 0.5,
                    fill: true,
                    type: 'line'
                }
            ]
        },
        options: {
            crosshairs: { color: 'gray' },
            tooltips: {
              mode: 'x-axis',
              callbacks: {
                label: function(tooltipItem, data) {
                  return data.datasets[tooltipItem.datasetIndex].label + ": " + moment.utc(tooltipItem.yLabel * 1000).format('mm:ss');
                }
              }
            },
            maintainAspectRatio: false,
            legend: {display: true},
            scales: {
              xAxes: [{
                stacked: false,
                ticks: {
                  autoSkip: true,
                  autoSkipPadding: 3
                },
                gridLines: { display: false },
              }],
              yAxes: [{
                stacked: false,
                ticks: {
                  beginAtZero: true,
                  callback: function (value) { if(Number.isInteger(value)) { return moment.utc(value * 1000).format('mm:ss'); } } 
                },
                position: "left",
                scaleLabel: {
                  display: true,
                  labelString: __('Seconds'),
                },
                gridLines: {
                    color: 'rgba(60,60,60,1)',
                    lineWidth: 1
                }
              }],
          },
          animation: false
        }
    });
  }

    // AMD statuses graph
    // -----------------------
  if(exist_amd_statuses !== null) {
    amd_statuses = new Chart(document.getElementById('amd_statuses').getContext('2d'), {
        type: 'bar',
        solidBackgroundColor: true,
        backgroundColor: '#212120',
        data: {
            labels: [],
            datasets: [
                {
                    label: __('Human'),
                    data: [],
                    backgroundColor: 'rgba(90, 200, 39, 0.9)'
                },
                {
                    label: __('Voice mail'),
                    data: [],
                    backgroundColor: 'rgba(0, 173, 255, 0.9)'
                },
                {
                    label: __('Fax'),
                    data: [],
                    backgroundColor: 'rgba(0, 255, 208, 0.9)'
                },
                {
                    label: __('Not sure'),
                    data: [],
                    backgroundColor: 'rgba(70, 70, 70, 1)'
                },
            ]
        },
        options: {
            animation: false,
            layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
            crosshairs: { color: 'gray' },
            responsive: true,
            tooltips: {
                mode: 'x-axis',
                backgroundColor: 'rgba(80, 80, 80, 0.9)',
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel ? data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel) : '';
                    }
                },
            },
            maintainAspectRatio: false,
            legend: { onClick: null, display: true },
            scales: {
                xAxes: [{
                    stacked: true,
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
                        minStepSize: 1,
                        callback: function (value) { if (Math.floor(value) === value) { return numberWithCommas(value); } },
                    },
                    position: "left",
                    scaleLabel: {
                        display: true,
                        labelString: __('Number of calls')
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

    // AMD time graph
    // -----------------------
  if(exist_amd_time !== null) {
    amd_time = new Chart(document.getElementById('call_history_length').getContext('2d'), {
        type: 'line',
        solidBackgroundColor: true,
        backgroundColor: '#212120',
        data: {
            labels: [],
            datasets: [
                {
                    label: __('Total'),
                    data: [],
                    backgroundColor: 'rgba(215, 215, 0, 0.8)',
                    borderColor: 'rgba(215, 215, 0, 0.7)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 1,
                    pointHitRadius: 3
                }
            ]
        },
        options: {
            animation: false,
            layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
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
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) { if(Number.isInteger(value)) { return numberWithCommas(value); } }
                        //function (value) { return numberWithCommas(value); },
                    },
                    position: "left",
                    scaleLabel: {
                        display: true,
                        labelString: __('Time')
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

    // Script timers graph
    // -----------------------
  if(exist_script_timers !== null) {
    script_timers = new Chart(document.getElementById('script_timers').getContext('2d'), {
        type: 'bar',
        solidBackgroundColor: true,
        backgroundColor: '#212120',
        data: {
            labels: [],
            datasets: [
                {
                    label: __('OUTBOUND'),
                    data: [],
                    backgroundColor: 'rgba(90, 200, 39, 0.9)',
                    // borderWidth: 2,
                    // fill: false,
                    // pointRadius: 1,
                    // pointHitRadius: 3
                },
                {
                    label: __('OUTBOUND HANGUP'),
                    data: [],
                    backgroundColor: 'rgba(69, 145, 3, 0.9)',
                    // borderWidth: 2,
                    // fill: false,
                    // pointRadius: 1,
                    // pointHitRadius: 3
                },
                {
                    label: __('INBOUND'),
                    data: [],
                    backgroundColor: 'rgba(247, 255, 0, 0.9)',
                    // borderWidth: 2,
                    // fill: false,
                    // pointRadius: 1,
                    // pointHitRadius: 3
                },
                {
                    label: __('INBOUND HANGUP'),
                    data: [],
                    backgroundColor: 'rgba(153, 158, 0, 1)',
                    // borderWidth: 2,
                    // fill: false,
                    // pointRadius: 1,
                    // pointHitRadius: 3
                }
            ]
        },
        options: {
            animation: false,
            layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
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
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) { if(Number.isInteger(value)) { return numberWithCommas(value); } }
                        //function (value) { return numberWithCommas(value); },
                    },
                    position: "left",
                    scaleLabel: {
                        display: true,
                        labelString: __('Time')
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

    function cb(start, end) {
        $('#reportRange span').html(start.format('MMMM D, YYYY H:mm') + ' - ' + end.format('MMMM D, YYYY H:mm'));
        startDateFilter = start.format('Y-MM-DD H:mm');
        endDateFilter   = end.format('Y-MM-DD H:mm');
    }

    // Bootstrap date picker
    // var start = moment().subtract(30, 'minutes');
    var start = moment().startOf('day');
    var end = moment().endOf('day');

    obj = {
        timePicker: true,
        timePicker24Hour: true,
        startDate: start,
        endDate: end,
        showDropdowns: true,
        ranges: {
        'Last 30 minutes': [moment().subtract(30, 'minutes'), moment()],
        'Last hour': [moment().subtract(1, 'hours'), moment()],
        'Last 6 hours': [moment().subtract(6, 'hours'), moment()],
        'Last day': [moment().subtract(24, 'hours'), moment()],
        'Today': [moment().startOf('day'), moment().endOf('day')],
        'This week': [moment().subtract(6, 'days'), moment()],
        'This month': [moment().startOf('month'), moment().endOf('month')]
        },
        locale: {
        cancelLabel: 'Clear'
        }
    };

    $('#reportRange').daterangepicker(obj, cb);

    $('#reportRange').on('cancel.daterangepicker', function(ev, picker) {
        $(this).html(moment().subtract(30, 'minutes').format('MMMM D, YYYY H:mm') + ' - ' + moment().format('MMMM D, YYYY H:mm'));
        cb(moment().subtract(30, 'minutes'), moment());
    });

    cb(start, end);
    
    statistics.setDate(startDateFilter, endDateFilter);
    if(exist_average_calls !== null) {
        statistics.ajaxResult('getAverageCallsGraphData', average_calls, 'averageCallsGraph');
    }
    // statistics.ajaxResult('getCallsPerCampaignGraphData', calls_per_campaign, 'callsPerCampaignGraph', true);
    
    if(exist_call_statuses !== null) {
      statistics.ajaxResult('getCallStatusesGraphData', call_statuses, 'callStatusesGraph');
    }
    if(exist_sip_codes !== null) {
      statistics.ajaxResult('getSipCodesGraphData', sip_codes, 'sipCodesGraph', true);
    }
    if(exist_ring_duration !== null) {
      statistics.ajaxResult('getRingDurationGraphData', ring_duration, 'ringDuration');
    }
    if(exist_amd_statuses !== null) {
      statistics.ajaxResult('getAMDStatusesGraphData', amd_statuses, 'amdStatuses');
    }
    if(exist_amd_time !== null) {
      statistics.ajaxResult('getAMDTimeGraphData', amd_time, 'callHistoryGraph');
    }
    if(exist_script_timers !== null) {
      statistics.ajaxResult('getScriptTimersGraphData', script_timers, 'scriptTimersGraph');
    }

    $('.btn-getHistory').click(function(e) {
        
        if (checkSession() === false) { return false; }
        
        // Create two objects with day/month/year for start and end dates.
        var objStartDate = {};
        var objEndDate = {};

        objStartDate.day = new Date(startDateFilter).getUTCDay();
        objStartDate.month = new Date(startDateFilter).getMonth() + 1;
        objStartDate.year = new Date(startDateFilter).getFullYear();

        objEndDate.day = new Date(endDateFilter).getUTCDay();
        objEndDate.month = new Date(endDateFilter).getMonth() + 1;
        objEndDate.year = new Date(endDateFilter).getFullYear();

        // Check if the months are same. Is FALSE, then display the warning and make triggers
        if (objStartDate.month == objEndDate.month) {

          statistics.setDate(startDateFilter, endDateFilter);
          if(exist_average_calls !== null) {
              statistics.ajaxResult('getAverageCallsGraphData', average_calls, 'averageCallsGraph');
          }
          // statistics.ajaxResult('getCallsPerCampaignGraphData', calls_per_campaign, 'callsPerCampaignGraph', true);
          if(exist_call_statuses !== null) {
            statistics.ajaxResult('getCallStatusesGraphData', call_statuses, 'callStatusesGraph');
          }
          if(exist_sip_codes !== null) {
            statistics.ajaxResult('getSipCodesGraphData', sip_codes, 'sipCodesGraph', true);
          }
          if(exist_ring_duration !== null) {
            statistics.ajaxResult('getRingDurationGraphData', ring_duration, 'ringDuration');
          }
          if(exist_amd_statuses !== null) {
            statistics.ajaxResult('getAMDStatusesGraphData', amd_statuses, 'amdStatuses');
          }
          if(exist_amd_time !== null) {
            statistics.ajaxResult('getAMDTimeGraphData', amd_time, 'callHistoryGraph');
          }
          if(exist_script_timers !== null) {
            statistics.ajaxResult('getScriptTimersGraphData', script_timers, 'scriptTimersGraph');
          }  

        } else {

            swal({
                title: __('Warning'),
                text: __('You cannot set multiple months! Please select just one month.'),
                type: 'warning',
                confirmButtonColor: '#F3BB45',
                timer: 20000
            });

            $('.swal2-confirm').click(function() {

                $('#reportRange').trigger('click');

            });

        }
        
    });

    $('*[name="campaignSelector"]').select2({
        allowClear: true,
        placeholder: __('All campaigns'),
        language: languageName.substring(0, 2)
    });

    $('*[name="callStatusSelector"]').select2({
        allowClear: true,
        placeholder: __('All call statuses'),
        language: languageName.substring(0, 2)
    });

    $('*[name="AMDStatusSelector"]').select2({
        allowClear: true,
        placeholder: __('All AMD statuses'),
        language: languageName.substring(0, 2)
    });

});