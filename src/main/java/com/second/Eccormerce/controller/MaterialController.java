package com.second.Eccormerce.controller;


import com.second.Eccormerce.dto.MaterialDto;
import com.second.Eccormerce.dto.Response;
import com.second.Eccormerce.exception.InvalidCredentialsException;
import com.second.Eccormerce.service.interf.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/material")
@RequiredArgsConstructor
public class MaterialController {

    private final MaterialService materialService;


    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('INVENTORY_MANAGER')")
    public ResponseEntity<Response> createMaterial(@RequestBody MaterialDto materialDto){
        if (materialDto.getMaterialType() == null || materialDto.getName().isEmpty() ||
                materialDto.getDescription().isEmpty() || materialDto.getQuantity() == null){
            throw new InvalidCredentialsException("All Fields are Required");
        }

        return ResponseEntity.ok(materialService.createMaterial(
                materialDto.getMaterialType().getId(),
                materialDto.getName(),
                materialDto.getDescription(),
                materialDto.getQuantity()
        ));
    }



    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('INVENTORY_MANAGER')")
    public ResponseEntity<Response> updateMaterial(@RequestBody MaterialDto materialDto) {
        if (materialDto.getMaterialType() == null || materialDto.getMaterialType().getId() == null) {
            throw new InvalidCredentialsException("Material Type is required");
        }

        return ResponseEntity.ok(materialService.updateMaterial(
                materialDto.getId(),
                materialDto.getMaterialType().getId(),
                materialDto.getName(),
                materialDto.getDescription(),
                materialDto.getQuantity()
        ));
    }


    @DeleteMapping("/delete/{materialId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('INVENTORY_MANAGER')")
    public ResponseEntity<Response> deleteMaterial(@PathVariable Long materialId){
        return ResponseEntity.ok(materialService.deleteMaterial(materialId));

    }


    @GetMapping("/get-by-material-id/{materialId}")
    public ResponseEntity<Response> getMaterialById(@PathVariable Long materialId){
        return ResponseEntity.ok(materialService.getMaterialById(materialId));
    }

    @GetMapping("/get-all")
    public ResponseEntity<Response> getAllMaterials(){
        return ResponseEntity.ok(materialService.getAllMaterials());
    }

    @GetMapping("/get-by-materialType-id/{materialTypeId}")
    public ResponseEntity<Response> getMaterialsByMaterialType(@PathVariable Long materialTypeId){
        return ResponseEntity.ok(materialService.getMaterialsByMaterialType(materialTypeId));
    }



    @GetMapping("/search")
    public ResponseEntity<Response> searchForMaterial(@RequestParam String searchValue){
        return ResponseEntity.ok(materialService.searchMaterial(searchValue));
    }


}