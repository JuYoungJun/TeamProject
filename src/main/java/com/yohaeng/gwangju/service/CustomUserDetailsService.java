package com.yohaeng.gwangju.service;

import com.yohaeng.gwangju.model.User;
import com.yohaeng.gwangju.mapper.UserMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserMapper userMapper;

    public CustomUserDetailsService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        // UserRepository의 findByEmail()은 Optional을 반환하지 않으므로 null 체크를 추가
//        User user = userRepository.findByEmail(username);
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found with email: " + username);
//        }
//
//        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), user.getAuthorities());
//    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 이메일을 기준으로 사용자를 찾음
        User user = userMapper.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email);
        }

        // 사용자의 권한을 설정 (0 -> ROLE_USER, 9 -> ROLE_ADMIN, verify 필드 사용)
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (user.getVerify() == 9) { // getVerify로 권한 확인
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }

        // Spring Security의 User 객체로 반환
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities // 권한 설정
        );
    }

}
