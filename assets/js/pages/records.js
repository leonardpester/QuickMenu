function selectRecord(ruleType) {

  // Create select2
  $('*[name="record_rule_id"]').select2({
    allowClear: true,
    width: '100%',
    placeholder: __('All record rules'),
    language: languageName.substring(0, 2),
    ajax: {
      url: baseURL + 'records/getRecordRuleId/' + ruleType,
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
  $('*[name="record_rule_id"]').trigger('change');

}

$(document).ready(function() {

  showLoader($('.recordsTableLoader'));
  recordsTable = $('.dataTable').on('draw.dt', function ( e, settings, json, xhr ) {
  hideLoader($('.recordsTableLoader'));
  $('.btn-filterData').button('reset');
  }).dataTable({
    'bFilter': false,
    'bSort': true,
    'serverSide': true,
    'lengthMenu': [50, 100, 200, 500, 1000],
    'iDisplayLength': 50,
    'order': [[ 0, 'desc' ]],
    'ajax': {
      'url': baseURL + 'records/getRecordsDataTableRows',
      'type': 'POST',
      'data': function(data) {
        data.record_number  = $('*[name="record_number"]').val();
        data.record_call_type = $('*[name="record_call_type"]').val();
        data.record_rule_id = $('*[name="record_rule_id"]').val();
        data.rule_date_created = $('*[name="rule_date_created"]').val();
        data.ordering_datatable = $('*[name="ordering_datatable"]').val();
        data.token = Cookies.get('token');
      }
    },
    'columns': [
      {'data': 'record_id'},
      {'data': 'record_number'},
      {'data': 'record_call_id'},
      {'data': 'record_call_type'},
      {'data': 'record_rule_id'},
      {'data': 'record_rule_tag'},
      {'data': 'record_size'},
      {'data': 'record_date_created'},
      {'data': 'record_player'},
      {'data': 'record_emo'}
    ],
    columnDefs: [
      {
      'targets': 7,
      'orderable': false
    },
    {
      'targets': 8,
      'orderable': false
    },
    {
      'targets': 9,
      'className': 'records-emo',
      'orderable': false
    }
    ]
  });

  $('.btn-records').click(function(e) {
    $('.btn-filterData').button('loading');
    showLoader($('.recordsTableLoader'));
    recordsTable.api().ajax.reload();
  });

  $('*[name="rule_date_created"]').dateDropper();

  $('*[name="record_rule_id"] option:selected').html(__('All record rules'));
  $('*[name="record_rule_id"]').addClass('disabled');
  $('*[name="record_call_type"]').change(function() {
    if ($(this).val() === '') {
      $('*[name="record_rule_id"]').select2('destroy');
      $('*[name="record_rule_id"] option:selected').html(__('All record rules'));
      $('*[name="record_rule_id"]').addClass('disabled');
    } else {
      $('*[name="record_rule_id"]').val('');
      selectRecord($(this).val());
    }
  });

  $('*[name="record_call_type"]').select2({
    allowClear: true,
    placeholder: __('All record types'),
    width: '100%',
    language: languageName.substring(0, 2)
  });

});
