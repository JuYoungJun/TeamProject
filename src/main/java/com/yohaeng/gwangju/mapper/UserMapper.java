package com.yohaeng.gwangju.mapper;

import com.yohaeng.gwangju.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Optional;

@Mapper
public interface UserMapper {

    // 사용자 정보 저장
    void save(User user);  // void로 변경

    // 사용자 정보 조회 (이메일로 조회)
    User findByEmail(@Param("email") String email);

    // 사용자 정보 조회 (ID로 조회)
    Optional<User> findById(@Param("id") Long id);  // Optional로 반환 수정

    // 사용자 정보 업데이트
    void update(User user);

    // 사용자 삭제 (논리적 삭제, deleted_at 필드를 업데이트)
    void delete(@Param("id") Long id);
}
