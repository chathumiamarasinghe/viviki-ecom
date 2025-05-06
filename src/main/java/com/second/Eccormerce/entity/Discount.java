package com.second.Eccormerce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "discounts")
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double discountPercent;

    private LocalDate validUntil;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
