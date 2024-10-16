# 광주 프로젝트(작성중 입니다)

> **Spring Boot**를 기반으로 한 웹 애플리케이션으로, **소셜 로그인**, **사용자 관리**, **주소 검색**, **음식 및 관광 정보**를 제공합니다.

---

## 🛠️ 프로젝트 구조

```
gwangju/
│
├── src/main/java/com/yohaeng/gwangju
│   ├── config           # 보안 및 OAuth2 설정 파일
│   ├── controller       # 컨트롤러 (로그인, 음식, 관광 정보 등)
│   ├── mapper           # MyBatis 매퍼 인터페이스
│   ├── model            # 도메인 모델 및 DTO
│   │   └── service      # 서비스 관련 DTO
│   ├── service          # 비즈니스 로직 서비스
│
├── src/main/resources
│   ├── static           # 정적 리소스 (CSS, JS, 이미지 등)
│   ├── templates        # Thymeleaf 템플릿 (로그인, 회원가입 등)
│   ├── mybatis/mapper   # MyBatis XML 매퍼 파일
│   └── application.properties  # 애플리케이션 설정 파일
│
└── src/test/java/com/yohaeng/gwangju
    └── GwangjuApplicationTests.java  # 유닛 테스트
```

---

## ✨ 주요 기능

- **사용자 인증:**
  - Google, Kakao, Naver OAuth2 로그인 지원
- **회원가입 및 이메일 인증:**
  - 이메일 인증을 통한 회원가입
  - Spring Security로 비밀번호 암호화 처리
- **주소 검색 및 관리:**
  - Kakao API를 사용한 주소 검색 기능 제공
- **음식 및 관광 정보 제공:**
  - 광주 지역의 음식점과 관광지 정보 제공
- **마이페이지 관리:**
  - 사용자 프로필 및 주소 관리 기능 제공

---

## ⚙️ 데이터베이스 스키마

```sql
CREATE TABLE `sports` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT, -- 게시물 넘버
  `title` varchar(100) DEFAULT null, -- 게시물 제목
  `zipcode` int DEFAULT null, -- 우편번호
  `addr1` varchar(50) NOT NULL, -- 주소
  `addr2` varchar(50) NOT NULL, -- 행정동
  `home` varchar(250) DEFAULT null, -- 홈페이지
  `first_image` varchar(100) DEFAULT null, -- 게시물의 이미지
  `isimage` int DEFAULT '0', -- 이미지 여부 (0: 없음, 1: 있음)
  `tel` varchar(50) DEFAULT null, -- 전화번호
  `description` text, -- 게시물 설명
  `areacode` int DEFAULT null, -- 대한민국 지역코드 (예: 광주광역시 5)
  `book_tour` varchar(2) DEFAULT null, -- 예약 가능 여부 (null: 정보 없음, 0: 불가능, 1: 가능)
  `cat1` varchar(30) DEFAULT null, -- 카테고리 코드 1
  `cat2` varchar(30) DEFAULT null, -- 카테고리 코드 2
  `cat3` varchar(30) DEFAULT null, -- 카테고리 코드 3
  `contentid` int DEFAULT null, -- 게시물 고유 아이디
  `mapx` double DEFAULT null, -- 지도상의 x좌표
  `mapy` double DEFAULT null, -- 지도상의 y좌표
  `mlevel` int DEFAULT null, -- 지도 줌 레벨
  `modifiedtime` varchar(30) DEFAULT null, -- 수정된 날짜
  `sigungucode` int DEFAULT null, -- 광주광역시 구코드
  `category` int DEFAULT null -- 게시물 유형
);

CREATE TABLE `tour_dong` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT, -- 게시물 넘버
  `title` varchar(100) DEFAULT null, -- 게시물 제목
  `zipcode` int DEFAULT null, -- 우편번호
  `addr1` varchar(50) NOT NULL, -- 주소
  `addr2` varchar(50) NOT NULL, -- 행정동
  `home` varchar(250) DEFAULT null, -- 홈페이지
  `first_image` varchar(100) DEFAULT null, -- 게시물의 이미지
  `isimage` int DEFAULT '0', -- 이미지 여부 (0: 없음, 1: 있음)
  `tel` varchar(50) DEFAULT null, -- 전화번호
  `description` text, -- 게시물 설명
  `areacode` int DEFAULT null, -- 대한민국 지역코드
  `book_tour` varchar(2) DEFAULT null, -- 예약 가능 여부
  `cat1` varchar(30) DEFAULT null, -- 카테고리 코드 1
  `cat2` varchar(30) DEFAULT null, -- 카테고리 코드 2
  `cat3` varchar(30) DEFAULT null, -- 카테고리 코드 3
  `contentid` int DEFAULT null, -- 게시물 고유 아이디
  `mapx` double DEFAULT null, -- 지도상의 x좌표
  `mapy` double DEFAULT null, -- 지도상의 y좌표
  `mlevel` int DEFAULT null, -- 지도 줌 레벨
  `modifiedtime` varchar(30) DEFAULT null, -- 수정된 날짜
  `sigungucode` int DEFAULT null, -- 구코드
  `category` int DEFAULT null -- 게시물 유형
);

CREATE TABLE `tour` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT, -- 게시물 넘버
  `title` varchar(100) DEFAULT null, -- 게시물 제목
  `zipcode` int DEFAULT null, -- 우편번호
  `addr1` varchar(50) NOT NULL, -- 주소
  `addr2` varchar(50) NOT NULL, -- 행정동
  `home` varchar(250) DEFAULT null, -- 홈페이지
  `first_image` varchar(100) DEFAULT null, -- 게시물의 이미지
  `isimage` int DEFAULT '0', -- 이미지 여부
  `tel` varchar(50) DEFAULT null, -- 전화번호
  `description` text, -- 게시물 설명
  `areacode` int DEFAULT null, -- 지역코드
  `book_tour` varchar(2) DEFAULT null, -- 예약 가능 여부
  `cat1` varchar(30) DEFAULT null, -- 카테고리 코드 1
  `cat2` varchar(30) DEFAULT null, -- 카테고리 코드 2
  `cat3` varchar(30) DEFAULT null, -- 카테고리 코드 3
  `contentid` int DEFAULT null, -- 고유 아이디
  `mapx` double DEFAULT null, -- 지도상의 x좌표
  `mapy` double DEFAULT null, -- 지도상의 y좌표
  `mlevel` int DEFAULT null, -- 줌 레벨
  `modifiedtime` varchar(30) DEFAULT null, -- 수정된 날짜
  `sigungucode` int DEFAULT null, -- 구코드
  `category` int DEFAULT null -- 게시물 유형
);

CREATE TABLE `hotel` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT, -- 게시물 넘버
  `title` varchar(30) DEFAULT null, -- 호텔 이름
  `zipcode` int DEFAULT null, -- 우편번호
  `addr1` varchar(50) NOT NULL, -- 주소
  `addr2` varchar(20) NOT NULL, -- 행정동
  `first_image` varchar(100) DEFAULT null, -- 게시물의 이미지
  `isimage` int DEFAULT '0', -- 이미지 여부
  `tel` varchar(30) DEFAULT null, -- 전화번호
  `description` text, -- 게시물 설명
  `areacode` int DEFAULT null, -- 지역코드
  `book_tour` varchar(2) DEFAULT null, -- 예약 가능 여부
  `cat1` varchar(30) DEFAULT null, -- 카테고리 코드 1
  `cat2` varchar(30) DEFAULT null, -- 카테고리 코드 2
  `cat3` varchar(30) DEFAULT null, -- 카테고리 코드 3
  `contentid` int DEFAULT null, -- 고유 아이디
  `mapx` double DEFAULT null, -- 지도상의 x좌표
  `mapy` double DEFAULT null, -- 지도상의 y좌표
  `mlevel` int DEFAULT null, -- 줌 레벨
  `modifiedtime` varchar(30) DEFAULT null, -- 수정된 날짜
  `sigungucode` int DEFAULT null, -- 구코드
  `category` int DEFAULT null -- 게시물 유형
);

CREATE TABLE `food` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT, -- 게시물 넘버
  `title` varchar(100) NOT NULL, -- 음식점 이름
  `addr1` varchar(100) DEFAULT null, -- 주소
  `addr2` varchar(10) DEFAULT null, -- 행정동
  `image` varchar(1000) DEFAULT null, -- 음식점 이미지
  `tel` varchar(30) DEFAULT null, -- 전화번호
  `rating` double DEFAULT null, -- 평점
  `review_cnt` int DEFAULT null, -- 리뷰 수
  `cat1` varchar(30) DEFAULT null, -- 카테고리 코드 1
  `cat2` varchar(30) DEFAULT null, -- 카테고리 코드 2
  `cat3` varchar(30) DEFAULT null, -- 카테고리 코드 3
  `mapx` double DEFAULT null, -- 지도상의 x좌표
  `mapy` double DEFAULT null, -- 지도상의 y좌표
  `sigungucode` int DEFAULT null, -- 구코드
  `category` int DEFAULT null -- 게시물 유형
);

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY, -- 사용자 고유 ID
  `email` VARCHAR(255) UNIQUE NOT NULL, -- 이메일 (자체 가입 및 소셜 로그인에 사용)
  `password` VARCHAR(255), -- 비밀번호 (자체 가입 회원만 사용, 소셜 로그인은 NULL)
  `name` VARCHAR(100) NOT NULL, -- 사용자 이름
  `phone_number` VARCHAR(15), -- 전화번호 (선택 항목)
  `profile_image` VARCHAR(255), -- 프로필 이미지 (선택 항목)
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 계정 생성 시간
  `updated_at` TIMESTAMP NULL, -- 수정 시간
  `deleted_at` TIMESTAMP NULL, -- 삭제 시간 (논리 삭제용 필드)
  `verify` INT DEFAULT 0, -- 인증 레벨 (0: 일반 사용자, 9: 관리자)
  `provider` VARCHAR(50) NOT NULL -- 로그인 제공자 ('google', 'kakao', 'naver', 'local')
);

CREATE TABLE `addresses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY, -- 주소 고유 ID
  `user_id` INT NOT NULL, -- 사용자 ID (users 테이블과 외래키 관계)
  `address_name` VARCHAR(100), -- 주소 이름 (예: '집', '회사')
  `address_line1` VARCHAR(255) NOT NULL, -- 주소 첫 줄
  `address_line2` VARCHAR(255), -- 주소 상세
  `zip_code` VARCHAR(20) NOT NULL, -- 우편번호
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 주소 추가 시간
  `updated_at` TIMESTAMP NULL, -- 수정 시간
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE -- 외래키 제약 조건
);
```

---

## ⚙️ 설치 및 설정

1. **레포지토리 클론:**

   ```bash
   git clone https://github.com/your-username/TeamProject.git
   cd TeamProject
   ```

2. **의존성 설치:**

   ```bash
   ./gradlew build
   ```

3. **애플리케이션 실행:**

   ```bash
   ./gradlew bootRun
   ```

4. **웹 애플리케이션 접속:**

   브라우저에서 다음 주소로 접속하세요:  
   `http://localhost:8080`

---

## 🚀 사용 기술

- **백엔드:** Spring Boot 3.x, MyBatis, Spring Security
- **프론트엔드:** Thymeleaf, HTML5, CSS, JavaScript
- **데이터베이스:** MySQL
- **OAuth2 로그인:** Google, Kakao, Naver
- **API 통합:** Kakao 주소 검색 API

---

## 🧪 테스트

다음 명령어로 유닛 테스트를 실행할 수 있습니다:

```bash
./gradlew test
```

---

## 🛡️ 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.

---

## 🤝 기여 방법

1. 레포지토리 포크
2. 새로운 브랜치 생성: `git checkout -b feature-branch`
3. 변경 사항 커밋: `git commit -m 'Add new feature'`
4. 브랜치에 푸시: `git push origin feature-branch`
5. 풀 리퀘스트 생성

---

## 👥 팀 구성원

- **팀장:** [팀장 이름]  
  - 전체 프로젝트 관리 및 주요 기능 설계  
  - GitHub: [https://github.com/teamleader](https://github.com/teamleader)

- **백엔드 개발:** [백엔드 개발자 이름]  
  - Spring Boot 기반의 로그인 및 인증 구현  
  - 데이터베이스 연동 및 비즈니스 로직 처리  
  - GitHub: [https://github.com/backend-dev](https://github.com/backend-dev)

- **프론트엔드 개발:** [프론트엔드 개발자 이름]  
  - Thymeleaf 기반 화면 설계 및 구현  
  - CSS 및 JavaScript를 활용한 UI/UX 개선  
  - GitHub: [https://github.com/frontend-dev](https://github.com/frontend-dev)

- **API 통합 및 QA 담당:** [API/QA 담당자 이름]  
  - Kakao API 및 OAuth2 로그인 연동  
  - 유닛 테스트 및 통합 테스트 수행  
  - GitHub: [https://github.com/api-qa-dev](https://github.com/api-qa-dev)

---

## 📧 문의

문의사항이 있으시면 아래 이메일로 연락 주세요:  
📧 **kaks162@gmail.com**

---

## 📑 참고 사항

- 애플리케이션 실행 전에 MySQL이 실행 중인지 확인하세요.
- `application.properties` 파일에서 데이터베이스 자격 증명을 업데이트하세요.
- **Google**, **Kakao**, **Naver**용 OAuth2 로그인에 필요한 API 키를 설정하세요.
