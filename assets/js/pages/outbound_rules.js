
var rulesTable;

$(document).ready(function() {

  showLoader($('.rulesTableLoader'));
  rulesTable = $('.dataTable').on('draw.dt', function ( ) {
    hideLoader($('.rulesTableLoader'));
    $('[data-toggle="tooltip"]').tooltip();
    $('.btn-filterData').button('reset');
  }).dataTable({
    'bFilter': false,
    'bSort': true,
    'serverSide': true,
    'order': [[0, 'desc']],
    'lengthMenu': [50, 100, 200, 500, 1000],
    'iDisplayLength': 50,
    'ajax': {
      'url': baseURL+'rules/getOutboundDataTableRows',
      'type': 'POST',
      'data': function(data){
        data.outbound_tag = $('*[name="outbound_tag"]').val();
        data.outbound_campaign = $('*[name="outbound_campaign"]').val();
        data.outbound_callerid = $('*[name="outbound_callerid"]').val();
        data.outbound_calledid = $('*[name="outbound_calledid"]').val();
        data.token = Cookies.get('token');
      }
    },
    'columns': [
      {'data': 'rule_id'},
      {'data': 'rule_priority'},
      {'data': 'rule_tag'},
      {'data': 'rule_campaign_id'},
      {'data': 'rule_callerid_prefix'},
      {'data': 'rule_called_prefix'},
      {'data': 'rule_amd_active'},
      {'data': 'rule_intro'},
      {'data': 'rule_record'},
      {'data': 'rule_actions'}
    ],
    columnDefs: [{
      'targets': 9,
      'orderable': false
    },
    {
      'render': function (data, type, row) {
        return (data == '1' ? '<i class="fa fa-circle text-success"></i> ' + __('ON') : '<i class="fa fa-circle text-danger"></i> ' + __('OFF'));
      },
      'targets': [6, 7, 8]
    }]
  });

  $('.btn-getOutbound').click(function(e) {
    if (checkSession() === false) { return false; }
    $('.btn-filterData').button('loading');
    showLoader($('.rulesTableLoader'));
    rulesTable.api().ajax.reload();
  });

  // $('#btn-outbound-rule-save').click(() => {
  //   //open modal
  // });

  

});


function deleteRule(ruleId, notification, table_selector) {

  if (checkSession() === false) return false;

  showLoader($(table_selector));
  bootbox.confirm(__('Are you sure you want to delete this rule?'), function(result) {
    if(result) {
      hideLoader($(table_selector));
      $.ajax({
        url: baseURL+'rules/deleteOutboundRule/'+ruleId,
        type: 'post',
        data: {token: Cookies.get('token')}
      }).done(function(result) {
        let data = typeof result != 'undefined' ? JSON.parse(result, true) : {};
        if(Object.keys(data).length > 0) {
          swal({
            title: __(data['title']),
            text: __(data['text']),
            type: data['type'],
            confirmButtonClass: data['btn'],
            timer: 2200
          });
        }        
        rulesTable.api().ajax.reload();
      });
    }     
  });
  hideLoader($(table_selector));
}

function getCallerIds(select_name, onlyGroups, callback) {
  $(select_name).select2({
    allowClear: true,
    placeholder: __('All values'),
    width: '100%',
    language: languageName.substring(0, 2),
    ajax: {
      url: baseURL+'rules/getCallerIds/'+onlyGroups,
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term,
          page: params.page
        };
      },

      processResults: function (data, params) {
        params.page = params.page || 1;
        return {
          results: data.items,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        };
      },
      cache: true
    },
    minimumInputLength: 1
  });

  if (callback) { callback(); }

}

$(document).ready(function() {

  $('[data-toggle="tooltip"]').tooltip();
  // Rule tag select2
  $('*[name="outbound_tag"]').select2({
    allowClear: true,
    placeholder: __('All tags'),
    width: '100%',
    language: languageName.substring(0, 2),
    ajax: {
      url: baseURL + 'rules/getRuleTag/out_rules',
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term,
          page: params.page
        };
      },
      processResults: function (data, params) {
        params.page = params.page || 1;
        return {
          results: data.items
        };
      },
      cache: true
    }
  });
  
  $('*[name="rule_callerid_out_mode"]').select2({
    allowClear: true,
    placeholder: __('All modes'),
    width: '100%',
    language: languageName.substring(0, 2)
  });
        
  $('*[name="rule_callerid_out_value"]').trigger('change');


});

// Open modal for input description text on rule changes
function checkOutboundChangeDescription(showChangeModal) {
  $('#btn-outbound-rule-save').blur();
  if($('#btn-outbound-rule-save').hasClass('available')) {
    if(showChangeModal) {
      js_modal('modal_container_2', 'app/changeOutboundDescriptionText');
    } else {
      submit_form('#saveOutboundRule', '#saveOutboundRuleResult', true, false, false);
    }
  }
}

// Save description text on rule changes on logs
function saveOutboundRuleChanges() {
  // check if input text >= 10 chars
  // if($('#describeOutboundChanges').val().length >= 10) {
    // if valid input, call submit_form to check for errors and save on succes
    // closeDescriptionModalCallback is callback function to close modal_2 description text when submit_form return error
    submit_form('#describeOutboundChangesAction', '#describeOutboundTextResult', false, false, false);
    submit_form('#saveOutboundRule', '#saveOutboundRuleResult', false, false, false, false, false, false);//closeDescriptionModalCallback);
  // } else {
  //   // Print the errors    
  //   $('*[name="describeOutboundChanges"]').siblings('.label_error').html('<i class="fa fa-exclamation-triangle text-danger"></i> The text must be at least 10 characters long.');
  // }
}

function checkDefaultRule(rule_campaign_id, rule_callerid_prefix, rule_called_prefix){
  if(rule_campaign_id == -1 || rule_callerid_prefix == -1 || rule_called_prefix == -1) return;
  // check if is duplicate - if duplicate no need check rule
  if($('[name="copy"]').val() == 'copy') return;
  // emty error tag
  $('#default-rule-error').html('&nbsp;');
  // remove class .available from btn(Save) to block save command until check unique default rule
  if($('#btn-outbound-rule-save').hasClass('available')) {
    $('#btn-outbound-rule-save').removeClass('available');    
  }

  // if it's default rule 0-0-0 ajax check if is unique default rule
  if(rule_campaign_id == 0 && rule_callerid_prefix == 0 && rule_called_prefix == 0 && 
  ($('[name="rule_campaign_id"]').val() != 0 || $('[name="rule_callerid_prefix"]').val() != 0 || $('[name="rule_called_prefix"]').val() != 0)) {
    // ajax to get total default rules from out_rule DB
    $.ajax({
      url: baseURL+'rules/checkDefaultRule',
      dataType : "json",
      type: 'get',
    }).done(function(result) {
      let res = JSON.parse(result.total);
      if(res == 1) {
        // if it's unique rule show error message
        $('#default-rule-error').html("<i class=\"fa fa-exclamation-triangle text-danger\"></i><span>You can't change default rule (0-0-0)</span>");
      } else {
        // if it's not unique default rule activate button for Save
        if(!$('#btn-outbound-rule-save').hasClass('available')) {
          $('#btn-outbound-rule-save').addClass('available');    
        }
      }
    });
  } else {
    // if it's not default rule activate button for Save
    if(!$('#btn-outbound-rule-save').hasClass('available')) {
      $('#btn-outbound-rule-save').addClass('available');    
    }
  }
   
}

// oninput (changeOutboundDescription view) save input textarea to hidden input on outboundRule view
function saveDescribeText() {
  $('#changeOutboundRuleText').val($('#describeOutboundChanges').val());
  // reset label_error message
  $('*[name="describeOutboundChanges"]').siblings('.label_error').html('&nbsp;');
}

// callback function for form.submmit() when input code for recovery password is valid
function closeDescriptionModalCallback(data) {
  
  dataJS = typeof data != 'undefined' ? JSON.parse(data) : [];
  
  if(typeof dataJS.has_errors != 'undefined' && dataJS.has_errors === true){
    //If has errors, close text description modal
    $('#modal_container_2').modal('hide');
    // if is change default rule error print the error
    if(typeof dataJS.errors != 'undefined' && dataJS.errors.default_rule_changes === 'You can\'t change default rule (0-0-0)') {
      $('#default-rule-error').html("<i class=\"fa fa-exclamation-triangle text-danger\"></i><span>You can't change default rule (0-0-0)</span>");
    }
  }
}

