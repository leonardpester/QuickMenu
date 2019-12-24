var current_calls, calls_traffic, trafficTable;
var doLogout = false;
var source;

$(document).ready(function() {

  // $('#dropdownMenuButton').dropdown();
  
  $('.dashboard-refresh-switch').bootstrapSwitch({size: 'large', handleWidth: 30, labelWidth: 5});

  if($('#current_calls').length) {
    current_calls = new Chart(document.getElementById('current_calls').getContext('2d'), {
      type: 'bar',
      solidBackgroundColor: true,
      backgroundColor: '#212120',
      data: {
        labels: [__('Ringing'), __('AMD'), __('Intro'), __('Talk'), __('Send MSG')],
        datasets: [
          {
            label: __('Ringing'),
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(0, 173, 255, 0.7)'
          },
          {
            label: __('AMD'),
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(255, 20, 142, 0.7)'
          },
          {
            label: __('Intro'),
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(0, 255, 208, 0.7)'
          },
          {
            label: __('Talk'),
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(90, 245, 39, 0.7)'
          },
          {
            label: __('Send MSG'),
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(242, 245, 39, 0.7)'
          },
        ]
      },
      options: {
        animation: false,
        layout: { padding: { left: 0, right: 30, top: 0, bottom: 0 } },
        crosshairs: { color: 'gray' },
        responsive: true,
        tooltips: {
          mode: 'x-axis',
          backgroundColor: 'rgba(80, 80, 80, 0.9)',
          callbacks: {
            title: function (tooltipItem, data) { return tooltipItem[0].xLabel; },
            label: function (tooltipItem, data) {
              if (tooltipItem.xLabel == data.datasets[tooltipItem.datasetIndex].label) {
                return __('Total')+': ' + numberWithCommas(tooltipItem.yLabel);
              }else{
                return false;
              }
            }
          },
        },
        maintainAspectRatio: false,
        legend: { onClick: null, display: true },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: { color: 'rgba(60,60,60,1)', lineWidth: 1 },
            ticks: { display: false }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) { if(Number.isInteger(value)) { return value; } },
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

  if($('#current_calls').length) {
    calls_traffic = new Chart(document.getElementById('calls_traffic').getContext('2d'), {
      type: 'line',
      solidBackgroundColor: true,
      backgroundColor: '#212120',
      data: {
        labels: [ '30s', '29s', '28s', '27s', '26s', '25s', '24s', '23s', '22s', '21s', '20s', '19s', '18s', '17s', '16s', '15s', '14s', '13s', '12s', '11s', '10s', '9s', '8s', '7s', '6s', '5s', '4s', '3s', '2s', '1s' ],
        datasets: [{
          label: __('Inbound calls/sec'),
          lineTension: 0.3,
          pointBorderColor: 'rgba(100, 240, 80, 0.80)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(100, 240, 80, 0.80)',
          pointHoverBorderColor: 'rgba(100, 240, 80, 1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [ 'rgba(100, 240, 80, 0.80)' ],
          borderColor: [ 'rgba(100, 240, 80, 1)' ],
          borderWidth: 1
        },{
          label: __('Outbound calls/sec'),
          lineTension: 0.3,
          pointBorderColor: 'rgba(235, 94, 40, 0.80)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(235, 94, 40, 0.80)',
          pointHoverBorderColor: 'rgba(235, 94, 40, 1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [ 'rgba(235, 94, 40, 0.80)' ],
          borderColor: [ 'rgba(235, 94, 40, 1)' ],
          borderWidth: 1
        }]
      },
      options: {
        animation: false,
        layout: { padding: { left: 0, right: 30, top: 0, bottom: 0 } },
        crosshairs: { color: 'gray' },
        responsive: true,
        tooltips: {
          mode: 'x-axis',
          backgroundColor: 'rgba(80, 80, 80, 0.9)',
          callbacks: {
            title: function(tooltipItem, data) {
              return tooltipItem[0].xLabel + ' ago';
            },
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(Math.abs(tooltipItem.yLabel));
            }
          },
        },
        maintainAspectRatio: false,
        legend: { onClick: null, display: true },
        scales: {
          yAxes: [{
            type: "linear",
            display: true,
            stepSize: 10,
            id: "y-axis-1",
            scaleLabel: {
              display: true,
              labelString: __('Number of calls'),
            },
            gridLines: { color: 'rgba(60,60,60,1)', },
            ticks: {
              beginAtZero: true,
              callback: function(value) { if(Number.isInteger(value)) { return Math.abs(value); } }
            }
          }],
          xAxes: [{
            gridLines: { color: 'rgba(60,60,60,1)', },
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              callback: function (value) { return numberWithCommas(value); },
            }
          }]
        },
        animation: false
      }
    });
  }

  showLoader($('.dashboardTableLoader'));
  trafficTable = $('.dataTable').on( 'draw.dt', function () { 
    $('#loader').fadeOut('normal'); 
    hideLoader($('.dashboardTableLoader')); 
    $('[data-toggle="tooltip"]').tooltip(); 
  }).on('error.dt', function(e, settings, techNote, message) {
    if (typeof message !== 'undefined') {} 
  }).dataTable({
    'bFilter': false,
    'bSort': true,
    'serverSide': true,
    'lengthMenu': [50, 100, 200, 500, 1000],
    'iDisplayLength': 50,
    'order': [[0, 'desc']],
    'ajax': {
      'url': baseURL+'dashboard/getDataTableRows',
      'type': 'POST',
      'data': function(data){
        data.token = Cookies.get('token');  
      }
    },
    'columns': [
      {'data': 'ID'},
      {'data': 'CmpID'},
      {'data': 'Callid'},
      {'data': 'Tag'},
      {'data': 'Type'},
      {'data': 'Caller'},
      {'data': 'CalledNum'},
      {'data': 'StartDate'},
      {'data': 'AnswDate'},
      {'data': 'State'},
      {'data': 'Action'}
    ],
    columnDefs: [{
      'targets': 9,
      'orderable': false,
    }]
  });
  
  setInterval(function () {
    if(!pauseAjax) {
      trafficTable.api().ajax.reload(null, false);
    }
  }, 1000);
  
  if($('#current_calls').length) {  updateCharts(); }

  // Reset the table after seconds
  // setInterval(function () {
  //   trafficTable.api().ajax.reload(null, false);
  // }, 3000);

  // $('.tagSelector').on('change', function(e) {
  //   Cookies.set('selectedCallTag', JSON.stringify($('.tagSelector').val()));
  //   calls_traffic.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // });

  $('.logout').click(function(event) {
    if(!doLogout) {
      doLogout = true;
      event.preventDefault();
    }
  });

  function destroyGraph(chart) {
    chart.data.labels.length = 0;
    chart.data.datasets.forEach((dataset) => {
        dataset.data.length = 0;
    });
  }

  if($('#call_history_totals').length) {
    var callHistoryTotalsElement = document.getElementById("call_history_totals").getContext('2d');
    callHistoryTotalsGraph = new Chart(callHistoryTotalsElement, {
      type: 'bar',
      responsive: true,
      solidBackgroundColor: true,
      backgroundColor: '#212120',
      data: {
        labels: [],
        datasets: [{
          label: __('MONTHLY')+' '+__('ANSWERED'),
          type: 'line',
          data: [],
          backgroundColor: 'rgba(45, 163, 97, 0.05)',
          borderColor: 'rgba(45, 163, 97, 0.5)',
          borderWidth: 0
        },{
          label: __('MONTHLY')+' '+__('NO ANSWER'),
          type: 'line',
          data: [],
          backgroundColor: 'rgba(241, 222, 47, 0.05)',
          borderColor: 'rgba(241, 222, 47, 0.5)',
          borderWidth: 0
        },{
          label: __('MONTHLY')+' '+__('BUSY'),
          type: 'line',
          data: [],
          backgroundColor: 'rgba(200, 42, 42, 0.05)',
          borderColor: 'rgba(200, 42, 42, 0.5)',
          borderWidth: 0
        },{
          label: __('MONTHLY')+' '+__('FAILED'),
          type: 'line',
          data: [],
          backgroundColor: 'rgba(60, 60, 60, 0.05)',
          borderColor: 'rgba(60, 60, 60, 0.5)',
          borderWidth: 0
        },{
          label: __('ANSWERED'),
          data: [],
          backgroundColor: 'rgba(45, 163, 97, 0.7)',
          borderColor: 'rgba(45, 163, 97, 1)',
          borderWidth: 1
        },{
          label: __('NO ANSWER'),
          data: [],
          backgroundColor: 'rgba(241, 222, 47, 0.76)',
          borderColor: 'rgba(241, 222, 47, 1)',
          borderWidth: 1
        },{
          label: __('BUSY'),
          data: [],
          backgroundColor: 'rgba(200, 42, 42, 0.7)',
          borderColor: 'rgba(200, 42, 42, 1)',
          borderWidth: 1
        },{
          label: __('FAILED'),
          data: [],
          backgroundColor: 'rgba(60, 60, 60, 0.7)',
          borderColor: 'rgba(60, 60, 60, 1)',
          borderWidth: 1
        }]
      },
      options: {
        crosshairs: { color: 'gray' },
        tooltips: {
          mode: 'x-axis',
          callbacks: {
            label: function(tooltipItem, data) {
              // if(data.datasets[tooltipItem.datasetIndex].label.startsWith(__('MONTHLY'))) { return false; }
              return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
            }
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: true,
          labels: {
            filter: function(legendItem, chartData) {
              return !legendItem.text.startsWith(__('MONTHLY'));
            }
          }
        },
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              autoSkip: true,
              autoSkipPadding: 3
            },
            gridLines: { display: false },
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              //stepSize: 1,
              beginAtZero: true,
              callback: function(value) { if(Number.isInteger(value)) { return numberWithCommas(value); } },
            },
            position: "left",
            scaleLabel: {
              display: true,
              labelString: __('Number of calls'),
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

  if($('#call_history_length').length) {
    var callHistoryCallLength = document.getElementById("call_history_length").getContext('2d');
    callHistoryCallLengthGraph = new Chart(callHistoryCallLength, {
      type: 'line',
      responsive: true,
      solidBackgroundColor: true,
      backgroundColor: '#212120',
      data: {
        labels: [],
        datasets: [
          {
            label: __('MIN'),
            data: [],
            backgroundColor: 'rgba(200, 42, 42, 0.5)',
            borderColor: 'rgba(200, 42, 42, 1)',
            borderWidth: 1,
            fill: true
          },
          {
            label: __('AVERAGE'),
            data: [],
            backgroundColor: 'rgba(241, 222, 47, 0.5)',
            borderColor: 'rgba(241, 222, 47, 1)',
            borderWidth: 1,
            fill: true
          },
          {
            label: __('MAX'),
            data: [],
            backgroundColor: 'rgba(45, 163, 97, 0.5)',
            borderColor: 'rgba(45, 163, 97, 1)',
            borderWidth: 1,
            fill: true
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
              // stepSize: 1,
              beginAtZero: true,
              callback: function(value) { if(Number.isInteger(value)) { return moment.utc(value * 1000).format('mm:ss'); } },
            },
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: __('Number of minutes'),
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

  // Dashboard graphs
  // Global variables
  var intervalArray = [5, 10, 20, 30, 60];
  var intervalArrayText = ["5MIN", "10MIN", "20MIN", "30MIN", "1H"];
  var intervalIndexCallsPerDay, intervalIndexCallsPerLength;
  var date = new Date();
  var interval, updateCallPerDay, updateCallLength;

  // check if have cookie variable saved
  interval = parseInt(Cookies.get('intervalCallsPerDay'));
  if(typeof interval != 'undefined' && !isNaN(interval)) {
    intervalIndexCallsPerDay = intervalArray.indexOf(interval);
    if(interval == 5) {$('#minus').addClass('disabled');}
    if(interval == 60) {$('#plus').addClass('disabled');}
  } else {
    // Graph initialization on start
    if (date.getHours() + '' + date.getMinutes() < 1200) { 
      intervalIndexCallsPerDay = 1;
    } else if (date.getHours() + '' + date.getMinutes() < 1600) { 
      intervalIndexCallsPerDay = 2;
    } else {
      intervalIndexCallsPerDay = 3;
    }
  }
  
  // draw graph
  if($('#call_history_length').length || $('#call_history_totals').length) {
    setIntervalCallsPerDay(intervalIndexCallsPerDay);
  }

  // callPerDayGroupByMinutes Graph resolve
  // --------------------------------------
  $('#plus').click(() => {
    // Button out of focus    
    $('#plus').blur();
    // Set state for buttons and call setIntervalCallsPerDay function
    if(intervalIndexCallsPerDay < 4) { 
      intervalIndexCallsPerDay++;
      if(intervalIndexCallsPerDay == 4) { 
        $('#plus').addClass('disabled');
      } else {
        $('#plus').removeClass('disabled');
        $('#minus').removeClass('disabled');
      } 
      setIntervalCallsPerDay(intervalIndexCallsPerDay);
    }
  });

  $('#minus').click(() => {
    // Button out of focus    
    $('#minus').blur();
    // Set state for buttons and call setIntervalCallsPerDay function
    if(intervalIndexCallsPerDay > 0) { 
      intervalIndexCallsPerDay--;
      if(intervalIndexCallsPerDay == 0) { 
        $('#minus').addClass('disabled');
      } else {
        $('#plus').removeClass('disabled');
        $('#minus').removeClass('disabled');
      } 
      setIntervalCallsPerDay(intervalIndexCallsPerDay);
    
    }
  });

  // set correct interval on view and call functions for drawing graph
  function setIntervalCallsPerDay(index, loader = false) {
    Cookies.set('intervalCallsPerDay', intervalArray[index], { expires: 2});
    $('#callsPerDayGroupByMinutes').html(__(intervalArrayText[index])); 
    statistics.setGroupByMinutesCallsPerDay(intervalArray[index]);
    if(!pauseAjax) {
      statistics.ajaxResult('getCallPerDayGraphData', callHistoryTotalsGraph, 'callsPerDayGraph', undefined, 'dashboard', loader);
    }
    // set automatic graph update
    clearTimeout(updateCallPerDay);
    updateCallPerDay = setTimeout(() => {
      setIntervalCallsPerDay(intervalIndexCallsPerDay, true);
    }, 30000);
  }

  // callPerLengthGroupByMinutes Graph resolve
  // -----------------------------------------
  // check if have cookie variable saved
  interval = parseInt(Cookies.get('intervalCallsPerLength'));
  if(typeof interval != 'undefined' && !isNaN(interval)) {
    intervalIndexCallsPerLength = intervalArray.indexOf(interval);
    if(interval == 5) {$('#minus-length').addClass('disabled');}
    if(interval == 60) {$('#plus-length').addClass('disabled');}
  } else {
    // Graph initialization on start
    if (date.getHours() + '' + date.getMinutes() < 1200) { 
      intervalIndexCallsPerLength = 1;
    } else if (date.getHours() + '' + date.getMinutes() < 1600) { 
      intervalIndexCallsPerLength = 2;
    } else {
      intervalIndexCallsPerLength = 3;
    }
  }

  // draw graph
  if($('#call_history_length').length || $('#call_history_totals').length) {
    setIntervalCallsPerLength(intervalIndexCallsPerLength);
  }

  $('#plus-length').click(() => {
    // Button out of focus    
    $('#plus-length').blur();
    // Set state for buttons and call setIntervalCallsPerLength function
    if(intervalIndexCallsPerLength < 4) { 
      intervalIndexCallsPerLength++;
      if(intervalIndexCallsPerLength == 4) { 
        $('#plus-length').addClass('disabled');
      } else {
        $('#plus-length').removeClass('disabled');
        $('#minus-length').removeClass('disabled');
      } 
      setIntervalCallsPerLength(intervalIndexCallsPerLength);
    }
  });

  $('#minus-length').click(() => {
    // Button out of focus    
    $('#minus-length').blur();
    // Set state for buttons and call setIntervalCallsPerLength function
    if(intervalIndexCallsPerLength > 0) { 
      intervalIndexCallsPerLength--;
      if(intervalIndexCallsPerLength == 0) { 
        $('#minus-length').addClass('disabled');
      } else {
        $('#plus-length').removeClass('disabled');
        $('#minus-length').removeClass('disabled');
      } 
      setIntervalCallsPerLength(intervalIndexCallsPerLength);
      
    }
  });

  // set correct interval on view and call functions for drawing graph
  function setIntervalCallsPerLength(index, loader = false) {
    Cookies.set('intervalCallsPerLength', intervalArray[index], { expires: 2});
    $('#callsLengthGroupByMinutes').html(__(intervalArrayText[index]));
    statistics.setGroupByMinutesCallLength(intervalArray[index]);
    if(!pauseAjax) {
      statistics.ajaxResult('getCallLengthGraphData', callHistoryCallLengthGraph, 'callLengthGraph', undefined, 'dashboard', loader);
    }
    // set auto graph update
    clearTimeout(updateCallLength);
    updateCallLength = setTimeout(() => {
      setIntervalCallsPerLength(intervalIndexCallsPerLength, true);
    }, 30000);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // for dasboard (index.php view) allow filter campaign select 2 to accept new input

  $('.tagSelector').select2({
    containerCssClass : 'select-tag',
    language: languageName.substring(0, 2)
  });

  $("#filter-campaign").select2({
    tags: true,
    createTag: function (params) {
      return {
        id: params.term,
        text: params.term,
        newOption: true
      }
    }
  });

  $("#filter_call_type").select2({
    language: languageName.substring(0, 2),
    tags: true,
    createTag: function (params) {
      return {
        id: params.term,
        text: params.term,
        newOption: true
      }
    }
  });

});

function applyFilterTag() {
  let cookieArray = [];
  if (!!$.trim($('.tagSelector').html())) {
    Cookies.set('selectedCallTag', JSON.stringify($('.tagSelector').val()));
  } else {
    cookieArray = Cookies.get('selectedCallTag');    
    if(typeof cookieArray != 'undefined') {
      Cookies.remove('selectedCallTag');
    }
  }

  if (!!$.trim($('#filter-campaign').html())) {
    Cookies.set('selectedCampaignTag', JSON.stringify($('#filter-campaign').val()));
  } else {
    cookieArray = Cookies.get('selectedCampaignTag');
    if(typeof cookieArray != 'undefined') {
      Cookies.remove('selectedCampaignTag');
    }
  }

  if (!!$.trim($('#filter_call_type').html())) {
    Cookies.set('selectedCallTypeTag', JSON.stringify($('#filter_call_type').val()));
  } else {
    cookieArray = Cookies.get('selectedCallTypeTag');
    if(typeof cookieArray != 'undefined') {
      Cookies.remove('selectedCallTypeTag');
    }
  }

  if($('#current_calls').length) { 
    updateCharts(); 

    calls_traffic.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    calls_traffic.data.datasets[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  $('#btn-filter-apply').blur();
  if($('#call_history_totals').length) {
    statistics.ajaxResult('getCallPerDayGraphData', callHistoryTotalsGraph, 'callsPerDayGraph', undefined, 'dashboard', loader, callbackUpdateGraph);
    statistics.ajaxResult('getCallLengthGraphData', callHistoryCallLengthGraph, 'callLengthGraph', undefined, 'dashboard', loader);
  }
}

function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1e3,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

// function callbackUpdateGraph() {
//   statistics.ajaxResult('getCallPerDayGraphDataAverage', callHistoryTotalsGraph, 'callsPerDayGraph', undefined, 'dashboard', true);
// }

// render current calls graph and calls trafic graph (set event to get data from backend)
function SSECharts(source) {

  source.addEventListener('message', function(e) {

    var chartsData = $.parseJSON(e.data);

    var currentCalls = chartsData.current_calls;
    var totalCallsInbound = chartsData.total_calls_inbound;
    var totalCallsOutbound = chartsData.total_calls_outbound;

    for(var i = 0; i < 29; i++) {
      calls_traffic.data.datasets[0].data[i] = calls_traffic.data.datasets[0].data[(i+1)];
      calls_traffic.data.datasets[1].data[i] = calls_traffic.data.datasets[1].data[(i+1)];
    }
    
    calls_traffic.data.datasets[0].data[29] = -totalCallsInbound;
    calls_traffic.data.datasets[1].data[29] = totalCallsOutbound;
    calls_traffic.update();

    current_calls.data.datasets[0].data[0] = currentCalls['PROGRESS'] > 0 ? currentCalls['PROGRESS'] : null;
    current_calls.data.datasets[1].data[1] = currentCalls['AMD'] > 0 ? currentCalls['AMD'] : null;
    current_calls.data.datasets[2].data[2] = currentCalls['INTRO'] > 0 ? currentCalls['INTRO'] : null;
    current_calls.data.datasets[3].data[3] = currentCalls['TALK'] > 0 ? currentCalls['TALK'] : null;
    current_calls.data.datasets[4].data[4] = currentCalls['SENDMSG'] > 0 ? currentCalls['SENDMSG'] : null;
    // current_calls.data.datasets[0].data[5] = ((totalCallsInbound+totalCallsOutbound) > 0 ? 0 : 1);
    current_calls.update();

    $('#total_talk').html(currentCalls['TALK']);
    $('#total_amd').html(currentCalls['AMD']);
    $('#total_intro').html(currentCalls['INTRO']);
    $('#total_progress').html(currentCalls['PROGRESS']);
    $('#total_sendmsg').html(currentCalls['SENDMSG']);

  }, false);

}

function updateCharts() {

  if (!!window.EventSource) {

    if(typeof source != 'undefined') source.close();
    source = new EventSource('dashboard/getChartsData/');
    SSECharts(source);

    // Set the tag
    // tag = Cookies.get('selectedCallTag');
    // if(typeof tag == 'undefined') { tag = ''; }

    

    // Instantiate the event source
    

    // When change the tag, close old instance and make a new event source instance
    // $('body').on('change', '.SSEvent', function(e) {
    //   // tag = Cookies.get('selectedCallTag');
    //   source.close();
    //   source = new EventSource('dashboard/getChartsData/');
    //   console.log(source);
    //   SSECharts(source);
    // });

    // Call SSE first time
    

  }

}