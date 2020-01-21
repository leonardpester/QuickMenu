<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Produse_model extends APP_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getProductById(int $produs_id)
    {
        return $this->db->select('*')->from('produse')->where('produs_id', $produs_id)->get()->row();
    }

    
    public function updateProduct(int $produs_id, array $data)
    {
        return $this->db->where('produs_id', $produs_id)->update('produse', $data);
    }

    public function insertProduct(array $data)
    {
        return $this->db->insert('produse', $data) ? $this->db->insert_id() : false;
    }

    public function deleteProduct(int $produs_id)
    {
        return $this->db->where('produs_id', $produs_id)->delete('produse');
        
    }

   
   
}
