var botaoAdicionar = document.querySelector("#calculaBloco2"); 

botaoAdicionar.addEventListener("click", function calcular (event) { 
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var tabelaGeometriaTr = document.createElement('tr');//Tabela das geometrias
    
    
/////////////////////////////////////////////////////////////////////////////////
    //Geometria

    //lado A
    var ladoA =  (form.estaca.value * 4 +30).toFixed(1);  

    //lado B
    var ladoB =  (form.estaca.value*1 + 30).toFixed(2);

    //calculo do eixo 
    var eixoEstaca =  (form.estaca.value*3).toFixed(2);
    var eixoEstacaTd = document.createElement('td');  
        eixoEstacaTd.textContent = eixoEstaca + " cm"

    //calculo do d' 
      var dLinha =  5;    

/////////////////////////////////////////////////////////////////////////
    //Froças nas Estacas
    var nkest1 =  (form.forcaNk.value)/3;
    var mkest1 =  form.forcaNk1.value;
    var mkest2 =  form.forcaNk2.value;

    //Comprimento L de bloco    
    var comprimentoL =Math.sqrt((eixoEstaca*eixoEstaca)-((eixoEstaca/2)*(eixoEstaca/2))).toFixed(0);

    var nkest1A = (1*nkest1 -(mkest1/(comprimentoL/100))-(mkest2/(comprimentoL/100))).toFixed(2);
    var nkest2A = (1*nkest1 +(mkest1/(comprimentoL/100))+(mkest2/(comprimentoL/100))).toFixed(2);
    var nkest3A = (1*nkest1 +(mkest1/((comprimentoL/100)*2))-(mkest2/((comprimentoL/100)*2))).toFixed(2); 
    var nkResiste = Math.max(nkest1A,nkest2A,nkest3A); 
             
    var nk3 = nkResiste;

    //situação estaca   
    var nkResisteNd = (form.Nestd.value*1).toFixed(2);
  
///////////////////////////////////////////////////////////////////// 
    //CONCRETO                 
    //cálculo do fcd   
    var fcd =  ((form.fck.value/10)/1.4).toFixed(2);
       
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
   
    tabelaGeometriaTr.appendChild(eixoEstacaTd);//Eixo  
    tabelaGeometriaTr.appendChild(dminTd);//alrura útil mínima
    tabelaGeometriaTr.appendChild(dmaxTd);//alrura útil máxima
 
    

    var tabelaLadoTr = document.querySelector('#tabela-geometria'); 
    tabelaLadoTr.appendChild(tabelaGeometriaTr); 
  
 




});
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   

const btn = document.querySelector('.recarregar');
    btn.addEventListener('click',function(){
        location.reload
    })
   