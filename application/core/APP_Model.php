<?php

defined('BASEPATH') or exit('No direct script access allowed');

class APP_Model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
        // Construct the parent
        parent::__construct();
    }
}
