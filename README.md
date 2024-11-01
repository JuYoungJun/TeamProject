# 광주 프로젝트

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
); -- 사용안한 테이블

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

-- delete_old_users 이벤트: 논리적으로 삭제된 사용자를 30일 후에 물리적으로 삭제하는 이벤트
CREATE EVENT IF NOT EXISTS delete_old_users
ON SCHEDULE EVERY 1 DAY -- 매일 한 번씩 실행
DO
  DELETE FROM users
  WHERE deleted_at IS NOT NULL -- 논리적으로 삭제된 사용자
  AND deleted_at < NOW() - INTERVAL 30 DAY; -- 삭제된 지 30일이 지난 사용자 계정 물리적으로 삭제
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

- **팀장:** [주영준]  
  - 전체 프로젝트 관리 및 주요 기능 설계  
  - GitHub: [https://github.com/teamleader](https://github.com/JuYoungJun/TeamProject)

- **조원:** [김은호]  
  - 화면 설계 및 사용자 경험 디자인  
  - GitHub: [https://github.com](https://github.com/Boksill2)

- **조원:** [김희재]  
  - 데이터베이스 관리  
  - GitHub: [https://github.com](https://github.com/mintchoco0001)

- **조원:** [주의진]  
  - CSS 및 로고 제작  
  - GitHub: [https://github.com](https://github.com/joojooGit)

---

## 📧 문의

문의사항이 있으시면 아래 이메일로 연락 주세요:  
📧 **kaks162@gmail.com**

---

## 📑 참고 사항

- 애플리케이션 실행 전에 MySQL이 실행 중인지 확인하세요.
- `application.properties` 파일에서 데이터베이스 자격 증명을 업데이트하세요.
- **Google**, **Kakao**, **Naver**용 OAuth2 로그인에 필요한 API 키를 설정하세요.

## 📝 개선사항 및 후기

### 개선사항
1. **소통 강화**
   - 프로젝트의 초기 단계에서 팀원 간의 소통이 원활하지 않았던 점이 아쉬웠습니다. 앞으로는 정기적인 미팅을 통해 진행 상황을 공유하고, 문서화하여 모든 팀원이 프로젝트의 진행 상태를 명확히 이해할 수 있도록 하겠습니다. 이렇게 함으로써 더욱 긴밀한 협업 환경을 조성할 수 있을 것입니다.

2. **시간 관리**
   - 몇몇 작업의 일정이 지연된 경험을 통해 각 단계별 마감일을 명확히 설정하는 것이 중요하다는 것을 깨달았습니다. 앞으로는 정기적인 진행 상황 점검을 통해 시간을 보다 효율적으로 관리하고, 프로젝트 전반의 흐름을 유지할 수 있도록 노력하겠습니다.

3. **기술 스택 선택**
   - 이번 프로젝트에서 사용한 기술 스택에 대한 사전 조사가 부족하여 몇 가지 기술적 장애가 발생했습니다. 다음 프로젝트에서는 각 기술의 장단점을 철저히 분석하여 최적의 기술 스택을 선택할 수 있도록 하겠습니다. 이를 통해 프로젝트의 안정성과 효율성을 높이겠습니다.

### 후기
이번 팀 프로젝트를 통해 협업의 중요성과 리더십의 역할을 깊이 체감할 수 있었습니다. 각 팀원들의 다양한 의견과 전문성을 존중하며 조율하는 과정에서 소중한 배움을 얻었고, 함께 목표를 달성하기 위해 노력하는 것이 얼마나 의미 있는지를 새삼 느꼈습니다. 이러한 경험은 제게 큰 자산이 되었고, 앞으로도 이를 바탕으로 더 나은 팀워크와 프로젝트 관리 방식을 발전시켜 나가고 싶습니다. 함께한 모든 팀원들에게 감사의 마음을 전합니다.

