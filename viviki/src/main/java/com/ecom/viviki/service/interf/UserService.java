package com.ecom.viviki.service.interf;

import com.ecom.viviki.dto.LoginRequest;
import com.ecom.viviki.dto.Response;
import com.ecom.viviki.dto.UserDto;
import com.ecom.viviki.entity.User;

public interface UserService {
    Response registerUser(UserDto registrationRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
    Response getUserInfoAndOrderHistory();
}
