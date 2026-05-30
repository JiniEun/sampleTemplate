# GitHub Pages 배포 가이드


GitHub Pages 배포 가이드입니다.
최초 세팅 시 순서대로 따라 하세요.

---

## 필요한 것

- [GitHub 계정](https://github.com/signup) (무료)
- [Git 설치](https://git-scm.com/downloads) — 설치 후 컴퓨터 재시작 권장

Git이 설치됐는지 확인하는 방법: 터미널(또는 명령 프롬프트)에 아래를 입력합니다.

```
git --version
```

`git version 2.xx.x` 같은 숫자가 나오면 설치 완료입니다.

---

## 1단계 — GitHub에 레포지토리 만들기

레포지토리(Repository)는 파일을 보관하는 GitHub의 폴더입니다.

1. [github.com](https://github.com) 에 로그인합니다.
2. 오른쪽 위 **`+`** 버튼 → **New repository** 클릭
3. 아래와 같이 입력합니다.

   | 항목 | 입력값 |
   |------|--------|
   | Repository name | `portfolio` (또는 원하는 이름) |
   | Public / Private | **Public** 선택 (Pages는 Public만 무료) |
   | README 추가 여부 | **체크 해제** |

4. **Create repository** 버튼 클릭

---

## 2단계 — 배포 스크립트 실행

포트폴리오 폴더에서 터미널을 열고 아래 명령을 실행합니다.

**macOS / Linux**
```bash
bash deploy.sh
```

**Windows (Git Bash)**
```bash
bash deploy.sh
```

> **터미널(Terminal)을 여는 방법**
> - macOS: `Finder`에서 포트폴리오 폴더 열기 → 우클릭 → *폴더에서 터미널 열기*
>   (또는 `Launchpad` → `Terminal` 검색)
> - Windows: 포트폴리오 폴더에서 `Shift + 우클릭` → *Git Bash Here*

스크립트가 아래를 물어보면 순서대로 답합니다.

```
GitHub 레포지토리 주소를 입력하세요.

  주소 입력: https://github.com/아이디/portfolio.git
```

주소는 1단계에서 만든 레포 페이지에서 확인할 수 있습니다.
**Code** 버튼 → **HTTPS** 탭에 표시된 주소를 복사하세요.

```
어떤 내용을 수정했나요?
  메시지 입력: (Enter 누르면 '포트폴리오 업데이트' 자동 입력)
```

---

## 3단계 — GitHub Pages 켜기

이 단계는 **처음 한 번만** 합니다.

1. GitHub에서 레포지토리 페이지로 이동합니다.
2. 상단 탭에서 **Settings** 클릭
3. 왼쪽 사이드바 → **Pages** 클릭
4. **Source** 항목을 **`GitHub Actions`** 로 변경합니다.

   ```
   Build and deployment
   Source:  [ GitHub Actions ▼ ]   ← 이것 선택
   ```

5. 저장 후 1~2분 기다리면 사이트가 열립니다.

---

## 완료 — 사이트 주소

배포가 끝나면 아래 주소로 접속할 수 있습니다.

```
https://아이디.github.io/레포이름/
```

예시: `https://jimin-park.github.io/portfolio/`

---

## 이후 수정 및 재배포

`data.json` 또는 이미지를 수정한 뒤 다시 배포할 때는 **2단계만** 반복합니다.

```bash
bash deploy.sh
```

커밋 메시지에 무엇을 바꿨는지 짧게 적으면 나중에 기록을 보기 쉽습니다.

```
메시지 입력: 논문 목록 추가
메시지 입력: 프로필 사진 변경
메시지 입력: 특허 정보 수정
```

---

## 배포 진행 상황 확인

스크립트 실행 후 출력되는 링크 또는 아래 주소에서 배포 진행 상황을 볼 수 있습니다.

```
https://github.com/아이디/레포이름/actions
```

초록색 체크 ✅ 가 뜨면 완료입니다. 빨간 ❌ 가 뜨면 아래 문제 해결 항목을 확인하세요.

---

## 문제 해결

### "permission denied" 또는 로그인 오류가 뜹니다

GitHub는 2021년부터 비밀번호 대신 **Personal Access Token** 을 사용합니다.

1. GitHub → 오른쪽 위 프로필 사진 → **Settings**
2. 왼쪽 맨 아래 **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)** 클릭
4. Note에 이름 입력 (예: `portfolio`), **repo** 체크, **Generate token**
5. 생성된 토큰(문자열)을 복사 — **이 창을 닫으면 다시 볼 수 없습니다**

이후 비밀번호를 물어볼 때 이 토큰을 입력합니다.

---

### "src refspec main does not match any" 오류

브랜치 이름 문제입니다. 터미널에 아래를 입력하세요.

```bash
git branch -M main
bash deploy.sh
```

---

### Pages 주소에 접속했더니 404 오류가 납니다

- **Settings → Pages** 에서 Source가 `GitHub Actions` 로 설정됐는지 확인합니다.
- `actions` 탭에서 배포가 성공했는지 확인합니다 (초록 체크 ✅).
- 배포 직후에는 1~3분 정도 기다려야 할 수 있습니다.

---

### 스크립트가 "변경된 파일이 없습니다"라고 합니다

파일을 수정했지만 저장이 안 됐거나, 이미 같은 내용을 업로드한 경우입니다.
`data.json` 을 열어 수정 후 저장(Ctrl+S / Cmd+S)하고 다시 시도합니다.

---

## 로컬에서 미리 확인하기

GitHub에 올리기 전에 내 컴퓨터에서 먼저 확인하고 싶다면:

```bash
npx serve .
```

또는

```bash
python3 -m http.server 3000
```

브라우저에서 `http://localhost:3000` 으로 접속합니다.