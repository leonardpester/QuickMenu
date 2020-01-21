<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Meniu extends CI_Controller {

	function __construct() {

        parent::__construct();
		$this->load->database();
        $this->load->model('meniu_model');
        $this->load->model('aplicatie_model');
        $this->load->library('form_validation');
        $this->load->library('upload');
        $this->load->helper("security");
    }
    
	public function index()
	{
		$this->load->view('meniu/index');
    }  

    public function adaugaMeniu()
	{
		$this->load->view('meniu/add');
    } 

    public function meniu()
	{
         $meniu=$this->meniu_model->getAllMenus();
         //when 0 produs
         if(!$meniu) {
             $meniu = array();
         }
 
         // Load the produs list view
         $this->load->view(
             'meniu/index.php',
             ['meniuri' => $meniu]
           );
    }  

    public function addAction()
    {
         $data = array(
                'meniu_nume'          =>$this->input->post('meniu_nume'),
                'meniu_descriere'     =>$this->input->post('meniu_descriere'),
                'meniu_pret'          =>$this->input->post('meniu_pret'),
                'meniu_categorie'     =>$this->input->post('meniu_categorie'),
                'meniu_ingrediente'   =>$this->input->post('meniu_ingrediente')
            );
       
        // try to insert source
        if ($meniu_id = $this->meniu_model->insertMenu($data)) {
        
            //if insert ok push success error and redirect to sources list;
         
            header('Location: '.$this->config->item('base_url').'index.php/meniu/meniu');
        } else {
            //if insert error push danger error and redirect to sources list;
            header('Location: '.$this->config->item('base_url').'index.php/meniu/addAction');
        }


     }

    public function edit($meniu_id)
    {
        $meniu=$this->meniu_model->getMenuById($meniu_id);

        if(!$meniu){
            header('Location: '.$this->config->item('base_url').'admin/list');
            exit();
        }

        $this->load->view(
            'meniu/edit.php',
            ['meniu' => $meniu, 'post' => 0]
          );
    }

    public function editAction()
    {
        
        $this->form_validation->set_rules('meniu_nume',  'Nume produs', 'required'); 
        $this->form_validation->set_rules('meniu_descriere',  'Nume produs', 'required'); 
        $this->form_validation->set_rules('meniu_pret',  'Nume produs', 'required'); 
        $this->form_validation->set_rules('meniu_categorie',  'Nume produs', 'required');        
        $this->form_validation->set_message('required',  'Campul "{field}" este obligatoriu.');
        $meniu_id = $this->input->post('meniu_id');
       
        //validate inputs
        if ($this->form_validation->run() == false) {
            // Load the edit source view
            $this->load->view(
            'meniu/edit.php',
            ['meniu' => $this->meniu_model->getProductById($meniu_id), 'post' => 1]
          );
        } else {
          
            
            $data = array(
                'meniu_nume'          =>$this->input->post('meniu_nume'),
                'meniu_descriere'     =>$this->input->post('meniu_descriere'),
                'meniu_pret'          =>$this->input->post('meniu_pret'),
                'meniu_categorie'     =>$this->input->post('meniu_categorie'),
                'meniu_ingrediente'  =>$this->input->post('meniu_ingrediente')
            );
            
            // try to update source
            if ($this->meniu_model->updateMenu($meniu_id, $data)) {
                header('Location: '.$this->config->item('base_url').'index.php/meniu/meniu');
            } else {
                header('Location: '.$this->config->item('base_url').'index.php/meniu/meniu');
            }
        }
    }

    //delete product
    public function delete($meniu_id)
    {
        if ($this->meniu_model->deleteMenu($meniu_id)) {
               header('Location: '.$this->config->item('base_url').'index.php/meniu/meniu');;
        } else {
            echo 'Fail';
        }
     
    }

   


}