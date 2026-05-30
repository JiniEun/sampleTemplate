# 연구원 포트폴리오

의생명공학 연구원 포트폴리오 — 3페이지 정적 사이트.
**`data.json` 하나만 수정**하면 모든 페이지에 반영됩니다.

## 파일 구조

```
portfolio/
├── index.html                   ← Home (Introduction · Figures · Projects)
├── resume.html                  ← Resume (Contact · Education · Career · Experience · Skills · Publications · Patents)
├── portfolio.html               ← Portfolio (프로젝트 상세 카드)
├── data.json                    ← ✏️ 모든 데이터 — 여기만 수정
├── images/
│   ├── figures/                 ← Home Figures 이미지 보관
│   │   ├── fig1.png
│   │   └── fig2.png
│   └── projects/                ← Portfolio 프로젝트 이미지 보관
│       ├── sers-sepsis.png
│       └── qd-lfa.png
└── .github/workflows/
    └── deploy.yml               ← push → GitHub Pages 자동 배포
```

---

## 이미지 추가 방법

이미지를 해당 폴더에 넣고 `data.json`에 경로를 입력합니다.

```json
"figures": [
  { "src": "./images/figures/fig1.png", "caption": "설명 텍스트" }
]

"projects": [
  { "image": "./images/projects/sers-sepsis.png", ... }
]
```

이미지가 없으면 자동으로 플레이스홀더가 표시됩니다.

---

## 포인트 컬러 변경

`data.json`의 `theme` 키:

```json
"theme": {
  "mainColor":    "#fdfdfd",
  "accentColor":  "#2361b0",
  "accentLight":  "#EAF1FB",
  "accentSoft":   "#B8D0EE",
  "font":         "'맑은 고딕', 'Malgun Gothic', sans-serif",
  "fontSize":     "14px"
}
```

---

## GitHub Pages 배포

```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/USERNAME/portfolio.git
git push -u origin main
```

GitHub 레포 → **Settings → Pages → Source: GitHub Actions** 선택.

이후 `data.json` 또는 이미지 수정 → `git push` 하면 자동 재배포.

배포 URL: `https://USERNAME.github.io/portfolio/`

---

## 로컬 미리보기

```bash
npx serve .        # 또는
python3 -m http.server 3000
```

`localhost:3000` 접속.
