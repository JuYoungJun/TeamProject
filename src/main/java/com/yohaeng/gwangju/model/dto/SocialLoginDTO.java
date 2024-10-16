package com.yohaeng.gwangju.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SocialLoginDTO {
    private Long userId;
    private String provider;
    private String socialId;
    private String email;
    private String name;
    private String accessToken;
}
