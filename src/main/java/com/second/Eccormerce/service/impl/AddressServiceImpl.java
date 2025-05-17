package com.second.Eccormerce.service.impl;

import com.second.Eccormerce.dto.AddressDto;
import com.second.Eccormerce.dto.Response;
import com.second.Eccormerce.entity.Address;
import com.second.Eccormerce.entity.User;
import com.second.Eccormerce.repository.AddressRepo;
import com.second.Eccormerce.service.interf.AddressService;
import com.second.Eccormerce.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepo addressRepo;
    private final UserService userService;


    @Override
    public Response saveAndUpdateAddress(AddressDto addressDto) {
        User user = userService.getLoginUser();

        Address address = null;
        if (addressDto.getId() != null) {
            address = addressRepo.findById(addressDto.getId()).orElse(null);
        }

        if (address != null && !address.getUser().getId().equals(user.getId())) {
            return Response.builder()
                    .status(403)
                    .message("You are not allowed to update this address")
                    .build();
        }


        if (address == null) {
            address = new Address();
            address.setUser(user);
        }

        if (addressDto.getStreet() != null) address.setStreet(addressDto.getStreet());
        if (addressDto.getCity() != null) address.setCity(addressDto.getCity());
        if (addressDto.getState() != null) address.setState(addressDto.getState());
        if (addressDto.getZipCode() != null) address.setZipCode(addressDto.getZipCode());
        if (addressDto.getCountry() != null) address.setCountry(addressDto.getCountry());

        addressRepo.save(address);

        String message = (addressDto.getId() == null) ? "Address successfully created" : "Address successfully updated";
        return Response.builder()
                .status(200)
                .message(message)
                .build();
    }

}