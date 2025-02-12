package com.ecom.viviki.service.interf;

import com.ecom.viviki.dto.AddressDto;
import com.ecom.viviki.dto.Response;

public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
}