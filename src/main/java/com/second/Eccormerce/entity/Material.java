package com.second.Eccormerce.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Objects;

@Data
@Entity
@Table(name = "materials")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Integer quantity;


    @Column(name = "created_at")
    private final LocalDateTime createdAt = LocalDateTime.now();


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Material material = (Material) o;
        return Objects.equals(id, material.id) &&
                Objects.equals(name, material.name) &&
                Objects.equals(description, material.description) &&
                Objects.equals(quantity, material.quantity);
    }


    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, quantity);
    }


    public boolean canEqual(Object other) {
        return other instanceof Material;
    }
}