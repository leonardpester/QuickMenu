
var numbersTable;
var massUpdateTable;

$(document).ready(function() {
  showLoader($('.numbersTableLoader'));
  numbersTable = $('.dataTable').on('draw.dt', function ( e, settings, json, xhr ) {
    hideLoader($('.numbersTableLoader'));
    $('[data-toggle="tooltip"]').tooltip();
    $('.btn-filterData').button('reset');
  }).dataTable({
    'bFilter': false,
    'bSort': true,
    'serverSide': true,
    'lengthMenu': [50, 100, 200, 500, 1000],
    'iDisplayLength': 50,
    'order': [[ 0, 'desc' ]],
    'ajax': {
      'url': baseURL + 'numbers/getDataTableRows',
      'type': 'POST',
      'data': function(data){
        data.callerid_group = $('#callerid_group').val();
        data.callerid = $('*[name="callerid"]').val();
        data.token = Cookies.get('token');
      }
    },
    'columns': [
      {'data': 'id'},
      {'data': 'group_name'},
      {'data': 'callerid'},
      {'data': 'asr'},
      {'data': 'number_status'},
      {'data': 'actions'}
    ],
    columnDefs: [{
      'targets': [3, 4, 5],
      'orderable': false
    },
    {
      'render': function (data, type, row) {
        return (data == '1' ? '<i class="fa fa-circle text-success"></i> ' + __('ON') : '<i class="fa fa-circle text-danger"></i> ' +  __('OFF'));
      },
      'targets': 4
    }]
  });

  $('.btn-getNumbers').click(function(e) {
    if (checkSession() === false) { return false; }
    $('.btn-filterData').button('loading');
    showLoader($('.numbersTableLoader'));
    numbersTable.api().ajax.reload();
  });

  var step = 1;
  $('#modal_container').on('hide.bs.modal', function (e) {
    step = 1;
  });
  $('#modal_container').on('show.bs.modal', function (e) {
    $('.btn-update').hide();
    $('.btn-previous').hide();
  });

  $(document).on('click', '.btn-previous', function () {
    if (step === 1) { return; }
    $('.btn-next').show();
    $('.step'+step).hide().removeClass('stepIn');
    $('.step'+(step-1)).show().addClass('stepIn');
    $('#dataTableNumbers').dataTable().fnDestroy();
    if (step === 2) { $('.btn-previous').hide(); }
    step--;
    if (step === 1) { $('.btn-previous').addClass('disabled'); }
    if (step === 1 || step === 2) { $('.btn-update').hide(); }
    $('.btn-next').removeClass('disabled');
  });

  $(document).on('click', '.btn-next', function () {
    if (step === 3) { return; }
    if (step === 1) {
      $('.btn-update').hide();
      $('.btn-previous').show();
      if ($('.change_callerid_group').val() == '') {
        $('.label_error_group_to').html('<i class="fa fa-exclamation-triangle text-danger"></i>' + __('This Change group to field is required!'));
        $('.btn-next').addClass('disabled');
      }
      $('.change_callerid_group').on('input', function() {
        if ($(this).val() == '') {
          $('.label_error_group_to').html('<i class="fa fa-exclamation-triangle text-danger"></i>' + __('This Change group to field is required!'));
          $('.btn-next').addClass('disabled');
        } else {
          $('.label_error_group_to').html('&nbsp;');
          $('.btn-next').removeClass('disabled');
        }
      });
    }
    if (step === 2) { $('.btn-update').show(); $('.btn-previous').show(); }
    if (step === 2) {
      showLoader($('.numbersTableMassLoader'));
      $('#dataTableNumbers').on('xhr.dt', function (e, settings, json, xhr) {
        hideLoader($('.numbersTableMassLoader'));
      }).dataTable({
        'bsFilter': false,
        'bSort': false,
        'serverSide': true,
        'lengthMenu': [10, 50, 100],
        'iDisplayLength': 10,
        'ajax': {
          'url': baseURL+'numbers/getDataTableMass',
          'type': 'POST',
          'data': function(data) {
            data.callerid_group = $('.callerid_group').val();
            data.callerid = $('.callerid').val();
            data.mass_type = $('.mass_type').val();
            data.change_callerid_group = $('.change_callerid_group').val();
            data.new_status = $('*[name="number_status_group"]').bootstrapSwitch('state');
            data.number_status_checkbox = $('#number-status-checkbox').is(":checked") ? $('*[name="number_status_checkbox"]').val() : '';
            data.token = Cookies.get('token');
          }
        },
        'columns': [
          {'data': 'callerid_group'},
          {'data': 'callerid'},
          {'data': 'number_status'},
          {'data': 'new_status'},
          {'data': 'change_callerid_group'}
        ],
        columnDefs: [{
          'render': function (data, type, row) {
            return (data == '1' ? '<i class="fa fa-circle text-success"></i> ' + __('ON') : ( data == '0' ? '<i class="fa fa-circle text-danger"></i> ' +  __('OFF') : ''));
          },
          'targets': [2, 3]
        }]
      });
      $('#group-filter').html($('.callerid_group').val());
      $('#number-filter').html($('.callerid').val());
    }
    $('.step'+step).hide().removeClass('stepIn');
    $('.step'+(step+1)).show().addClass('stepIn');
    step++;
    $('.btn-previous').removeClass('disabled');
    if (step === 3) { $('.btn-next').addClass('disabled'); $('.btn-next').hide(); }
  });

  $(document).on('click','.btn-update', function () {
    if ($('.callerid_group').val() !== '' || $('.callerid').val() !== '') {
      showLoader($('.numbersTableLoader'));
      numbersTable.api().ajax.reload();
    }
  });

  $('.btn-massUpdate').click(function() {

    if (checkSession() === false) { return false; }

  });

  
  createSelect2Instance('#callerid_group', {
    multiple: true,
    allowClear: true,
    placeholder: 'Caller ID group',
    ajax: true,
    url: baseURL+'numbers/getCallerIdGroups'
  });

  // END Jquery ready
});

function deleteNumber(number_id, table_selector) {

  showLoader($(table_selector));
  bootbox.confirm(__('Are you sure you want to delete this number?') + '<br /><i><small>' + __('This action cannot be undone!') + '</small></i>', function(result) {
    if(result) {
      hideLoader($(table_selector));
      $.ajax({
        url: baseURL+'numbers/deleteNumber/'+number_id,
        type: 'post',
        data: { token: Cookies.get('token') }
      }).done(function(result) {
        result = JSON.parse(result);
        if(result.error === false) {
          swal({
            title: __('Success'),
            text: __('Number was removed'),
            type: 'success',
            confirmButtonClass: 'btn-success',
            timer: 2000
          });
        } else {
          swal({
            title: __('Warning'),
            text: __(result.error_text),
            type: 'warning',
            confirmButtonClass: 'btn-warning',
            timer: 3000
          });
        }        
        numbersTable.api().ajax.reload();
      });
    }

    hideLoader($(table_selector));

  });

}

