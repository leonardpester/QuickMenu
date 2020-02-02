<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Comenzi extends CI_Controller {

	function __construct() {

        parent::__construct();
		$this->load->database();
		$this->load->model('comenzi_model');
    }
    
	public function index()
	{
		$this->load->view('comenzi/index');
    }  

	public function comenzi_finalizate(){
		$comenzi=$this->comenzi_model->getAllComenziRemove1();
		//when 0 comenzi
		if(!$comenzi) {
			$comenzi = array();
		}
		$this->load->view('comenzi/comenzi_finalizate',[
			'comenzi' => $comenzi
		]);
	}

	public function comenzi_primite(){
		$comenzi=$this->comenzi_model->getAllComenzi();
		//when 0 comenzi
		if(!$comenzi) {
			$comenzi = array();
		}
		$this->load->view('comenzi/comenzi_primite',[
							'comenzi' => $comenzi
						]);
	}

	public function comenzi($comanda_id){
		$comanda = $this->comenzi_model->getComandaById($comanda_id);
		$strings = json_decode($comanda->comanda_comanda);
		$strings = array_count_values($strings);
		$data = [];
		foreach($strings as $key=>$string){
			$data[$key] = [
				'comanda_nume' 	 => $key,
				'comanda_bucati' => $string
			];
		}
		$data = json_encode(array_values($data));
		$final = [
			'nume'		 	 => $data,
			'total_pret' 	 => $comanda->comanda_total_pret,
			'masa'		 	 => $comanda->comanda_masa,
			'comanda_id' 	 => $comanda->comanda_id,
			'comanda_remove' => $comanda->comanda_remove
		];
		$this->load->view('comenzi/comanda',[
			'comanda' => $final
		]);
	}

	public function comanda_finalizata($comanda_id){
		$data = [
			'comanda_id'	 => $comanda_id,
			'comanda_remove' => 1	
		];
		$this->comenzi_model->changeComandaRemove1($data,$comanda_id);
		header('Location: '.$this->config->item('base_url').'index.php/comenzi/comenzi_primite');
	}
}