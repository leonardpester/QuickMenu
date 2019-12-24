
// Execute 'click' code on Enter when input username or mail
$(window).keydown(function(event){
  if(event.keyCode == 13) {
    event.preventDefault();
    if($('#btn-recovery-password').hasClass('active')){
      $('#btn-recovery-password').trigger('click');
    }
  }
});

// On Enter if focus is on new_password, move focus on confirm_new_password
// On Enter if focus is confirm_new_password, execute 'click' action (try to change password and login)
$(window).keydown(function(event){
  if(event.keyCode == 13) {
    event.preventDefault();
    if($('#btn-change-password').hasClass('active')){
      if(document.activeElement.id == "new_password") {
        if($('#new_password').val().length !== 0) {
          $('#confirm_new_password').focus();
        }
      } else {        
        $('#btn-change-password').trigger('click');
      }
    }
  }
});

// Set tooltip text and show/hide on mouse event (called from recovery_password.php)
function mouseOverBack(){
  if($('#btn-recovery-password').hasClass('active')) {
    $('.tooltip-inner').width('84px');    
    $("#back").attr('title', 'Back to login').tooltip('fixTitle').tooltip('show');
  } else {
    $('.tooltip-inner').width('50px');
    $("#back").attr('title', 'Back').tooltip('fixTitle').tooltip('show');
  }
}

function mouseOutBack(){
  $("#back").tooltip('fixTitle').tooltip('hide');
}


// When click on 'back' arraow, one step back into the execution chain
function backStep() {
  $('form :input').val('');
  if($('#btn-recovery-password').hasClass('active')) {
    return false;
  }
  if($('#recovery_password_code').hasClass('active')){
    $('#recovery_password_code').removeClass('active');
    $('#btn-recovery-password').addClass('active');
  
    $('#recoveryCodeForm').hide();    
    $('#recoveryForm').show();
    $('.card-title').text(__('Password recovery')); 
    $('.category').html(__('Type your username or e-mail to send a password recovery code.'));

    $("#back").attr("href", "/login");
    return false;
  }
  if ($('#btn-change-password').hasClass('active')) {
    $('#btn-change-password').removeClass('active');
    $('#recovery_password_code').addClass('active');

    $('#getNewPasswordForm').hide();
    $('#recoveryCodeForm').show();    
    $('.card-title').text(__('Password recovery code'));
    $('.category').text(__('If there is an account with that username or mail we will send a mail with the recovery code. Check the mail and type below the code.')); 
    return false;
  }
}

// callback function for form.submmit() when send mail to user
function recoveryMailCallback(data) {

  // show input code form
  $('#btn-recovery-password').removeClass('active');
  $('#recovery_password_code').addClass('active');

  $('.card-title').text(__('Password recovery code')); 
  $('.category').html(__('If there is an account with that username or mail we will send a mail with the recovery code. Check the mail and type below the code.'));
  $('#recoveryForm').hide();
  $('#recoveryCodeForm').show();

  $("#back").attr("href", "javascript:backStep();");
}

// callback function for form.submmit() when input code for recovery password is valid
function recoveryCodeCallback(data) {
  
  dataJS = typeof data != 'undefined' ? JSON.parse(data) : [];

  //If verification code is validate, show input new password form
  if(typeof dataJS.user_validation != 'undefined' && dataJS.user_validation === true){

    $('#recovery_password_code:focus').css({'border-color': '#808080'});    
            
    $('#recovery_password_code').removeClass('active');
    $('#btn-change-password').addClass('active');
    
    $('.card-title').text(__('Set up the new password'));
    $('.category').text(__('The password must be at least 6 characters:'));
    $('#recoveryCodeForm').hide();
    $('#getNewPasswordForm').show();
  }
}

// set Input Border to red at every input, and it become green only when code is valid
function setInputBorder() {
 
  $('#recovery_password_code:focus').css({'border-color': '#d86858'});
}





