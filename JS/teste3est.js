
function angulo (event) { 
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");    
    var ladoB =  ((form.estaca.value*1/2+15)/(Math.cos(26*Math.PI/180))).toFixed(0); //cálculo do lado B  
    var ladoA =  (form.estaca.value*3 + 1*ladoB).toFixed(0);  //cálculo do lado A     
    var dLinha =  5; //altura útil    
    var nkest1 =  (1.05*form.forcaNk.value)/3
    var mkest1 =  form.forcaNk1.value
    var mkest2 =  form.forcaNk2.value
    var eixo =  form.estaca.value*3;
    var comprimentoL =Math.sqrt((eixo*eixo)-((eixo/2)*(eixo/2))).toFixed(0);
         

    var nkest1A = (1*nkest1 -(mkest1/(comprimentoL/100))-(mkest2/(comprimentoL/100))).toFixed(2);
    var nkest2A = (1*nkest1 +(mkest1/(comprimentoL/100))+(mkest2/(comprimentoL/100))).toFixed(2);
    var nkest3A = (1*nkest1 +(mkest1/((comprimentoL/100)*2))-(mkest2/((comprimentoL/100)*2))).toFixed(2);

    var nkResiste = Math.max(nkest1A,nkest2A,nkest3A); 
    //cálculo do fcd    
    var fcd =  ((form.fck.value/10)/1.4).toFixed(2);

    //cálculo do alfav2
    var alfav2 =  (1-(form.fck.value/250)).toFixed(2);

/////////////////////////////////////////////////////////////////////
    //Áreas Ampliadas da estaca
    //cálculo da área ampliada da estaca
    var aestaca = ((Math.PI/4)*((1*form.estaca.value+5)*(1*form.estaca.value+5))).toFixed(2);
    var aestacaTd = document.createElement("td");    
    aestacaTd.textContent = aestaca + " cm²"

/////////////////////////////////////////////////////////////////////
    //Angulo rad e graus
   //cálculo do ângulo
    var anguloTeta = Math.sqrt((nkResiste*1.4)/(0.72*alfav2*fcd*aestaca)).toFixed(4);  
    var anguloTetaTd = document.createElement("td");       
        anguloTetaTd.textContent = anguloTeta + " rad"

    //cálculo do seno do  ângulo
    var anguloTeta1 = (Math.asin(anguloTeta)*180/Math.PI).toFixed(2)  
    var anguloTetaTd1 = document.createElement("td");
        anguloTetaTd1.textContent = anguloTeta1 + " °"


////////////////////////////////////////////////////////////////////////////////
    //Exentricidades
    //cálculo das exentricidades 
    var exentricidadeEx = (((2*form.estaca.value)/(3*Math.PI))-(form.pilarBp.value/4)).toFixed(2); //exentricidade em X   
    var exentricidadeEy = (((comprimentoL*2)/3)+((form.pilarAp.value/3)/2)-(1*form.pilarAp.value/2)).toFixed(2); //exentricidade em Y    
    var exentricidadeE = Math.sqrt((exentricidadeEx*exentricidadeEx)+(exentricidadeEy*exentricidadeEy)).toFixed(2); //exentricidade em E
    
////////////////////////////////////////////////////////////////////////////////    
    //BRAÇO DE ALAVANCA, ALTURA ÚTIL E ALTURA DO BLOCO
    //braço de alavanca
    var zBraco1 = (exentricidadeE*Math.tan(anguloTeta1*Math.PI/180)).toFixed(2); 

    //altura útil 
    var alturaUtil1= (zBraco1/0.8).toFixed(2);         
  
    //cálculo do seno do  ângulo
    var senoTr = document.createElement("tr");
    var senoNovo = form.novoSeno.value;
    var senoTd = document.createElement("td");
    senoTd.textContent =senoNovo;
  
    //braço de alavanca
    var zBraco = (exentricidadeE*Math.tan(senoNovo*Math.PI/180)).toFixed(2);
 
    //altura útil
    var alturaUtil= (zBraco/0.8).toFixed(2);
    var alturaUtilTd = document.createElement('td');
    alturaUtilTd.textContent = alturaUtil;
      
    //altura total do bloco
    var alturaH = (alturaUtil*1+5).toFixed(2);

    // X BARRA
    var xBarra = 2*(alturaUtil1-zBraco).toFixed(2);
    console.log(xBarra)

    //delta X 
    var deltaX = ((xBarra*exentricidadeEx)/zBraco).toFixed(2);
      
    //delta y 
    var deltaY = ((xBarra*exentricidadeEy)/zBraco).toFixed(2);
    
    //árae pilar ampliada     
    var areaAmpliadaPilar = (((form.pilarAp.value/3)+deltaX*1)*((form.pilarBp.value/2)+deltaY*1)).toFixed(2);
    console.log(areaAmpliadaPilar)

    // tensões no área ampliada !    
    var nkRsultadoAmpliado = ((nkResiste*1.4)/(2*areaAmpliadaPilar)).toFixed(3)   
    var tensaoPilarAreaTd = document.createElement("td");
    tensaoPilarAreaTd.textContent = nkRsultadoAmpliado; 

    // tensões resistente do bloco
    var resistente = ((0.85*alfav2*fcd)*(Math.sin((senoNovo*Math.PI/180))*Math.sin((senoNovo*Math.PI/180)))).toFixed(3);  
    var resistenteTd = document.createElement("td");
    resistenteTd.textContent = resistente; 


    //situação ÁREA AMPLIADA DO PILAR 
    var ampliadaTd = document.createElement("td");  

    if (resistente >= nkRsultadoAmpliado ){
        ampliadaTd.textContent = " Resiste ";
        ampliadaTd.style.backgroundColor = "lightblue"           
    }else{
        ampliadaTd.textContent = " Não resiste";
        ampliadaTd.style.backgroundColor = "lightcoral"
        
    }

    // tensões no bloco devido Pilar      
    var tensaoPilar = ((3*nkResiste*1.4)/(1*form.pilarBp.value*(form.pilarAp.value*1+0.4*alturaUtil))).toFixed(3);    
    var tensaoPilarTd = document.createElement("td");
    tensaoPilarTd.textContent = tensaoPilar 

    // tensões resistente do bloco
    var resistente1 = resistente 
    var resistente1Td = document.createElement("td");
    resistente1Td.textContent = resistente1;


    //situação NBR 
    var resistenteNBRTd = document.createElement("td");  

    if (resistente >= tensaoPilar ){
        resistenteNBRTd.textContent = " Resiste ";
        resistenteNBRTd.style.backgroundColor = "lightblue"           
    }else{
        resistenteNBRTd.textContent = " Não resiste";
        resistenteNBRTd.style.backgroundColor = "lightcoral"
        
    }
  
    senoTr.appendChild(senoTd); //seno 
    senoTr.appendChild(alturaUtilTd); //altura útil
    senoTr.appendChild(tensaoPilarAreaTd); // tensão do pilar ampliado
    senoTr.appendChild(resistenteTd); // tensão resistente
    senoTr.appendChild(ampliadaTd); // comparação entre as situações   
    senoTr.appendChild(tensaoPilarTd); // tensão NBR
    senoTr.appendChild(resistente1Td); //tensão resistente novamente
    senoTr.appendChild(resistenteNBRTd); //comparação entre as situações

    var tabelaSeno = document.querySelector('#alternado-seno-d');
    tabelaSeno.appendChild(senoTr); 



   
};

let botaoAdicionar1 = document.querySelector("#angulo-calculo"); 

botaoAdicionar1.addEventListener("click", angulo) 


  
