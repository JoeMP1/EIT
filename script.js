let body = document.body;
let Display = document.querySelector(".Questions-container");
let options_container = document.querySelector(".Options-container");
let start_btn = document.querySelector(".start");
let next_btn = document.querySelector(".next");
let Questions = document.querySelector("h2");
let checkbox = document.querySelectorAll(".check");
let label = document.querySelectorAll("label");
let Options = document.querySelectorAll(".Options");

let use_Car = false
let skip_Question = true
let question_No = 0;
const questions = [
    {
        key:"travel",
        question:"How do you travel daily?",
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
        question:"What does your meal mostly consist of?",
        options: [
            {
                text: "Meat",
                need_input: true,
            },

            {
                text: "Vegan",
                need_input: true,
            },
            {
                text: "Mixed",
                need_input: true,
            },
            {
                text: "vegetarian",
                need_input: true,
            }
        ],
        input_Text: "How many times per month?"
    },
    {
        key:"recycle",
        question:"Do you recycle?",
        
        options:[
            {
                text: "Yes",
                need_input:false,
            },

            {
                text: "No",
                need_input: false,
            }
        ],
        input_Text: ""
    },
    {
        key: "takeout",
        question:"How often do you eat outside?",
        options:[
            {
                text: "More than 15 times per month",
                need_input:false,
            },

            {
                text: "More than 10 times per month",
                need_input: false,
            },

            {
                text: "More than 5 times per month",
                need_input: false,
            },
            {
                text: "Less or equal to 5 times per month",
                need_input:false,
            }
        ]
    },
    {
        key: "Car",
        question:"What type of vehicle do you drive?",
        options:[
            {
                text:"Electric",
                need_input:false,
            },
            {
                text:"Hybrid",
                need_input:false,
            },
            {
                text:"Petrol",
                need_input:false,
            },
            {
                text:"Other (CNG,Ethanol,Diesel etc)",
                need_input:false,
            }

        ]
    },
    {
        key: "flight",
        question:"How often do you fly?",
        options:[
            {
                text:"International",
                need_input: true,
            },
            {
                text:"Domestic",
                need_input: true,
            }

        ],
        input_Text:"Per year"
    }
    
]
let answers = {}

//Source: https://www.sciencedirect.com/science/article/abs/pii/S1364032124006774? OR from science direct
let factor = {
    travel:{
        car:{
            Electric: 170.1, //avg of compact suv and hatchback of BEV
            Hybrid: 200.55, //avg of compact suv and hatchback of HEV
            Petrol: 214.9, //avg of compact suv and hatchback of ICEV
            Other: 143 //this is for ICE CNG from TERI
        },
        //i forgot the source lowkey
        Train: 20,
        Bus: 100,
        Walk: 0,
    },
    //source: https://ourworldindata.org/grapher/ghg-per-kg-poore OR ourworldindata
    food:{
        Meat: 40, //per kg, avg of Poultry meat,pig meat,beef and lamb & mutton
        Vegan: 1.5675, //per kg, avg of rice,tomatoes and all the way down
        mixed:15.6, //per kg,avg of everything
        vegatarian: 3.72
    },
    recycle: -2.5, //save 2.5kg co2/day Source from https://www.scrappzero.com/resources/post/recycling-co2 (idk if its reputed)
    takeout: 1.5
}
function saveAns(){
    //let selectedAns = [];
    checkbox.forEach((box,index) => {
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
            console.log(answers[questions[question_No].key].options);
            if(answers[questions[question_No].key].options == "Car"){
                console.log("Skipp!!")
                skip_Question = false;
            }
            console.log("Value: " + answers[questions[question_No].key].value);
            
            console.dir(answers)// very useful for displaying full object

            //console.dir(answers["flight"].value); //we can access the value of flight using this
            
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
    if(skip_Question == true && question_No == 4){
        question_No++;
    }
    if(question_No <= 5){
        next_question(question_No);
    }
    else{
        null
    }
    calculate(answers["travel"].options)
    console.log("Question: " + question_No)
})


function isCheck(){
    checkbox.forEach((box,index) => {
        let number_input = box.parentElement.parentElement.querySelector(".Value") //goes till <div class = "Options"> and then go class = ".Value"
        if(box.checked){
            
            //console.log(number_input);
            
            if(questions[question_No].options[index].need_input && questions[question_No].options[index] ){
                number_input.style.display = "block";
            }
            else{
                number_input.style.display = "none";
            }
        }
        else{
            number_input.style.display = "none";
        }
    })
}

function next_question(ques_no){
    //console.log(Options.length)
    for(let i = 0; i < Options.length; i++){
        let checkboxLabel = Options[i].querySelector("span");
        let checkbox2 = Options[i].querySelector(".check");
        let number_input = Options[i].querySelector(".Number-value");
        let Value_select = Options[i].querySelector(".Value");
        let inputLabel = Options[i].querySelector(".Value").querySelector("span"); //goes to each options and go to class = "Value" and under that, goes to <span>
        if(questions[ques_no].options[i] ){
            Options[i].style.display = "";
            
            
            inputLabel.textContent = questions[ques_no].input_Text;
            checkboxLabel.textContent = questions[ques_no].options[i].text;
            checkbox2.value = questions[ques_no].options[i].text;
            checkbox2.checked = false;
            number_input.value = "0";
            Value_select.style.display = "";
        }
        else{
            checkbox2.checked = false;
            Options[i].style.display = "none";
        }
    
    }
    Questions.textContent = questions[ques_no].question; //goes to a list, then inside the curly braces and then the variable
    
}

function calculate(test){
    console.log("test")
    let co2_value = answers["travel"].value;
    //let calculating = factor["travel"].Train;
    let calculating = factor["travel"][test]
    let final = co2_value * calculating;
    console.log("calculating: "+ calculating)
    console.log("Final: " + final);
    console.log("TEST: " + test)

}