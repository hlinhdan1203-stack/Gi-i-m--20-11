
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const homeScreen = $("home-screen");
  const rulesScreen = $("rules-screen");
  const quizScreen = $("quiz-screen");
  const resultScreen = $("result-screen");

  const startBtn = $("start-btn");
  const playBtn = $("play-btn");
  const backBtn = $("back-btn");
  const nextBtn = $("next-btn");
  const restartBtn = $("restart-btn");
  const homeBtn = $("home-btn");

  const questionNumber = $("question-number");
  const scoreDisplay = $("score");
  const progressFill = $("progress-fill");
  const questionIcon = $("question-icon");
  const questionText = $("question-text");
  const optionsContainer = $("options");

  const feedback = $("feedback");
  const feedbackTitle = $("feedback-title");
  const feedbackText = $("feedback-text");

  const resultArt = $("result-art");
  const resultTitle = $("result-title");
  const resultDescription = $("result-description");
  const finalScore = $("final-score");
  const correctCount = $("correct-count");
  const wrongCount = $("wrong-count");

  const screens = [
    homeScreen,
    rulesScreen,
    quizScreen,
    resultScreen
  ];

  let currentQuestion = 0;
  let score = 0;
  let correctAnswers = 0;
  let answered = false;

  const letters = ["A", "B", "C", "D"];

  function showScreen(target) {
    screens.forEach(function (screen) {
      screen.classList.add("hidden");
    });

    target.classList.remove("hidden");
    window.scrollTo(0, 0);
  }

  function startGame() {
    const questions = window.questions;

    if (!Array.isArray(questions) || questions.length !== 10) {
      alert(
        "Không tải được 10 câu hỏi! Hãy kiểm tra tên file questions.js và đảm bảo file nằm cùng thư mục với index.html."
      );
      return;
    }

    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    answered = false;

    scoreDisplay.textContent = "0";
    showScreen(quizScreen);
    renderQuestion();
  }

  function renderQuestion() {
    const questions = window.questions;
    const q = questions[currentQuestion];

    answered = false;

    questionNumber.textContent =
      "NHIỆM VỤ " +
      String(currentQuestion + 1).padStart(2, "0") +
      " / " +
      questions.length;

    scoreDisplay.textContent = score;

    progressFill.style.width =
      (currentQuestion / questions.length) * 100 + "%";

    questionIcon.textContent = q.icon || "🧠";
    questionText.textContent = q.question;

    optionsContainer.replaceChildren();

    feedback.classList.add("hidden");
    feedback.classList.remove("good", "bad");
    nextBtn.classList.add("hidden");

    q.options.forEach(function (option, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-btn";

      const letter = document.createElement("span");
      letter.className = "option-letter";
      letter.textContent = letters[index];

      const text = document.createElement("span");
      text.textContent = option;

      button.appendChild(letter);
      button.appendChild(text);

      button.addEventListener("click", function () {
        chooseAnswer(index);
      });

      optionsContainer.appendChild(button);
    });
  }

  function chooseAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const q = window.questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-btn");
    const isCorrect = selectedIndex === q.answer;

    buttons.forEach(function (button, index) {
      button.disabled = true;

      if (index === q.answer) {
        button.classList.add("correct");
      }

      if (index === selectedIndex && !isCorrect) {
        button.classList.add("wrong");
      }
    });

    if (isCorrect) {
      score += 10;
      correctAnswers += 1;

      feedback.classList.add("good");
      feedbackTitle.textContent = "✦ CHÍNH XÁC! +10 ĐIỂM";
    } else {
      feedback.classList.add("bad");
      feedbackTitle.textContent = "♡ CHƯA CHÍNH XÁC RỒI!";
    }

    scoreDisplay.textContent = score;
    feedbackText.textContent = q.explanation;
    feedback.classList.remove("hidden");

    if (currentQuestion === window.questions.length - 1) {
      nextBtn.innerHTML = "XEM KẾT QUẢ <span>✨</span>";
    } else {
      nextBtn.innerHTML = "CÂU TIẾP THEO <span>→</span>";
    }

    nextBtn.classList.remove("hidden");

    progressFill.style.width =
      ((currentQuestion + 1) / window.questions.length) * 100 + "%";
  }

  function showResult() {
    showScreen(resultScreen);

    finalScore.textContent = score;
    correctCount.textContent = correctAnswers;
    wrongCount.textContent =
      window.questions.length - correctAnswers;

    if (score === 100) {
      resultArt.textContent = "🏆";
      resultTitle.textContent = "XUẤT SẮC!";
      resultDescription.textContent =
        "Tuyệt đối luôn! Bạn đã giải mã thành công mọi thử thách 20/11.";
    } else if (score >= 70) {
      resultArt.textContent = "🌟";
      resultTitle.textContent = "RẤT ĐÁNG TỰ HÀO!";
      resultDescription.textContent =
        "Bạn có kiến thức tốt. Tiếp tục phát huy nhé!";
    } else if (score >= 40) {
      resultArt.textContent = "🌷";
      resultTitle.textContent = "BẠN LÀM TỐT LẮM!";
      resultDescription.textContent =
        "Bạn đã khám phá được nhiều điều thú vị. Hãy thử chinh phục điểm cao hơn nhé!";
    } else {
      resultArt.textContent = "💗";
      resultTitle.textContent = "CỐ GẮNG THÊM NHÉ!";
      resultDescription.textContent =
        "Hãy đọc lại lời giải thích và thử sức thêm một lần nữa. Mỗi lần chơi là một lần học!";
    }
  }

  startBtn.addEventListener("click", function () {
    showScreen(rulesScreen);
  });

  backBtn.addEventListener("click", function () {
    showScreen(homeScreen);
  });

  playBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", startGame);

  homeBtn.addEventListener("click", function () {
    showScreen(homeScreen);
  });

  nextBtn.addEventListener("click", function () {
    currentQuestion += 1;

    if (currentQuestion < window.questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  });

  showScreen(homeScreen);
})();
      
