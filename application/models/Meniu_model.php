<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Meniu_model extends APP_Model
{
    public function __construct()
    {
        parent::__construct();
    }


    public function getMenuById(int $meniu_id)
    {
        return $this->db->select('*')->from('meniuri')->where('meniu_id', $meniu_id)->get()->row();
    }

    
    public function updateMenu(int $meniu_id, array $data)
    {
        return $this->db->where('meniu_id', $meniu_id)->update('meniuri', $data);
    }

    public function insertMenu(array $data)
    {
        return $this->db->insert('meniuri', $data) ? $this->db->insert_id() : false;
    }

    public function deleteMenu(int $meniu_id)
    {
        return $this->db->where('meniu_id', $meniu_id)->delete('meniuri');
        
    }

     public function getAllMenus()
    {
        $var = $this->db
            ->select('m.*,c.categorie_nume')
            ->from('meniuri m')
            ->join('categorie c','m.meniu_categorie=c.categorie_id','LEFT')
            ->order_by('meniu_id', 'DESC');

             return $var->get()->result();

    }
    
    public function getProductByMenu($meniu_id){
         $var = $this->db
            ->select('meniu_ingrediente')
            ->from('meniuri')
            ->where('meniu_id',$meniu_id)
            ->get()
            ->row();
            return $var->meniu_ingrediente;
             
    }

    public function getAllCategory(){
         $var = $this->db
            ->select('*')
            ->from('categorie')
            ->get()
            ->result();
            return $var;
    }

   
   
}
