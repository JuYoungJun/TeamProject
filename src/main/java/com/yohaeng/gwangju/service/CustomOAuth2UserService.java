package com.yohaeng.gwangju.service;

import com.yohaeng.gwangju.model.User;
import com.yohaeng.gwangju.mapper.UserMapper;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);
    private final UserMapper userMapper;
    private final HttpSession httpSession;  // 세션 주입

    public CustomOAuth2UserService(UserMapper userMapper, HttpSession httpSession) {
        this.userMapper = userMapper;
        this.httpSession = httpSession;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        logger.debug("OAuth2UserRequest 수신: {}", userRequest);
        OAuth2User oauth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Map<String, Object> attributes = oauth2User.getAttributes();

        logger.debug("등록된 ID: {}, 사용자 속성: {}", registrationId, attributes);

        String socialId = null;
        String email = null;
        String name = null;  // 이름 변수 추가

        // 소셜 제공자별 로그인 정보 매핑
        switch (registrationId) {
            case "google":
                socialId = (String) attributes.get("sub");
                email = (String) attributes.get("email");
                name = (String) attributes.get("name");
                break;
            case "kakao":
                Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
                socialId = String.valueOf(attributes.get("id"));
                email = (String) kakaoAccount.get("email");
                Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");
                name = (String) kakaoProfile.get("nickname");
                break;
            case "naver":
                Map<String, Object> naverResponse = (Map<String, Object>) attributes.get("response");
                socialId = (String) naverResponse.get("id");
                email = (String) naverResponse.get("email");
                name = (String) naverResponse.get("name");
                break;
            default:
                throw new IllegalArgumentException("지원되지 않는 제공자: " + registrationId);
        }

        logger.debug("소셜 로그인 정보 - 이메일: {}, 이름: {}, 소셜 ID: {}", email, name, socialId);

        if (email == null) {
            email = socialId + "@example.com";  // 이메일이 없을 경우 처리
        }

        // 사용자 저장 또는 업데이트 수행
        User user = saveOrUpdateUser(email, socialId, name, registrationId);

        httpSession.setAttribute("userEmail", email);  // 사용자 이메일 세션에 저장

        return oauth2User;
    }

    private User saveOrUpdateUser(String email, String socialId, String name, String provider) {
        User existingUser = userMapper.findByEmail(email);

        if (existingUser == null) {
            logger.info("신규 사용자: {}", email);
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setProvider(provider);
            newUser.setName(name);

            userMapper.save(newUser);  // 신규 사용자 저장
            logger.debug("새로운 사용자 저장 완료: userId={}", newUser.getId());

            return newUser;
        } else {
            logger.info("기존 사용자 정보 업데이트: {}", email);
            existingUser.setProvider(provider);
            existingUser.setName(name);
            userMapper.update(existingUser);  // 기존 사용자 정보 업데이트

            return existingUser;
        }
    }
}
