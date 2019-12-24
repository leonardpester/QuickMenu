/* JS Settings */

// Global variables for warning notification
var appAdvFilterState;
var language;
var logo;
var currentState;
var appUrl;
var appTitle;
var voipAccount;
var themeColor;
var animations;
var loginBg;
var sentryStatus;
var dns;
var dnsPublic;

$(document).ready(function() {

  showLoader($('#saveGeneralSettingsLoader'));
  showLoader($('#saveDeveloperSettingsLoader'));
  showLoader($('#saveAsteriskSettingsLoader'));
  showLoader($('#saveVoipSettingsLoader'));

  $(window).on('load', function() {

    hideLoader($('#saveGeneralSettingsLoader'));
    hideLoader($('#saveDeveloperSettingsLoader'));
    hideLoader($('#saveAsteriskSettingsLoader'));
    hideLoader($('#saveVoipSettingsLoader'));

  }).trigger('load');

  $('.url-auto-switch').bootstrapSwitch({size: 'large', handleWidth: 30, labelWidth: 5});

  $('.url-auto-switch').on('switchChange.bootstrapSwitch', function(event, state) {

    if(state == true) {
      $('.url-settings').addClass('disabled');
    }else{
      $('.url-settings').removeClass('disabled');
    }

  });

  $('.status-switch').bootstrapSwitch({size: 'large', handleWidth: 30, labelWidth: 5});

  $('.status-switch').on('switchChange.bootstrapSwitch', function(event, state) {

    if(state == true) {
      $('.dsn-setting').removeClass('disabled');
      $('.dsn-public-setting').removeClass('disabled');
    }else{
      $('.dsn-setting').addClass('disabled');
      $('.dsn-public-setting').addClass('disabled');
    }

  });

  $('.voip-status-switch').bootstrapSwitch({size: 'large', handleWidth: 30, labelWidth: 5});

  $('.voip-status-switch').on('switchChange.bootstrapSwitch', function(event, state) {

    if(state == true) {
      $('.voip-trunk-setting').removeClass('disabled');
      $('.voip-name-setting').removeClass('disabled');
    }else{
      $('.voip-trunk-setting').addClass('disabled');
      $('.voip-name-setting').addClass('disabled');
    }

  });

  var src_logo = $('.img-logo').attr('src');

  var url_logo_split = src_logo.split('/');

  if (url_logo_split[url_logo_split.length-1] == 'logo.png') {
    $('.saveGeneral .btn-danger').addClass('remove-logo');
  }

  $('.remove-logo-button').click(function () {

    $('.img-logo').attr('src', '/assets/img/logo.png');
    $('.logo-removed').val('Removed Logo');
    $('.saveGeneral .btn-danger').addClass('remove-logo');

  });

  function readFile(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (ev) {
        $('.img-logo').attr('src', ev.target.result);
        $('.saveGeneral .btn-danger').removeClass('remove-logo');
      }
      reader.readAsDataURL(input.files[0]);
    }

  }

  $('#upload-logo').on('change', function () { readFile(this); });

  $('*[name="voip_default_account"]').select2({
    allowClear: true,
    placeholder: __('All voip accounts'),
    width: '100%',
    language: languageName.substring(0, 2)
  });

  $('.advanced-filter-switch').bootstrapSwitch({size: 'large', handleWidth: 30, labelWidth: 5});

  $('*[name="application_default_language"]').select2({
    allowClear: true,
    placeholder: __('Default language'),
    width: '100%',
    language: languageName.substring(0, 2)
  });

  $('.animations-switch').bootstrapSwitch({size: 'large', handleWidth: 30, labelWidth: 5});

  $('*[name="application_theme_color"]').select2({
    allowClear: true,
    placeholder: __('Select theme color'),
    width: '100%',
    language: languageName.substring(0, 2)
  });

  var src_logo = $('.login-background').attr('src');

  var url_logo_split = src_logo.split('/');

  if (url_logo_split[url_logo_split.length-1] == 'background.jpg') {
    $('.saveUI .btn-danger').addClass('remove-login-background-button');
  }

  $('.file-remove-login-background-button').click(function () {

    if (checkSession() === false) { return false; }

    $('.login-background').attr('src', '/assets/img/background.jpg');
    $('.login-background-removed').val('Removed Login Background');
    $('.saveUI .btn-danger').addClass('remove-login-background-button');

  });

  function readFileLogin(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (ev) {
        $('.login-background').attr('src', ev.target.result);
        $('.saveUI .btn-danger').removeClass('remove-login-background-button');
      }
      reader.readAsDataURL(input.files[0]);
    }

  }

  $('#upload-login-background').on('change', function () { readFileLogin(this); });

  /**
  * Warning settings save data
  **/

  // General Settings
  var gsImgLogo;
  var gsAppUrlLogo;
  var gsAppURL;
  var gsAppTitle;
  var gsAppDefLng;
  var gsAppAdvFilter;

  gsImgLogo = gsAppUrlLogo = gsAppURL = gsAppTitle = gsAppDefLng = gsAppAdvFilter = false;

  $('#upload-logo').click(function() {

    if (checkSession() === false) { return false; }

    logo = $('.img-logo').attr('src');

    $('.img-logo').on('load', function () {

      // Display the warning if src image is not default logo
      if ($('.img-logo').attr('src').indexOf('assets/img/logo.png') <= 0 || logo != $('.img-logo').attr('src')) {
        $('.warning-general-settings').css('opacity', '1');
        gsImgLogo = true;
      } else {
        gsImgLogo = false;
      }

      if (gsImgLogo == false && gsAppUrlLogo == false && gsAppURL == false && gsAppTitle == false && gsAppDefLng == false && gsAppAdvFilter == false) {
        $('.warning-general-settings').css('opacity', '0');
      }

    });

  });

  logo = $('.img-logo').attr('src');
  $('.remove-logo-button').click(function() {

    if (checkSession() === false) { return false; }

    $('.img-logo').on('load', function () {

      // Display the warning if src image is not default logo
      if (logo != $('.img-logo').attr('src')) {
        $('.warning-general-settings').css('opacity', '1');
        gsImgLogo = true;
      } else {
        gsImgLogo = false;
      }

      if (gsImgLogo == false && gsAppUrlLogo == false && gsAppURL == false && gsAppTitle == false && gsAppDefLng == false && gsAppAdvFilter == false) {
        $('.warning-general-settings').css('opacity', '0');
      }

    });

  });

  currentState = $('*[name="application_url_auto"]').bootstrapSwitch('state');
  $('*[name="application_url_auto"]').on('switchChange.bootstrapSwitch', function(event, state) {

    if (currentState !== state) {
      $('.warning-general-settings').css('opacity', '1');
      gsAppUrlLogo = true;
    } else {
      gsAppUrlLogo = false;
    }

    if (gsImgLogo == false && gsAppUrlLogo == false && gsAppURL == false && gsAppTitle == false && gsAppDefLng == false && gsAppAdvFilter == false) {
      $('.warning-general-settings').css('opacity', '0');
    }

  });

  // If current state of switch is FALSE and url input is changed
  if (currentState == false) {

    // Old value
    appUrl = $('*[name="application_url"]').val();
    $('*[name="application_url"]').on('input', function() {
      // If old value and new value is not same, then set the warning
      if (appUrl !== $(this).val()) {
        $('.warning-general-settings').css('opacity', '1');
        gsAppURL = true;
      } else {
        gsAppURL = false;
      }
    });

    if (gsImgLogo == false && gsAppUrlLogo == false && gsAppURL == false && gsAppTitle == false && gsAppDefLng == false && gsAppAdvFilter == false) {
      $('.warning-general-settings').css('opacity', '0');
    }

  }

  appTitle = $('*[name="application_title"]').val();
  $('*[name="application_title"]').on('input', function() {

    // If old value and new value is not same, then set the warning
    if (appTitle !== $(this).val()) {
      $('.warning-general-settings').css('opacity', '1');
      gsAppTitle = true;
    } else {
      gsAppTitle = false;
    }

    if (gsImgLogo == false && gsAppUrlLogo == false && gsAppURL == false && gsAppTitle == false && gsAppDefLng == false && gsAppAdvFilter == false) {
      $('.warning-general-settings').css('opacity', '0');
    }

  });

  language = $('*[name="application_default_language"]').val();
  $('*[name="application_default_language"]').change(function() {

    if (language !== $(this).val()) {
      $('.warning-general-settings').css('opacity', '1');
      gsAppDefLng = true;
    } else {
      gsAppDefLng = false;
    }

    if (gsImgLogo == false && gsAppUrlLogo == false && gsAppURL == false && gsAppTitle == false && gsAppDefLng == false && gsAppAdvFilter == false) {
      $('.warning-general-settings').css('opacity', '0');
    }

  });

  appAdvFilterState = $('*[name="application_advanced_filter"]').bootstrapSwitch('state');
  $('*[name="application_advanced_filter"]').on('switchChange.bootstrapSwitch', function(event, state) {

    if (appAdvFilterState !== state) {
      $('.warning-general-settings').css('opacity', '1');
      gsAppAdvFilter = true;
    } else {
      gsAppAdvFilter = false;
    }

    if (gsImgLogo == false && gsAppUrlLogo == false && gsAppURL == false && gsAppTitle == false && gsAppDefLng == false && gsAppAdvFilter == false) {
      $('.warning-general-settings').css('opacity', '0');
    }

  });

  // Voip

  voipAccount = $('*[name="voip_default_account"]').val();
  $('*[name="voip_default_account"]').change(function() {

    if (voipAccount !== $(this).val()) {
      $('.warning-voip').css('opacity', '1');
    } else {
      $('#warning-voip').css('opacity', '0');
    }

  });

  // User Interface
  var uiThemeColor;
  var uiAnimations;
  var uiLoginBackground;

  uiThemeColor = uiAnimations = uiLoginBackground = false;

  themeColor = $('*[name="application_theme_color"]').val();
  $('*[name="application_theme_color"]').change(function() {

    if (themeColor !== $(this).val()) {
      $('.warning-user-interface').css('opacity', '1');
      uiThemeColor = true;
    } else {
      uiThemeColor = false;
    }

    if (uiThemeColor == false && uiAnimations == false && uiLoginBackground == false) {
      $('.warning-user-interface').css('opacity', '0');
    }

  });

  animations = $('*[name="application_animations"]').bootstrapSwitch('state');
  $('*[name="application_animations"]').on('switchChange.bootstrapSwitch', function(event, state) {

    if (animations !== state) {
      $('.warning-user-interface').css('opacity', '1');
      uiAnimations = true;
    } else {
      uiAnimations = false;
    }

    if (uiThemeColor == false && uiAnimations == false && uiLoginBackground == false) {
      $('.warning-user-interface').css('opacity', '0');
    }

  });

  $('#upload-login-background').click(function() {

    if (checkSession() === false) { return false; }

    loginBg = $('.login-background').attr('src');
    $('.login-background').on('load', function () {

      // Display the warning if src image is not default logo
      if ($('.login-background').attr('src').indexOf('assets/img/background.jpg') <= 0 || loginBg != $('.login-background').attr('src')) {
        $('.warning-user-interface').css('opacity', '1');
        uiLoginBackground = true;
      } else {
        uiLoginBackground = false;
      }

      if (uiThemeColor == false && uiAnimations == false && uiLoginBackground == false) {
        $('.warning-user-interface').css('opacity', '0');
      }

    });

  });

  loginBg = $('.login-background').attr('src');
  var defaultSrc = '/assets/img/background.jpg';
  $('.file-remove-login-background-button').click(function() {

    if (checkSession() === false) { return false; }

    $('.login-background').on('load', function () {

      // Display the warning if src image is not default logo
      if (loginBg != defaultSrc || loginBg == defaultSrc) {
        $('.warning-user-interface').css('opacity', '1');
        uiLoginBackground = true;
      } else {
        uiLoginBackground = false;
      }

      if (uiThemeColor == false && uiAnimations == false && uiLoginBackground == false) {
        $('.warning-user-interface').css('opacity', '0');
      }

    });

  });

  // Developer
  var devSentry;
  var devDSN;
  var devDSNPublic;

  devSentry = devDSN = devDSNPublic = false;

  sentryStatus = $('*[name="application_sentry_status"]').bootstrapSwitch('state');
  $('*[name="application_sentry_status"]').on('switchChange.bootstrapSwitch', function(event, state) {

    if (sentryStatus !== state) {
      $('.warning-developer').css('opacity', '1');
      devSentry = true;
    } else {
      devSentry = false;
    }

    if (devSentry == false && devDSN == false && devDSNPublic == false) {
      $('.warning-developer').css('opacity', '0');
    }

  });

  if (sentryStatus == false) {

    // Old value
    dns = $('*[name="application_sentry_dsn"]').val();
    $('*[name="application_sentry_dsn"]').on('input', function() {
      // If old value and new value is not same, then set the warning
      if (dns !== $(this).val()) {
        $('.warning-developer').css('opacity', '1');
        devDSN = true;
      } else {
        devDSN = false;
      }
    });

    dnsPublic = $('*[name="application_sentry_dsn_public"]').val();
    $('*[name="application_sentry_dsn_public"]').on('input', function() {
      // If old value and new value is not same, then set the warning
      if (dnsPublic !== $(this).val()) {
        $('.warning-developer').css('opacity', '1');
        devDSNPublic = true;
      } else {
        devDSNPublic = false;
      }
    });

    if (devSentry == false && devDSN == false && devDSNPublic == false) {
      $('.warning-developer').css('opacity', '0');
    }

  }

  dns = $('*[name="application_sentry_dsn"]').val();
  $('*[name="application_sentry_dsn"]').on('input', function() {

    // If old value and new value is not same, then set the warning
    if (dns !== $(this).val()) {
      $('.warning-developer').css('opacity', '1');
      devDSN = true;
    } else {
      devDSN = false;
    }
    if (devSentry == false && devDSN == false && devDSNPublic == false) {
      $('.warning-developer').css('opacity', '0');
    }

  });

  dnsPublic = $('*[name="application_sentry_dsn_public"]').val();
  $('*[name="application_sentry_dsn_public"]').on('input', function() {

    // If old value and new value is not same, then set the warning
    if (dnsPublic !== $(this).val()) {
      $('.warning-developer').css('opacity', '1');
      devDSNPublic = true;
    } else {
      devDSNPublic = false;
    }
    if (devSentry == false && devDSN == false && devDSNPublic == false) {
      $('.warning-developer').css('opacity', '0');
    }

  });

});

function settingPasswordVerification(form_selector, target, modal) {

  if (checkSession() === false) { return false; }

  formCallback = function saveSetting() {
    $('*[data-dismiss="modal"]').trigger('click');
    $('.formToken').val(Cookies.get('token'));
    submit_form(form_selector, target);
  }

  js_modal(
    modal,
    'app/passwordVerification'
  );

}

// The callback function
initSettingsVariables = function settingsVariables() {

  logo = $('.img-logo').attr('src');
  currentState = $('*[name="application_url_auto"]').bootstrapSwitch('state');
  appUrl = $('*[name="application_url"]').val();
  appTitle = $('*[name="application_title"]').val();
  language = $('*[name="application_default_language"]').val();
  appAdvFilterState = $('*[name="application_advanced_filter"]').bootstrapSwitch('state');

  voipAccount = $('*[name="voip_default_account"]').val();

  themeColor = $('*[name="application_theme_color"]').val();
  animations = $('*[name="application_animations"]').bootstrapSwitch('state');
  loginBg = $('.login-background').attr('src');
  sentryStatus = $('*[name="application_sentry_status"]').bootstrapSwitch('state');
  dns = $('*[name="application_sentry_dsn"]').val();
  dnsPublic = $('*[name="application_sentry_dsn_public"]').val();

}
