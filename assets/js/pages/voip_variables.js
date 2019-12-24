var voipTable;

$(document).ready(function() {
  showLoader($('.voipTableLoader'));
  voipTable = $('.dataTable').on('xhr.dt', function ( e, settings, json, xhr ) {
    hideLoader($('.voipTableLoader'));
  }).on('draw.dt', function() {
    $('[data-toggle="tooltip"]').tooltip();
  }).dataTable({
    'bFilter': false,
    'bSort': true,
    'serverSide': true,
    'lengthMenu': [50, 100, 200, 500, 1000],
    'iDisplayLength': 50,
    'order': [[0, 'desc']],
    'ajax': {
      'url': baseURL + 'voip/getVoipVariables',
      'type': 'POST',
      'data': function (data) {
        data.variable_code = $('*[name="variable_code"]').val();
        data.variable_code_voip = $('*[name="variable_code_voip"]').val();
        data.variable_name = $('*[name="variable_name"]').val();
        data.token = Cookies.get('token');
      }
    },
    'columns': [
      {'data': 'variable_id'},
      {'data': 'variable_name'},
      {'data': 'variable_code'},
      {'data': 'variable_code_voip'},
      {'data': 'variable_status'},
      {'data': 'variable_actions'}
    ],
    columnDefs: [
      {
        'targets': 5,
        'orderable': false
      },
      {
        "render": function (data, type, row) {
          return (data == '1' ? '<i class="fa fa-circle text-success"></i> ON' : '<i class="fa fa-circle text-danger"></i> OFF');
        },
        "targets": 4
      }
    ]
  });

  $('.btn-voip').click(function() {
    if (checkSession() === false) { return false; }
    showLoader($('.voipTableLoader'));
    voipTable.api().ajax.reload();
  });

});

function deleteVoip(voipId) {

  if (checkSession() === false) { return false; }

  bootbox.confirm('Are you sure you want to delete this voip?<br /><i><small>This action cannot be undone !</small></i>', function(result) {
    if(result) {
      $.ajax({
        url: baseURL+'voip/deleteVoip/'+voipId,
        type: 'post',
        data: { token: Cookies.get('token') }
      }).done(function(result) {
        if(result === 'true') {
          new Noty({
            text        : 'Voip removed',
            type        : 'error',
            layout      : 'topRight',
            timeout     : 5000,
            progressBar : true
          }).show();
          swal({
            title: 'Success',
            text: 'Operation was successful',
            type: 'success',
            confirmButtonClass: 'btn-success',
            timer: 2000
          });
          voipTable.api().ajax.reload();
        }
      });
    }

  });

}
