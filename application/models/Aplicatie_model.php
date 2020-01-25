<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Aplicatie_model extends APP_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Get all the sources from the database.
     *
     * @return object
     **/
    public function getAllMenus()
    {
        $var = $this->db
            ->select('*')
            ->from('meniuri');
             return $var->get()->result();

    }

    /**
     * Get offer's informations by ID.
     *
     * @param int oferta_id The id of the offer
     *
     * @return object
     **/
    public function getProductById(int $produs_id)
    {
        return $this->db->select('*')->from('produse')->where('produs_id', $produs_id)->get()->row();
    }

    /**
     * Update an offer ( based on oferta_id ) with the new data.
     *
     * @param int oferta_id The id of the offer
     * @param array data Array of the data ( column => value )
     *
     * @return object
     **/
    public function updateProduct(int $produs_id, array $data)
    {
        return $this->db->where('produs_id', $produs_id)->update('produse', $data);
    }

    
   
}
