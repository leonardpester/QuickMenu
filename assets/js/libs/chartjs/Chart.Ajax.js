// Create a closure
var statistics = (function () {
  /**
   * private
   */
  var date = '';
  var tag = '';
  var groupByMinutesCallsPerDay = '';
  var groupByMinutesCallLength = '';
  var groupByMinutes = '';
  var generatedColors = [];
  /**
   * Set the date
   * public
   * @param d 
   */
  function setDate(startDate, endDate = '') {
    if (startDate != '' && endDate != '') {
      date = startDate + ' ' + endDate;
    } else {
      date = startDate;
    }
  }
  /**
   * Set the group by minutes for CallsPerDay Graph
   * public
   * @param m 
   */
  function setGroupByMinutesCallsPerDay(m) {
    groupByMinutesCallsPerDay = m;
  }
  /**
   * Set the group by minutes for CallLength Graph
   * public
   * @param m 
   */
  function setGroupByMinutesCallLength(m) {
    groupByMinutesCallLength = m;
  }
  /**
   * Set the group by minutes for ASR/Clid Graph
   * public
   * @param m 
   */
  function setGroupByMinutes(m) {
    groupByMinutes = m;
  }
  /**
   * Destroy the graph before to populate with new dates
   * private
   */ 
  function destroyGraph(selectorGraph) {
    selectorGraph.data.labels.length = 0;
    selectorGraph.data.datasets.forEach((dataset) => {
        dataset.data.length = 0;
    });
  }
  /**
   * Compare 2 arrays and return true if equal or false if is diferent
   * private
   */ 
  function compareArray(array1, array2) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
  }
  /**
   * Make an ajax request
   * public
   * @param {The name of method from controller} methodName 
   * @param {The variable of graph} selectorGraph 
   * @param {The class name of loader} selectorLoader 
   */

  function ajaxResult(methodName, selectorGraph, selectorLoader, resetDatasets, controller = 'reports', disableLoader = false, callback = false) {

    if (typeof resetDatasets == 'undefined') { resetDatasets = false; }

    if (disableLoader == false) { showLoader('.' + selectorLoader + 'Loader'); }
    $.ajax({
      url: baseURL + controller + '/' + methodName + '/' + date,
      type: 'POST',
      data: {
        campaign: $('#campaignSelector').val(),
        number: $('*[name="numberSelector"]').val(),
        callStatus: $('#callStatusSelector').val(),
        sipStatus: $('#sipStatusSelector').val(),
        amdStatus: $('#AMDStatusSelector').val(),
        tableSuffix: date.split(" ")[0],
        groupByMinutesCallsPerDay: groupByMinutesCallsPerDay,
        groupByMinutesCallLength: groupByMinutesCallLength,
        groupByMinutes: groupByMinutes,
        asrGroupRules: $('*[name="asr_group_rules"]').val(),
        token: Cookies.get('token')
      },
      dataType: 'json',
      success: function (data) {
        let changeFlag = false;
        // if (resetDatasets && data.datasetsObject != undefined) { selectorGraph.data.datasets = []; }
        if (resetDatasets) { selectorGraph.data.datasets = []; }

        if(typeof data.datasetsObject != 'undefined') {
          for (var item in data.datasetsObject) {
            // Check if the number has a color
            var datasetsColor = randomColor({format: 'rgba', alpha: 0.9});
            if (typeof generatedColors[data.datasetsObject[item].label] == 'undefined') {           
              generatedColors[data.datasetsObject[item].label] = datasetsColor;
            }
          }
          
          for (var item in data.datasetsObject) {
            var newObj = data.datasetsObject[item];
            // Check if the dataset has backgroundColor
            if (newObj.backgroundColor == undefined) {
              newObj.backgroundColor = generatedColors[data.datasetsObject[item].label];
            }
            selectorGraph.data.datasets.push(newObj);
          }
        }
        
        // check if getData is changed, if not, no more call update graph
        if (typeof data.datasetsValues != 'undefined') {
          if(data.datasetsValues.length == 0) 
          { 
            for (let item of selectorGraph.data.datasets) {
              item.data = [];
            }
            changeFlag = true; 
          } else {
              for (var index in data.datasetsValues) {
              if(typeof selectorGraph.data.datasets[index].data == "undefined" || selectorGraph.data.datasets[index].data.length != data.datasetsValues[index].length) {                
                selectorGraph.data.datasets[index].data = data.datasetsValues[index];
                changeFlag = true;
              } else {
                for(var secondIndex in data.datasetsValues[index]) {
                  if(data.datasetsValues[index][secondIndex] != null && selectorGraph.data.datasets[index].data[secondIndex] != data.datasetsValues[index][secondIndex]) {
                    selectorGraph.data.datasets[index].data[secondIndex] = data.datasetsValues[index][secondIndex];
                    changeFlag = true;
                  }
                }              
              }
            }
          }
          
        }
        if (typeof data.labels != 'undefined' && !compareArray(selectorGraph.data.labels,data.labels)) { selectorGraph.data.labels = data.labels; }

        if(changeFlag) { selectorGraph.update(); }
        

        if (disableLoader == false) {
          setTimeout(function () {
            hideLoader('.' + selectorLoader + 'Loader');
          }, 500);
        }
        
        if(callback !== false) {callback();}
      }
    });
      
  }
  
  return {
    'ajaxResult': ajaxResult,
    'setDate': setDate,
    'setGroupByMinutesCallsPerDay': setGroupByMinutesCallsPerDay,
    'setGroupByMinutesCallLength': setGroupByMinutesCallLength,
    'setGroupByMinutes': setGroupByMinutes
  }
}());