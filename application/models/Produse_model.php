<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Produse_model extends APP_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Update an offer ( based on oferta_id ) with the new data.
     *
     * @param int oferta_id The id of the offer
     * @param array data Array of the data ( column => value )
     *
     * @return object
     **/
    public function updateSource(int $source_id, array $data)
    {
        return $this->db->where('source_id', $source_id)->update('sources', $data);
    }

    /**
     * Insert a new offer with data.
     *
     * @param array data Array of the data(column =>value)
     *
     * @return int/false
     */
    public function insertProduct(array $data)
    {
        return $this->db->insert('produse', $data) ? $this->db->insert_id() : false;
    }

    /**
     * Delete an offer.
     *
     * @param int source_id The id of the offer
     *
     * @return bool
     */
    public function deleteSource(int $source_id)
    {
        return $this->db->where('source_id', $source_id)->delete('sources');
        
    }

    public function checkKey($key){
        return $this->db->select('source_key')->from('sources')->where('source_key', $key)->get()->row();
    }
    public function checkKeyById($source_id){
        return $this->db->select('source_key')->from('sources')->where('source_id', $source_id)->get()->row();
    }
    public function checkFileNameById($source_id){
        return $this->db->select('source_file_name')->from('sources')->where('source_id', $source_id)->get()->row();
    }
   
}
