package com.second.Eccormerce.controller;

import com.second.Eccormerce.entity.Discount;
import com.second.Eccormerce.entity.Product;
import com.second.Eccormerce.service.interf.DiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/discounts")
@RequiredArgsConstructor
public class DiscountController {

    private final DiscountService discountService;

    @GetMapping("/product/{productId}")
    public Optional<Discount> getDiscountByProduct(@PathVariable Long productId) {
        Product product = new Product();
        product.setId(productId);
        return discountService.getDiscountByProduct(product);
    }

    @PostMapping
    public Discount saveDiscount(@RequestBody Discount discount) {
        return discountService.saveDiscount(discount);
    }
}
