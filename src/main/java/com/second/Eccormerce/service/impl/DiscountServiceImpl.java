package com.second.Eccormerce.service.impl;

import com.second.Eccormerce.entity.Discount;
import com.second.Eccormerce.entity.Product;
import com.second.Eccormerce.repository.DiscountRepo;
import com.second.Eccormerce.service.interf.DiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiscountServiceImpl implements DiscountService {

    private final DiscountRepo discountRepo;

    public Optional<Discount> getDiscountByProduct(Product product) {
        return discountRepo.findByProduct(product);
    }

    public Discount saveDiscount(Discount discount) {
        return discountRepo.save(discount);
    }
}
