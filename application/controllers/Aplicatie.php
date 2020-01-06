<?php
/**
 * @mixin @offers_model
 */
defined('BASEPATH') or exit('No direct script access allowed');
class Aplicatie extends APP_Controller
{
    public function __construct()
    {
        parent::__construct();
        //load the produss model
        $this->load->database();
        $this->load->model('aplicatie_model');
        $this->load->helper(array('form', 'url'));
    }

    public function index()
    {
        $this->list();
    }

    //get all produs
    public function list()
    {
         $product=$this->aplicatie_model->getAllProduct();
         //when 0 produs
         if(!$product) {
             $product = array();
         }
 
         // Load the produs list view
         $this->load->view(
             'aplicatie/index.php',
             ['produse' => $product]
           );
    }

}