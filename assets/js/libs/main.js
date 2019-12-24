$.fn.dataTable.ext.errMode = 'none';

// moment.tz.setDefault(appTimezone);

function js_modal(modal_id, modal_ajax_url, table_selector = false) {
  Noty.closeAll();
  if (table_selector !== false) { showLoader($(table_selector)); }
  $.post(
    modal_ajax_url,
    { token: Cookies.get('token') },
    function(result) {
      $('#'+modal_id).html(result);
      $('#'+modal_id).modal('show');
      if (table_selector !== false) { hideLoader($(table_selector)); }
    }
  );
  // $('body').on('click', 'button.close, #modal_container', function() {
  // 	console.log('test');
  // 	if (table_selector !== false) { hideLoader($(table_selector)); }
  // });
}

$(document).ready(function() {
  $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar({suppressScrollX: true});
  $('#modal_container').perfectScrollbar({suppressScrollX: true});
  $('#modal_container_2').perfectScrollbar({suppressScrollX: true});
  $('#modal_container_3').perfectScrollbar({suppressScrollX: true});
  setInterval(function() {
    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar('update');
    $('#modal_container').perfectScrollbar('update');
    $('#modal_container_2').perfectScrollbar('update');
    $('#modal_container_3').perfectScrollbar('update');
  }, 500);
  $(document).on('click', '.has_childs', function(event) {
    event.preventDefault();
    var child = $(this).children('ul')
    if(child.css('display') == 'none') {
      $(this).css('background-color', '#282828');
      child.slideDown('normal');
    }else{
      child.slideUp('normal', function() {
        $(this).css('background-color', 'transparent');
      });
    }
  });
  $(document).on('click', '.toggleDetails', function() {
    if($(this).hasClass('onlyChanges')) {
      $(this).html('show changes only');
      $(this).removeClass('onlyChanges');
      $(this).parent('th').parent('tr').parent('thead').siblings('tbody').children('tr').css('display', 'table-row');
    }else{
      $(this).html('show everything');
      $(this).addClass('onlyChanges');
      $(this).parent('th').parent('tr').parent('thead').siblings('tbody').children('tr.same').css('display', 'none');
    }
  });
  $(document).on('focus', '.paginate_button > a', function() {
    $(this).blur();
  });
});

function showLoader(element) {
  $(element).css('display', 'flex').hide().fadeIn();
}

function hideLoader(element) {
  $(element).fadeOut();
}

// Translate string
function __(text) {

  var string = '';
  var parsedData = JSON.parse(JSON.stringify(translateCurrentStrings));

  if ($.isEmptyObject(parsedData) == false && $.isEmptyObject(parsedData[sha1(text)]) == false) {

    if (parsedData[sha1(text)][languageName] != '') {

      string = parsedData[sha1(text)][languageName];

    } else {

      string = parsedData[sha1(text)]['system'];
      stringsJS.push(text);

    }

  }else{
    stringsJS.push(text);
    translateNewStrings();
  }

  return string != '' ? string : text;

}



function translateNewStrings() {
  if (stringsJS.length != 0) {
    $.ajax({
      url: baseURL + 'app/translateStringsJS',
      type: 'POST',
      data: {
        strings: JSON.stringify(stringsJS),
        token: Cookies.get('token')
      },
      success: function () {}
    });
  }
}