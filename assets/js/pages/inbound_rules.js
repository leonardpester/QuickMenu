
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
      'url': baseURL+'rules/getInboundDataTableRows',
      'type': 'POST',
      'data': function(data){
        data.inbound_tag = $('*[name="inbound_tag"]').val();
        data.inbound_type = $('*[name="inbound_type"]').val();
        data.inbound_value = $('*[name="inbound_value"]').val();
        data.inbound_target = $('*[name="inbound_target"]').val();
        data.token = Cookies.get('token');
      }
    },
    'columns': [
      {'data': 'rule_id'},
      {'data': 'rule_priority'},
      {'data': 'rule_tag'},
      {'data': 'rule_inbound_type'},
      {'data': 'inbound_text'},
      {'data': 'rule_target'},
      {'data': 'rule_intro'},
      {'data': 'rule_record'},
      {'data': 'rule_actions'}
    ],
    columnDefs: [{
      'targets': 8,
      'orderable': false,
    },
    {
      'render': function (data, type, row) {
        return (data == '1' ? '<i class="fa fa-circle text-success"></i> ' + __('ON') : '<i class="fa fa-circle text-danger"></i> ' +  __('OFF'));
      },
      'targets': [6, 7]
    }]
  });

  $('.btn-getInbound').click(function(e) {
    if (checkSession() === false) { return false; }
    $('.btn-filterData').button('loading');
    showLoader($('.rulesTableLoader'));
    rulesTable.api().ajax.reload();
  });

});

function deleteRule(ruleId, notification, table_selector) {

  if (checkSession() === false) return false;

  showLoader($(table_selector));
  bootbox.confirm(__('Are you sure you want to delete this rule?'), function(result) {
    if(result) {
      hideLoader($(table_selector));
      $.ajax({
        url: baseURL+'rules/deleteInboundRule/'+ruleId,
        type: 'post',
        data: {token: Cookies.get('token')}
      }).done(function(result) {
        let data = typeof result != 'undefined' ? JSON.parse(result) : {};
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
    width: '100%',
    placeholder: __('All values'),
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

  // Rule tag select2
  $('*[name="inbound_tag"]').select2({
    allowClear: true,
    placeholder: __('All tags'),
    language: languageName.substring(0, 2), // get first two characters of language name
    width: '100%',
    ajax: {
      url: baseURL + 'rules/getRuleTag/in_rules',
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

  $('*[name="inbound_value"] option:selected').html('All values');
  $('*[name="inbound_value"]').addClass('disabled');
  $('*[name="inbound_type"]').change(function() {
    $('*[name="inbound_value"]').removeClass('disabled');
    if($(this).val() === ''){
      $('*[name="inbound_value"]').select2('destroy');
      $('*[name="inbound_value"] option:selected').html('All values');
      $('*[name="inbound_value"]').addClass('disabled');
    } else if($(this).val() === 'fixed') {
      $('*[name="inbound_value"]').val('');
      getCallerIds('*[name="inbound_value"]', 0, function() {});
    }else if($(this).val() === 'group') {
      $('*[name="inbound_value"]').val('');
      getCallerIds('*[name="inbound_value"]', 1, function() {});
    }
  });

  $('*[name="inbound_type"]').select2({
    allowClear: true,
    placeholder: __('All types'),
    width: '100%',
    language: languageName.substring(0, 2)
  });
  $('*[name="inbound_value"]').trigger('change');

});

// Open modal for input description text on rule changes
function checkInboundChangeDescription() { 
  js_modal('modal_container_2', 'app/changeInboundDescriptionText');    
}

// Save description text on rule changes on logs
function saveInboundRuleChanges() {
  $('#changeInboundRuleText').val($('#describeInboundChanges').val()); 
  submit_form('#describeInboundChangesAction', '#describeInboundTextResult', false, false, false);
  submit_form('#saveInboundRule', '#saveInboundRuleResult', false, false, false);
}

