var asrClidTable, startDateFilter, endDateFilter, obj, avg_asr_clid, exist_avg_asr_clid, exist_table;

$(document).ready(function() {
  exist_table = document.getElementById("dataTable");
    // var lCallBack = function(chart) {
    //     var $legendDiv = $('<div>');
    //     for (var i=0; i<chart.data.datasets.length; i++) {
    //         if (chart.data.datasets[i].label) {
    //             $legendDiv.append(
    //               $('<span>')
    //                   .addClass('chart-legend-label-text')
    //                   .text(chart.data.datasets[i].label)
    //                   .data({
    //               //chart: chart,
    //                       datasetIndex: chart.legend.legendItems[i].datasetIndex,
    //           })
    //           );
    //       }
    //     }
    //     return $legendDiv.eq(0);
    //   };

    // Average calls graph
    // -----------------------
  exist_avg_asr_clid = document.getElementById('avg_asr_clid_graph');
  if(exist_avg_asr_clid !== null) {
  avg_asr_clid = new Chart(exist_avg_asr_clid.getContext('2d'), {
      type: 'line',
      solidBackgroundColor: true,
      backgroundColor: '#212120',
      data: {
          labels: [],
          datasets: [
              {
                  label: __('ANSWERED'),
                  data: [],
                  backgroundColor: 'rgba(90, 245, 39, 0.9)',
                  borderColor: 'rgba(90, 200, 39, 0.9)',
                  lineTension: 0.3,
                  fill: false,
                  type: 'line',
                  pointRadius: 0,
                  pointHoverRadius: 0
              }
              // {
              //     label: __('NO ANSWER'),
              //     data: [],
              //     backgroundColor: 'rgba(255, 20, 142, 0.9)'
              // },
              // {
              //     label: __('BUSY'),
              //     data: [],
              //     backgroundColor: 'rgba(0, 173, 255, 0.9)'
              // },
              // {
              //     label: __('FAILED'),
              //     data: [],
              //     backgroundColor: 'rgba(0, 255, 208, 0.9)'
              // }
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
                      return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas((tooltipItem.yLabel).toFixed(2));
                  }
              },
          },
          maintainAspectRatio: false,
          legend: { onClick: null, display: true },
          scales: {
              xAxes: [{
                  stacked: false,
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
                  stacked: false,
                  ticks: {
                      beginAtZero: true,
                      callback: function (value) { if(Number.isInteger(value)) { return numberWithCommas(value); } }
                      //function (value) { return numberWithCommas(value); },
                  },
                  position: "left",
                  scaleLabel: {
                      display: true,
                      labelString: __('ASR/CLID average')
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


    // avg_asr_clid = new Chart(document.getElementById('avg_asr_clid_graph').getContext('2d'), {
    //       type: 'bar',
    //       solidBackgroundColor: true,
    //       backgroundColor: '#212120',
    //       data: {
    //           labels: [],
    //           datasets: []
    //       },
    //       options: {
    //           animation: false,
    //           layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
    //           crosshairs: { color: 'gray' },
    //           responsive: true,
    //           tooltips: {
    //               mode: 'x-axis',
    //               backgroundColor: 'rgba(80, 80, 80, 0.9)',
    //               callbacks: {
    //                   title: function (tooltipItem, data) {
    //                       return tooltipItem[0].xLabel;
    //                     },
    //                   label: function (tooltipItem, data) {
    //                       if (tooltipItem.yLabel != 0) {
    //                           return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
    //                       } else {
    //                           return false;
    //                       }
    //                   }
    //               },
    //           },
    //           maintainAspectRatio: false,
    //           legend: { 
    //               onClick: null,
    //               display: true,
    //           },
    //           scales: {
    //               xAxes: [{
    //                   stacked: true,
    //                   ticks: {
    //                       autoSkip: true,
    //                       beginAtZero: true,
    //                       // autoSkipPadding: 50,
    //                   },
    //                   gridLines: {
    //                       color: 'rgba(60,60,60,1)',
    //                       lineWidth: 1
    //                   }
    //               }],
    //               yAxes: [{
    //                   ticks: {
    //                       beginAtZero: true,
    //                       minStepSize: 1,
    //                       callback: function (value) {
    //                           if(Number.isInteger(value)) { 
    //                               return numberWithCommas(value) + ' %'; 
    //                           }
    //                       },
    //                   },
    //                   position: "left",
    //                   scaleLabel: {
    //                       display: true,
    //                       labelString: __('Percentage')
    //                   },
    //                   gridLines: {
    //                       color: 'rgba(60,60,60,1)',
    //                       lineWidth: 1
    //                   }
    //               }],
    //           },
    //           elements: { line: { tension: 0, } }
    //       }
    //   });

    // asr_clid = new Chart(document.getElementById('asr_clid_graph').getContext('2d'), {
    //     type: 'bar',
    //     solidBackgroundColor: true,
    //     backgroundColor: '#212120',
    //     data: {
    //         labels: [],
    //         datasets: []
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
    //                 title: function (tooltipItem, data) {
    //                     return tooltipItem[0].xLabel;
    //                   },
    //                 label: function (tooltipItem, data) {
    //                     if (tooltipItem.yLabel != 0) {
    //                         return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
    //                     } else {
    //                         return false;
    //                     }
    //                 }
    //             },
    //         },
    //         maintainAspectRatio: false,
    //         legend: { 
    //             onClick: null,
    //             display: true,
    //         },
    //         scales: {
    //             xAxes: [{
    //                 stacked: true,
    //                 ticks: {
    //                     autoSkip: true,
    //                     beginAtZero: true,
    //                     // autoSkipPadding: 50,
    //                 },
    //                 gridLines: {
    //                     color: 'rgba(60,60,60,1)',
    //                     lineWidth: 1
    //                 }
    //             }],
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true,
    //                     minStepSize: 1,
    //                     callback: function (value) {
    //                         if(Number.isInteger(value)) { 
    //                             return numberWithCommas(value) + ' %'; 
    //                         }
    //                     },
    //                 },
    //                 position: "left",
    //                 scaleLabel: {
    //                     display: true,
    //                     labelString: __('Percentage')
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

    // var btnsASRClid = [];
    // var groupByASRClid = '';

    

    // $('#btn-asrClid5Minutes').addClass('btn-danger');
    // btnsASRClid.push('btn-asrClid5Minutes');

    // // If the button is clicked
    // $('#btn-asrClid5Minutes, #btn-asrClid15Minutes, #btn-asrClid1Hour, #btn-asrClid1Day').click(function() {
    //     // Set the class
    //     $(this).addClass('btn-danger');
    //     $(this).blur();
    //     // Put in array the id of cliked button
    //     btnsASRClid.push(this.id);
    //     // The id of clicked button
    //     var id = this.id;
    //     // Remove btn-danger class and set default class
    //     $.each(btnsASRClid, function(key, value) {
    //       if (id != value) {
    //         $('#' + value).removeClass('btn-danger').addClass('btn-default');
    //       }
    //     });
    //     groupByASRClid = $(this).attr('data-value');   
    //     // UPDATE GRAPH 
        
    //     statistics.setGroupByMinutes(groupByASRClid);
    //     statistics.ajaxResult('getASRClidData', asr_clid, 'asrClidGraph', true, 'reports', false);        
    //   });

    // $('*[name="asr_group_rules"]').change(function() {
    //     statistics.ajaxResult('getASRClidData', asr_clid, 'asrClidGraph', true, 'reports', false);
    // });

    // ASR_CLID_GROUP graph
    // asr_clid_group = new Chart(document.getElementById('asr_clid_group_graph').getContext('2d'), {
    //     type: 'bar',
    //     solidBackgroundColor: true,
    //     backgroundColor: '#212120',
    //     data: {
    //         labels: [],
    //         datasets: []
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
    //                 title: function (tooltipItem, data) {
    //                     return tooltipItem[0].xLabel;
    //                   },
    //                 label: function (tooltipItem, data) {
    //                     if (tooltipItem.xLabel == data.datasets[tooltipItem.datasetIndex].label) {
    //                      return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
    //                     } else {
    //                         return false;
    //                     }
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
    //                     // autoSkipPadding: 50,
    //                 },
    //                 gridLines: {
    //                     color: 'rgba(60,60,60,1)',
    //                     lineWidth: 1
    //                 }
    //             }],
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true,
    //                     minStepSize: 1,
    //                     callback: function (value) {
    //                         if(Number.isInteger(value)) { 
    //                             return numberWithCommas(value) + ' %'; 
    //                         }
    //                     },
    //                 },
    //                 position: "left",
    //                 scaleLabel: {
    //                     display: true,
    //                     labelString: __('Percentage')
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

    // var btnsASRClidGroup = [];
    // var groupByASRClidGroup = '';

    // // Set the current date
    // statistics.setDate(moment().format('YYYYMM'));
    // // Make the ajax request
    // statistics.ajaxResult('getASRClidGroupData', asr_clid_group, 'asrClidGroupGraph', true, 'reports', false);

    // $('#btn-asrClidGroup5Minutes').addClass('btn-danger');
    // btnsASRClidGroup.push('btn-asrClidGroup5Minutes');

    // // If the button is clicked
    // $('#btn-asrClidGroup5Minutes, #btn-asrClidGroup15Minutes, #btn-asrClidGroup1Hour, #btn-asrClidGroup1Day').click(function() {
    //     // Set the class
    //     $(this).addClass('btn-danger');
    //     $(this).blur();
    //     // Put in array the id of cliked button
    //     btnsASRClidGroup.push(this.id);
    //     // The id of clicked button
    //     var id = this.id;
    //     // Remove btn-danger class and set default class
    //     $.each(btnsASRClidGroup, function(key, value) {
    //       if (id != value) {
    //         $('#' + value).removeClass('btn-danger').addClass('btn-default');
    //       }
    //     });
    //     groupByASRClidGroup = $(this).attr('data-value');
    //     statistics.setGroupByMinutes(groupByASRClidGroup);
    //     statistics.ajaxResult('getASRClidGroupData', asr_clid_group, 'asrClidGroupGraph', true, 'reports', false);        
    //   });

    // Bootstrap date picker
    // -----------------------
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
    
    // $('#reportRange').on('cancel.daterangepicker', function(ev, picker) {
    //     $('#reportRange').daterangepicker(obj, cb);
    //     $(this).html(moment().startOf('month').format('MMMM D, YYYY H:mm') + ' - ' + moment().endOf('month').format('MMMM D, YYYY H:mm'));
    //     cb(moment().startOf('month'), moment().endOf('month'));
    // });
      
    $('#reportRange').daterangepicker(obj, cb);
    cb(moment().startOf('month'), moment().endOf('month'));

    // ASR / CLID table
    // ----------------------------
    
    if(exist_table !== null) {
      showLoader($('.asrClidTableLoader'));
      $('.btn-filterData').button('loading');
      asrClidTable = $('.dataTable').on( 'draw.dt', function () { 
        $('#loader').fadeOut('normal'); 
        hideLoader($('.asrClidTableLoader')); 
        $('[data-toggle="tooltip"]').tooltip();
        $('.btn-filterData').button('reset'); 
      }).on('error.dt', function(e, settings, techNote, message) {
        if (typeof message !== 'undefined') {} 
      }).dataTable({
        'bFilter': false,
        'bSort': true,
        'serverSide': true,
        'responsive': true,
        'lengthMenu': [50, 100, 200, 500, 1000],
        'iDisplayLength': 50,
        'order': [[2, 'desc']],
        'ajax': {
          'url': baseURL+'reports/getDataTableRows',
          'type': 'POST',
          'data': function(data){
            data.startDateFilter  = startDateFilter;
            data.endDateFilter    = endDateFilter;
            data.rule             = $('#ruleSelector').val();
            data.group            = $('#groupSelector').val();
            data.token            = Cookies.get('token');  
          },
          complete: function() {
            $('#loader').fadeOut('normal');
            hideLoader($('.asrClidTableLoader'));
          }
        },
        'columns': [
          {'data': 'control'},
          {'data': 'group'},
          {'data': 'clid'},
          {'data': 'asrPercentage'},
          {'data': 'total_calls'},
          {'data': 'total_answered'},
          {'data': 'total_busy'},
          {'data': 'total_no_answer'},
          {'data': 'total_failed'},
          {'data': 'graphLine'}
        ],
        columnDefs: [
          {
            'targets': 9,
            'orderable': false
          },
          {
            'targets': 0,
            'orderable': false
          }
        ]
      });
    } 

    function cb(start, end) {
      $('#reportRange span').html(start.format('MMMM D, YYYY H:mm') + ' - ' + end.format('MMMM D, YYYY H:mm'));
      // startDateFilter = start.format('MMMM D, YYYY H:mm');
      // endDateFilter   = end.format('MMMM D, YYYY H:mm');
      startDateFilter = start.format('Y-MM-DD H:mm');
      endDateFilter   = end.format('Y-MM-DD H:mm');
    }

  // create select2 dropdowns
  createSelect2Instance('#ruleSelector', {
    placeholder: 'All rules',
    ajax: true,
    url: baseURL + '/reports/getRuleIdTag'
  });
  createSelect2Instance('#groupSelector', {
    placeholder: 'All groups',
    ajax: true,
    url: baseURL + '/reports/getDidsGroup'
  });
      

    $('.btn-getAsrClid').click(function(e) {

      if (checkSession() === false) { return false; }
  
      //--------------------------------------------------------------------------------
      // $('*[name="sipStatusSelector"]').select2('destroy');
      // createSelect2Instance('*[name="sipStatusSelector"]', {
      //   placeholder: 'All sip statuses',
      //   ajax: true,
      //   url: baseURL+'call_history/getSipStatus/' + moment(startDateFilter).format('YYYYMM')
      // });
      //--------------------------------------------------------------------------------
  
      // exportNum = 0;

    // Create two objects with day/month/year for start and end dates.
    var objStartDate = {};
    var objEndDate = {};

    objStartDate.day = new Date(startDateFilter).getUTCDay();
    objStartDate.month = new Date(startDateFilter).getMonth() + 1;
    objStartDate.year = new Date(startDateFilter).getFullYear();

    objEndDate.day = new Date(endDateFilter).getUTCDay();
    objEndDate.month = new Date(endDateFilter).getMonth() + 1;
    objEndDate.year = new Date(endDateFilter).getFullYear();

    // Check if the months are same. If FALSE, then display the warning and make triggers
    if (objStartDate.month == objEndDate.month) {

      $('.btn-filterData').button('loading');
      if(exist_table !== null) {
        showLoader($('.asrClidTableLoader'));
      }
      
      // Set the current date
      statistics.setDate(startDateFilter, endDateFilter);
      // Make the ajax request
      if(exist_avg_asr_clid !== null) {
        statistics.ajaxResult('getASRClidDataAVG', avg_asr_clid, 'asrClidGraph');
      }
      // draw table
      if(exist_table !== null) {
        asrClidTable.api().ajax.reload();
      }
      $('.btn-filterData').button('reset');
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
  // END DATE PICKER
  // ---------------

  // Set the current date
    // statistics.setDate(moment().format('YYYYMM'));
    statistics.setDate(startDateFilter, endDateFilter);
    // Make the ajax request
    if(exist_avg_asr_clid !== null) {
      statistics.ajaxResult('getASRClidDataAVG', avg_asr_clid, 'asrClidGraph');
    }


//END JQUERY ready
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};