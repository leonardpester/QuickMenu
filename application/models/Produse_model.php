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
    public function getProductByName($produs_nume)
    {
        return $this->db->select('produs_cantitate')->from('produse')->where('produs_nume', $produs_nume)->get()->result();
    }
    
    public function updateCantitate( $produs_nume, array $data)
    {
        return $this->db->where('produs_nume', $produs_nume)->update('produse', $data);
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