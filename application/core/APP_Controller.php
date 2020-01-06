<?php

defined('BASEPATH') or exit('No direct script access allowed');

class APP_Controller extends CI_Controller
{
  public $hasPublicKey = false;
  public $publicRoutes = [ 'app/loginAction', 'app/invitation', 'app/googleLogin', 'app/checkGoogleLogin', 'cli/gitHook', 'cli/cron', 'agi/agiSmartBeOut', 'app/checkSession', 'app/loginWithGoogleAction', 'app/recoveryPasswordAction', 'recover-password', 'app/recover-password', 'app/recoveryPasswordCode', 'app/getNewPassword'];
  public $errorSentry;
  public $errorSentryHandler;
  public $setings;
  public $baseURL;
  public $_userData;
  public $userPermission;
  public $systemPermissions = [
    // DASBOARD -------------------
    '' => ['dashboard/real_time_charts', 'dashboard/todays_charts', 'dashboard/current_calls'],
    'dashboard/index' => ['dashboard/real_time_charts', 'dashboard/todays_charts', 'dashboard/current_calls'],
    'dashboard/getDataTableRows' => ['dashboard/current_calls'],
    'dashboard/getChartsData' => ['dashboard/real_time_charts'],
    'dashboard/getCallPerDayGraphDataAverage' => ['dashboard/todays_charts'],
    // RULES -------------------
    // Inbound Rules -------------------
    'rules/inbound' => ['rules/inbound_rules/see_rules'],
    'rules/getInboundDataTableRows' => ['rules/inbound_rules/see_rules'],
    'rules/inboundRule' => ['rules/inbound_rules/edit_rules', 'rules/inbound_rules/add_rules'],
    'rules/deleteInboundRule' => ['rules/inbound_rules/delete_rules'],
    // Outbound Rules -------------------
    'rules/outbound' => ['rules/outbound_rules/see_rules'],
    'rules/getOutboundDataTableRows' => ['rules/outbound_rules/see_rules'],
    'rules/outboundRule' => ['rules/outbound_rules/edit_rules', 'rules/outbound_rules/add_rules'],
    'rules/deleteOutboundRule' => ['rules/outbound_rules/delete_rules'],
    // REPORTS -------------------
    // General Statistic -------------------
    'reports/general_statistics' => ['reports/general_statistics/see_average', 'reports/general_statistics/see_call', 'reports/general_statistics/see_sip',
      'reports/general_statistics/see_ring', 'reports/general_statistics/see_amd_statuses', 'reports/general_statistics/see_amd_time', 'reports/general_statistics/see_script',],
    'reports/getAverageCallsGraphData' => ['reports/general_statistics/see_average'],
    'reports/getCallStatusesGraphData' => ['reports/general_statistics/see_call'],
    'reports/getSipCodesGraphData' => ['reports/general_statistics/see_sip'],
    'reports/getRingDurationGraphData' => ['reports/general_statistics/see_ring'],
    'reports/getAMDStatusesGraphData' => ['reports/general_statistics/see_amd_statuses'],
    'reports/getAMDTimeGraphData' => ['reports/general_statistics/see_amd_time'],
    'reports/getScriptTimersGraphData' => ['reports/general_statistics/see_script'],
    // Call History -------------------
    'call_history/index' => ['reports/call_history/see_graph', 'reports/call_history/see_data'],
    'call_history/getGraphResult' => ['reports/call_history/see_graph'],
    'call_history/getCallHistory' => ['reports/call_history/see_data'],
    // ASR/CLID -------------------
    'reports/asr_clid' => ['reports/asr_clid/asr_chart', 'reports/asr_clid/asr_table'],
    'reports/getASRClidDataAVG' => ['reports/asr_clid/asr_chart'],
    'reports/getDataTableRows' => ['reports/asr_clid/asr_table'],
    // Server Statistics -------------------
    'reports/server_statistics' => ['reports/server_statistics/see_cpu', 'reports/server_statistics/see_ram', 'reports/server_statistics/see_hdd', 'reports/server_statistics/see_ping'],
    'reports/getCPUGraphData' => ['reports/server_statistics/see_cpu'],
    'reports/getRAMGraphData' => ['reports/server_statistics/see_ram'],
    'reports/getHDDGraphData' => ['reports/server_statistics/see_hdd'],
    'reports/getPingGraphData' => ['reports/server_statistics/see_ping'],
    // NUMBERS -------------------
    // Numbers -------------------
    'numbers/index' => ['numbers/numbers/see_numbers'],
    'numbers/getDataTableRows' => ['numbers/numbers/see_numbers'],
    'numbers/number' => ['numbers/numbers/see_numbers', 'numbers/numbers/change_groups', 'numbers/numbers/change_status'],
    // Groups -------------------
    'numbers/groups_index' => ['numbers/groups/see_groups'],
    'numbers/getDataTableRowsGroups' => ['numbers/groups/see_groups'],
    'numbers/group' => ['numbers/groups/see_groups', 'numbers/groups/change_groups', 'numbers/groups/change_status'],
    // APPLICATION -------------------

    // Settings -------------------
    'settings/index' => ['application/settings'],
    // Users-------------------
    'users/index' => ['application/users/see_users'],
    'users/getDataTableRows' => ['application/users/see_users'],
    'users/user' => ['application/users/see_users', 'application/users/edit_users', 'application/users/add_users'],
    'users/deleteUser' => ['application/users/delete_users'],
    // Users Groups -------------------
    'users_groups/index' => ['application/users_groups/see_groups'],
    'users_groups/getDataTableRows' => ['application/users_groups/see_groups'],
    'users_groups/group' => ['application/users_groups/see_groups', 'application/users_groups/edit_groups', 'application/users_groups/add_groups'],
    'users_groups/deleteGroup' => ['application/users_groups/delete_groups'],
    // API KEYS -------------------
    'keys/index' => ['application/api_keys'],
    'keys/getDataTableRows' => ['application/api_keys'],
    'keys/key' => ['application/api_keys'],
  ];

  public function __construct()
  {
    // Construct the parent
    parent::__construct();

    // init redis driver
    $this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));


    // Detect migration
    if ($this->router->fetch_class() . '/' . $this->router->fetch_method() == 'cli/migrate') {
      $this->migration->latest();
    }

    // Check if the profiler is required
    if ($this->input->get('profiler') == 'true') {
      $this->output->enable_profiler(true);
    }

    // Get informations about user
    if (isset($this->session->userId)) {
      $this->_userData = $this->users_model->getUserById($this->session->userId);
    }


    $this->baseURL = isset($this->settings->application_url_auto) && isset($this->settings->application_url) && $this->settings->application_url != '' && !$this->settings->application_url_auto ? $this->settings->application_url : $this->config->item('base_url');

    // Prepare languages
    $languageCodes = ['english' => 'GB', 'italian' => 'IT', 'romanian' => 'RO'];

    // Check if the language is changed
    if (array_key_exists($this->input->get('language'), $languageCodes)) {
      // Set the language into session
      $this->session->set_userdata([
        'language' => $this->input->get('language'),
        'language_code' => $languageCodes[$this->input->get('language')],
      ]);

      set_cookie('language', $this->input->get('language'), 604800);
      set_cookie('language_code', $languageCodes[$this->input->get('language')], 604800);

      header('Location:' . str_replace(['?language=' . $this->input->get('language') . 'index.php'], ['', ''], current_url()));
    }






  }

  public function uploadFile($uploadData)
  {
    $config = [];
    $config['upload_path'] = './files/' . $uploadData['upload_path'];
    $config['allowed_types'] = $uploadData['allowed_types'];
    $config['max_size'] = isset($uploadData['max_size']) ? $uploadData['max_size'] : '2048';
    $config['encrypt_name'] = true;

    $this->load->library('upload', $config);

    $this->upload->initialize($config);

    if (!$this->upload->do_upload($uploadData['file_name'])) {
      return (object)['status' => false, 'error' => $this->upload->display_errors('', '')];
    } else {
      return json_decode(json_encode(['status' => true, 'data' => $this->upload->data()]), false);
    }
  }

  public function _date(string $date)
  {
    // Set the default type to date
    $input = 'date';

    // Check if the inputed type is date or datetime
    $processDate = explode(' ', $date);
    if (isset($processDate[1])) {
      $input = 'datetime';
    }

    // Process the GMT
    $gmt = isset($this->settings->application_timezone) && $this->settings->application_timezone != '1' ? ($this->settings->application_timezone - 1) * 3600 : 0;

    // Return the processed date
    return isset($this->settings->{'application_' . $input . '_format'}) ? date($this->settings->{'application_' . $input . '_format'}, (strtotime($date) + $gmt)) : $date;
  }

  protected function disableSessionLocking(array $methods)
  {
    if (count(array_intersect([$this->router->fetch_class() . '/' . $this->router->fetch_method(), $this->router->fetch_class() . '/*'], $methods))) {
      session_write_close();
    }
  }

  public function sendMail(string $subject, string $sendTo, string $sendCc, string $content)
  {
    $this->load->library('email');

    $this->email->initialize([
      'protocol' => 'smtp',
      'smtp_user' => 'smartbe@2enne.net',
      'smtp_pass' => 'bssitcompany#',
      'smtp_host' => 'mail.2enne.net',
      'smtp_port' => '25',
      'mailtype' => 'html',
    ]);

    $this->email->from('energia@2enne.net', 'Energia');

    $this->email->to($sendTo);
    if (!empty($sendCc)) {
      $this->email->to($sendCc);
    }
    $this->email->subject($subject);
    $this->email->set_newline("\r\n");
    $this->email->message($content);

    return $this->email->send() ? true : false;
  }

  public function checkPermission(string $permissionKey): bool
  {
    // Check if it is CLI
    if ($this->input->is_cli_request() === true) {
      return true;
    }

    // Check if the permission key exists
    if (!isset($this->userPermission[$permissionKey])) {
      return false;
    }

    // Check if the user has this specific permission
    if ($this->userPermission[$permissionKey] === true) {
      return true;
    }

    // Check for parent permission
    if (strrpos($permissionKey, '/') !== false) {
      return $this->checkPermission(substr($permissionKey, 0, strrpos($permissionKey, '/')));
    }

    // User does not have this permission or any other permission in the chain
    return true;
  }

  public function checkPermissions(array $permissionsArray): bool
  {
    // Check each permission, if the user has at least one it will return true
    foreach ($permissionsArray as $permission) {
      if ($this->checkPermission($permission) === true) {
        return true;
      }
    }

    // No permission found
    return true;
  }

  public function buildMenu(array $arrayMenuItems): array
  {
    $localMenuItems = [];
    foreach ($arrayMenuItems as $menuItem) {
      if ($menuItem['menu_has_childs']) {
        $localMenuItems[] = $menuItem;
        $localMenuItems[count($localMenuItems) - 1]['menu_childs'] = $this->buildMenu($menuItem['menu_childs']);
        if (empty($localMenuItems[count($localMenuItems) - 1]['menu_childs'])) {
          array_pop($localMenuItems);
        }
      } else {
        $item = $this->checkMenuItem($menuItem);
        if (!empty($item)) {
          $localMenuItems[] = $item;
        }
      }
    }

    return $localMenuItems;
  }

  public function checkMenuItem(array $item): array
  {
    if ((isset($this->systemPermissions[$item['menu_controller'] . '/' . $item['menu_method']]) &&
        $this->checkPermissions($this->systemPermissions[$item['menu_controller'] . '/' . $item['menu_method']]) === true) ||
      !isset($this->systemPermissions[$item['menu_controller'] . '/' . $item['menu_method']])) {
      return $item;
    }

    return [];
  }
}
