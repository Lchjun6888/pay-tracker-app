# 💰 PayTrack — 알바 급여 & 세금 계산기

> 시급, 월급, 프리랜서 수입을 한눈에 관리하고 실수령액을 자동 계산해주는 웹앱

[![Deploy](https://img.shields.io/badge/Vite-React-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📋 **근무 관리** | 시급 / 월급 / 프리랜서 여러 근무지를 한번에 관리 |
| 🧮 **세금 계산기** | 4대보험 & 3.3% 원천징수 자동 계산, 실수령액 확인 |
| 📊 **세금 상세 분석** | 국민연금·건강보험·고용보험 항목별 상세 표 |
| 📅 **캘린더** | 월별 근무 / 수입 일정 한눈에 보기 |
| 📄 **PDF 내보내기** | 급여명세서 PDF 다운로드 |
| 🌙 **다크 모드** | 눈이 편한 다크테마 지원 |
| 🇰🇷 **한국 노동법** | 2026년 최저시급, 주휴수당, 야간/연장수당 자동 반영 |

---

## 🖥️ 스크린샷

<p align="center">
  <em>대시보드 & 세금계산기 탭</em>
</p>

---

## 🚀 시작하기

```bash
# 1. 클론
git clone https://github.com/Lchjun6888/pay-tracker-app.git
cd pay-tracker-app

# 2. 설치
npm install

# 3. 개발서버
npm run dev
```

`http://localhost:5173` 에서 확인하세요.

---

## 🛠️ 기술 스택

- **React 19** + **Vite 7**
- **Tailwind CSS 4**
- **Font Awesome** 아이콘
- **localStorage** 기반 데이터 저장 (별도 서버 없음)

---

## 📁 프로젝트 구조

```
src/
├── App.jsx              # 메인 앱 라우팅
├── Dashboard.jsx        # 대시보드 뷰
├── views/
│   ├── TaxView.jsx      # 세금 계산기 탭
│   ├── CalendarView.jsx # 캘린더
│   ├── JobsView.jsx     # 알바 목록
│   └── SettingsView.jsx # 설정
├── components/
│   ├── Navbar.jsx       # 네비게이션 바
│   ├── AddJobModal.jsx  # 근무 추가/편집 모달
│   └── ...
├── hooks/
│   └── useJobs.js       # 근무 데이터 & 통계 훅
└── utils/
    └── koreanLabor.js   # 한국 노동법 계산 유틸
```

---

## ☕ 응원하기

이 프로젝트가 도움이 되셨다면 커피 한 잔 사주세요!

<a href="https://buymeacoffee.com/lchjun6888" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="200">
</a>

---

## 📜 라이센스

MIT License © 2026 [Lchjun6888](https://github.com/Lchjun6888)
