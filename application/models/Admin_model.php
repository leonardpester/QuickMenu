<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Admin_model extends APP_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getPassword()
    {
        $var = $this->db
            ->select('*')
            ->from('users');
             return $var->get()->result();

    }
}