package com.ecom.viviki.security;

import com.ecom.viviki.dto.UserDto;
import com.ecom.viviki.entity.User;
import com.ecom.viviki.execption.NotFoundException;
import com.ecom.viviki.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static ch.qos.logback.classic.spi.ThrowableProxyVO.build;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findByEmail(username)
                .orElseThrow(() -> new NotFoundException("User/ Email Not found"));
        return AuthUser.builder()
        .user(user)
                .build();
    }
}
