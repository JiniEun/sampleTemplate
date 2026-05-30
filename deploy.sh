#!/bin/bash
# 포트폴리오 GitHub 배포 스크립트
# 사용법: bash deploy.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}======================================${NC}"
echo -e "${CYAN}   포트폴리오 GitHub 배포 스크립트${NC}"
echo -e "${CYAN}======================================${NC}"
echo ""

# ── 1. git 설치 확인 ──────────────────────────────────────────
if ! command -v git &> /dev/null; then
  echo -e "${RED}[오류] git이 설치되어 있지 않습니다.${NC}"
  echo ""
  echo "  아래 주소에서 Git을 설치한 후 다시 실행하세요."
  echo "  → https://git-scm.com/downloads"
  exit 1
fi

# ── 2. .gitignore 생성 (없는 경우) ────────────────────────────
if [ ! -f ".gitignore" ]; then
  printf ".DS_Store\nThumbs.db\n*.log\n" > .gitignore
fi

# ── 3. git 초기화 ─────────────────────────────────────────────
if [ ! -d ".git" ]; then
  echo -e "${YELLOW}[안내] git 저장소를 처음 설정합니다.${NC}"
  git init
  git branch -M main
  echo -e "${GREEN}  완료.${NC}"
  echo ""
fi

# ── 4. 원격 저장소 연결 확인 ──────────────────────────────────
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")

if [ -z "$REMOTE_URL" ]; then
  echo "GitHub 레포지토리 주소를 입력하세요."
  echo ""
  echo "  주소 형식: https://github.com/아이디/레포이름.git"
  echo "  예시      : https://github.com/jimin-park/portfolio.git"
  echo ""
  read -p "  주소 입력: " REPO_URL
  echo ""

  if [ -z "$REPO_URL" ]; then
    echo -e "${RED}[오류] 주소를 입력하지 않았습니다. 다시 실행해 주세요.${NC}"
    exit 1
  fi

  git remote add origin "$REPO_URL"
  REMOTE_URL="$REPO_URL"
  echo -e "${GREEN}[완료] 원격 저장소가 연결되었습니다.${NC}"
  echo ""
fi

# ── 5. 변경된 파일 확인 ───────────────────────────────────────
UNTRACKED=$(git ls-files --others --exclude-standard)
MODIFIED=$(git diff --name-only)
STAGED=$(git diff --staged --name-only)

if [ -z "$UNTRACKED" ] && [ -z "$MODIFIED" ] && [ -z "$STAGED" ]; then
  echo -e "${YELLOW}변경된 파일이 없습니다. 업로드할 내용이 없어요.${NC}"
  echo ""
  echo "  data.json 또는 이미지를 수정한 뒤 다시 실행하세요."
  exit 0
fi

# ── 6. 커밋 메시지 입력 ───────────────────────────────────────
echo "어떤 내용을 수정했나요? (Enter 시 기본 메시지 사용)"
read -p "  메시지 입력: " COMMIT_MSG
COMMIT_MSG="${COMMIT_MSG:-포트폴리오 업데이트}"
echo ""

# ── 7. 스테이징 → 커밋 → 푸시 ────────────────────────────────
git add .
git commit -m "$COMMIT_MSG"

BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

echo ""
echo "  GitHub에 업로드 중..."
echo ""

if git push -u origin "$BRANCH"; then
  # GitHub URL에서 username/repo 추출
  REPO_PATH=$(echo "$REMOTE_URL" \
    | sed 's|.*github\.com[:/]||' \
    | sed 's|\.git$||')
  USERNAME=$(echo "$REPO_PATH" | cut -d'/' -f1)
  REPONAME=$(echo "$REPO_PATH" | cut -d'/' -f2)

  echo ""
  echo -e "${GREEN}======================================${NC}"
  echo -e "${GREEN}  업로드 완료!${NC}"
  echo -e "${GREEN}======================================${NC}"
  echo ""
  echo "  GitHub Actions가 자동으로 배포를 시작합니다. (보통 1~2분 소요)"
  echo ""
  echo -e "  배포 진행 확인  : ${CYAN}https://github.com/$REPO_PATH/actions${NC}"
  echo -e "  완료 후 사이트  : ${CYAN}https://$USERNAME.github.io/$REPONAME/${NC}"
  echo ""
  echo "  ※ 처음 배포 시 GitHub Pages 설정이 필요합니다."
  echo "    docs/deploy.md 의 '3단계' 를 확인하세요."
  echo ""
else
  echo ""
  echo -e "${RED}[오류] 업로드에 실패했습니다.${NC}"
  echo ""
  echo "  흔한 원인:"
  echo "  1. GitHub 주소가 잘못 입력됨 → 레포 주소를 다시 확인"
  echo "  2. 레포지토리가 아직 만들어지지 않음 → GitHub 에서 먼저 레포 생성"
  echo "  3. 로그인 정보 오류 → GitHub 아이디/토큰을 다시 확인"
  echo ""
  echo "  자세한 내용은 docs/deploy.md 를 참고하세요."
  exit 1
fi