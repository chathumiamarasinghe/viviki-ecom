package com.second.Eccormerce.service.interf;

import com.second.Eccormerce.dto.LoginRequest;
import com.second.Eccormerce.dto.Response;
import com.second.Eccormerce.dto.UserDto;
import com.second.Eccormerce.entity.User;

public interface UserService {
    Response registerUser(UserDto registrationRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
    Response getUserInfoAndOrderHistory();
    Response deleteUser(Long userId);
    Response getTotalUserCount();

}