package com.second.Eccormerce.service.interf;

import com.second.Eccormerce.dto.AddressDto;
import com.second.Eccormerce.dto.Response;

public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
}