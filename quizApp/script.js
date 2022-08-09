class quizBase {
    constructor(question, a, b, c, d, correctAnswer) {
        this.question = question;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.correctAnswer = correctAnswer;
    }
}

const questionsBase = [
    new quizBase("Who is the president of USA?", "Donald Trump", "Barack Obama", "Joe Biden", "Vladimir Putin", "Joe Biden"),
    new quizBase("Who is the president of Russia?", "Alexey Novalniy", "Fidel Castro", "Joe Biden", "Vladimir Putin", "Vladimir Putin"),
    new quizBase("Who is the president of Canada?", "Justin Pierre James Trudeau", "Joseph Jacques Jean Chrétien", "Joe Biden", "Martin Brian Mulroney", "Justin Pierre James Trudeau"),
    new quizBase("Who is the president of France?", "François Gérard Georges Nicolas Hollande", "Fidel Castro", "Nicolas Sarkozy", "Emmanuel Jean-Michel Frédéric Macron", "Emmanuel Jean-Michel Frédéric Macron"),
    new quizBase("Who is the president of Italy?", "Giorgio Napolitano", "Carlo Azeglio Ciampi", "Oscar Luigi Scalfaro", "Sergio Mattarella", "Sergio Mattarella"),
    new quizBase("Who is the president of China?", "Cài Yīngwén", "Mǎ Yīngjiǔ", "Chén Shuǐbiǎn", "Lǐ Dēnghuī", "Cài Yīngwén")
]

let counterQuiz = 0;
let counterRightAnswers = 0;

const question = document.querySelector(".question")
const answer_a = document.querySelector(".label_a")
const answer_b = document.querySelector(".label_b")
const answer_c = document.querySelector(".label_c")
const answer_d = document.querySelector(".label_d")
const correct = questionsBase[counterQuiz].correctAnswer

function questions(counter) {
    console.log(questionsBase[counter].question)
    question.innerHTML = questionsBase[counter].question
    answer_a.innerHTML = questionsBase[counter].a
    answer_b.innerHTML = questionsBase[counter].b
    answer_c.innerHTML = questionsBase[counter].c
    answer_d.innerHTML = questionsBase[counter].d
}
questions(counterQuiz);

function submit() {
    if(document.querySelector("button").textContent == "Again?") {
        counterQuiz = 0;
        counterRightAnswers = 0;
        document.querySelectorAll("li").forEach(it => it.removeAttribute("hidden"));
        document.querySelector("button").textContent = "Submit"
        return questions(counterQuiz);

    }
    if(counterQuiz == questionsBase.length-1) {
        document.querySelector(".question").textContent = `Correct answers ${counterRightAnswers}`
        document.querySelectorAll("li").forEach(it => it.setAttribute("hidden", ""));
        document.querySelector("button").textContent = "Again?"
    }

    document.querySelectorAll(".input").forEach(it => it.checked = false)
    counterQuiz++
    document.querySelectorAll(".input").forEach(it => it.disabled = false);
    questions(counterQuiz);
    
}

let elementChecked = 0

function checked(event) {
    let closest = document.querySelector(`.label_${event.target.id}`).textContent;
    if(closest == questionsBase[counterQuiz].correctAnswer) {
        counterRightAnswers++
        document.querySelectorAll(".input").forEach(it => it.disabled = event)
        console.log(counterRightAnswers)
        
    } else {
        document.querySelectorAll(".input").forEach(it => it.disabled = event)
        console.log(counterRightAnswers)
    }
}

let submit_btn = document.getElementById("submit");

submit_btn.addEventListener("click", submit);

