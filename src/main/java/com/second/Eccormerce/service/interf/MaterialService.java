package com.second.Eccormerce.service.interf;

import com.second.Eccormerce.dto.Response;


public interface MaterialService {

    Response createMaterial(Long materialtypeId, String name, String description, Integer quantity);
    Response updateMaterial(Long materialId, Long materialtypeId, String name, String description, Integer quantity);
    Response deleteMaterial(Long productId);
    Response getMaterialById(Long productId);
    Response getAllMaterials();
    Response getMaterialsByMaterialType(Long materialtypeId);
    Response searchMaterial(String searchValue);
}