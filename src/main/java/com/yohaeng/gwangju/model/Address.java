package com.yohaeng.gwangju.model;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private Long id;                // 주소 ID
    private Long userId;           // 사용자 ID (외래키)
    private String addressName;     // 주소 이름
    private String addressLine1;    // 주소 첫 줄
    private String addressLine2;    // 주소 상세
    private String zipCode;         // 우편번호
    private LocalDateTime createdAt; // 주소 추가 시각
    private LocalDateTime updatedAt; // 주소 수정 시각

    public Address(Long userId, String addressName, String addressLine1, String addressLine2, String zipCode) {
        this.userId = userId;
        this.addressName = addressName;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.zipCode = zipCode;
        this.createdAt = LocalDateTime.now(); // 생성 시각을 현재 시간으로 설정
        this.updatedAt = LocalDateTime.now(); // 수정 시각도 현재 시간으로 설정
    }

}
