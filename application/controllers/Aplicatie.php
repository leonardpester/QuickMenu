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
         $meniuri=$this->aplicatie_model->getAllMenus();
         //when 0 produs
         if(!$meniuri) {
             $meniuri = array();
         }
        
        $meniu = [
            'mic_dejun'     => [],
            'gustari'       => [],
            'paste'         => [],
            'salate'        => [],
            'garnituri'     => [],
            'desert'        => [],
            'preparate'     => [],
            'ciorbe'        => [],
            'pizza'         => [],
            'alcoolice'     => [],
            'racoritoare'   => [],
        ];
        
        foreach($meniuri as $key=>$menu){
            

            switch ($menu->meniu_categorie) {
            case '1':
                $meniu['mic_dejun'][$key] = $menu;
                break;
            case '2':
                $meniu['gustari'][$key] = $menu;
                break;
            case '3':
                $meniu['paste'][$key] = $menu;
                break;
            case '4':
                $meniu['salate'][$key] = $menu;
                break;
            case '5':
                $meniu['garnituri'][$key] = $menu;
                break;
            case '6':
                $meniu['desert'][$key] = $menu;
                break;
            case '7':
                $meniu['preparate'][$key] = $menu;
                break;
            case '9':
                $meniu['alcoolice'][$key] = $menu;
                break;
            case '10':
                $meniu['racoritoare'][$key] = $menu;
                break;
            case '12':
                $meniu['ciorbe'][$key] = $menu;
                break;    
            case '13':
                $meniu['pizza'][$key] = $menu;
                break;  
            case '14':
                $meniu['paste'][$key] = $menu;
                break;  
            default:
                break;
            }
        }

        // Load the produs list view
        $this->load->view(
            'aplicatie/index.php',
            [
                'meniuri'   => $meniu
            ]
        );
    }

}