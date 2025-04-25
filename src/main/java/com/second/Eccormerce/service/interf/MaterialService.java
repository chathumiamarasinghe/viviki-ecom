package com.second.Eccormerce.service.interf;

import com.second.Eccormerce.dto.Response;


public interface MaterialService {

    Response createMaterial(String name, String description, Integer quantity);
    Response updateMaterial(Long materialId, String name, String description, Integer quantity);
    Response deleteMaterial(Long productId);
    Response getMaterialById(Long productId);
    Response getAllMaterials();
    Response searchMaterial(String searchValue);
}