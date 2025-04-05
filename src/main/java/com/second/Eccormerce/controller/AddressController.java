package com.second.Eccormerce.controller;


import com.second.Eccormerce.dto.AddressDto;
import com.second.Eccormerce.dto.Response;
import com.second.Eccormerce.service.interf.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping("/save")
    public ResponseEntity<Response> saveAndUpdateAddress(@RequestBody AddressDto addressDto){
        return ResponseEntity.ok(addressService.saveAndUpdateAddress(addressDto));
    }
}