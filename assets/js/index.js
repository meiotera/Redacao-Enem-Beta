let questionInitial = 0;
let opt = [];
let btn_start = document.getElementById('btn-start');
let theme = null;

btn_start.addEventListener('click', ()=>{
    theme = document.getElementById('theme').value;
    show_questions();
});

function show_questions() {
    if(selects[theme][questionInitial]){
        let question = selects[theme][questionInitial];    
        document.querySelector('.question').innerHTML = question.select;
        let op = '';      

        if (questionInitial < 1) {
            document.getElementById('btVoltar').style.display = 'none'
        } else {
            document.getElementById('btVoltar').style.display = 'inline'
        }    
        
        for(let i in question.options) {            
            if(questionInitial === 5) {
                op += `<label><input value="${question.options[i]}" type="checkbox" name="options"><span>${question.options[i]}</span></input></label> <h3></h3>`;
            } else {
                op += `<label><input value="${question.options[i]}" type="radio" name="options"><span>${question.options[i]}</span></input></label>`;
            }
        }
        
        document.querySelector('.options').innerHTML = op;
        
    } else {
        end(opt)
    }
}

let btVoltar = document.getElementById('btVoltar');
btVoltar.addEventListener('click', () => {
    questionInitial--;
    show_questions();
    opt.splice(-1, 1);    
});

let btNext = document.getElementById('btNext');
btNext.addEventListener('click', ()=>{
    let checked = document.querySelectorAll('.options input');    
    let tituloQuestao = document.querySelector('.question span');  
    let alert = document.getElementById('liveAlertPlaceholder');

    let op = null;
    
    if(questionInitial === 5) {
        checkbox();
        return
    }

    for(sel of checked){        
        if(sel.checked){
            op = sel.value;
            
            opt.push(`${tituloQuestao.innerText.bold()} = ${sel.value}`);
        }
    }

    if(op === null){
        alert.className = 'alert alert-danger'
        alert.innerHTML = '<p>Você deve selecionar uma opção!</p>';
        return;
    } else {
        alert.className = ''
        alert.innerHTML = ''
    }
    
    questionInitial++;
    show_questions();
});


btnResumo.addEventListener('click',()=> {
    let success_info = document.querySelector('.success_info');
    if(success_info.style.width === '0px') {        
        success_info.style.width = '100%'
    } else {
        success_info.style.width = '0px'
    }
   
    let btnResumo = document.querySelector('#btnResumo');

    if(btnResumo.style.transform === 'rotate(0deg)'){
        btnResumo.style.transform = 'rotate(180deg)';
    } else {
        btnResumo.style.transform = 'rotate(0deg)';
    }
 
    end(opt);    
});

// Mostra escolhas
function end(opt){
    let vescolhas =  '';    
    for(op of opt){
        vescolhas += `<p class="px-2">${op}</p>`;
    }
    
    document.querySelector('.success_info').innerHTML = `<h1>Você selecionou os seguintes itens</h1> <br> ${vescolhas}`;    
    
    verifications_theme()
}

function verifications_theme() {
    let success_info = document.querySelector('.success_info');
    if(opt.length === Number(21)){
        success_info.style.width = "100%"
    }
}



// Reiniciar
const btn_reiniciar = document.querySelector('.close-text');
btn_reiniciar.addEventListener('click', () => {
    let success_info = document.querySelector('.success_info');
    success_info.style.width ="0"
    questionInitial = 0;
    opt = [];
    theme = null;
    let alert = document.getElementById('liveAlertPlaceholder');
    alert.innerHTML = ''
    alert.className = ''
});


//contagem de checkbox
function checkbox() {
    let array_ckecked = document.querySelectorAll('input[type="checkbox"]:checked').length
    let number_of_checked = array_ckecked;
    let alert = document.getElementById('liveAlertPlaceholder');

    let checked = document.querySelectorAll('.options input');    
    let tituloQuestao = document.querySelector('.question span');  


  
    if(number_of_checked !== 2) {
        alert.className = 'alert alert-danger'
        alert.innerHTML = '<p>Você deve selecionar duas opções!</p>';
        
        return;
    } else {
        
        alert.className = ''
        alert.innerHTML = '';
    }
    
    for(sel of checked){        
        if(sel.checked){
            op = sel.value;
            
            opt.push(`${tituloQuestao.innerText.bold()} = ${sel.value}`);
        }
    }
    questionInitial++
    show_questions();    
}

