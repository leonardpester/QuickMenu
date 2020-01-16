<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Produse extends CI_Controller {

	function __construct() {

        parent::__construct();
		$this->load->database();
        $this->load->model('produse_model');
        $this->load->model('aplicatie_model');
        $this->load->library('form_validation');
        $this->load->library('upload');
        $this->load->helper("security");
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
        $data = array(
            'produs_nume'       => $this->input->post('produs_nume'),
            'produs_descriere'  => $this->input->post('produs_descriere'),
            'produs_stoc'       => $this->input->post('produs_stoc'),
            'produs_pret'       => $this->input->post('produs_pret'),
            'produs_cantitate'    =>$this->input->post('produs_cantitate')
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

    public function edit($produs_id)
    {
        $produs=$this->produse_model->getProductById($produs_id);

        if(!$produs){
            header('Location: '.$this->config->item('base_url').'admin/list');
            exit();
        }

        $this->load->view(
            'produse/edit.php',
            ['produs' => $produs, 'post' => 0]
          );
    }

    public function editAction()
    {
        
        $this->form_validation->set_rules('produs_nume',  'Nume produs', 'required'); 
        $this->form_validation->set_rules('produs_descriere',  'Descriere produs', 'required');       
        $this->form_validation->set_rules('produs_stoc', 'Stoc', 'required');
        $this->form_validation->set_rules('produs_pret', 'Pret', 'required');
        $this->form_validation->set_message('required',  'Campul "{field}" este obligatoriu.');
        $produs_id = $this->input->post('produs_id');
       
        //validate inputs
        if ($this->form_validation->run() == false) {
            // Load the edit source view
            $this->load->view(
            'produse/edit.php',
            ['produs' => $this->produse_model->getProductById($produs_id), 'post' => 1]
          );
        } else {
          
            
            $data = array(
                'produs_nume'         =>$this->input->post('produs_nume'),
                'produs_descriere'    =>$this->input->post('produs_descriere'),
                'produs_stoc'         =>$this->input->post('produs_stoc'),
                'produs_pret'         =>$this->input->post('produs_pret'),
                'produs_cantitate'    =>$this->input->post('produs_cantitate')
            );
            
            // try to update source
            if ($this->produse_model->updateProduct($produs_id, $data)) {
                header('Location: '.$this->config->item('base_url').'index.php/produse/stoc');
            } else {
                header('Location: '.$this->config->item('base_url').'index.php/produse/stoc');
            }
        }
    }

    //delete product
    public function delete($produs_id)
    {
        if ($this->produse_model->deleteProduct($produs_id)) {
               header('Location: '.$this->config->item('base_url').'index.php/produse/stoc');;
        } else {
            echo 'Fail';
        }
     
    }

   


}