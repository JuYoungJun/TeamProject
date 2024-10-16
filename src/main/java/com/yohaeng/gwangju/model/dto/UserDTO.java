package com.yohaeng.gwangju.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private String profileImage;
    private int verify;
}
