<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function index()
	{
		$this->load->database();
		$db = $this->db->query('select * from person')->result_array();

		$this->load->view('welcome_message',
			[
				'welcome_message' => $db[0]['person_id']
			]
		);
	}
}
