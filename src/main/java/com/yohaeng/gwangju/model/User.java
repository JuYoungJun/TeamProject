package com.yohaeng.gwangju.model;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    private Long id;              // 사용자 ID
    private String email;         // 이메일
    private String name;          // 사용자 이름
    private String phoneNumber;   // 전화번호 (선택 사항)
    private String profileImage;  // 프로필 이미지 (선택 사항)
    private LocalDateTime createdAt;   // 계정 생성 시각
    private LocalDateTime updatedAt;   // 계정 수정 시각
    private LocalDateTime deletedAt;   // 논리 삭제 시각 (NULL이면 삭제되지 않음)
    private int verify;           // 인증 상태 (0: 일반 사용자, 9: 관리자)
    private String provider;      // 소셜 로그인 제공자 (google, kakao, naver 등)

    // 비밀번호 (Spring Security 필수)
    private String password;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.deletedAt == null; // 삭제된 계정은 비활성화된 것으로 간주
    }
}
