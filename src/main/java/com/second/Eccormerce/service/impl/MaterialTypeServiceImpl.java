package com.second.Eccormerce.service.impl;

import com.second.Eccormerce.dto.MaterialTypeDto;
import com.second.Eccormerce.dto.Response;
import com.second.Eccormerce.entity.MaterialType;
import com.second.Eccormerce.exception.NotFoundException;
import com.second.Eccormerce.mapper.EntityDtoMapper;
import com.second.Eccormerce.repository.MaterialTypeRepo;
import com.second.Eccormerce.service.interf.MaterialTypeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class MaterialTypeServiceImpl implements MaterialTypeService {

    private final MaterialTypeRepo materialTypeRepo;
    private final EntityDtoMapper entityDtoMapper;




    @Override
    public Response createMaterialType(MaterialTypeDto materialTypeRequest) {
        MaterialType materialType = new MaterialType();
        materialType.setName(materialTypeRequest.getName());
        materialType.setUnitType(materialTypeRequest.getUnitType());
        materialTypeRepo.save(materialType);
        return Response.builder()
                .status(200)
                .message("Material Type created successfully")
                .build();
    }

    @Override
    public Response updateMaterialType(Long materialTypeId, MaterialTypeDto materialTypeRequest) {
        MaterialType materialType = materialTypeRepo.findById(materialTypeId).orElseThrow(()-> new NotFoundException("Material Type Not Found"));
        materialType.setName(materialTypeRequest.getName());
        materialType.setUnitType(materialTypeRequest.getUnitType());
        materialTypeRepo.save(materialType);
        return Response.builder()
                .status(200)
                .message("Material Type updated successfully")
                .build();
    }

    @Override
    public Response getAllMaterialTypes() {
        List<MaterialType> materialTypes = materialTypeRepo.findAll();
        List<MaterialTypeDto> materialTypeDtoList = materialTypes.stream()
                .map(entityDtoMapper::mapMaterialTypeToDtoBasic)
                .collect(Collectors.toList());

        return  Response.builder()
                .status(200)
                .materialTypeList(materialTypeDtoList)
                .build();
    }

    @Override
    public Response getMaterialTypeById(Long materialTypeId) {
        MaterialType materialType = materialTypeRepo.findById(materialTypeId).orElseThrow(()-> new NotFoundException("Material Type Not Found"));
        MaterialTypeDto materialTypeDto = entityDtoMapper.mapMaterialTypeToDtoBasic(materialType);
        return Response.builder()
                .status(200)
                .materialType(materialTypeDto)
                .build();
    }

    @Override
    public Response deleteMaterialType(Long materialTypeId) {
        MaterialType materialType = materialTypeRepo.findById(materialTypeId).orElseThrow(()-> new NotFoundException("MaterialType Not Found"));
        materialTypeRepo.delete(materialType);
        return Response.builder()
                .status(200)
                .message("MaterialType was deleted successfully")
                .build();
    }
}