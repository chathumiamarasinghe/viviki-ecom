package com.second.Eccormerce.service.interf;

import com.second.Eccormerce.dto.OrderRequest;
import com.second.Eccormerce.dto.Response;
import com.second.Eccormerce.enums.OrderStatus;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface OrderItemService {
    Response placeOrder(OrderRequest orderRequest);
    Response updateOrderItemStatus(Long orderItemId, String status);
    Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable);
    Response getTotalOrderCount();

}