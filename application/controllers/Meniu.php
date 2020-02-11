<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Meniu extends CI_Controller {

	function __construct() {

        parent::__construct();
		$this->load->database();
        $this->load->model('meniu_model');
        $this->load->model('aplicatie_model');
        $this->load->model('produse_model');
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
        $categorii=$this->meniu_model->getAllCategory();
        $produse=$this->aplicatie_model->getAllProduct();

		$this->load->view('meniu/add',
            [
                'produse'   => $produse,
                'categorii' => $categorii
            ]
        );
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
            [
                'meniuri'   => $meniu
            ]
        );
    }  

    public function addAction()
    {
         $data = array(
                'meniu_nume'          =>$this->input->post('meniu_nume'),
                'meniu_pret'          =>$this->input->post('meniu_pret'),
                'meniu_categorie'     =>$this->input->post('meniu_categorie'),
                'meniu_ingrediente'   =>implode(",",$this->input->post('meniu_ingrediente')),
        );

        $meniu_avatar = explode(".",$_FILES['meniu_avatar']['name'])[1];
    
        // try to insert menu
        if ($meniu_id = $this->meniu_model->insertMenu($data)) {
        
            $meniu_avatar = $meniu_id.".".$meniu_avatar;
            $config['upload_path']   = './files/images';
            $config['allowed_types'] = 'gif|jpg|png';
            $config['file_name']     = $meniu_avatar;
            $this->load->library('upload', $config);
            $this->upload->initialize($config);
                
         
            if ( ! $this->upload->do_upload('meniu_avatar'))
            {
                header('Location: '.$this->config->item('base_url').'index.php/meniu/addAction');
            }
            else
            { 
                $dataFile = array('upload_dataFile' => $this->upload->data());
                $dataAvatar = [
                    'meniu_avatar' => $meniu_avatar
                ];
                $this->meniu_model->updateAvatar($meniu_id,$dataAvatar);
                
            }

            //if insert ok push success error and redirect to menu list;
            header('Location: '.$this->config->item('base_url').'index.php/meniu/meniu');
        } else {
            //if insert error push danger error and redirect to menu list;
            header('Location: '.$this->config->item('base_url').'index.php/meniu/addAction');
        }
    }

    public function edit($meniu_id)
    {
        $categorii = $this->meniu_model->getAllCategory();
        $meniu = $this->meniu_model->getMenuById($meniu_id);
        $produse = $this->aplicatie_model->getAllProduct();
        if(!$meniu){
            header('Location: '.$this->config->item('base_url').'admin/list');
            exit();
        }

        $produseMeniu = explode(",",$this->meniu_model->getProductByMenu($meniu_id));
        $this->load->view(
            'meniu/edit.php',
            ['meniu' => $meniu,'produseMeniu' => $produseMeniu,'produse' => $produse, 'post' => 0, 'categorii' => $categorii]
          );
    }

    

    public function editAction()
    {
       
        $this->form_validation->set_rules('meniu_nume',  'Nume produs', 'required'); 
        $this->form_validation->set_rules('meniu_pret',  'Pret produs', 'required'); 
        $this->form_validation->set_rules('meniu_categorie',  'Categorie produs', 'required');        
        $this->form_validation->set_message('required',  'Campul "{field}" este obligatoriu.');
        $meniu_id = $this->input->post('meniu_id');
       
        //validare date
        if ($this->form_validation->run() == false) {
            //incarca un produs
            $this->load->view(
            'meniu/edit.php',
            ['meniu' => $this->meniu_model->getProductById($meniu_id), 'post' => 1]
          );
        } else {
            $data = array(
                'meniu_nume'          => $this->input->post('meniu_nume'),
                'meniu_pret'          => $this->input->post('meniu_pret'),
                'meniu_categorie'     => $this->input->post('meniu_categorie'),
                'meniu_ingrediente'   => implode(",",$this->input->post('meniu_ingrediente')),
            );

            $database_avatar = $this->meniu_model->getAvatarById($meniu_id);
            if($_FILES['meniu_avatar']['name']!=""){
                $meniu_avatar = explode(".",$_FILES['meniu_avatar']['name'])[1];
                $meniu_avatar = $meniu_id.".".$meniu_avatar;
                $config['upload_path']   = './files/images';
                $config['allowed_types'] = 'gif|jpg|png';
                $config['file_name']     = $meniu_avatar;
                $this->load->library('upload', $config);
                $this->upload->initialize($config);

                if($database_avatar!= NULL){
                    $myFile = "./files/images/".$database_avatar;
                    if(file_exists($myFile)){
                        unlink($myFile) or die("Couldn't delete file");
                    }
                }

                if ( ! $this->upload->do_upload('meniu_avatar'))
                {
                    header('Location: '.$this->config->item('base_url').'index.php/meniu/addAction');
                }
                else
                { 
                    $dataFile = array('upload_dataFile' => $this->upload->data());
                    $data['meniu_avatar'] = $meniu_avatar;
                }    
            }
            
            // try to update source
            if ($this->meniu_model->updateMenu($meniu_id, $data)) {
                header('Location: '.$this->config->item('base_url').'index.php/meniu/meniu');
            } else {
                header('Location: '.$this->config->item('base_url').'index.php/meniu/meniu');
            }
        }
    }

    //delete menu
    public function delete($meniu_id)
    {
        $meniu_avatar = $this->meniu_model->getAvatarById($meniu_id);
        if ($this->meniu_model->deleteMenu($meniu_id)) {
            if($meniu_avatar!= NULL) {
                $myFile = "./files/images/".$meniu_avatar;
                if(file_exists($myFile)){
                    unlink($myFile) or die("Couldn't delete file");
                }
            }

            header('Location: '.$this->config->item('base_url').'index.php/meniu/meniu');;
        } else {
            echo 'Fail';
        }
    }
}