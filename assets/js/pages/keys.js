var keysTable;

$(document).ready(function() {

  $('*[name="username_api"]').select2({
    allowClear: true,
    width: '100%',
    placeholder: __('All users'),
    language: languageName.substring(0, 2),
    ajax: {
      url: baseURL + 'keys/getAllUsers',
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
  $('*[name="username_api"]').trigger('change');
  $('*[name="date_created_from"]').dateDropper();
  $('*[name="date_created_to"]').dateDropper();

  showLoader($('.keysTableLoader'));
  keysTable = $('.dataTable').on('draw.dt', function ( e, settings, json, xhr ) {
    hideLoader($('.keysTableLoader'));
    $('[data-toggle="tooltip"]').tooltip();
    $('.btn-filterData').button('reset');
  }).dataTable({
    'bFilter': false,
    'bSort': true,
    'serverSide': true,
    'lengthMenu': [50, 100, 200, 500, 1000],
    'iDisplayLength': 50,
    'order': [[0, 'desc']],
    'ajax': {
      'url': baseURL+'keys/getDataTableRows',
      'type': 'POST',
      'data': function(data){
        data.user_name = $('*[name="username_api"]').val();
        data.date_created_from = $('*[name="date_created_from"]').val();
        data.date_created_to = $('*[name="date_created_to"]').val();
        data.ip_addresses = $('*[name="ip_addresses"]').val();
        data.token = Cookies.get('token');
      }
    },
    'columns': [
      {'data': 'id'},
      {'data': 'key'},
      {'data': 'user_name'},
      {'data': 'date_created'},
      {'data': 'ip_addresses'},
      {'data': 'actions'}
    ],
    columnDefs: [{
      'targets': 5,
      'orderable': false
    }]
  });

  $('.btn-apiKeys').click(function(e) {
    if (checkSession() === false) { return false; }
    $('.btn-filterData').button('loading');
    showLoader($('.keysTableLoader'));
    keysTable.api().ajax.reload();
  });

  $('.bootstrap-tagsinput').width('100%');

});

function deleteKey(keyId, table_selector) {

  showLoader($(table_selector));
  bootbox.confirm(__('Are you sure you want to delete this key?'), function(result) {
    if(result) {
      hideLoader($(table_selector));
      $.ajax({
        url: baseURL+'keys/deleteKey/'+keyId,
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
        keysTable.api().ajax.reload();
      });
    }
    hideLoader($(table_selector));

  });

}
