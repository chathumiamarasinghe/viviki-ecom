package com.second.Eccormerce.service.impl;

import com.second.Eccormerce.dto.MaterialDto;
import com.second.Eccormerce.dto.Response;
import com.second.Eccormerce.entity.Material;
import com.second.Eccormerce.exception.NotFoundException;
import com.second.Eccormerce.mapper.EntityDtoMapper;
import com.second.Eccormerce.repository.MaterialRepo;
import com.second.Eccormerce.service.interf.MaterialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepo materialRepo;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response createMaterial(String name, String description, Integer quantity) {


        Material material = new Material();
        material.setName(name);
        material.setDescription(description);
        material.setQuantity(quantity);

        materialRepo.save(material);
        return Response.builder()
                .status(200)
                .message("Material successfully created")
                .build();
    }

    @Override
    public Response updateMaterial(Long materialId, String name, String description, Integer quantity) {
        Material material = materialRepo.findById(materialId).orElseThrow(()-> new NotFoundException("Material Not Found"));

        if (name != null) material.setName(name);
        if (description != null) material.setDescription(description);
        if (quantity != null) material.setQuantity(quantity);

        materialRepo.save(material);
        return Response.builder()
                .status(200)
                .message("Material updated successfully")
                .build();

    }

    @Override
    public Response deleteMaterial(Long materialId) {
        Material material = materialRepo.findById(materialId).orElseThrow(()-> new NotFoundException("Material Not Found"));
        materialRepo.delete(material);

        return Response.builder()
                .status(200)
                .message("Material deleted successfully")
                .build();
    }

    @Override
    public Response getMaterialById(Long materialId) {
        Material material = materialRepo.findById(materialId).orElseThrow(()-> new NotFoundException("Material Not Found"));
        MaterialDto materialDto = entityDtoMapper.mapMaterialToDtoBasic(material);

        return Response.builder()
                .status(200)
                .material(materialDto)
                .build();
    }

    @Override
    public Response getAllMaterials() {
        List<MaterialDto> materialList = materialRepo.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(entityDtoMapper::mapMaterialToDtoBasic)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .materialList(materialList)
                .build();

    }


    @Override
    public Response searchMaterial(String searchValue) {
        List<Material> materials = materialRepo.findByNameContainingOrDescriptionContaining(searchValue, searchValue);

        if (materials.isEmpty()){
            throw new NotFoundException("No Materials Found");
        }
        List<MaterialDto> materialDtoList = materials.stream()
                .map(entityDtoMapper::mapMaterialToDtoBasic)
                .collect(Collectors.toList());


        return Response.builder()
                .status(200)
                .materialList(materialDtoList)
                .build();
    }
}