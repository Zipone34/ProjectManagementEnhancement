const quizForm = document.getElementById("quizForm");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const timeDisplay = document.getElementById("time");

let timeLeft = 300; // 5 minutes
let timer;

startBtn.addEventListener("click", () => {
    // kunin yung value ng input
    const minutes = parseInt(document.getElementById("time-input").value) || 5;
    timeLeft = minutes * 60; // convert minutes to seconds

    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    buildQuiz();
    startTimer();
});


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    timeDisplay.textContent = formatTime(timeLeft);
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function buildQuiz() {
    quizForm.innerHTML = ""; // clear form before building
    questions.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
          <p>${index + 1}. ${item.q.replace(/^\d+\.\s*/, "")}</p>
          <label><input type="radio" name="q${index}" value="a" /> a) ${item.options.a}</label><br>
          <label><input type="radio" name="q${index}" value="b" /> b) ${item.options.b}</label><br>
          <label><input type="radio" name="q${index}" value="c" /> c) ${item.options.c}</label><br>
          <label><input type="radio" name="q${index}" value="d" /> d) ${item.options.d}</label>
        `;
        quizForm.appendChild(div);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit Quiz";
    quizForm.appendChild(submitBtn);
}


quizForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearInterval(timer);
    submitQuiz();
});

function submitQuiz() {
    let score = 0;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    const wrongAnswers = [];

    questions.forEach((item, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const correct = item.a;

        if (selected && selected.value === correct) {
            score++;
        } else {
            const yourAnswer = selected ? selected.value : "None";
            wrongAnswers.push({
                number: i + 1,
                question: item.q,
                yourAnswer: yourAnswer !== "None" ? `${yourAnswer}) ${item.options[yourAnswer]}` : "No answer selected",
                correctAnswer: `${correct}) ${item.options[correct]}`
            });
        }
    });

    resultDiv.innerHTML += `<p>✅ You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>`;

    if (wrongAnswers.length > 0) {
        resultDiv.innerHTML += `<h3>❌ Incorrect Answers:</h3>`;
        wrongAnswers.forEach(item => {
            resultDiv.innerHTML += `
            <div style="margin-bottom: 10px;">
              <strong>Q${item.number}:</strong> ${item.question}<br/>
              <span style="color: red;">Your Answer: ${item.yourAnswer}</span><br/>
              <span style="color: green;">Correct Answer: ${item.correctAnswer}</span>
            </div>
          `;
        });
    } else {
        resultDiv.innerHTML += `<p style="color: green;">🎉 Perfect score! Great job!</p>`;
    }

    quizForm.style.display = "none";
}

// Shuffle array (Fisher–Yates algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const randomizeBtn = document.getElementById("randomize-btn");

randomizeBtn.addEventListener("click", () => {
    shuffle(questions);
    alert("✅ Questions randomized! Now click Start Quiz.");
});


const questions = [
    {
        q: "1. What is the primary goal of Project Cost Management?",
        options: {
            a: "To maximize profit",
            b: "To complete the project ahead of schedule",
            c: "To complete the project within the approved budget",
            d: "To minimize resource usage"
        },
        a: "c"
    },
    {
        q: "2. Which process defines how project costs will be estimated, budgeted, managed, monitored, and controlled?",
        options: {
            a: "Estimate Costs",
            b: "Determine Budget",
            c: "Control Costs",
            d: "Plan Cost Management"
        },
        a: "d"
    },
    {
        q: "3. What is the key benefit of the Estimate Costs process?",
        options: {
            a: "It defines the cost baseline",
            b: "It determines the monetary resources required",
            c: "It monitors cost performance",
            d: "It controls cost changes"
        },
        a: "b"
    },
    {
        q: "4. Which process aggregates estimated costs to establish an authorized cost baseline?",
        options: {
            a: "Estimate Costs",
            b: "Determine Budget",
            c: "Control Costs",
            d: "Plan Cost Management"
        },
        a: "b"
    },
    {
        q: "5. What is the purpose of Control Costs?",
        options: {
            a: "To create the cost management plan",
            b: "To update the cost baseline and manage changes",
            c: "To estimate contingency reserves",
            d: "To define funding sources"
        },
        a: "b"
    },
    {
        q: "6. Which tool is commonly used in all four cost management processes?",
        options: {
            a: "Parametric Estimating",
            b: "Expert Judgment",
            c: "Earned Value Analysis",
            d: "Reserve Analysis"
        },
        a: "b"
    },
    {
        q: "7. What is the formula for Schedule Variance (SV)?",
        options: {
            a: "SV = EV – AC",
            b: "SV = EV – PV",
            c: "SV = PV – AC",
            d: "SV = BAC – EAC"
        },
        a: "b"
    },
    {
        q: "8. What does CPI measure?",
        options: {
            a: "Schedule efficiency",
            b: "Cost efficiency",
            c: "Risk tolerance",
            d: "Budget accuracy"
        },
        a: "b"
    },
    {
        q: "9. Which estimating technique uses three values to define a cost range?",
        options: {
            a: "Parametric Estimating",
            b: "Analogous Estimating",
            c: "Bottom-Up Estimating",
            d: "Three-Point Estimating"
        },
        a: "d"
    },
    {
        q: "10. What is the formula for Beta distribution in Three-Point Estimating?",
        options: {
            a: "(cO + cM + cP) / 3",
            b: "(cO + 4cM + cP) / 6",
            c: "(cM + cP) / 2",
            d: "(cO + cP) / 2"
        },
        a: "b"
    },
    {
        q: "11. What is the cost baseline used for?",
        options: {
            a: "To define the project scope",
            b: "To compare actual results",
            c: "To determine funding sources",
            d: "To calculate CPI"
        },
        a: "b"
    },
    {
        q: "12. What does the acronym EAC stand for?",
        options: {
            a: "Estimated Actual Cost",
            b: "Earned Actual Cost",
            c: "Estimate at Completion",
            d: "Earned Allocation Cost"
        },
        a: "c"
    },
    {
        q: "13. Which document includes strategic funding choices and currency exchange procedures?",
        options: {
            a: "Cost Estimate",
            b: "Cost Management Plan",
            c: "Risk Register",
            d: "Project Charter"
        },
        a: "b"
    },
    {
        q: "14. What is the formula for TCPI based on BAC?",
        options: {
            a: "(BAC – EV) / (BAC – AC)",
            b: "(BAC – AC) / (BAC – EV)",
            c: "(EV – AC) / (BAC – EV)",
            d: "(BAC – EV) / (EAC – AC)"
        },
        a: "a"
    },
    {
        q: "15. What is the key benefit of the Plan Cost Management process?",
        options: {
            a: "It defines the cost baseline",
            b: "It provides guidance on managing costs",
            c: "It calculates contingency reserves",
            d: "It forecasts project completion"
        },
        a: "b"
    },
    {
        q: "16. Which estimating method uses historical data and variables?",
        options: {
            a: "Analogous Estimating",
            b: "Parametric Estimating",
            c: "Bottom-Up Estimating",
            d: "Three-Point Estimating"
        },
        a: "b"
    },
    {
        q: "17. What is the term for the authorized budget assigned to scheduled work?",
        options: {
            a: "Actual Cost",
            b: "Earned Value",
            c: "Planned Value",
            d: "Budget at Completion"
        },
        a: "c"
    },
    {
        q: "18. What is the formula for CPI?",
        options: {
            a: "CPI = EV / AC",
            b: "CPI = EV / PV",
            c: "CPI = AC / EV",
            d: "CPI = PV / AC"
        },
        a: "a"
    },
    {
        q: "19. What does the acronym SPI stand for?",
        options: {
            a: "Schedule Performance Index",
            b: "Strategic Planning Indicator",
            c: "Scope Performance Indicator",
            d: "Schedule Planning Index"
        },
        a: "a"
    },
    {
        q: "20. What is the formula for SPI?",
        options: {
            a: "SPI = EV / AC",
            b: "SPI = EV / PV",
            c: "SPI = PV / EV",
            d: "SPI = AC / EV"
        },
        a: "b"
    },
    {
        q: "21. What is the purpose of reserve analysis?",
        options: {
            a: "To calculate CPI",
            b: "To monitor contingency and management reserves",
            c: "To define the cost baseline",
            d: "To estimate project duration"
        },
        a: "b"
    },
    {
        q: "22. What is the term for the total funds authorized to execute the project?",
        options: {
            a: "Cost Baseline",
            b: "Project Budget",
            c: "Funding Limit",
            d: "Management Reserve"
        },
        a: "b"
    },
    {
        q: "23. What is the cost of work performed called?",
        options: {
            a: "Actual Cost",
            b: "Earned Value",
            c: "Planned Value",
            d: "Budget at Completion"
        },
        a: "b"
    },
    {
        q: "24. What is the formula for EAC when future work is performed at the budgeted rate?",
        options: {
            a: "EAC = BAC / CPI",
            b: "EAC = AC + (BAC – EV)",
            c: "EAC = AC + [(BAC – EV) / (CPI × SPI)]",
            d: "EAC = AC + Bottom-up ETC"
        },
        a: "b"
    },
    {
        q: "25. What is the formula for EAC using CPI?",
        options: {
            a: "EAC = BAC / CPI",
            b: "EAC = AC + (BAC – EV)",
            c: "EAC = AC + Bottom-up ETC",
            d: "EAC = AC + [(BAC – EV) / (CPI × SPI)]"
        },
        a: "a"
    },
    {
        q: "26. What is the formula for EAC using both CPI and SPI?",
        options: {
            a: "EAC = BAC / CPI",
            b: "EAC = AC + (BAC – EV)",
            c: "EAC = AC + Bottom-up ETC",
            d: "EAC = AC + [(BAC – EV) / (CPI × SPI)]"
        },
        a: "d"
    },
    {
        q: "27. What is the term for the budget at completion?",
        options: {
            a: "BAC",
            b: "EAC",
            c: "AC",
            d: "EV"
        },
        a: "a"
    },
    {
        q: "28. What is the term for the difference between EV and AC?",
        options: {
            a: "Schedule Variance",
            b: "Cost Variance",
            c: "Budget Variance",
            d: "Performance Index"
        },
        a: "b"
    },
    {
        q: "29. What is the term for the difference between EV and PV?",
        options: {
            a: "Cost Variance",
            b: "Schedule Variance",
            c: "Budget Variance",
            d: "Performance Index"
        },
        a: "b"
    },
    {
        q: "30. What is the purpose of the cost management plan?",
        options: {
            a: "To define the scope baseline",
            b: "To structure and control project costs",
            c: "To monitor project risks",
            d: "To allocate resources"
        },
        a: "b"
    }
];





