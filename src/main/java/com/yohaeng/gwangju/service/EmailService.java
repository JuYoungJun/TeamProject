package com.yohaeng.gwangju.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

// 인증 이메일 발송 서비스
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String email, String verificationToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("이메일 인증");
        message.setText("아래의 인증 코드를 사용하여 이메일 인증을 완료하세요:\n" + verificationToken);

        try {
            mailSender.send(message);
            System.out.println("이메일이 성공적으로 전송되었습니다: " + email);
        } catch (MailException e) {
            System.err.println("이메일 전송 실패: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
