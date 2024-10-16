package com.yohaeng.gwangju.controller;

import com.yohaeng.gwangju.model.Address;
import com.yohaeng.gwangju.model.User;
import com.yohaeng.gwangju.mapper.AddressMapper;
import com.yohaeng.gwangju.mapper.UserMapper;
import com.yohaeng.gwangju.service.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Controller
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserMapper userMapper;
    private final AddressMapper addressMapper;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserMapper userMapper, AddressMapper addressMapper, EmailService emailService, BCryptPasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.addressMapper = addressMapper;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    // ------------------------------- 회원가입 관련 API -------------------------------

    @GetMapping("/signup")
    public String showSignupPage() {
        return "login/signup";
    }

    @PostMapping("/signup")
    public String signup(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("postcode") String postcode,
            @RequestParam("address") String address,
            @RequestParam("detailAddress") String detailAddress,
            HttpSession session, Model model) {

        if (userMapper.findByEmail(email) != null) {
            model.addAttribute("message", "이미 사용 중인 이메일입니다.");
            return "login/signup";
        }

        User newUser = new User();
        newUser.setName(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setProvider("local");

        session.setAttribute("signupUser", newUser);

        Address newAddress = new Address();
        newAddress.setAddressLine1(address);
        newAddress.setAddressLine2(detailAddress);
        newAddress.setZipCode(postcode);

        session.setAttribute("signupAddress", newAddress);

        String verificationCode = generateVerificationCode();
        session.setAttribute("verificationCode", verificationCode);
        emailService.sendVerificationEmail(email, verificationCode);

        return "redirect:/verify-email";
    }

    @GetMapping("/verify-email")
    public String showEmailVerificationPage(Model model) {
        model.addAttribute("message", "이메일로 전송된 인증 코드를 입력하세요.");
        return "login/verify-email";
    }

    @PostMapping("/verify-code")
    public String verifyCode(
            @RequestParam("code") String code,
            HttpSession session, Model model) {

        String sessionCode = (String) session.getAttribute("verificationCode");
        User user = (User) session.getAttribute("signupUser");
        Address address = (Address) session.getAttribute("signupAddress");

        if (sessionCode != null && sessionCode.equals(code.trim()) && user != null && address != null) {
            userMapper.save(user);
            address.setUserId(user.getId());
            addressMapper.save(address);

            session.removeAttribute("signupUser");
            session.removeAttribute("signupAddress");
            session.removeAttribute("verificationCode");

            model.addAttribute("message", "이메일 인증이 성공했습니다. 로그인하세요.");
            return "login/login";
        } else {
            model.addAttribute("message", "인증번호가 올바르지 않습니다.");
            return "login/verify-email";
        }
    }

    @GetMapping("/check-email")
    @ResponseBody
    public Map<String, Object> checkEmail(@RequestParam("email") String email) {
        boolean isAvailable = userMapper.findByEmail(email) == null;
        Map<String, Object> response = new HashMap<>();
        response.put("available", isAvailable);
        return response;
    }

    // ------------------------------- 마이페이지 관련 API -------------------------------

    @GetMapping("/mypage")
    public String myPage(Authentication authentication, Model model) {
        logger.info("마이페이지 접근 시도");

        String email = getEmailFromAuthentication(authentication);

        if (email != null) {
            User user = userMapper.findByEmail(email);
            if (user != null) {
                model.addAttribute("name", user.getName());
                model.addAttribute("phone", user.getPhoneNumber() != null ? user.getPhoneNumber() : "전화번호 없음");
                model.addAttribute("email", user.getEmail());
                model.addAttribute("provider", user.getProvider());

                // 주소 정보 설정
                List<Address> addresses = addressMapper.findByUserId(user.getId());
                if (!addresses.isEmpty()) {
                    Address address = addresses.get(0);
                    model.addAttribute("addressName", address.getAddressName() != null ? address.getAddressName() : "주소 이름 없음");
                    model.addAttribute("address1", address.getAddressLine1() != null ? address.getAddressLine1() : "주소 첫 줄 없음");
                    model.addAttribute("address2", address.getAddressLine2() != null ? address.getAddressLine2() : "주소 상세 없음");
                } else {
                    model.addAttribute("addressName", "주소 정보 없음");
                    model.addAttribute("address1", "주소 첫 줄 없음");
                    model.addAttribute("address2", "주소 상세 없음");
                }
            } else {
                logger.warn("사용자 정보를 찾을 수 없음: 이메일={}", email);
                return "redirect:/login";
            }
        } else {
            logger.warn("인증되지 않은 사용자가 마이페이지에 접근 시도");
            return "redirect:/login";
        }

        return "login/mypage";
    }

    @PostMapping("/verify-password")
    @ResponseBody
    public boolean verifyPassword(@RequestParam("password") String password, Authentication authentication) {
        logger.info("비밀번호 검증 요청");

        String email = getEmailFromAuthentication(authentication);
        if (email != null) {
            User user = userMapper.findByEmail(email);
            if (user != null) {
                return passwordEncoder.matches(password, user.getPassword());
            }
        }
        return false;
    }

    @PostMapping("/mypage/update")
    @ResponseBody
    public String updateUserInfo(
            Authentication authentication,
            @RequestParam("name") String name,
            @RequestParam("phone") String phone,
            @RequestParam("addressName") String addressName,
            @RequestParam("address1") String address1,
            @RequestParam("address2") String address2,
            @RequestParam("isPasswordVerified") boolean isPasswordVerified,
            @RequestParam("isEmailVerified") boolean isEmailVerified) {

        logger.info("사용자 정보 수정 요청: 이름={}, 전화번호={}", name, phone);

        String email = getEmailFromAuthentication(authentication);

        if (email != null && (isPasswordVerified || isEmailVerified)) {
            User user = userMapper.findByEmail(email);
            if (user != null) {
                // 사용자 이름 및 전화번호 정보 수정
                user.setName(name);
                user.setPhoneNumber(phone);
                userMapper.update(user);

                // 사용자 ID를 이용하여 주소 정보 조회
                Address address = addressMapper.findByUserId(user.getId()).stream().findFirst().orElse(null);

                if (address == null) {
                    // 소셜 로그인 사용자이거나 기존 주소가 없는 경우 새로운 주소 등록 (INSERT)
                    Address newAddress = new Address(user.getId(), addressName, address1, address2, "");
                    addressMapper.save(newAddress);
                    logger.info("새로운 주소 정보가 등록되었습니다.");
                    return "새 주소가 성공적으로 등록되었습니다.";
                } else {
                    // 기존에 주소가 있는 경우 기존 주소 정보 수정 (UPDATE)
                    address.setAddressName(addressName);
                    address.setAddressLine1(address1);
                    address.setAddressLine2(address2);
                    addressMapper.update(address);
                    logger.info("기존 주소 정보가 수정되었습니다.");
                    return "주소가 성공적으로 수정되었습니다.";
                }
            }
        }
        logger.warn("수정에 실패하였습니다. 사용자 이메일: {}", email);
        return "수정에 실패하였습니다.";
    }

    @PostMapping("/mypage/delete")
    @ResponseBody
    public String deleteUser(
            Authentication authentication,
            @RequestParam("isPasswordVerified") boolean isPasswordVerified,
            @RequestParam("isEmailVerified") boolean isEmailVerified,
            HttpServletRequest request) {

        logger.info("회원 탈퇴 요청");

        String email = getEmailFromAuthentication(authentication);
        if (email != null) {
            User user = userMapper.findByEmail(email);

            if ((user != null) && (isPasswordVerified || isEmailVerified)) {
                userMapper.delete(user.getId());

                request.getSession().invalidate();
                SecurityContextHolder.clearContext();

                return "계정이 성공적으로 탈퇴되었습니다.";
            } else {
                return "비밀번호 또는 이메일 인증이 확인되지 않았습니다.";
            }
        }
        return "탈퇴에 실패하였습니다.";
    }

    @PostMapping("/verify-email-for-social")
    @ResponseBody
    public boolean verifyEmailForSocial(@RequestParam("email") String email, Authentication authentication) {
        logger.info("이메일 검증 요청: {}", email);

        String authenticatedEmail = getEmailFromAuthentication(authentication);
        return authenticatedEmail != null && authenticatedEmail.equals(email);
    }

    @GetMapping("/login")
    public String showLoginPage() {
        return "login/login";
    }

    private String getEmailFromAuthentication(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();

            if (principal instanceof UserDetails) {
                return ((UserDetails) principal).getUsername();
            } else if (principal instanceof OAuth2User) {
                Map<String, Object> attributes = ((OAuth2User) principal).getAttributes();
                if (attributes.containsKey("email")) {
                    return (String) attributes.get("email");
                }
                if (attributes.containsKey("kakao_account")) {
                    Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
                    return (String) kakaoAccount.get("email");
                }
                if (attributes.containsKey("response")) {
                    Map<String, Object> naverResponse = (Map<String, Object>) attributes.get("response");
                    return (String) naverResponse.get("email");
                }
            }
        }
        return null;
    }

    private String generateVerificationCode() {
        int leftLimit = 48;
        int rightLimit = 122;
        int targetStringLength = 10;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || (i >= 65 && i <= 90) || (i >= 97)))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }
}
