<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Produse extends CI_Controller {

	function __construct() {

        parent::__construct();
		$this->load->database();
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
        $root_upload_path = './files/images/';
        //check if root path exists and if not create
        if (!is_dir($root_upload_path)) {
            if (!mkdir($root_upload_path, 0777, TRUE) || !is_dir($root_upload_path)) {
            return false;
            }
        }
        //load form validation library
        $this->load->library('form_validation');
        $this->load->library('upload');
        $this->load->helper("security"); 

        //set rules for every input
        $this->form_validation->set_rules('source_cte_required',  __('CTE Vizibil'), 'required'); 
        $this->form_validation->set_rules('source_key',  __('Cheia sursei'), 'required');
        $this->form_validation->set_rules('source_name',  __('Nume sursa'), 'required');
        $this->form_validation->set_message('required',  __('Campul "{field}" este obligatoriu.'));
        $this->form_validation->set_rules('source_sms_sender', __('SMS Sender'), 'alpha_numeric|max_length[10]');
        $this->form_validation->set_message('max_length[10]', __('%s:the maximum of characters is 10'));
        $this->form_validation->set_message('alpha_numeric', __('Campul nu trebuie sa contina spatii sau caractere speciale.'));
        $this->form_validation->set_error_delimiters('<div class="alert alert-danger">', '</div>');

        //upload file 
        if ($this->form_validation->run() == false) {
            // Load the sources add view
            $this->load->view(
            'sources/add.php'
          );
        } else {
            $key =$this->input->post('source_key');
            $checkKey = $this->sources_model->checkKey($this->input->post('source_key'));
            
            $oldData = array(
                'source_key'        => $checkKey,
                'source_file_name'  =>$this->input->post('source_file_name'),
                'source_file_size'  => ($_FILES['source_file_name']['size']/100).'KB',
                'source_name'       => $this->input->post('source_name'),
                'source_url'        => $this->input->post('source_url'),
                'source_sms_sender' => $this->input->post('source_sms_sender'),
                'source_coupon_required'      => $this->input->post('source_coupon_required')
                 );

            //if validation passed prepare data for insert
            if($checkKey == NULL && $_FILES['source_file_name']['name'] != NULL ){

                $config['upload_path']   = './files/sourceLogos';
                $config['allowed_types'] = 'gif|jpg|png';
                $config['max_size']      = $this->config->item('source_file_size'); // kb
                $config['file_name']     = md5($key.rand());
                $this->load->library('upload', $config);
                $this->upload->initialize($config);
                if ( ! $this->upload->do_upload('source_file_name'))
                {
                    if(strip_tags($this->upload->display_errors())=='upload_invalid_filesize'){             
                        $this->push_error('danger', __('Fisierul introdus depaseste marimea de ').$this->config->item('source_file_size').'KB.');
                    }elseif(strip_tags($this->upload->display_errors())=='upload_invalid_filetype')
                    {
                        $this->push_error('danger', __('Fisierul introdus trebuie sa contina extensia ').$config['allowed_types']);
                    }else{
                        $this->push_error('danger', __('Eroare la incarcarea fisierului! '.$this->upload->display_errors()));
                    }
                    return $this->load->view(
                        'sources/add.php',
                        ['data' =>  $oldData] 
                      );
                }
                else
                { 
                    $dataFile = array('upload_dataFile' => $this->upload->data());
                    
                }
                $data = array(
                    'source_key'                 => $key,
                    'source_file_name'           => $config['file_name'].$dataFile['upload_dataFile']['file_ext'],
                    'source_file_size'           => ($_FILES['source_file_name']['size']/1024).'KB',
                    'source_name'                => $this->input->post('source_name'),
                    'source_url'                 => $this->input->post('source_url'),
                    'source_sms_sender'          => $this->input->post('source_sms_sender'),
                    'source_coupon_required'     => $this->input->post('source_coupon_required'),
                    'source_cte_required'        => $this->input->post('source_cte_required')
                );
                // try to insert source
                if ($source_id=$this->sources_model->insertSource($data)) {
                
                    //if insert ok push success error and redirect to sources list;
                    $this->push_error('success', __('Sursa a fost adaugata cu succes!'));

                    // Log the action
                    $auditId = $this->audit_model->log([
                        'log_action'             => 'aggiunto.fonte',
                        'log_user'               => $this->session->user_name,
                        'log_target_entity_type' => 'oferte',
                        'log_target_entity_id'   => $source_id,
                        'log_value'              => json_encode($data)
                    ]);
                    header('Location: '.$this->config->item('base_url').'sources/list');
                } else {
                    //if insert error push danger error and redirect to sources list;
                    $this->push_error('danger', __('A aparut o eroare in procesul de adaugare al sursei. Incercati din nou!'));
                    header('Location: '.$this->config->item('base_url').'sources/list');
                }
        }
        else{
            // key invalid
            if($_FILES['source_file_name']['name'] == NULL){
                $this->push_error('danger', __('Campul "Fisier" este obligatoriu.')); 
            }else{
                $this->push_error('danger', __('Aceasta cheie exista deja!'));
            }
            $this->load->view(
                'sources/add.php',
                ['data' =>  $oldData] 
              );
        }
     }
    }

    //err_type (success,danger,info,etc)
private function push_error($err_type, $err_message)
{
    $this->session->set_flashdata('err_type', $err_type);
    $this->session->set_flashdata('err_message', $err_message);
}

}