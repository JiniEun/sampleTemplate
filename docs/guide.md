# data.json 작성 가이드

포트폴리오 사이트의 모든 내용은 `data.json` 파일 하나에서 관리됩니다.
이 파일만 수정하면 홈, 이력서, 포트폴리오 페이지가 모두 자동으로 바뀝니다.

---

## 수정하기 전에 — JSON 규칙 3가지

JSON은 사이트가 데이터를 읽는 형식입니다. 규칙이 엄격해서 오타 하나로 전체 사이트가 안 보일 수 있습니다. 아래 3가지만 지키면 됩니다.

### 1. 텍스트는 반드시 큰따옴표로 감싼다

```
"name": "최유은"        ✅
"name": 최유은           ❌
'name': '최유은'         ❌  (작은따옴표 안 됨)
```

### 2. 마지막 항목에는 쉼표를 붙이지 않는다

```json
{
  "name": "최유은",
  "title": "연구원"      ← 마지막 줄: 쉼표 없음 ✅
}
```

```json
{
  "name": "최유은",
  "title": "연구원",     ← 마지막 줄에 쉼표 ❌
}
```

### 3. 수정 후 반드시 검사한다

[jsonlint.com](https://jsonlint.com) 에 파일 내용을 붙여넣고 **Validate JSON** 버튼을 누르면 오류 위치를 알려줍니다.

---

## 파일 구조 한눈에 보기

```
data.json
├── meta        사이트 이름
├── theme       색상·글꼴·크기
├── profile     이름·직함·소개 한 줄
├── home
│   ├── introduction   홈 소개문
│   ├── figures        연구 이미지 목록
│   └── projects       프로젝트 요약 목록
├── resume
│   ├── contact        이메일·노션
│   ├── education      학력
│   ├── career         현 소속
│   ├── experience     연구 경험
│   ├── skills         보유 기술
│   ├── publications   논문
│   └── patents        특허
└── portfolio
    └── projects       포트폴리오 카드 목록
```

---

## 각 항목 수정 방법

### meta — 사이트 이름

```json
"meta": {
  "siteName": "yelab.log"
}
```

브라우저 탭과 좌측 상단 로고에 표시됩니다.

---

### theme — 색상·글꼴

```json
"theme": {
  "mainColor":   "#fdfdfd",
  "accentColor": "#2361b0",
  "accentLight": "#EAF1FB",
  "accentSoft":  "#B8D0EE",
  "font":        "'맑은 고딕', 'Malgun Gothic', -apple-system, sans-serif",
  "fontSize":    "14px"
}
```

| 항목 | 설명 |
|------|------|
| `mainColor` | 배경색 |
| `accentColor` | 강조 색 (링크, 라벨 등) |
| `accentLight` | 강조 색의 연한 배경 |
| `accentSoft` | 강조 색의 중간 톤 (테두리 등) |
| `font` | 글꼴 이름. 쉼표로 여러 개 지정하면 앞에서부터 순서대로 적용 |
| `fontSize` | 기본 글자 크기. `14px`, `15px` 등 |

색상 코드가 익숙하지 않다면 [htmlcolorcodes.com/color-picker](https://htmlcolorcodes.com/color-picker) 에서 색을 골라 `#` 으로 시작하는 코드를 복사합니다.

---

### profile — 이름·직함

```json
"profile": {
  "name":     "최유은",
  "initials": "박지",
  "title":    "의생명공학 연구원",
  "tagline":  "나노바이오 플랫폼과 체외진단 기술을 연구하는 의생명공학자"
}
```

| 항목 | 표시 위치 |
|------|-----------|
| `name` | 홈 이름 |
| `initials` | 홈 아바타 원 안의 글자 |
| `title` | 이름 아래 직함 (파란색) |
| `tagline` | 직함 아래 한 줄 소개 |

---

### home.introduction — 홈 소개문

```json
"introduction": "첫 번째 단락 내용.\n\n두 번째 단락 내용."
```

`\n\n` 을 넣으면 문단이 나뉩니다. 줄바꿈 없이 이어 쓰면 한 문단이 됩니다.

---

### home.figures — 홈 연구 이미지

```json
"figures": [
  {
    "src":     "./images/figures/fig1.png",
    "caption": "SERS 기질 SEM 이미지 (AuNP 클러스터, ×50,000)"
  },
  {
    "src":     "./images/figures/fig2.png",
    "caption": "미세유체 칩 설계 모식도 (PDMS, 4채널)"
  }
]
```

- `src`: 이미지 파일 경로. `images/figures/` 폴더에 파일을 넣고 파일명을 맞춥니다.
- `caption`: 이미지 아래 표시되는 설명 글

**이미지 추가하는 법**

1. `images/figures/` 폴더에 이미지 파일을 복사합니다 (없으면 폴더 직접 생성).
2. 위 예시처럼 항목을 추가합니다.
3. 이미지가 없는 경우 사이트에서 아이콘 + 캡션으로 대체 표시됩니다.

**항목 추가할 때 주의**

```json
"figures": [
  { "src": "...", "caption": "첫 번째" },   ← 쉼표 있음
  { "src": "...", "caption": "두 번째" }    ← 마지막이므로 쉼표 없음
]
```

---

### home.projects — 홈 프로젝트 요약

```json
"projects": [
  {
    "title": "SERS 나노센서 기반 패혈증 조기진단 플랫폼",
    "desc":  "AuNP 클러스터 기질과 마이크로플루이딕스를 결합한 POC 플랫폼.",
    "link":  "./portfolio.html#sers-sepsis"
  }
]
```

- `title`: 프로젝트 이름
- `desc`: 한 줄 요약
- `link`: 클릭 시 이동할 주소. 포트폴리오 카드로 연결하려면 `./portfolio.html#카드ID` 형식 사용

---

### resume.contact — 연락처

```json
"contact": {
  "email":  "jimin.park@bmelab.kr",
  "notion": "https://notion.so/jimin-park"
}
```

`notion` 항목은 본인의 노션 페이지 주소로 변경합니다.

---

### resume.education — 학력

```json
"education": [
  {
    "degree": "공학박사 — 의생명공학",
    "school": "KAIST 바이오및뇌공학과",
    "year":   "2021",
    "link":   "https://bi.kaist.ac.kr"
  }
]
```

- `link`: 학교·학과 링크. 없으면 `""` (빈 문자열)로 두면 링크 없이 표시됩니다.
- 최신 학위를 **위쪽**에 씁니다 (목록 순서대로 표시).

---

### resume.career — 현 소속

```json
"career": [
  {
    "org":    "한국생명공학연구원 (KRIBB) 의생명측정연구센터",
    "team":   "나노바이오진단팀",
    "role":   "선임연구원",
    "period": "2021.03 — 재직 중",
    "desc":   "업무 요약 한두 줄."
  }
]
```

---

### resume.experience — 연구 경험

```json
"experience": [
  {
    "title":   "프로젝트 이름",
    "period":  "2023.06 — 진행 중",
    "org":     "지원 기관",
    "desc":    "프로젝트 한 줄 요약.",
    "bullets": [
      "세부 성과 1",
      "세부 성과 2"
    ],
    "tags": ["키워드1", "키워드2"]
  }
]
```

- `bullets`: 글머리 항목 목록. 각 항목은 큰따옴표로 감싸고 쉼표로 구분합니다.
- `tags`: 기술 태그. 짧은 키워드 위주로 작성합니다.

---

### resume.skills — 보유 기술

```json
"skills": [
  { "group": "실험 & 제작",  "items": ["나노입자 합성", "PDMS 미세유체 칩"] },
  { "group": "분석 장비",    "items": ["Raman 분광기", "SEM/TEM"] }
]
```

- `group`: 카테고리 이름
- `items`: 해당 카테고리의 기술 목록

---

### resume.publications — 논문

```json
"publications": [
  {
    "title":   "논문 제목",
    "journal": "학술지명, 발행연도",
    "badge":   "SCI(E) 1저자",
    "link":    "https://doi.org/..."
  }
]
```

- `badge`: `"SCI(E) 1저자"`, `"SCI(E) 공저"` 등 자유롭게 작성
- `link`: DOI 주소. 없으면 `""` 로 두면 링크가 표시되지 않습니다.

---

### resume.patents — 특허

```json
"patents": [
  {
    "title":  "특허 이름",
    "number": "KR 10-2024-XXXXXX",
    "status": "출원"
  }
]
```

- `status`: `"출원"` 또는 `"등록"` 중 하나. 색상이 자동으로 달라집니다.

---

### portfolio.projects — 포트폴리오 카드

```json
"projects": [
  {
    "id":     "sers-sepsis",
    "title":  "SERS 나노센서 기반 패혈증 조기진단 플랫폼",
    "period": "2023.06 — 진행 중",
    "org":    "과학기술정보통신부 / 바이오의료기술개발사업",
    "desc":   "프로젝트 상세 설명.",
    "image":  "./images/projects/sers-sepsis.png",
    "tags":   ["SERS", "나노입자", "POC 진단"]
  }
]
```

- `id`: 영문 소문자와 하이픈으로 작성. `home.projects`의 링크(`#sers-sepsis`)와 일치해야 홈에서 클릭 시 해당 카드로 이동합니다.
- `image`: `images/projects/` 폴더에 이미지를 넣고 경로를 맞춥니다. 없으면 빈 카드로 표시됩니다.

---

## 자주 하는 실수

| 증상 | 원인 | 해결 |
|------|------|------|
| 사이트가 완전히 빈 화면 | JSON 문법 오류 | jsonlint.com 에서 오류 위치 확인 |
| 특정 항목만 안 보임 | 해당 항목 값이 빈 문자열 `""` | 내용 입력 |
| 이미지가 아이콘으로 대체 표시 | 파일 경로 불일치 또는 파일 없음 | `src` 경로와 실제 파일명 확인 |
| 포트폴리오 링크 클릭 시 해당 카드로 안 감 | `home.projects.link`의 `#id`와 `portfolio.projects.id` 불일치 | 두 값을 동일하게 맞춤 |

---

## 수정 흐름 요약

```
1. data.json 열기
2. 수정
3. jsonlint.com 에서 검사
4. 저장 후 브라우저에서 새로고침 (Ctrl+R / Cmd+R)
```