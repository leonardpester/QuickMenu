<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Produse extends CI_Controller {

	function __construct() {

        parent::__construct();
		$this->load->database();
        $this->load->model('produse_model');
        $this->load->model('aplicatie_model');
    }
    
	public function index()
	{
		$this->load->view('produse/index');
    }  

    public function adaugaProdus()
	{
		$this->load->view('produse/add');
    } 

    public function stoc()
	{
         $product=$this->aplicatie_model->getAllProduct();
         //when 0 produs
         if(!$product) {
             $product = array();
         }
 
         // Load the produs list view
         $this->load->view(
             'produse/stoc.php',
             ['produse' => $product]
           );
    }  

    public function addAction()
    {
    
        //load form validation library
        $this->load->library('form_validation');
        $this->load->library('upload');
        $this->load->helper("security"); 

        $data = array(
            'produs_nume'       => $this->input->post('produs_nume'),
            'produs_descriere'  => $this->input->post('produs_descriere'),
            'produs_stoc'       => $this->input->post('produs_stoc'),
            'produs_pret'       => $this->input->post('produs_pret'),
        );
       
        // try to insert source
        if ($produs_id=$this->produse_model->insertProduct($data)) {
        
            //if insert ok push success error and redirect to sources list;
         
            header('Location: '.$this->config->item('base_url').'index.php/admin/list');
        } else {
            //if insert error push danger error and redirect to sources list;
            header('Location: '.$this->config->item('base_url').'index.php/produse/adaugaProdus');
        }


     }

}