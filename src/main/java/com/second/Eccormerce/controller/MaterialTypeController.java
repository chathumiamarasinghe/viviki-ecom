package com.second.Eccormerce.controller;


import com.second.Eccormerce.dto.MaterialTypeDto;
import com.second.Eccormerce.dto.Response;
import com.second.Eccormerce.service.interf.MaterialTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/materialType")
@RequiredArgsConstructor
public class MaterialTypeController {

    private final MaterialTypeService materialTypeService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('INVENTORY_MANAGER')")
    public ResponseEntity<Response> createMaterialType(@RequestBody MaterialTypeDto materialTypeDto){
        return ResponseEntity.ok(materialTypeService.createMaterialType(materialTypeDto));
    }

    @GetMapping("/get-all")
    public ResponseEntity<Response> getAllMaterialTypes(){
        return ResponseEntity.ok(materialTypeService.getAllMaterialTypes());
    }

    @PutMapping("/update/{materialTypeId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('INVENTORY_MANAGER')")
    public ResponseEntity<Response> updateMaterialType(@PathVariable("materialTypeId") Long materialTypeId,
                                                       @RequestBody MaterialTypeDto materialTypeDto) {
        return ResponseEntity.ok(materialTypeService.updateMaterialType(materialTypeId, materialTypeDto));
    }

    @DeleteMapping("/delete/{materialTypeId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('INVENTORY_MANAGER')")
    public ResponseEntity<Response> deleteMaterialType(@PathVariable("materialTypeId") Long materialTypeId) {
        return ResponseEntity.ok(materialTypeService.deleteMaterialType(materialTypeId));
    }

    @GetMapping("/get-materialtype-by-id/{materialTypeId}")
    public ResponseEntity<Response> getMaterialTypeById(@PathVariable("materialTypeId") Long materialTypeId) {
        return ResponseEntity.ok(materialTypeService.getMaterialTypeById(materialTypeId));
    }


}