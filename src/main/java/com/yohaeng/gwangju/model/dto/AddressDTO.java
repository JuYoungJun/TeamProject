package com.yohaeng.gwangju.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {
    private Long id;                // 주소 ID
    private Long userId;           // 사용자 ID (외래키)
    private String addressName;     // 주소 이름 (예: "집", "회사")
    private String addressLine1;    // 주소 첫 줄
    private String addressLine2;    // 주소 상세
    private String zipCode;         // 우편번호
}
