
function angulo (event) { 
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");     
    var tabelaTensaoTr = document.createElement('tr');//Tabela das tensões blevot
    var tabelaGrazianoTr = document.createElement('tr');//Tabela das tensões graziano
    var tabelaAsTr = document.createElement('tr');//Tabela das tensões

/////////////////////////////////////////////////////////////////////
    //Forças e concreto
    var nkest1 =  (form.forcaNk.value)/2
    var mkest1 =  form.forcaNk1.value
    var eixo =  form.estaca.value*3;

    var nkest1A = (1*nkest1 -(mkest1/(eixo/100))).toFixed(2);
    var nkest2A = (1*nkest1 +(mkest1/(eixo/100))).toFixed(2);
    var nkResiste = Math.max(nkest1A,nkest2A); 
                 
    //cálculo do fcd    
    var fcd =  ((form.fck.value/10)/1.4).toFixed(2);

    //cálculo do alfav2
    var alfav2 =  (1-(form.fck.value/250)).toFixed(2);


/////////////////////////////////////////////////////////////////////
//Método Blevot
var d = form.alturaD.value;
var tg = (d/(eixo/2-form.pilarAp.value/4));
var tg1 = (Math.atan(tg)*180/Math.PI).toFixed(2);
var apilar = (form.pilarAp.value*form.pilarBp.value).toFixed(2)
var aestaca = ((Math.PI/4)*((1*form.estaca.value)*(1*form.estaca.value))).toFixed(2);
var seno = (Math.sin((tg1*Math.PI/180))*Math.sin((tg1*Math.PI/180))).toFixed(2)

// Tensões BLEVOT
var TensaoPilar = ((nkResiste*1.4)/(apilar*seno)).toFixed(2);
var TensaoPilarTd = document.createElement('td');
    TensaoPilarTd.textContent = TensaoPilar + " kN/cm²";

var TensaoEstaca = ((nkResiste*1.4)/(2*aestaca*seno)).toFixed(2);
var TensaoEstacaTd = document.createElement('td');
    TensaoEstacaTd.textContent = TensaoEstaca + " kN/cm²";

var TensaoLimite = (1.4*0.9*fcd).toFixed(2)
var TensaoLimiteTd = document.createElement('td');
    TensaoLimiteTd.textContent = TensaoLimite+ " kN/cm²";


    tabelaTensaoTr.appendChild(TensaoPilarTd); //tensão pilar
    tabelaTensaoTr.appendChild(TensaoEstacaTd);//tensão estaca
    tabelaTensaoTr.appendChild(TensaoLimiteTd);//tensão resistente


var tabelaTensoes = document.querySelector('#tabela-blevot'); 
    tabelaTensoes.appendChild(tabelaTensaoTr);

// Tensões graziano

/////////////////////////////////////////////////////////////////////
    //Áreas Ampliadas da estaca
    //cálculo da área ampliada da estaca
var aestaca = ((Math.PI/4)*((1*form.estaca.value+5)*(1*form.estaca.value+5))).toFixed(2);


/////////////////////////////////////////////////////////////////////
    //Angulo rad e graus
   //cálculo do ângulo
var anguloTeta = Math.sqrt((nkResiste*1.4)/(0.72*alfav2*fcd*aestaca)).toFixed(4);  

    //cálculo do seno do  ângulo
var anguloTeta1 = (Math.asin(anguloTeta)*180/Math.PI).toFixed(2)  

////////////////////////////////////////////////////////////////////////////////
    //Exentricidades
    //cálculo das exentricidades 
var exentricidadeEx = (eixo/2-form.pilarAp.value/4).toFixed(2);


    //exentricidade em Y
var exentricidadeEy = (((2*(1*form.estaca.value+5))/(3*Math.PI)) - form.pilarBp.value/4).toFixed(2);

    //exentricidade em E  
var exentricidadeE = Math.sqrt((exentricidadeEx*exentricidadeEx)+(exentricidadeEy*exentricidadeEy)).toFixed(2);    


////////////////////////////////////////////////////////////////////////////////    
    //BRAÇO DE ALAVANCA, ALTURA ÚTIL E ALTURA DO BLOCO
    //braço de alavanca
    var zBraco = (0.8*form.alturaD.value).toFixed(2);

   
//////////////////////////////////////////////////////////////////////////////////////////
    //DELTAS X,Y E ÁREA AMPLIADA DO PILAR
    //delta X 
var deltaX = ((0.4*form.alturaD.value*exentricidadeEx)/zBraco).toFixed(2);

    //delta y  
var deltaY = ((0.4*form.alturaD.value*exentricidadeEy)/zBraco).toFixed(2);    

    //árae pilar ampliada  
var areaAmpliadaPilar = (((form.pilarAp.value/2)+deltaX*1)*((form.pilarBp.value/2)+deltaY*1)).toFixed(2);    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TENSÕES 
    // tensões no bloco devido Pilar        
//var tensaoPilar = ((2*nkResiste*1.4)/(1*form.pilarBp.value*(form.pilarAp.value*1+0.4*alturaUtil))).toFixed(2);    

// tensões no área ampliada !   
var tensaoPilarGraziano = ((nkResiste*1.4)/(2*areaAmpliadaPilar)).toFixed(3)   
var tensaoPilarGrazianoTd = document.createElement('td');
    tensaoPilarGrazianoTd.textContent = tensaoPilarGraziano + " kN/cm²";


// tensões no área estaca ! 
var tensaoEstacaGraziano = ((nkResiste*1.4)/(2*aestaca*seno)).toFixed(2);
var tensaoEstacaGrazianoTd  = document.createElement('td');
    tensaoEstacaGrazianoTd.textContent = tensaoEstacaGraziano  + " kN/cm²";

    // tensões resistente do bloco   
var tensaoultima = ((0.85*alfav2*fcd)*(Math.sin((anguloTeta1*Math.PI/180))*Math.sin((anguloTeta1*Math.PI/180)))).toFixed(3);  
var tensaoultimaTd = document.createElement('td');
    tensaoultimaTd.textContent = tensaoultima + " kN/cm²";

    tabelaGrazianoTr.appendChild(tensaoPilarGrazianoTd)
    tabelaGrazianoTr.appendChild(tensaoEstacaGrazianoTd)
    tabelaGrazianoTr.appendChild(tensaoultimaTd)

    
    var tabelaTensoes1 = document.querySelector('#tabela-graziano'); 
        tabelaTensoes1.appendChild(tabelaGrazianoTr);



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//As Blevot
var AsBlevot = ((((1.15*form.forcaNk.value*1.4)/(8*form.alturaD.value*(50/1.15))))*(2*eixo-form.pilarAp.value)).toFixed(2);
var AsBlevotTd = document.createElement('td');
    AsBlevotTd.textContent = AsBlevot + " cm²";

//AsGraziano
var AsGraziano = ((nkResiste*1.4*exentricidadeEx)/(0.8*form.alturaD.value*(50/1.15))).toFixed(2);
var AsGrazianoTd = document.createElement('td');
    AsGrazianoTd.textContent = AsGraziano + " cm²";

//Comparação
var X = ((1-(AsBlevot/AsGraziano))*100).toFixed(2)
var XTd = document.createElement('td');
    XTd.textContent = X + " %";

    tabelaAsTr.appendChild(AsBlevotTd);
    tabelaAsTr.appendChild(AsGrazianoTd);
    tabelaAsTr.appendChild(XTd);

var tabelaAs = document.querySelector('#alternado-seno-d'); 
    tabelaAs.appendChild(tabelaAsTr);


      
};

let botaoAdicionar1 = document.querySelector("#angulo-calculo"); 

botaoAdicionar1.addEventListener("click", angulo) 


  