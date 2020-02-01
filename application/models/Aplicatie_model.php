<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Aplicatie_model extends APP_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function getAllMenus()
    {
        $var = $this->db
            ->select('*')
            ->from('meniuri');
             return $var->get()->result();

    }

    public function getAllProduct()
    {
        $var = $this->db
            ->select('*')
            ->from('produse');
             return $var->get()->result();

    }

    public function getProductById(int $produs_id)
    {
        return $this->db->select('*')->from('produse')->where('produs_id', $produs_id)->get()->row();
    }

    public function updateProduct(int $produs_id, array $data)
    {
        return $this->db->where('produs_id', $produs_id)->update('produse', $data);
    }

    public function insertComanda(array $data)
    {
        return $this->db->insert('comenzi', $data) ? $this->db->insert_id() : false;
    }

}
