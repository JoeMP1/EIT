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
        //options: ["Car","Bus", "Train", "Walk"],
        options: [
            {
                text: "Car",
                need_input: true,
            },

            {
                text: "Bus",
                need_input: true,
            },
            {
                text: "Train",
                need_input: true,
            },
            {
                text: "Walk",
                need_input: true,
            }
        ],
        input_Text: "How many Km per day (approx)?"
    },

    {
        key:"food",
        question:"How often do you eat meat?",
        //options: ["Almost everyday", "Few times per month", "Few times per year", "I dont eat meat"],
        options: [
            {
                text: "Almost everyday",
                need_input: true,
            },

            {
                text: "Few times per month",
                need_input: true,
            },
            {
                text: "Few times per year",
                need_input: true,
            },
            {
                text: "I dont eat meat",
                need_input: false,
            }
        ],
        input_Text: "How many times per month?"
    },
    {
        key:"recycle",
        question:"Do you recycle?",
        //options: ["Yes", "No"]
        options:[
            {
                text: "Yes",
                need_input:false,
            },

            {
                text: "No",
                need_input: false,
            }
        ]
    },
    {
        key: "test",
        question:"Testing if 4 options work",
        //options: ["YIPPIE", " LETS GO", "BROSKIE"]
        options:[
            {
                text: "YIPPIE",
                need_input:false,
            },

            {
                text: "LETS GO",
                need_input: false,
            },

            {
                text: "Broskie",
                need_input: false,
            }
        ]
    }
    
]
let answers = {}

function saveAns(){
    //let selectedAns = [];
    checkbox.forEach(box => {
        let Number_Value = box.parentElement.parentElement.querySelector(".Number-value").value
        if(box.checked){
            answers[questions[question_No].key] = {}
            answers[questions[question_No].key].options = box.value
            answers[questions[question_No].key].value = Number_Value //eg. answers.travel.value => answers{
        //                                                                              travel {
        //                                                                                     option: car,
        //                                                                                     value: 25
        //                                                                                  }
        //                                                                              }
            console.log("Answers: " + answers[questions[question_No].key].options);
            console.log("Value: " + answers[questions[question_No].key].value);
            console.dir(answers)// very useful for displaying full object
            
        }
        
    })
    
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
            //console.log(box.value);
            console.log(number_input);
            if(box.value == "I dont eat meat")
            {
                number_input.style.display = "none";

            }
        }
        else{
            number_input.style.display = "none";
        }
        
    })
}

function next_question(ques_no){
    console.log(Options.length)
    for(let i = 0; i < Options.length; i++){
        let checkboxLabel = Options[i].querySelector("span");
        let checkbox2 = Options[i].querySelector(".check");
        let number_input = Options[i].querySelector(".Number-value");
        let Value_select = Options[i].querySelector(".Value");
        let inputLabel = Options[i].querySelector(".Value").querySelector("span"); //goes to each options and go to class = "Value" and under that, goes to <span>
        if(questions[ques_no].options[i] ){
            Options[i].style.display = "";
            //checkboxLabel.style.display = "";
            
            inputLabel.textContent = questions[ques_no].input_Text
            checkboxLabel.textContent = questions[ques_no].options[i].text;
            checkbox2.value = questions[ques_no].options[i];
            checkbox2.checked = false;
            number_input.value = "0";
            Value_select.style.display = "";
        }
        else{
            //checkboxLabel.style.display = "none";
            Options[i].style.display = "none";
        }
    
    }
    Questions.textContent = questions[ques_no].question; //goes to a list, then inside the curly braces and then the variable
    
}

