var callHistoryTable, typedNumber, callId;
var startDateFilter;
var endDateFilter;
var obj;
var exportNum;

function cb(start, end) {
  $('#reportRange span').html(start.format('MMMM D, YYYY H:mm') + ' - ' + end.format('MMMM D, YYYY H:mm'));
  startDateFilter = start.format('MMMM D, YYYY H:mm');
  endDateFilter   = end.format('MMMM D, YYYY H:mm');
}

$(document).ready(function() {

  // check if exist call_history_totals in html view 
  var exist_graphs = document.getElementById("call_history_totals");

  // Bootstrap date picker
  var start = moment().startOf('day');
  var end = moment().endOf('day');

  obj = {
    timePicker: true,
    timePicker24Hour: true,
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    showDropdowns: true,
    ranges: {
      'Last 30 minutes': [moment().subtract(30, 'minutes'), moment()],
      'Last hour': [moment().subtract(1, 'hours'), moment()],
      'Last 6 hours': [moment().subtract(6, 'hours'), moment()],
      'Last day': [moment().subtract(24, 'hours'), moment()],
      'Today': [moment().startOf('day'), moment().endOf('day')],
      'This week': [moment().subtract(6, 'days'), moment()],
      'This month': [moment().startOf('month'), moment().endOf('month')],
      'Previous month': [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')]
    },
    locale: {
      cancelLabel: 'Clear'
    }
  };

  $('#reportRange').daterangepicker(obj, cb);
  cb(moment().startOf('month'), moment().endOf('month'));

  // $('#reportRange').on('cancel.daterangepicker', function(ev, picker) {
  //     $('#reportRange').daterangepicker(obj, cb);
  //     $(this).html(moment().startOf('month').format('MMMM D, YYYY H:mm') + ' - ' + moment().endOf('month').format('MMMM D, YYYY H:mm'));
  //     cb(moment().startOf('month'), moment().endOf('month'));
  // });


  showLoader($('.callHistoryTableLoader'));
  if(exist_graphs !== null) {
    callHistoryGraphs();
  }
  callHistoryTable = $('.dataTable').on('draw.dt', function ( e, settings, json, xhr ) {
    $('#exportNum').html(settings._iRecordsDisplay + (settings._iRecordsDisplay === 1 ? ' record' : ' records'));
    exportNum = settings._iRecordsDisplay + (settings._iRecordsDisplay === 1 ? ' record' : ' records');
    hideLoader($('.callHistoryTableLoader'));
    $('[data-toggle="tooltip"]').tooltip();
    $('.btn-filterData').button('reset');
  }).on('draw.dt', function ( ) {
    $('[data-toggle="tooltip"]').tooltip();
  }).dataTable({
    'bFilter': false,
    'bSort': true,
    'serverSide': true,
    'responsive': true,
    'lengthMenu': [50, 100, 200, 500, 1000],
    'iDisplayLength': 50,
    'order': [[1, 'desc']],
    'ajax': {
      'url': baseURL + 'call_history/getCallHistory',
      'type': 'POST',
      'data': function(data){
        data.startDateFilter  = startDateFilter;
        data.endDateFilter    = endDateFilter;
        data.number           = $('.input-number-history').val();
        data.rule             = $('#ruleSelector').val();
        data.campaign         = $('#campaignSelector').val();
        data.callDirection    = $('#directionSelector').val();
        data.callStatus       = $('#callStatusSelector').val();
        data.sipStatus        = $('#sipStatusSelector').val();
        data.AMDStatus        = $('#AMDStatusSelector').val();
        data.token            = Cookies.get('token');
      }
    },
    'columns': [
      {'data': 'control'},
      {'data': 'id'},
      {'data': 'type'},
      {'data': 'calldate'},
      {'data': 'called_number'},
      {'data': 'clid'},
      {'data': 'CmpID'},
      {'data': 'rule_id'},
      {'data': 'duration'},
      {'data': 'billsec'},
      {'data': 'sip_code'},
      {'data': 'disposition'},
      {'data': 'userfield'},
      {'data': 'sms_text'}
    ],
    columnDefs:
    [
      {
        'targets': 1,
        'orderable': false, 
      },
      {
        'targets': 0,
        'orderable': false,
      },
      {
        'createdCell': function(td, cellData, rowData, row, col, data) {
          callId = cellData;
          $(td).attr('onclick', 'js_modal(\'modal_container\', \'call_history/info/' + cellData +  '/' + moment(startDateFilter).format('YYYY-MM') + '\', \'.callHistoryTableLoader\'); return false;');
        },
        'render': function(data, type, row) {
          return '<a href="#"><i class="fa fa-info-circle text-info"></i></a>';
        },
        'targets': [1]
      },
      {
        'render': function(data, type, row) {
          return moment('0001-01-01').startOf('day').seconds(data).format('H:mm:ss');
        },
        'targets': [8, 9]
      },
      {
        'render': function(data, type, row) {
          var codeColor = '';
          if (data.startsWith('1')) {
            codeColor = 'text-primary';            
          } else if (data.startsWith('2')) {
            codeColor = 'text-success';
          } else if (data.startsWith('3')) {
            codeColor = 'text-info';
          } else if (data.startsWith('4')) {
            codeColor = 'text-warning';
          } else if (data.startsWith('5')) {
            codeColor = 'text-danger';
          }

          if (row.sip_description != null) return '<span class="' + codeColor + '" data-toggle="tooltip" data-placement="top" title="' + row.sip_description +'" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;font-weight: 700;cursor: help;"> ' + data + '</span>';
        },
        'targets': [10]
      },
      {
        'createdCell': function(td, cellData, rowData, row, col) {
          if(cellData === null) { return ''; }
          $(td).attr('onclick', 'js_modal(\'modal_container_2\', \'call_history/sms/' + callId + '/' + moment(startDateFilter).format('YYYY-MM') + '\', \'.callHistoryTableLoader\'); return false;').attr('style', 'cursor: pointer');
        },
        'render': function (data, type, row) {
          if(data === null) return '';
          if(data !== null && row.sms_status === 'pending') return '<span data-toggle="tooltip" data-placement="top" title="Click for more info"><i class="fa fa-clock-o text-info"></i> PENDING</span>';
          if(data !== null && row.sms_status === 'sent') return '<span data-toggle="tooltip" data-placement="top" title="Click for more info"><i class="fa fa-check text-success"></i> SENT</span>';
          if(data !== null && row.sms_status === 'failed') return '<span data-toggle="tooltip" data-placement="top" title="Click for more info"><i class="fa fa-exclamation-circle text-danger" aria-hidden="true"></i> FAILED</span>';
        },
        'targets': [13]
      }
    ]
  });

  var numberOfDays = [];
  var answered = [];
  var busy = [];
  var failed = [];
  var noAnswer = [];
  var avg = [];
  var max = [];
  var min = [];

  function destroyGraph(chart) {
    chart.data.labels.length = 0;
    chart.data.datasets.forEach((dataset) => {
        dataset.data.length = 0;
    });
  }

  function callHistoryGraphs() {

    showLoader($('.callHistoryGraphLoader'));
    $.ajax({
      url: baseURL + 'call_history/getGraphResult',
      type: 'POST',
      data: {
        number: $('.input-number-history').val(),
        callDirection: $('#directionSelector').val(),
        rule: $('#ruleSelector').val(),
        campaign: $('#campaignSelector').val(),
        callStatus: $('#callStatusSelector').val(),
        sipStatus: $('#sipStatusSelector').val(),
        AMDStatus: $('#AMDStatusSelector').val(),
        startDate: startDateFilter,
        endDate: endDateFilter,
        token: Cookies.get('token')
      },
      dataType: 'json',
      success: function(data) {
        
        numberOfDays = data.numberOfDays;

        $.each(data.callsPerDay, function(key, value) {

          answered.push(value.ANSWERED);
          busy.push(value.BUSY);
          failed.push(value.FAILED);
          noAnswer.push(value.NO_ANSWER);

        });
        
        $.each(data.callLength, function(key, value) {

          avg.push(value.AVG);
          max.push(value.MAX);
          min.push(value.MIN);

        });

        callHistoryTotalsGraph.data.datasets[0].data = answered;
        callHistoryTotalsGraph.data.datasets[1].data = noAnswer;
        callHistoryTotalsGraph.data.datasets[2].data = busy;
        callHistoryTotalsGraph.data.datasets[3].data = failed;

        callHistoryCallLengthGraph.data.datasets[0].data = min;
        callHistoryCallLengthGraph.data.datasets[1].data = avg;
        callHistoryCallLengthGraph.data.datasets[2].data = max;

        callHistoryTotalsGraph.data.labels = numberOfDays;
        callHistoryCallLengthGraph.data.labels = numberOfDays;

        callHistoryTotalsGraph.update();
        callHistoryCallLengthGraph.update();

        hideLoader($('.callHistoryGraphLoader'));

      }
    });

  }
  
  if(exist_graphs !== null) {
    callHistoryTotalsGraph = new Chart(exist_graphs.getContext('2d'), {
      type: 'bar',
      responsive: true,
      solidBackgroundColor: true,
      backgroundColor: '#212120',
      data: {
        labels: numberOfDays,
        datasets: [{
          label: __('ANSWERED'),
          data: answered,
          backgroundColor: 'rgba(45, 163, 97, 0.7)',
          borderColor: 'rgba(45, 163, 97, 1)',
          borderWidth: 1
        },{
          label: __('NO ANSWER'),
          data: noAnswer,
          backgroundColor: 'rgba(241, 222, 47, 0.76)',
          borderColor: 'rgba(241, 222, 47, 1)',
          borderWidth: 1
        },{
          label: __('BUSY'),
          data: busy,
          backgroundColor: 'rgba(200, 42, 42, 0.7)',
          borderColor: 'rgba(200, 42, 42, 1)',
          borderWidth: 1
        },{
          label: __('FAILED'),
          data: failed,
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
              return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
            }
          }
        },
        maintainAspectRatio: false,
        legend: {display: true},
        scales: {
          xAxes: [{
            stepSize: 10,
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
              stepSize: 1,
              beginAtZero: true,
              callback: function (tickValue, index, ticks) { if(!(index % parseInt(ticks.length / 5))) { return numeral(tickValue).format('0a'); } }
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
        },
        animation: false
      }
    });

    var callHistoryCallLength = document.getElementById("call_history_length").getContext('2d');
    callHistoryCallLengthGraph = new Chart(callHistoryCallLength, {
      type: 'line',
      responsive: true,
      solidBackgroundColor: true,
      backgroundColor: '#212120',
      data: {
        labels: numberOfDays,
        datasets: [
          {
            label: __('MIN'),
            data: min,
            backgroundColor: 'rgba(200, 42, 42, 0.4)',
            borderColor: 'rgba(200, 42, 42, 1)',
            borderWidth: 1
          },
          {
            label: __('AVERAGE'),
            data: avg,
            backgroundColor: 'rgba(241, 222, 47, 0.46)',
            borderColor: 'rgba(241, 222, 47, 1)',
            borderWidth: 1
          },
          {
            label: __('MAX'),
            data: max,
            backgroundColor: 'rgba(45, 163, 97, 0.4)',
            borderColor: 'rgba(45, 163, 97, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        crosshairs: { color: 'gray' },
        tooltips: {
          mode: 'x-axis',
          callbacks: {
            label: function(tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label + ": " + moment.utc(tooltipItem.yLabel * 1000).format('HH:mm:ss');
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
              callback: function (value) { if(Number.isInteger(value)) { return moment.utc(value * 1000).format('HH:mm:ss'); } } 
            },
            position: "left",
            scaleLabel: {
              display: true,
              labelString: __('Number of minutes'),
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

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  function saveCSV() {

    // If filter button is not clicked, then create the current date
    date = new Date();

    year = date.getFullYear();
    if (date.getMonth() > 0 && date.getMonth() < 10) {
      month = '0' + (date.getMonth()+1);
    } else {
      month = date.getMonth()+1;
    }

    rule = $('#ruleSelector').val() !== '' ? $('#ruleSelector').val() : '0';
    campaign = $('#campaignSelector').val() !== '' ? $('#campaignSelector').val() : '0';
    callDirection = $('#directionSelector').val() !== '' ? $('#directionSelector').val() : '0';
    number = $('.input-number-history').val() !== '' ? $('.input-number-history').val() : '0' ;
    callStatus = $('#callStatusSelector').val() !== '' ? $('#callStatusSelector').val() : '0';
    sipStatus = $('#sipStatusSelector').val() !== '' ? $('#sipStatusSelector').val() : '0';
    AMDStatus = $('#AMDStatusSelector').val() !== '' ? $('#AMDStatusSelector').val() : '0';
    // tableSuffix = $('#date_from').val() === '' ? year + '-' + month : $('#date_from').val();
  }

  $('body').on('click', '.btn-save', function() {
    if (checkSession() === false) { return false; }
    $('.btn-save').button('loading');
    $.fileDownload(baseURL + 'call_history/downloadCSV/' + rule + '/' + campaign + '/' + callDirection + '/' + number + '/' + callStatus + '/' + sipStatus + '/' + AMDStatus + '/' + moment(startDateFilter).format('YYYY-MM-DD H:mm:ss') + '/' + moment(endDateFilter).format('YYYY-MM-DD H:mm:ss') + '/' + moment(startDateFilter).format('YYYYMM'))
      .done(function () { 
        $('.btn-save').button('reset');
        $('.btn-save #exportNum').html(exportNum);
      })
      .fail(function () {
        alert(__('File download failed!'));
        $('.btn-save').button('reset');
        $('.btn-save #exportNum').html(exportNum);     
      });
    return false;
  });
  
  saveCSV();

  $('.btn-getHistory').click(function(e) {

    if (checkSession() === false) { return false; }

    //--------------------------------------------------------------------------------
    $('*[name="sipStatusSelector"]').select2('destroy');
    createSelect2Instance('*[name="sipStatusSelector"]', {
      placeholder: 'All sip statuses',
      ajax: true,
      url: baseURL+'call_history/getSipStatus/' + moment(startDateFilter).format('YYYYMM')
    });
    //--------------------------------------------------------------------------------

    exportNum = 0;

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

      $('.btn-filterData').button('loading');
      showLoader($('.callHistoryTableLoader'));
      if(exist_graphs !== null) {
        destroyGraph(callHistoryTotalsGraph);
        destroyGraph(callHistoryCallLengthGraph);
        callHistoryGraphs();
      }
      callHistoryTable.api().ajax.reload();

      saveCSV();
      $('.btn-filterData').button('reset');
    } else {

      swal({
        title: __('Warning'),
        text: __('You cannot set multiple months! Please select just one month.'),
        type: 'warning',
        confirmButtonColor: '#F3BB45',
        timer: 20000
      });

      // $('body').on('click', '.swal2-container', function() {

      //   $('#reportRange').trigger('click');

      // });

      $('.swal2-confirm').click(function() {

        $('#reportRange').trigger('click');

      });

    }

  });

  createSelect2Instance('*[name="campaignSelector"]', {
    placeholder: 'All campaigns',
    ajax: true,
    url: baseURL+'call_history/getCampaigns/' + moment(startDateFilter).format('YYYYMM')
  });

  createSelect2Instance('*[name="ruleSelector"]', {
    placeholder: 'All Rules',
    ajax: true,
    url: baseURL+'call_history/getRules/' + moment(startDateFilter).format('YYYYMM')
  });

  createSelect2Instance('*[name="callStatusSelector"]', {
    placeholder: 'All call statuses',
    ajax: true,
    url: baseURL+'call_history/getCallStatus/' + moment(startDateFilter).format('YYYYMM')
  });

  createSelect2Instance('*[name="sipStatusSelector"]', {
    placeholder: 'All sip statuses',
    ajax: true,
    url: baseURL+'call_history/getSipStatus/' + moment(startDateFilter).format('YYYYMM')
  });
  
  createSelect2Instance('*[name="AMDStatusSelector"]', {
    placeholder: 'All AMD statuses',
    ajax: true,
    url: baseURL+'call_history/getAMDStatus/' + moment(startDateFilter).format('YYYYMM')
  });

  $('#directionSelector').select2({
    placeholder: 'Call direction',
    allowClear: true
  });

});
