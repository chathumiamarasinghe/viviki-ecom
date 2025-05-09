package com.second.Eccormerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "materialType")
public class MaterialType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @Column(name = "unit_type")
    private String unitType;


    @OneToMany(mappedBy = "materialType", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Material> materialList;

    @Column(name = "created_at")
    private final LocalDateTime createdAt = LocalDateTime.now();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || !(o instanceof MaterialType)) return false;
        MaterialType materialType = (MaterialType) o;
        return Objects.equals(id, materialType.id) &&
                Objects.equals(name, materialType.name) &&
                materialType.canEqual(this);
    }

    public boolean canEqual(Object other) {
        return other instanceof MaterialType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}