package com.second.Eccormerce.repository;

import com.second.Eccormerce.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialRepo extends JpaRepository<Material, Long> {

    List<Material> findByMaterialTypeId(Long materialTypeId);
    List<Material> findByNameContainingOrDescriptionContaining(String name, String description);
}