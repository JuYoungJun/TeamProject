package com.yohaeng.gwangju.service;

import com.yohaeng.gwangju.model.User;
import com.yohaeng.gwangju.mapper.UserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    // 사용자 저장 또는 업데이트
    public Long saveOrUpdateUser(String email, String name) {
        // 이메일로 사용자 조회
        User existingUser = userMapper.findByEmail(email);

        if (existingUser == null) {
            // 새로운 사용자 저장
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            userMapper.save(newUser);
            return newUser.getId();
        } else {
            // 기존 사용자 업데이트
            existingUser.setName(name);
            userMapper.update(existingUser);
            return existingUser.getId();
        }
    }
}
