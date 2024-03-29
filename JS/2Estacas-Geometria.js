
var botaoAdicionar = document.querySelector("#calculaBloco2"); 

botaoAdicionar.addEventListener("click", function calcular (event) { 
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var tabelaGeometriaTr = document.createElement('tr');//Tabela das geometrias
    var tabelaForcasTr = document.createElement('tr');//Tabela forças, exentricidades e áreas ampliadas
    var tensaoTr = document.createElement("tr");    
    
/////////////////////////////////////////////////////////////////////////////////
    //Geometria

    //lado A
    var ladoA =  (form.estaca.value * 4 +30).toFixed(1);
    var ladoATd = document.createElement('td');
        ladoATd.textContent = ladoA + ' cm'

    //lado B
    var ladoB =  (form.estaca.value*1 + 30).toFixed(2);
    var ladoBTd = document.createElement('td');
        ladoBTd.textContent = ladoB + ' cm'

    //calculo do eixo 
    var eixoEstaca =  (form.estaca.value*3).toFixed(2);
    var eixoEstacaTd = document.createElement('td');
        eixoEstacaTd.textContent = eixoEstaca + " cm";

    //calculo do d' 
      var dLinha =  5;
      var dLinhaTd = document.createElement('td');
          dLinhaTd.textContent = dLinha + " cm";
    

/////////////////////////////////////////////////////////////////////////
    //Froças nas Estacas
    var nkest1 =  (1.05*form.forcaNk.value)/2;
    var mkest1 =  form.forcaNk1.value;
    var eixo =  form.estaca.value*3;  
             
    //criação das forças nas estacas 
    var nkest1A = (1*nkest1-(mkest1/(eixo/100))).toFixed(2);
      

    var nk1Td = document.createElement("td");    
    nk1Td.textContent = nkest1A + " kN"
   
    //cálculo da nk2
    var nkest2A = (1*nkest1+(mkest1/(eixo/100))).toFixed(2);
    var nk2Td = document.createElement("td");  
    nk2Td.textContent = nkest2A + " kN"    

    //cálculo nkres
    var nkResiste = Math.max(nkest1A,nkest2A); 
    var nk3Td = document.createElement("td");   
    nk3Td.textContent = nkResiste + " kN"   

    //situação estaca   
    var nkResisteNd = (form.Nestd.value*1).toFixed(2);
    var nkResisteTd = document.createElement("td");
    nkResisteTd.textContent = nkResisteNd + " kN"

///////////////////////////////////////////////////////////////////// 
    //CONCRETO                 
    //cálculo do fcd   
    var fcd =  ((form.fck.value/10)/1.4).toFixed(2);
    var fcdTd = document.createElement("td");   
    fcdTd.textContent = fcd + " kN/cm²"
   
    //cálculo do alfav2
    var alfav2 =  (1-(form.fck.value/250)).toFixed(2);
    var alfav2Td = document.createElement("td");  
    alfav2Td.textContent = alfav2;

/////////////////////////////////////////////////////////////////////
    //Áreas Ampliadas da estaca
    //cálculo da área ampliada da estaca
    var aestaca = ((Math.PI/4)*((1*form.estaca.value+5)*(1*form.estaca.value+5))).toFixed(2);
    var aestacaTd = document.createElement("td");    
    aestacaTd.textContent = aestaca + " cm²"
    console.log(aestaca + 'AREA ESTACA')

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
    var exentricidadeEx = (eixo/2-form.pilarAp.value/4).toFixed(2);
    var exentricidadeExTd = document.createElement("td");
        exentricidadeExTd.textContent = exentricidadeEx + " cm";

    //exentricidade em Y
    var exentricidadeEy = (((2*(1*form.estaca.value+5))/(3*Math.PI)) - form.pilarBp.value/4).toFixed(2);
    var exentricidadeEyTd = document.createElement("td");
        exentricidadeEyTd.textContent = exentricidadeEy + " cm";

    //exentricidade em E  
    var exentricidadeE = Math.sqrt((exentricidadeEx*exentricidadeEx)+(exentricidadeEy*exentricidadeEy)).toFixed(2);    
    var exentricidadeETd = document.createElement("td");
        exentricidadeETd.textContent = exentricidadeE + " cm";

////////////////////////////////////////////////////////////////////////////////    
    //BRAÇO DE ALAVANCA, ALTURA ÚTIL E ALTURA DO BLOCO
    //braço de alavanca
    var zBraco = (exentricidadeE*Math.tan(anguloTeta1*Math.PI/180)).toFixed(2); 
    var zBracoTd = document.createElement("td");
    zBracoTd.textContent = zBraco + " cm";

    //altura útil 
    var alturaUtil= (zBraco/0.8).toFixed(2);   
    var alturaUtilTd = document.createElement("td");
        alturaUtilTd.textContent = alturaUtil + " cm";
 
    //altura total do bloco
    var alturaH = (alturaUtil*1+5).toFixed(2);    
    var alturaHTd = document.createElement("td");
    alturaHTd.textContent = alturaH + " cm";

//////////////////////////////////////////////////////////////////////////////////////////
    //TABELA GEOMETRIA DO BLOCO
    tabelaGeometriaTr.appendChild(ladoATd); //Lado A
    tabelaGeometriaTr.appendChild(ladoBTd);//Lado B
    tabelaGeometriaTr.appendChild(eixoEstacaTd);//Eixo
    tabelaGeometriaTr.appendChild(dLinhaTd);//d linha
    tabelaGeometriaTr.appendChild(anguloTetaTd);//angulo em rad
    tabelaGeometriaTr.appendChild(anguloTetaTd1);//angulo em graus
    tabelaGeometriaTr.appendChild(zBracoTd);//braço de alavanca
    tabelaGeometriaTr.appendChild(alturaUtilTd);//altura útil do bloco
    tabelaGeometriaTr.appendChild(alturaHTd);//altura total do bloco
    tabelaGeometriaTr.appendChild(fcdTd);//fcd do concreto
    tabelaGeometriaTr.appendChild(alfav2Td);//alfav2 do concreto

    var tabelaLadoTr = document.querySelector('#tabela-geometria'); 
    tabelaLadoTr.appendChild(tabelaGeometriaTr); 
  
//////////////////////////////////////////////////////////////////////////////////////////
    //DELTAS X,Y E ÁREA AMPLIADA DO PILAR
    //delta X 
    var deltaX = ((0.4*alturaUtil*exentricidadeEx)/zBraco).toFixed(2);
    var deltaXTd = document.createElement("td");
    deltaXTd.textContent = deltaX + " cm";

    //delta y  
    var deltaY = ((0.4*alturaUtil*exentricidadeEy)/zBraco).toFixed(2);    
    var deltaYTd = document.createElement("td");    
    deltaYTd.textContent = deltaY + " cm";  

    //árae pilar ampliada  
    var areaAmpliadaPilar = (((form.pilarAp.value/2)+deltaX*1)*((form.pilarBp.value/2)+deltaY*1)).toFixed(2);    
    var areaAmpliadaPilarTd = document.createElement("td");    
    areaAmpliadaPilarTd.textContent = areaAmpliadaPilar + " cm²";  

/////////////////////////////////////////////////////////////////////////////////////////
    //TABELA FORÇA, EXENTRICIDADES E BLOCO
    tabelaForcasTr.appendChild(nk1Td);
    tabelaForcasTr.appendChild(nk2Td);
    tabelaForcasTr.appendChild(nk3Td);
    tabelaForcasTr.appendChild(nkResisteTd);aestacaTd
    tabelaForcasTr.appendChild(aestacaTd);
    tabelaForcasTr.appendChild(exentricidadeExTd);
    tabelaForcasTr.appendChild(exentricidadeEyTd);
    tabelaForcasTr.appendChild(exentricidadeETd);
    tabelaForcasTr.appendChild(deltaXTd);
    tabelaForcasTr.appendChild(deltaYTd);
    tabelaForcasTr.appendChild(areaAmpliadaPilarTd);

    var tabelaForcaTr = document.querySelector('#tabela-forcas'); 
        tabelaForcaTr.appendChild(tabelaForcasTr); 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TENSÕES 
    // tensões no bloco devido Pilar        
    //var tensaoPilar = ((2*nkResiste*1.4)/(1*form.pilarBp.value*(form.pilarAp.value*1+0.4*alturaUtil))).toFixed(2);    
    //var tensaoPilarTd = document.createElement("td");
        //tensaoPilarTd.textContent = tensaoPilar + " kN/cm²";

    // tensões no área ampliada !   
    var nkRsultadoAmpliado = ((nkResiste*1.4)/(2*areaAmpliadaPilar)).toFixed(3)   
    var tensaoPilarAreaTd = document.createElement("td");
        tensaoPilarAreaTd.textContent = nkRsultadoAmpliado + " kN/cm²";

    // tensões resistente do bloco   
    var tensaoPilard = ((0.85*alfav2*fcd)*(Math.sin((anguloTeta1*Math.PI/180))*Math.sin((anguloTeta1*Math.PI/180)))).toFixed(3);  
    var tensaoPilardTd = document.createElement("td");
        tensaoPilardTd.textContent = tensaoPilard + " kN/cm²";



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //COMPARAÇÕES DAS SOLICITAÇÕES   
    var nkResisteNd = form.Nestd.value 
    var nkResisteTd1 = document.createElement("td");
   
   
    if (nkResisteNd>= nkResiste){
        nkResisteTd1.textContent = " Resiste"; 
        nkResisteTd1.style.backgroundColor = "lightblue"
         
    }else{
        nkResisteTd1.textContent = " Não resiste";
        nkResisteTd1.style.backgroundColor = "lightcoral"
    }
             

    //situação ÁREA AMPLIADA DO PILAR 

    var ampliadaTd = nkRsultadoAmpliado; 
    var ampliadaTd1 = document.createElement("td"); 

    if (tensaoPilard>= ampliadaTd){
        ampliadaTd1.textContent = " Resiste ";
        ampliadaTd1.style.backgroundColor = "lightblue"           
    }else{
        ampliadaTd1.textContent = " Não resiste";
        ampliadaTd1.style.backgroundColor = "lightcoral"        
    }

                  
    //situação resistente NBR6118
    //var nbrTd = tensaoPilard; 
    //var nbrATd = document.createElement("td");
    //if (nbrTd>= tensaoPilar){
       // nbrATd.textContent = " Resiste"; 
        //nbrATd.style.backgroundColor = "lightblue"  
         
    //}else{
       // nbrATd.textContent = " Não resiste";
        //nbrATd.style.backgroundColor = "lightcoral" 
    //}
       


        //tensaoTr.appendChild(tensaoPilarTd);
        tensaoTr.appendChild(tensaoPilarAreaTd);
        tensaoTr.appendChild(tensaoPilardTd);
        tensaoTr.appendChild(nkResisteTd1);
        tensaoTr.appendChild(ampliadaTd1);
        //tensaoTr.appendChild(nbrATd);

    var tabelaTensaoTr = document.querySelector('#tabela-tensoes');
        tabelaTensaoTr.appendChild(tensaoTr); 
      
});
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   

const btn = document.querySelector('.recarregar');
    btn.addEventListener('click',function(){
        location.reload
    })
   






































































