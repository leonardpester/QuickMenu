var header_cpu_graph;
var header_ram_graph;
var header_hdd_graph;
var header_calls;
var header_inbound;
var header_outbound;
var pauseAjax = false;
var startPauseTime = false;

$(() => {

$('[data-toggle="tooltip"]').tooltip();

  if(document.getElementById("headerCPU")) {
    header_cpu_graph = new Chart(document.getElementById("headerCPU").getContext('2d'), {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', '', '', '', ''],
            datasets: [{
                data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
                backgroundColor: 'rgba(50, 50, 50, 0.2)',
                borderColor: 'rgba(50, 50, 50, 1)',
                borderWidth: 1,
                fill: true,
                pointRadius: 1,
                pointHitRadius: 3
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false,
            grid: false,
            scales: {
                yAxes: [{ 
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        stepSize: 1,
                        fontSize: 7,
                        mirror: true,
                        padding: 2,
                        callback: function(tickValue, index, ticks) { if(!(index % parseInt(ticks.length / 5))) { return tickValue; } }
                    }
                }],
                xAxes: [{ 
                    display: true,
                    gridLines: {
                        display:false
                    }
                 }],
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
      });
    }

    if(document.getElementById("headerRAM")) {
      header_ram_graph = new Chart(document.getElementById("headerRAM").getContext('2d'), {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', '', '', '', ''],
            datasets: [{
                data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
                backgroundColor: 'rgba(50, 50, 50, 0.2)',
                borderColor: 'rgba(50, 50, 50, 1)',
                borderWidth: 1,
                fill: true,
                pointRadius: 1,
                pointHitRadius: 3
            },{
                data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
                backgroundColor: 'rgba(150, 150, 50, 0.1)',
                borderColor: 'rgba(150, 150, 50, 0.5)',
                borderWidth: 0.5,
                fill: true,
                pointRadius: 0.5,
                pointHitRadius: 3
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false,
            grid: false,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        max: 100,
                        fontSize: 7,
                        mirror: true,
                        padding: 2,
                        callback: function(tickValue, index, ticks) { if(!(index % parseInt(ticks.length / 5))) { return tickValue; } }
                    }
                }],
                xAxes: [{ 
                    display: true,
                    gridLines: {
                        display:false
                    }
                 }],
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
      });
    }

    if(document.getElementById("headerHDD")) {
      header_hdd_graph = new Chart(document.getElementById("headerHDD").getContext('2d'), {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', '', '', '', ''],
            datasets: [{
                data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
                backgroundColor: 'rgba(50, 50, 50, 0.2)',
                borderColor: 'rgba(50, 50, 50, 1)',
                borderWidth: 1,
                fill: true,
                pointRadius: 1,
                pointHitRadius: 3
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false,
            grid: false,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        max: 100,
                        fontSize: 7,
                        mirror: true,
                        padding: 2,
                        callback: function(tickValue, index, ticks) { if(!(index % parseInt(ticks.length / 5))) { return tickValue; } }
                    }
                }],
                xAxes: [{ 
                    display: true,
                    gridLines: {
                        display:false
                    }
                 }],
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
      });
    }

    if(document.getElementById("headerCalls")) {
      header_calls = new Chart(document.getElementById("headerCalls").getContext('2d'), {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', '', '', '', ''],
            datasets: [{
                data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
                backgroundColor: 'rgba(50, 50, 50, 0.2)',
                borderColor: 'rgba(50, 50, 50, 1)',
                borderWidth: 1,
                fill: true,
                pointRadius: 1,
                pointHitRadius: 3
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false,
            grid: false,
            scales: {
                yAxes: [{ 
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        fontSize: 7,
                        mirror: true,
                        padding: 2,
                        callback: function(tickValue, index, ticks) { if(!(index % parseInt(ticks.length / 5))) { return tickValue; } }
                    }
                }],
                xAxes: [{ 
                    display: true,
                    gridLines: {
                        display:false
                    }
                 }],
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
      });
    }

    if(document.getElementById("headerInbound")) {
      header_inbound = new Chart(document.getElementById("headerInbound").getContext('2d'), {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', '', '', '', ''],
            datasets: [{
                data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
                backgroundColor: 'rgba(50, 50, 50, 0.5)',
                borderColor: 'rgba(50, 50, 50, 1)',
                borderWidth: 1,
                fill: true,
                pointRadius: 1,
                pointHitRadius: 3
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false,
            grid: false,
            scales: {
                yAxes: [{ 
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        fontSize: 7,
                        mirror: true,
                        padding: 2,
                        callback: function(tickValue, index, ticks) { if(!(index % parseInt(ticks.length / 5))) { return tickValue; } }
                    }
                }],
                xAxes: [{ 
                    display: true,
                    gridLines: {
                        display:false
                    }
                 }],
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
      });
    }

    if(document.getElementById("headerOutbound")) {
      header_outbound = new Chart(document.getElementById("headerOutbound").getContext('2d'), {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', '', '', '', ''],
            datasets: [{
                data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
                backgroundColor: 'rgba(50, 50, 50, 0.5)',
                borderColor: 'rgba(50, 50, 50, 1)',
                borderWidth: 1,
                fill: true,
                pointRadius: 1,
                pointHitRadius: 0
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false,
            grid: false,
            scales: {
                yAxes: [{ 
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        fontSize: 7,
                        mirror: true,
                        padding: 2,
                        callback: function(tickValue, index, ticks) { if(!(index % parseInt(ticks.length / 5))) { return tickValue; } }
                    }
                }],
                xAxes: [{ 
                    display: true,
                    gridLines: {
                        display:false
                    }
                 }],
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
      });
    }

    // for login page not run statistics
    if(document.getElementById("headerInbound")) {
      
      var headerStatistics = (function() {

        function serverStatistics() {

            $.ajax({
                url: baseURL + 'app/getServerUsage',
                type: 'POST',
                data: {
                    token: Cookies.get('token')
                },
                success: function(data) {
                  result = JSON.parse(data);
                  // if(typeof result.Vitals !== 'undefined' && result.Vitals['@attributes'].OS != 'WINNT') {
                  if(result != null) {                                                                            // resolved error in console (todo: check functionality) looks OK!!!!
                      cpuLoadsAvg = [result.usage_cpu_1, result.usage_cpu_5, result.usage_cpu_15];
                      
                      $('.cpu_percentage_1min, .cpu_percentage_5min, .cpu_percentage_15min').addClass('text-success');
              
                      if(cpuLoadsAvg.length == 3) {
              
                          cpuColor  = 'text-success';
              
                          cpuLoadsAvg[0] = parseFloat(cpuLoadsAvg[0]/result.usage_cpu_count);
                          cpuLoadsAvg[1] = parseFloat(cpuLoadsAvg[1]/result.usage_cpu_count);
                          cpuLoadsAvg[2] = parseFloat(cpuLoadsAvg[2]/result.usage_cpu_count);

                          cpuAVG = (cpuLoadsAvg[0] + cpuLoadsAvg[1] + cpuLoadsAvg[2])/3;

                          for (var i = 0; i < header_cpu_graph.data.datasets[0].data.length-1; i++) {
                              header_cpu_graph.data.datasets[0].data[i] = header_cpu_graph.data.datasets[0].data[(i+1)];
                          }
                          
                          header_cpu_graph.data.datasets[0].data[header_cpu_graph.data.datasets[0].data.length - 1] = cpuAVG*100;
                          header_cpu_graph.update();
              
                          $('.cpu_percentage').html((cpuAVG*100).toFixed(2)+'%');
              
                          if(cpuAVG*100 > 25) { cpuColor = 'text-info'; }
                          if(cpuAVG*100 > 50) { cpuColor = 'text-warning'; }
                          if(cpuAVG*100 > 80) { cpuColor = 'text-danger'; }
                          if(!$('.cpu_percentage_1min').hasClass(cpuColor)) { $('.cpu_percentage_1min').removeClass('text-success').removeClass('text-info').removeClass('text-warning').removeClass('text-danger').addClass(cpuColor); }
              
                      }

                      ramColor = 'text-success';

                      for (var i = 0; i < header_ram_graph.data.datasets[0].data.length-1; i++) {
                          header_ram_graph.data.datasets[0].data[i] = header_ram_graph.data.datasets[0].data[(i+1)];
                          header_ram_graph.data.datasets[1].data[i] = header_ram_graph.data.datasets[1].data[(i+1)];
                      }
                      
                      header_ram_graph.data.datasets[0].data[header_ram_graph.data.datasets[0].data.length-1] = ((result.usage_ram_used / result.usage_ram_max)*100).toFixed(2);                                                 
                      header_ram_graph.data.datasets[1].data[header_ram_graph.data.datasets[1].data.length-1] = (((parseInt(result.usage_ram_used)+parseInt(result.usage_ram_cached)) / result.usage_ram_max)*100).toFixed(2);                                                 
                      header_ram_graph.update();

                      $('.ram_percentage').html(((result.usage_ram_used / result.usage_ram_max)*100).toFixed(2) + '%');
                      
                      if (parseInt((result.usage_ram_used / result.usage_ram_max)*100) > 25) { ramColor = 'text-info'; }
                      if (parseInt((result.usage_ram_used / result.usage_ram_max)*100) > 50) { ramColor = 'text-warning'; }
                      if (parseInt((result.usage_ram_used / result.usage_ram_max)*100) > 80) { ramColor = 'text-danger'; }
                      if(!$('.ram_percentage').hasClass(ramColor)) { $('.ram_percentage').removeClass('text-success').removeClass('text-info').removeClass('text-warning').removeClass('text-danger').addClass(ramColor); }
                      
                      hddColor = 'text-success';

                      for (var i = 0; i < header_hdd_graph.data.datasets[0].data.length-1; i++) {
                          header_hdd_graph.data.datasets[0].data[i] = header_hdd_graph.data.datasets[0].data[(i+1)];
                      }
                      
                      header_hdd_graph.data.datasets[0].data[header_hdd_graph.data.datasets[0].data.length-1] = ((result.usage_hdd_used / result.usage_hdd_max)*100).toFixed(2);
                      header_hdd_graph.update();
                      
                      $('.hdd_percentage').html(((result.usage_hdd_used / result.usage_hdd_max)*100).toFixed(2) + '%');
                      
                      if (parseInt((result.usage_hdd_used / result.usage_hdd_max)*100) > 25) { hddColor = 'text-info'; }
                      if (parseInt((result.usage_hdd_used / result.usage_hdd_max)*100) > 50) { hddColor = 'text-warning'; }
                      if (parseInt((result.usage_hdd_used / result.usage_hdd_max)*100) > 80) { hddColor = 'text-danger'; }
                      if(!$('.hdd_percentage').hasClass(hddColor)) { $('.hdd_percentage').removeClass('text-success').removeClass('text-info').removeClass('text-warning').removeClass('text-danger').addClass(hddColor); }

                    }
                    if(!pauseAjax) { 
                      setTimeout(function() {
                          serverStatistics();
                      }, 5000);
                  }
                }
          });
        }

        function callsStatistics() {

            $.ajax({
                url: baseURL + 'app/getHeaderCalls',
                type: 'POST',
                dataType: 'json',
                data: {
                    token: Cookies.get('token')
                },
                success: function(data) {

                    $('.calls').html(data.total);

                    total_inbound = data.inbound_total != null ? data.inbound_total : '0.0';
                    total_outbound = data.outbound_total != null ? data.outbound_total : '0.0';

                    for (var i = 0; i < header_calls.data.datasets[0].data.length-1; i++) {
                        header_calls.data.datasets[0].data[i] = header_calls.data.datasets[0].data[(i+1)];
                        header_inbound.data.datasets[0].data[i] = header_inbound.data.datasets[0].data[(i+1)];
                        header_outbound.data.datasets[0].data[i] = header_outbound.data.datasets[0].data[(i+1)];
                    }
                    
                    header_calls.data.datasets[0].data[header_calls.data.datasets[0].data.length-1] = data.total;
                    header_inbound.data.datasets[0].data[header_inbound.data.datasets[0].data.length-1] = total_inbound;
                    header_outbound.data.datasets[0].data[header_outbound.data.datasets[0].data.length-1] = total_outbound;
                    
                    header_calls.update();
                    header_inbound.update();
                    header_outbound.update();

                    $('.inbound').html(total_inbound);
                    $('.outbound').html(total_outbound);
                    if(!pauseAjax) { 
                        setTimeout(function() {
                            callsStatistics();
                        }, 5000);
                    }

                }
            });
        }

        function answeredStatistics() {
                $.ajax({
                    url: baseURL + 'app/getHeaderAnswered',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        token: Cookies.get('token')
                    },
                    success: function(data) {

                        if (data.asr_1min != 0) { $('.asr_1min').html((data.asr_1min*100).toFixed(2) + '%'); }
                        if (data.asr_30min != 0) { $('.asr_30min').html((data.asr_30min*100).toFixed(2) + '%'); }
												if (data.asr_1day != 0) { $('.asr_1day').html((data.asr_1day*100).toFixed(2) + '%'); }
                        					
                        if(!pauseAjax) {                            
                            setTimeout(function() {                            
                                answeredStatistics();
                            }, 5000);
                        }
                    }
              });
        }

        return {
            'serverStatistics': serverStatistics,
            'callsStatistics': callsStatistics,
            'answeredStatistics': answeredStatistics
        }

      } ());

    headerStatistics.serverStatistics();

    headerStatistics.callsStatistics();

    headerStatistics.answeredStatistics();
    
    // Show problems div
    function handlerIn() {
        $('.problems-container').fadeIn();
        console.log('in');
    }

    function handlerOut() {
        $('.problems-container').fadeOut();
        console.log('out');        
    }

    $('#header-problems').hover(handlerIn, handlerOut);



    // START - AJAX general setup for no request if page is out of focus or no internet conection

    $.ajaxSetup({
      beforeSend: () => {
        if(startPauseTime != false) {
            let now = new Date();
            if(getMinutesOfPause(startPauseTime, now) >= 5) pauseAjax = true;
        }
      }
    });

    var onFocus = () => {    
        
      if (pauseAjax) {
          headerStatistics.serverStatistics();
          headerStatistics.answeredStatistics();
          headerStatistics.callsStatistics();        
      }
      pauseAjax = false;
      startPauseTime = false;
    }

    var outFocus = () => {
      startPauseTime = new Date();
    }

    function getMinutesOfPause(start, end) {
      return (end - start) / 60000;
    }
        
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", outFocus);

  }
// END - AJAX general setup
// ------------------------


// END jquery ready
});