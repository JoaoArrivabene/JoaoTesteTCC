
var botaoAdicionar = document.querySelector("#calculaBloco2"); 

botaoAdicionar.addEventListener("click", function calcular (event) { 
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var tabelaGeometriaTr = document.createElement('tr');//Tabela das geometrias
    
    
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
    var nkest1 =  (1.05*form.forcaNk.value)/3;
    var mkest1 =  form.forcaNk1.value;
    var mkest2 =  form.forcaNk2.value;

    //Comprimento L de bloco
    //var comprimentoL =135;
    var comprimentoL =Math.sqrt((eixoEstaca*eixoEstaca)-((eixoEstaca/2)*(eixoEstaca/2))).toFixed(0);
    var comprimentoLTd = document.createElement('td');
        comprimentoLTd.textContent = comprimentoL + " cm";

    var nkest1A = (1*nkest1 -(mkest1/(comprimentoL/100))-(mkest2/(comprimentoL/100))).toFixed(2);
    var nkest2A = (1*nkest1 +(mkest1/(comprimentoL/100))+(mkest2/(comprimentoL/100))).toFixed(2);
    var nkest3A = (1*nkest1 +(mkest1/((comprimentoL/100)*2))-(mkest2/((comprimentoL/100)*2))).toFixed(2); 
    var nkResiste = Math.max(nkest1A,nkest2A,nkest3A); 
             
    var nk3 = nkResiste;
    var nk3Td = document.createElement("td");
        nk3Td.textContent = nk3 + (" kN")



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
       
/////////////////////////////////////////////////////////////////////
    //Áreas da estaca

    //Pilar equivalente
    var a1= Math.sqrt(form.pilarAp.value*form.pilarBp.value)
    
    // alturas útil
    var dmin = (0.58*(eixoEstaca-a1/2)).toFixed(2);
    var dminTd = document.createElement('td')
        dminTd.textContent = dmin + " cm"

    var dmax = (0.71*(eixoEstaca -a1/2)).toFixed(2);
    var dmaxTd = document.createElement('td')
        dmaxTd.textContent = dmax + " cm" 

    //cálculo da estaca
    var aestaca = ((Math.PI/4)*((1*form.estaca.value)*(1*form.estaca.value))).toFixed(2);
    var aestacaTd = document.createElement("td");    
       aestacaTd.textContent = aestaca + " cm²"
       

    //área pilar ampliada  
    var areaAmpliadaPilar = ((a1)*(a1)).toFixed(2);    
    var areaAmpliadaPilarTd = document.createElement("td");    
        areaAmpliadaPilarTd.textContent = areaAmpliadaPilar + " cm²"; 

            
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
 

//////////////////////////////////////////////////////////////////////////////////////////
    //TABELA GEOMETRIA DO BLOCO
    tabelaGeometriaTr.appendChild(ladoATd); //Lado A
    tabelaGeometriaTr.appendChild(ladoBTd);//Lado B
    tabelaGeometriaTr.appendChild(eixoEstacaTd);//Eixo
    tabelaGeometriaTr.appendChild(dLinhaTd);//d linha
    tabelaGeometriaTr.appendChild(fcdTd);//fcd do concreto
    tabelaGeometriaTr.appendChild(dminTd);//alrura útil mínima
    tabelaGeometriaTr.appendChild(dmaxTd);//alrura útil máxima
    tabelaGeometriaTr.appendChild(aestacaTd);    
    tabelaGeometriaTr.appendChild(areaAmpliadaPilarTd);
    tabelaGeometriaTr.appendChild(nk3Td);
    tabelaGeometriaTr.appendChild(nkResisteTd);
    

    var tabelaLadoTr = document.querySelector('#tabela-geometria'); 
    tabelaLadoTr.appendChild(tabelaGeometriaTr); 
  
 




});
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   

const btn = document.querySelector('.recarregar');
    btn.addEventListener('click',function(){
        location.reload
    })
   






































































