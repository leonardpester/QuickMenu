
var groupsTable;

$(() => {

  

  showLoader($('.groupsTableLoader'));
  groupsTable = $('.dataTable').on('draw.dt', () => {
    hideLoader($('.groupsTableLoader'));
    $('[data-toggle="tooltip"]').tooltip();
  }).dataTable({
    'bFilter': false,
    'bSort': true,
    'serverSide': true,
    'lengthMenu': [25, 50, 100],
    'iDisplayLength': 25,
    'order': [[ 0, 'desc' ]],
    'ajax': {
      'url': baseURL + 'users_groups/getDataTableRows',
      'type': 'POST',
      'data': function(data) {
        data.token = Cookies.get('token');
      }
    },
    'columns': [
      {'data': 'group_id'},
      {'data': 'group_name'},
      {'data': 'group_users'},
      {'data': 'actions'}
    ],
    columnDefs: [{
      'targets': [2, 3],
      'orderable': false
    }]
  });

});

function deleteGroup(group_id, table_selector) {

  showLoader($(table_selector));
  bootbox.confirm(__('Are you sure you want to delete this user?') + '<br /><i><small>' + __('This action cannot be undone!') + '</small></i>', function(result) {
    if(result) {
      hideLoader($(table_selector));
      $.ajax({
        url: baseURL+'users_groups/deleteGroup/'+group_id,
        type: 'post',
        data: { token: Cookies.get('token') }
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
       
        groupsTable.api().ajax.reload();
      });
    }

    hideLoader($(table_selector));

  });

}
