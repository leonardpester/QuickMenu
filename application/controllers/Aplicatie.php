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

        $meniu = [
            'mic_dejun'     => [],
            'gustari'       => [],
            'paste'         => [],
            'salate'        => [],
            'garnituri'     => [],
            'desert'        => [],
            'pui'           => [],
            'porc'          => [],
            'peste'         => [],
            'ciorbe'        => [],
            'pizza'         => [],
            'vinuri'        => [],
            'bere'          => [],
            'alcoolice'     => [],
            'racoritoare'   => [],
            'bauturi_calde' => [],
        ];
        
        foreach($product as $key=>$produs){
            

            switch ($produs) {
            case '1':
                $meniu['mic_dejun'][$key] = $produs;
                break;
            case '2':
                $meniu['gustari'][$key] = $produs;
                break;
            case '3':
                $meniu['paste'][$key] = $produs;
                break;
            case '4':
                $meniu['salate'][$key] = $produs;
                break;
            case '5':
                $meniu['garnituri'][$key] = $produs;
                break;
            case '5':
                $meniu['desert'][$key] = $produs;
                break;
            default:
                break;
            }
        }

         // Load the produs list view
         $this->load->view(
             'aplicatie/index.php',
             [
                'produse' => $product,
                'meniuri'   => $meniu
              ]
           );
    }

}