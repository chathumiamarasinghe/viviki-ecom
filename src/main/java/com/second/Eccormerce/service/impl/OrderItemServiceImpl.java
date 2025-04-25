package com.second.Eccormerce.service.impl;

import com.second.Eccormerce.dto.OrderItemDto;
import com.second.Eccormerce.dto.OrderRequest;
import com.second.Eccormerce.dto.Response;
import com.second.Eccormerce.entity.Order;
import com.second.Eccormerce.entity.OrderItem;
import com.second.Eccormerce.entity.Product;
import com.second.Eccormerce.entity.User;
import com.second.Eccormerce.enums.OrderStatus;
import com.second.Eccormerce.exception.NotFoundException;
import com.second.Eccormerce.mapper.EntityDtoMapper;
import com.second.Eccormerce.repository.OrderItemRepo;
import com.second.Eccormerce.repository.OrderRepo;
import com.second.Eccormerce.repository.ProductRepo;
import com.second.Eccormerce.service.interf.OrderItemService;
import com.second.Eccormerce.service.interf.UserService;
import com.second.Eccormerce.specification.OrderItemSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderItemServiceImpl implements OrderItemService {


    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final ProductRepo productRepo;
    private final UserService userService;
    private final EntityDtoMapper entityDtoMapper;


    @Override
    public Response placeOrder(OrderRequest orderRequest) {

        User user = userService.getLoginUser();
        //map order request items to order entities

        List<OrderItem> orderItems = orderRequest.getItems().stream().map(orderItemRequest -> {
            Product product = productRepo.findById(orderItemRequest.getProductId())
                    .orElseThrow(() -> new NotFoundException("Product Not Found"));

            int orderQty = orderItemRequest.getQuantity();

            // Check stock
            if (product.getQuantity() < orderQty) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }

            // Reduce stock
            product.setQuantity(product.getQuantity() - orderQty);
            productRepo.save(product); // ✅ Save updated quantity

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(orderQty);
            orderItem.setPrice(product.getPrice().multiply(BigDecimal.valueOf(orderQty)));
            orderItem.setStatus(OrderStatus.PENDING);
            orderItem.setUser(user);
            return orderItem;

        }).collect(Collectors.toList());

        //calculate the total price
        BigDecimal totalPrice = orderRequest.getTotalPrice() != null && orderRequest.getTotalPrice().compareTo(BigDecimal.ZERO) > 0
                ? orderRequest.getTotalPrice()
                : orderItems.stream().map(OrderItem::getPrice).reduce(BigDecimal.ZERO, BigDecimal::add);

        //create order entity
        Order order = new Order();
        order.setOrderItemList(orderItems);
        order.setTotalPrice(totalPrice);

        //set the order reference in each orderitem
        orderItems.forEach(orderItem -> orderItem.setOrder(order));

        orderRepo.save(order);

        return Response.builder()
                .status(200)
                .message("Order was successfully placed")
                .build();

    }

    @Override
    public Response updateOrderItemStatus(Long orderItemId, String status) {
        OrderItem orderItem = orderItemRepo.findById(orderItemId)
                .orElseThrow(()-> new NotFoundException("Order Item not found"));

        orderItem.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        orderItemRepo.save(orderItem);
        return Response.builder()
                .status(200)
                .message("Order status updated successfully")
                .build();
    }

    @Override
    public Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable) {
        Specification<OrderItem> spec = Specification.where(OrderItemSpecification.hasStatus(status))
                .and(OrderItemSpecification.createdBetween(startDate, endDate))
                .and(OrderItemSpecification.hasItemId(itemId));

        Page<OrderItem> orderItemPage = orderItemRepo.findAll(spec, pageable);

        if (orderItemPage.isEmpty()){
            throw new NotFoundException("No Order Found");
        }
        List<OrderItemDto> orderItemDtos = orderItemPage.getContent().stream()
                .map(entityDtoMapper::mapOrderItemToDtoPlusProductAndUser)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .orderItemList(orderItemDtos)
                .totalPage(orderItemPage.getTotalPages())
                .totalElement(orderItemPage.getTotalElements())
                .build();
    }

}