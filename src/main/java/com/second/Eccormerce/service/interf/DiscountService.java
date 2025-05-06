package com.second.Eccormerce.service.interf;

import com.second.Eccormerce.entity.Discount;
import com.second.Eccormerce.entity.Product;

import java.util.Optional;

public interface DiscountService {
    Optional<Discount> getDiscountByProduct(Product product);
    Discount saveDiscount(Discount discount);
}
