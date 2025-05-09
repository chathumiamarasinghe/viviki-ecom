package com.second.Eccormerce.service.interf;

import com.second.Eccormerce.dto.MaterialTypeDto;
import com.second.Eccormerce.dto.Response;

public interface MaterialTypeService {

    Response createMaterialType(MaterialTypeDto materialTypeRequest);
    Response updateMaterialType(Long materialTypeId, MaterialTypeDto materialTypeRequest);
    Response getAllMaterialTypes();
    Response getMaterialTypeById(Long materialTypeId);
    Response deleteMaterialType(Long materialTypeId);
}