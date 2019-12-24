
var current_calls, calls_traffic, trafficTable;
var doLogout = false;

$(document).ready(function() {

  var config = {
    // Replace this IP address with your Asterisk IP address
    uri: '1060@91.231.0.151',

    // Replace this IP address with your Asterisk IP address,
    // and replace the port with your Asterisk port from the http.conf file
    ws_servers: 'ws://91.231.0.151:8088/ws',

    // Replace this with the username from your sip.conf file
    authorizationUser: '1060',

    // Replace this with the password from your sip.conf file
    password: 'password',

    // HackIpInContact for Asterisk
    hackIpInContact: true,

    // rtcpMuxPolicy for Asterisk
    rtcpMuxPolicy: 'negotiate',

  };

  var ua = new SIP.UA(config);

  // Invite with audio only
  ua.invite('1061',{
    media: {
      constraints: {
        audio: true,
        video: false
      }
    }
  });

});
