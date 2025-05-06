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
    public ResponseEntity<Response> createMaterial(

            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Integer quantity
    ){
        if (name.isEmpty() || description.isEmpty() || quantity == null){
            throw new InvalidCredentialsException("All Fields are Required");
        }
        return ResponseEntity.ok(materialService.createMaterial(name, description, quantity));
    }


    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('INVENTORY_MANAGER')")
    public ResponseEntity<Response> updateMaterial(@RequestBody MaterialDto materialDto) {
        return ResponseEntity.ok(materialService.updateMaterial(
                materialDto.getId(),
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


    @GetMapping("/search")
    public ResponseEntity<Response> searchForMaterial(@RequestParam String searchValue){
        return ResponseEntity.ok(materialService.searchMaterial(searchValue));
    }









}