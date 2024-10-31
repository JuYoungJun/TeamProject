package com.yohaeng.gwangju.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    // 패스워드 인코더 빈 등록
    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    // Security Filter Chain 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        logger.info("SecurityFilterChain 설정 시작");

        http
                // CSRF 설정
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .ignoringRequestMatchers(
                                "/login", "/oauth2/**", "/error", "/verify-code", "/verify-email",
                                "/mypage", "/food/**", "/map", "/map2", "/map3", "/map4", "/check-email", "/main", "/", "/foodlist", "/fooddetail/**", "/search", "map3/search"
                        )
                )
                // 권한 요청에 따른 접근 설정
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers(
                                "/css/**", "/js/**", "/images/**", "/error/**", "/static/**", "/",
                                "/login", "/oauth2/**", "/signup", "/check-email",
                                "/send-verification-code", "/verify-code", "/verify-email", "/mypage",
                                "/gu", "/gu/data", "/{guName}/dongs", "/{guName}/dongs/data", "/{guName}/foodDongs", "/districtOverlay",
                                "/food/**", "/foodlist", "/fooddetail/**","/utils/dong", "/main", "/sidebarData", "/sidebarData2",
                                "/map", "/map2", "/map3", "/map4", "/map3all", "/mapSports", "/mapParking", "/geojson/**", "/search", "map3/search"
                        ).permitAll()
                        .requestMatchers(
                                "/mypage", "/verify-password", "/verify-email-for-social", "/mypage/update", "/mypage/delete"
                        ).authenticated()
                        .anyRequest().authenticated()
                )
                // 로그인 설정
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/auth/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .defaultSuccessUrl("/main", true)
                        .failureUrl("/login?error=true")
                        .successHandler(this::onAuthenticationSuccess)  // 로그인 성공 후 세션에 저장
                        .permitAll()
                )
                // 로그아웃 설정
                .logout(logout -> logout
                        .logoutUrl("/logout") // 로그아웃 처리 URL 설정
                        .logoutSuccessUrl("/main") // 로그아웃 후 리다이렉트 URL
                        .invalidateHttpSession(true) // 세션 무효화
                        .deleteCookies("JSESSIONID") // JSESSIONID 쿠키 삭제
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
                        .permitAll()
                )
                // OAuth2 로그인 설정
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login")
                        .defaultSuccessUrl("/main", true)
                        .failureUrl("/login?error=true")
                        .successHandler(this::onAuthenticationSuccess)
                )
                // 세션 관리 설정 추가
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionConcurrency(concurrency -> concurrency
                                .maximumSessions(1)  // 동시 세션 허용 개수 1개
                                .maxSessionsPreventsLogin(false)  // 새로운 로그인이 발생 시 이전 세션 만료
                        )
                        .sessionFixation(sessionFixation -> sessionFixation
                                .none()  // 세션 고정 공격 방지 설정 비활성화 (보안적으로 권장되지 않음)
                        )
                );

        return http.build();
    }

    // 로그인 성공 후 처리 (소셜 로그인과 자체 로그인 모두 처리)
    private void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                         Authentication authentication) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 세션에 인증된 사용자 정보 저장
        request.getSession().setAttribute("authenticatedUser", authentication.getPrincipal());

        // 메인 페이지로 리다이렉트
        response.sendRedirect("/main");
    }

    // AuthenticationManager 빈 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
