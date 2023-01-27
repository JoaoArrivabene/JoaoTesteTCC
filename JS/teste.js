
function angulo (event) { 
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");    
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
    //Áreas Ampliadas da estaca
    //cálculo da área ampliada da estaca
    var aestaca = ((Math.PI/4)*((1*form.estaca.value+5)*(1*form.estaca.value+5))).toFixed(2);  
   

/////////////////////////////////////////////////////////////////////
    //Angulo rad e graus
   //cálculo do ângulo
    var anguloTeta = Math.sqrt((nkResiste*1.4)/(0.72*alfav2*fcd*aestaca)).toFixed(4);  
    

    //cálculo do seno do  ângulo
    var anguloTeta1 = (Math.asin(anguloTeta)*180/Math.PI).toFixed(2)    
        console.log(anguloTeta1)


////////////////////////////////////////////////////////////////////////////////
    //Exentricidades
    //cálculo das exentricidades 
    var exentricidadeEx = (eixo/2-form.pilarAp.value/4).toFixed(2); //excentricidade x 
    var exentricidadeEy = ((2*form.estaca.value)/(3*Math.PI) - form.pilarBp.value/4).toFixed(2);//excentricidade y
    var exentricidadeE = Math.sqrt((exentricidadeEx*exentricidadeEx)+(exentricidadeEy*exentricidadeEy)).toFixed(2);  //excentricidade e  

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
    senoTd.textContent =senoNovo + " °";
  
    //braço de alavanca
    var zBraco = (exentricidadeE*Math.tan(senoNovo*Math.PI/180)).toFixed(2);
    
 
    //altura útil
    var alturaUtil= (zBraco/0.8).toFixed(2);
    var alturaUtilTd = document.createElement('td');
        alturaUtilTd.textContent = alturaUtil + " cm";
      
    //altura total do bloco
    var alturaH = (alturaUtil*1+5).toFixed(2);
    var alturaHTd = document.createElement("td");
        alturaHTd.textContent = alturaH + " cm";

    // X BARRA
    var xBarra = 2*(alturaUtil1-zBraco).toFixed(2);   

    //delta X 
    var deltaX = ((xBarra*exentricidadeEx)/zBraco).toFixed(2);
      
    //delta y 
    var deltaY = ((xBarra*exentricidadeEy)/zBraco).toFixed(2);
    
    //árae pilar ampliada 
    var areaAmpliadaPilar = (((form.pilarAp.value/2)+deltaX*1)*((form.pilarBp.value/2)+deltaY*1)).toFixed(2);
   
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
    var tensaoPilar = ((2*nkResiste*1.4)/(1*form.pilarBp.value*(form.pilarAp.value*1+0.4*alturaUtil))).toFixed(3);    
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
    senoTr.appendChild(alturaHTd); //altura total
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


  
