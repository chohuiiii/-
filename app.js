// 버튼 요소 가져오기
const scissorsButton = document.getElementById("scissors-btn");
const rockButton = document.getElementById("rock-btn");
const paperButton = document.getElementById("paper-btn");
const betAmountInput = document.getElementById("bet-amount");
const startGameButton = document.getElementById("start-game");

// 결과 표시 요소 가져오기
const computerChoiceElement = document.getElementById("computer-choice");
const resultElement = document.getElementById("result");
const moneyDisplay = document.getElementById("money-display");

// 게임 결과 카운트 요소 가져오기
const winCountElement = document.getElementById("win-count");
const loseCountElement = document.getElementById("lose-count");
const drawCountElement = document.getElementById("draw-count");

let money = 0; // 초기 자금 설정
let gameStarted = false;

// 게임 결과 카운트
let winCount = 0;
let loseCount = 0;
let drawCount = 0;

// 컴퓨터의 선택을 랜덤으로 생성하는 함수
function getComputerChoice() {
    const choices = ["가위", "바위", "보"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// 승패 결정 함수
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "무승부";
    }

    if (
        (userChoice === "가위" && computerChoice === "보") ||
        (userChoice === "바위" && computerChoice === "가위") ||
        (userChoice === "보" && computerChoice === "바위")
    ) {
        return "승리!";
    } else {
        return "패배!";
    }
}

// 게임 시작 함수
function startGame() {
    const initialMoney = parseInt(betAmountInput.value, 10);

    // 초기 자금 입력 값 확인
    if (isNaN(initialMoney) || initialMoney <= 0) {
        alert("올바른 금액을 입력해주세요 (0보다 큰 숫자).");
    } else {
        money = initialMoney; // 게임 시작 시 입력한 금액을 자금으로 설정
        moneyDisplay.textContent = `${money} 원`;  // 자금 표시 업데이트
        gameStarted = true;
        betAmountInput.disabled = true;  // 베팅 금액 설정 후 입력 필드 비활성화
        startGameButton.disabled = true; // 게임 시작 버튼 비활성화
    }
}

// 베팅 로직 함수
function playGame(userChoice) {
    if (!gameStarted) {
        alert("먼저 게임을 시작해주세요.");
        return;
    }

    const betAmount = parseInt(betAmountInput.value, 10);

    // 베팅 금액 유효성 검사
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > money) {
        alert("잘못된 베팅 금액입니다.");
        return;
    }

    // 컴퓨터의 선택을 랜덤으로 결정
    const computerChoice = getComputerChoice();
    computerChoiceElement.textContent = computerChoice;

    // 승패 결과 결정
    const result = determineWinner(userChoice, computerChoice);
    resultElement.textContent = result;

    // 자금 계산
    if (result === "승리!") {
        money += betAmount;  // 승리 시 자금 증가
        winCount++;  // 이긴 횟수 증가
    } else if (result === "패배!") {
        money -= betAmount;  // 패배 시 자금 감소
        loseCount++;  // 진 횟수 증가
    } else if (result === "무승부") {
        drawCount++;  // 비긴 횟수 증가
    }

    // 자금 업데이트
    moneyDisplay.textContent = `${money} 원`;

    // 게임 결과 카운트 업데이트
    winCountElement.textContent = winCount;
    loseCountElement.textContent = loseCount;
    drawCountElement.textContent = drawCount;

    // 게임 종료 체크
    if (money <= 0) {
        alert("게임이 종료되었습니다.");
        gameStarted = false;
    }
}

// 버튼 클릭 이벤트 리스너
scissorsButton.addEventListener("click", () => playGame("가위"));
rockButton.addEventListener("click", () => playGame("바위"));
paperButton.addEventListener("click", () => playGame("보"));

// 게임 시작 버튼 클릭 시
startGameButton.addEventListener("click", startGame);
