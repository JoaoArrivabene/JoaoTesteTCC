
function angulo (event) { 
    event.preventDefault();

//TABELAS
var tabelaTensaoTr = document.createElement('tr');//Tabela das tensões blevot
var tabelaGrazianoTr = document.createElement('tr');//Tabela das tensões graziano
var tabelaAsTr = document.createElement('tr');//Tabela das tensões


//Geometria
var form = document.querySelector("#form-adiciona");    
var ladoB =  ((form.estaca.value*1/2+15)/(Math.cos(26*Math.PI/180))).toFixed(0); //cálculo do lado B  
var ladoA =  (form.estaca.value*3 + 1*ladoB).toFixed(0);  //cálculo do lado A     
var dLinha =  5; //altura útil    
var nkest1 =  (form.forcaNk.value)/3
var mkest1 =  form.forcaNk1.value
var mkest2 =  form.forcaNk2.value  
var eixo =  form.estaca.value*3;  
var comprimentoL =Math.sqrt((eixo*eixo)-((eixo/2)*(eixo/2))).toFixed(0);         

//Forças Estacas
var nkest1A = (1*nkest1 -(mkest1/(comprimentoL/100))-(mkest2/(comprimentoL/100))).toFixed(2);
var nkest2A = (1*nkest1 +(mkest1/(comprimentoL/100))+(mkest2/(comprimentoL/100))).toFixed(2);
var nkest3A = (1*nkest1 +(mkest1/((comprimentoL/100)*2))-(mkest2/((comprimentoL/100)*2))).toFixed(2);
var nkResiste = Math.max(nkest1A,nkest2A,nkest3A); 
        
//cálculo do fcd
var fcd =  ((form.fck.value/10)/1.4).toFixed(2);   
//cálculo do alfav2
var alfav2 =  (1-(form.fck.value/250)).toFixed(2);

//altura útil
var AsTr= document.createElement("tr"); 
var alturaUtil= form.alturaUtilNova.value;

//Pilar equivalente
var a1= Math.sqrt(form.pilarAp.value*form.pilarBp.value)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tensões BLEVOT


var d = form.alturaUtilNova.value;
var tg = (d/(eixo*(Math.sqrt(3)/3)-0.3*a1)).toFixed(2);  
var tg1 = (Math.atan(tg)*180/Math.PI).toFixed(2);  
var apilar = (a1*a1).toFixed(2)
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
    var zBraco = (0.8*form.alturaUtilNova.value).toFixed(2);

   
//////////////////////////////////////////////////////////////////////////////////////////
    //DELTAS X,Y E ÁREA AMPLIADA DO PILAR
    //delta X 
var deltaX = ((0.4*form.alturaUtilNova.value*exentricidadeEx)/zBraco).toFixed(2);

    //delta y  
var deltaY = ((0.4*form.alturaUtilNova.value*exentricidadeEy)/zBraco).toFixed(2);    

    //árae pilar ampliada  
var areaAmpliadaPilar = (((form.pilarAp.value/2)+deltaX*1)*((form.pilarBp.value/2)+deltaY*1)).toFixed(2);    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TENSÕES 


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
var AsBlevot = 3*(((Math.sqrt(3)*form.forcaNk.value)/(27*form.alturaUtilNova.value*(50/1.15)))*(eixo*Math.sqrt(3)-0.9*a1)).toFixed(2);
var AsBlevotTd = document.createElement('td');
    AsBlevotTd.textContent = AsBlevot + " cm² por lado";  

//Excentricidades  
//cálculo das exentricidades ESTACA FRONTAL
var exentricidadeEx = (((2*(5+1*form.estaca.value))/(3*Math.PI))-(form.pilarBp.value/4)).toFixed(2); //exentricidade em X   
var exentricidadeEy = (((comprimentoL*2)/3)+((form.pilarAp.value/3)/2)-(1*form.pilarAp.value/2)).toFixed(2); //exentricidade em Y    
var exentricidadeE = Math.sqrt((exentricidadeEx*exentricidadeEx)+(exentricidadeEy*exentricidadeEy)).toFixed(2); //exentricidade em E
    
//cálculo das exentricidades DEMAIS ESTACAS
var exentricidadeEx1 = ((eixo/2)-(form.pilarBp.value/4)).toFixed(2)  //EM X
var exentricidadeEy1 = ((comprimentoL/3)+(form.pilarAp.value/2)-((2*form.pilarAp.value)/3)).toFixed(2); //EM Y



// CÁLCULO DAS DISTRIBIÇÕES DAS FORÇAS EM SUAS DECOMPOSIÇÕES    
var NK1 = ((nkResiste*exentricidadeE)/zBraco).toFixed(2);

var NK2X = ((nkResiste*exentricidadeEx1)/zBraco).toFixed(2); //TRIÂNGULO EM X
var NK2Y = ((nkResiste*exentricidadeEy1)/zBraco).toFixed(2); //TRIÂNGULO EM Y
var anguloNK1 = (Math.atan((eixo/2)/comprimentoL)*180/Math.PI).toFixed(2);
    

var NKT1 = (NK1/(2*Math.cos(anguloNK1*Math.PI/180))).toFixed(2);   
var NKT = (NK2X/(Math.cos(anguloNK1*Math.PI/180))).toFixed(2);
var NKTX = (NK2X - NKT*Math.sin(anguloNK1*Math.PI/180)).toFixed(2);

    console.log(NK1 + "força principal")
    console.log(anguloNK1 + "angulo cosseno")
    console.log(NKT1 + "força diagonal")

//AsGraziano
var AsGraziano = (2*((NKT1*1.4)/(50/1.15))).toFixed(2);
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


  