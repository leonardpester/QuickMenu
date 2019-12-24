
var usersTable;

$(document).ready(function() {

  showLoader($('.usersTableLoader'));
  usersTable = $('.dataTable').on('draw.dt', function ( e, settings, json, xhr ) {
    hideLoader($('.usersTableLoader'));
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
      'url': baseURL + 'users/getDataTableRows',
      'type': 'POST',
      'data': function(data) {
        data.user_full_name = $('*[name="user_full_name"]').val();
        data.user_name = $('*[name="user_name"]').val();
        data.user_group_id = $('*[name="user_group_id"]').val();
        data.user_mail = $('*[name="user_mail"]').val();
        data.user_date_from = $('*[name="user_date_from"]').val();
        data.user_date_to = $('*[name="user_date_to"]').val();
        data.token = Cookies.get('token');
      }
    },
    'columns': [
      {'data': 'user_id'},
      {'data': 'user_full_name'},
      {'data': 'user_name'},
      {'data': 'user_group'},
      {'data': 'user_mail'},
      {'data': 'user_created_date'},
      {'data': 'user_status'},
      {'data': 'actions'}
    ],
    columnDefs: [{
      'targets': [6, 7],
      'orderable': false
    },
    {
      "render": function (data, type, row) {
        return (data == '1' ? '<i class="fa fa-circle text-success"></i> ON' : '<i class="fa fa-circle text-danger"></i> OFF');
      },
      "targets": 6
    }]
  });

  $('.btn-getUsers').click(function(e) {
    if (checkSession() === false) { return false; }
    $('.btn-filterData').button('loading');
    showLoader($('.usersTableLoader'));
    usersTable.api().ajax.reload();
  });

  // Select2 on user_rule
  // $('*[name="user_role"]').select2({
  //   allowClear: true,
  //   placeholder: __('All user roles'),
  //   language: languageName.substring(0, 2)
  // });


  $('select[name="user_group_id"]').select2({
    allowClear: true,
    placeholder: __('Select group'),
    width: '100%',
    language: languageName.substring(0, 2),
    ajax: {
      url: baseURL+'users/getUserGroups/',
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
    minimumInputLength: 0
  });

});

function deleteUser(userId, table_selector) {

  showLoader($(table_selector));
  bootbox.confirm(__('Are you sure you want to delete this user?') + '<br /><i><small>' + __('This action cannot be undone!') + '</small></i>', function(result) {
    if(result) {
      hideLoader($(table_selector));
      $.ajax({
        url: baseURL+'users/deleteUser/'+userId,
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
        usersTable.api().ajax.reload();
      });
    }

    hideLoader($(table_selector));

  });

}

// automatic random password generation
function generatePassword(){
  let passwordGenerated;

  passwordGenerated = getRandomString(6);
  
  $('#password').val(passwordGenerated);
  $('#repeat-password').val(passwordGenerated);
  $('.send-mail-box').show();
}

// function return random password with certain length
function getRandomString(length) {
  let asciiTable = [[10, 48],[26, 65], [26, 97]];
  let result = '', index, i;
  for (i = 0; i <length; i++){
    index = Math.floor(Math.random()*3);
    result += String.fromCharCode(Math.floor(Math.random() * asciiTable[index][0] + asciiTable[index][1]));
  }
  return result;
}

function showMailCheckBox() {
  if($('#password').val() == $('#repeat-password').val() && $('#password').val().length != 0) {
    $('.send-mail-box').show();
  } else {
    $('.send-mail-box').hide();
  }
}
