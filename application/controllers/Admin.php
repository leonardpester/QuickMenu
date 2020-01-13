<?php
/**
 * @mixin @admin_model
 */
defined('BASEPATH') or exit('No direct script access allowed');
class Admin extends APP_Controller
{
    public function __construct()
    {
        parent::__construct();
        //load the produss model
        $this->load->database();
        $this->load->model("admin_model");
        $this->load->helper(array('form', 'url'));
    }

    public function index()
    {
        $this->login();
    }

    public function login()
    {
        $password = $this->input->post('password');
        $passwordDB = $this->admin_model->getPassword();
        if(strlen($password)==0){
            echo '<div class="alert alert-danger">Parola nu poate fi goala!</div>';
            return false;
        }else{
            
            if($password==$passwordDB[0]->password){
                // header('Location: '.$this->config->item('base_url').'index.php/admin/list');
                echo 'Success';
            }else{
                echo '<div class="alert alert-danger">Parola nu corespunde!</div>';  
                return false;
            }
        }
        return true;
    }
    
    public function list(){
        $this->load->view(
            'admin/index.php'
          );
    }
    


}