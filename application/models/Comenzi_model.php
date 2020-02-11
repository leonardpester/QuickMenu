<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Comenzi_model extends APP_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getComandaById(int $comanda_id)
    {
        return $this->db->select('*')
            ->from('comenzi')
            ->where('comanda_id', $comanda_id)
            ->get()
            ->row();
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

    public function getAllComenzi()
    {
        $var = $this->db
            ->select('*')
            ->from('comenzi')
            ->where('comanda_remove',0)

            ->order_by('comanda_id', 'ASC');

        return $var->get()->result();
    }
    public function getAllComenziRemove1()
    {
        $var = $this->db
            ->select('*')
            ->from('comenzi')
            ->where('comanda_remove',1)
            ->order_by('comanda_id', 'ASC');
        return $var->get()->result();
    }

    public function getAllComenziRemove2()
    {
        $var = $this->db
            ->select('*')
            ->from('comenzi')
            ->where('comanda_remove',2)
            ->order_by('comanda_id', 'ASC');
        return $var->get()->result();
    }
    public function changeComandaRemove1($data,$comanda_id){
        return $this->db->where('comanda_id', $comanda_id)->update('comenzi', $data);
    }

    public function changeComandaRemove99($data,$comanda_id){
        return $this->db->where('comanda_id', $comanda_id)->update('comenzi', $data);
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


