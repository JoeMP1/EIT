let body = document.body
let Display = document.querySelector(".Questions-container");
let options_container = document.querySelector(".Options-container")
let start_btn = document.querySelector(".start");
let next_btn = document.querySelector(".next");
let Questions = document.querySelector("h2");
let checkbox = document.querySelectorAll(".check");
let label = document.querySelectorAll("label");
let Options = document.querySelectorAll(".Options");

let question_No = 0;
const questions = [
    {
        key:"travel",
        question:"How do you travel daily?",
        options: ["Car","Bus", "Train", "Walk"],
        input_Text: "How many Km per day (approx)?"
    },

    {
        key:"food",
        question:"How often do you eat meat?",
        options: ["Almost everyday", "Few times per month", "Few times per year", "I dont eat meat"],
        input_Text: "How many times per month?"
    },
    {
        key:"recycle",
        question:"Do you recycle?",
        options: ["Yes", "No"]
    },
    {
        key: "test",
        question:"Testing if 4 options work",
        options: ["YIPPIE", " LETS GO", "BROSKIE"]
    }
    
]
let answers = {}

function saveAns(){
    let selectedAns = [];
    checkbox.forEach(box => {
        if(box.checked){
            console.log(box.value);
            selectedAns.push(box.value);
        }
    })
    answers[questions[question_No].key] = selectedAns;
    console.log("Answers: " + answers[questions[question_No].key]);
}

start_btn.addEventListener("click", e =>{
    if(Display.style.display === "none" || Display.style.display === ""){
        Display.style.display = "flex";
        start_btn.innerHTML = "Hide";
        
    }
    else{
        start_btn.innerHTML = "Start";
        Display.style.display = "none";
        console.log("not working");
    }
    
})

next_btn.addEventListener("click", e=>{
    saveAns();
    question_No++;
    next_question(question_No);
})


function isCheck(){
    checkbox.forEach(box => {
        let number_input = box.parentElement.parentElement.querySelector(".Value") //goes till <div class = "Options"> and then go class = ".Value"
        if(box.checked){
            number_input.style.display = "block";
        }
        else{
            number_input.style.display = "none";
        }
    })
}

function next_question(ques_no){
    for(let i = 0; i < Options.length; i++){
        let checkboxLabel = Options[i].querySelector("span");
        let checkbox2 = Options[i].querySelector(".check");
        let inputLabel = Options[i].querySelector(".Value").querySelector("span"); //goes to each options and go to class = "Value" and under that, goes to <span>
        if(questions[ques_no].options[i] ){
            Options[i].style.display = "";
            //checkboxLabel.style.display = "";
            
            inputLabel.textContent = questions[ques_no].input_Text
            checkboxLabel.textContent = questions[ques_no].options[i];
            checkbox2.value = questions[ques_no].options[i];
            checkbox2.checked = false;
        }
        else{
            //checkboxLabel.style.display = "none";
            Options[i].style.display = "none";
        }
    
    }
    Questions.textContent = questions[ques_no].question; //goes to a list, then inside the curly braces and then the variable
    
}

