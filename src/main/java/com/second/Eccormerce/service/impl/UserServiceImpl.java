package com.second.Eccormerce.service.impl;

import com.second.Eccormerce.dto.LoginRequest;
import com.second.Eccormerce.dto.Response;
import com.second.Eccormerce.dto.UserDto;
import com.second.Eccormerce.entity.User;
import com.second.Eccormerce.enums.UserRole;
import com.second.Eccormerce.exception.InvalidCredentialsException;
import com.second.Eccormerce.exception.NotFoundException;
import com.second.Eccormerce.mapper.EntityDtoMapper;
import com.second.Eccormerce.repository.UserRepo;
import com.second.Eccormerce.security.JwtUtils;
import com.second.Eccormerce.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EntityDtoMapper entityDtoMapper;


    @Override
    public Response registerUser(UserDto registrationRequest) {
        // Set default role to USER if no role is provided
        UserRole role = UserRole.USER;

        // Validate and assign role from registration request if provided
        if (registrationRequest.getRole() != null) {
            switch (registrationRequest.getRole().toUpperCase()) {
                case "ADMIN":
                    role = UserRole.ADMIN;
                    break;
                case "INVENTORY_MANAGER":
                    role = UserRole.INVENTORY_MANAGER;
                    break;
                case "DELIVERY_PERSON":
                    role = UserRole.DELIVERY_PERSON;
                    break;
                default:
                    return Response.builder()
                            .status(400)
                            .message("Invalid role specified")
                            .build();
            }
        }

        // Create and save the new user in the database
        User user = User.builder()
                .name(registrationRequest.getName())
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .phoneNumber(registrationRequest.getPhoneNumber())
                .role(role)  // Set the role during registration
                .build();

        User savedUser = userRepo.save(user);

        // Map saved user to DTO and return response
        UserDto userDto = entityDtoMapper.mapUserToDtoBasic(savedUser);
        return Response.builder()
                .status(200)
                .message("User Successfully Added")
                .user(userDto)
                .build();
    }





    @Override
    public Response loginUser(LoginRequest loginRequest) {

        User user = userRepo.findByEmail(loginRequest.getEmail()).orElseThrow(()-> new NotFoundException("Email not found"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new InvalidCredentialsException("Password does not match");
        }
        String token = jwtUtils.generateToken(user);

        return Response.builder()
                .status(200)
                .message("User Successfully Logged In")
                .token(token)
                .expirationTime("6 Month")
                .role(user.getRole().name())
                .build();
    }

    @Override
    public Response getAllUsers() {

        List<User> users = userRepo.findAll();
        List<UserDto> userDtos = users.stream()
                .map(entityDtoMapper::mapUserToDtoBasic)
                .toList();

        return Response.builder()
                .status(200)
                .userList(userDtos)
                .build();
    }

    @Override
    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String  email = authentication.getName();
        log.info("User Email is: " + email);
        return userRepo.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User Not found"));
    }

    @Override
    public Response getUserInfoAndOrderHistory() {
        User user = getLoginUser();
        UserDto userDto = entityDtoMapper.mapUserToDtoPlusAddressAndOrderHistory(user);

        return Response.builder()
                .status(200)
                .user(userDto)
                .build();
    }

    @Override
    public Response deleteUser(Long userId) {
        // Check if the logged-in user is an admin
        User loggedInUser = getLoginUser();
        if (loggedInUser.getRole() != UserRole.ADMIN) {
            return Response.builder()
                    .status(403)
                    .message("Only admin can delete users")
                    .build();
        }

        // Find the user to delete
        User userToDelete = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Delete the user
        userRepo.delete(userToDelete);

        return Response.builder()
                .status(200)
                .message("User successfully deleted")
                .build();
    }

    @Override
    public Response getTotalUserCount() {
        long count = userRepo.count();
        return Response.builder()
                .status(200)
                .message("Total number of users")
                .totalElement(count)
                .build();
    }




}