package com.yohaeng.gwangju.mapper;

import com.yohaeng.gwangju.model.Address;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AddressMapper {

    // 주소 저장
    void save(Address address);

    // 사용자 주소 조회
    List<Address> findByUserId(@Param("userId") Long userId);

    // 주소 업데이트
    void update(Address address);

    // 주소 삭제
    void delete(@Param("id") Long id);
}
