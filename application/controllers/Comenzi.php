<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Comenzi extends CI_Controller {

	function __construct() {

        parent::__construct();
		$this->load->database();
    }
    
	public function index()
	{
		$this->load->view('comenzi/index');
    }  

	public function comenzi_finalizate(){
		$this->load->view('comenzi/comenzi_finalizate');
	}

	public function comenzi_primite(){
		$this->load->view('comenzi/comenzi_primite');
	}
}