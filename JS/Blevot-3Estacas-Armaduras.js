function armadura (event) { 
    event.preventDefault();

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

    //altura útil
    var AsTr= document.createElement("tr"); 
    var alturaUtil= form.alturaUtilNova.value;
    var alturaUtilTd = document.createElement("td") ;
        alturaUtilTd.textContent = alturaUtil + " cm"
    //Pilar equivalente
    var a1= Math.sqrt(form.pilarAp.value*form.pilarBp.value)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Tensões BLEVOT
    var tabelaTensaoTr = document.createElement('tr');//Tabela das tensões blevot

    var d = form.alturaUtilNova.value;
    var tg = (d/(eixo*(Math.sqrt(3)/3)-0.3*a1)).toFixed(2);  
    var tg1 = (Math.atan(tg)*180/Math.PI).toFixed(2);  
    var apilar = (a1*a1).toFixed(2)
    var aestaca = ((Math.PI/4)*((1*form.estaca.value)*(1*form.estaca.value))).toFixed(2);
    var seno = (Math.sin((tg1*Math.PI/180))*Math.sin((tg1*Math.PI/180))).toFixed(2)

    var TensaoPilar = ((nkResiste*1.4)/(apilar*seno)).toFixed(2);
    var TensaoPilarTd = document.createElement('td');
        TensaoPilarTd.textContent = TensaoPilar + " kN/cm²";

    var TensaoEstaca = ((nkResiste*1.4)/(3*aestaca*seno)).toFixed(2);
    var TensaoEstacaTd = document.createElement('td');
        TensaoEstacaTd.textContent = TensaoEstaca + " kN/cm²";

    var TensaoLimite = (1.75*0.9*fcd).toFixed(2)
    var TensaoLimiteTd = document.createElement('td');
        TensaoLimiteTd.textContent = TensaoLimite+ " kN/cm²";     


 //COMPARAÇÕES DAS SOLICITAÇÕES ESTACAS   
    var nkResisteNd = form.Nestd.value 
    var nkResisteTd1 = document.createElement("td");
   
   
    if (nkResisteNd>= nkResiste){
        nkResisteTd1.textContent = " Resiste"; 
        nkResisteTd1.style.backgroundColor = "lightblue"
         
    }else{
        nkResisteTd1.textContent = " Não resiste";
        nkResisteTd1.style.backgroundColor = "lightcoral"
    }
             
    //COMPARAÇÕES DAS PILAR   
    var PilarResistente = TensaoLimite 
    var PilarResistenteTd = document.createElement("td");
    
    
    if (PilarResistente>= TensaoPilar){
        PilarResistenteTd.textContent = " Resiste"; 
        PilarResistenteTd.style.backgroundColor = "lightblue"
          
    }else{
        PilarResistenteTd.textContent = " Não resiste";
        PilarResistenteTd.style.backgroundColor = "lightcoral"
    }

    //COMPARAÇÕES DAS ESTACAS

    var EstacaResistente = TensaoEstaca 
    var EstacaResistenteTd = document.createElement("td");
    
    
    if (EstacaResistente>= TensaoEstaca){
        EstacaResistenteTd.textContent = " Resiste"; 
        EstacaResistenteTd.style.backgroundColor = "lightblue"
          
    }else{
        EstacaResistenteTd.textContent = " Não resiste";
        EstacaResistenteTd.style.backgroundColor = "lightcoral"  }
              
 

    tabelaTensaoTr.appendChild(TensaoPilarTd); //tensão pilar
    tabelaTensaoTr.appendChild(TensaoEstacaTd);//tensão estaca
    tabelaTensaoTr.appendChild(TensaoLimiteTd);//tensão resistente
    tabelaTensaoTr.appendChild(nkResisteTd1);//tensão resistente
    tabelaTensaoTr.appendChild(PilarResistenteTd);//tensão resistente pilar
    tabelaTensaoTr.appendChild(EstacaResistenteTd);//tensão resistente estaca


    var tabelaTensoes = document.querySelector('#tabela-tensoes'); 
        tabelaTensoes.appendChild(tabelaTensaoTr);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Armaduras

    //altura total do bloco
    var alturaH = (alturaUtil*1+5).toFixed(2);
    var alturaHTd = document.createElement("td");
    alturaHTd.textContent = alturaH + " cm";
      
    //PESO DO BLOCO

    var Area1 = ((((comprimentoL/100)))+(((form.estaca.value/100)/2)+(15/100)))*(ladoB/100); //retangulo meio            
    var Area2 = (eixo/100+form.estaca.value/100+30/100)*(((form.estaca.value/100)/2)+15/100); //retangulo baixo           
    var Area3 = (Math.sqrt(((ladoB/100)*(ladoB/100))-((((form.estaca.value/100)/2)+15/100)*(((form.estaca.value/100)/2)+15/100))))*(((form.estaca.value/100)/2)+15/100) //subtrair1
               
    var lado1 = ((eixo/100+(((form.estaca.value/100)+30/100)))-ladoB/100)/2
    var lado2 = ((((comprimentoL/100)))+(((form.estaca.value/100)/2)+(15/100)))
    var Area4 = lado1*lado2
   
    var AreaTotal = (Area1+Area2-Area3+Area4).toFixed(2);      
    var ConcretoKg = (AreaTotal*alturaH/100).toFixed(2);
    //Força com o peso do bloco
    var nkfinal = ((ConcretoKg*25)+1*form.forcaNk.value).toFixed(2);  

    // Aramdura - As  
    
    var Rs = ((form.forcaNk.value/9)*((eixo*Math.sqrt(3)-0.9*a1)/form.alturaUtilNova.value)).toFixed(2)
    var Rs1 = (Rs*Math.sqrt(3)/3).toFixed(2)
  
    var AsBlevot = 3*(((Math.sqrt(3)*nkfinal)/(27*form.alturaUtilNova.value*(50/1.15)))*(eixo*Math.sqrt(3)-0.9*a1)).toFixed(2);
    var AsBlevotTd = document.createElement('td');
        AsBlevotTd.textContent = AsBlevot + " cm² por lado";  
    
    //Aramdura - Asup
    
    var AsSup = (nkResiste/(4.5*(50/1.15))).toFixed(2); 
    var AsSupTd = document.createElement("td");
        AsSupTd.textContent = AsSup + " cm², por face "  

    //Aramdura - Aspele

    var AsPele = (3*AsBlevot/8).toFixed(2);
    var AsPeleTd = document.createElement("td");
       AsPeleTd.textContent = AsPele + " cm², por face";  
    

     //Aramdura - Asmalha

    var AsMalha = (AsBlevot/5).toFixed(2);
    var AsMalhaTd = document.createElement("td");
        AsMalhaTd.textContent = AsMalha + " cm²";
    

   
    AsTr.appendChild(alturaUtilTd);
    AsTr.appendChild(alturaHTd);
    AsTr.appendChild(AsBlevotTd);    
    AsTr.appendChild(AsSupTd);
    AsTr.appendChild(AsPeleTd);
    AsTr.appendChild(AsMalhaTd);
    var tabelaAs = document.querySelector ('#armaduras-blocos1');
    tabelaAs.appendChild(AsTr);  
     
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //Tipo As utili
     var QuantitativoAsxTr= document.createElement("tr");
     var TipoAsxTd = document.createElement('td');
         TipoAsxTd.textContent = "As.utili"
     
     // Barra em X
    
     var BarraX =form.asx.value;                            
     var BarraXTd = document.createElement("td");
         BarraXTd.textContent = BarraX + " mm" 
    

     //Quantidade Asxutil           
         
        var bitolaAsx = 3*(AsBlevot/((((form.asx.value/10)*(form.asx.value/10)*Math.PI))/4)).toFixed(0)                                   
        var BitolaAsxTd4 = document.createElement("td");  
             BitolaAsxTd4.textContent = bitolaAsx + " barras";   
                  
     //Espaçamento Asxutil            
         var BitolaAsx5 = ((1*form.estaca.value+5)/(bitolaAsx/3)).toFixed(0);                               
         var BitolaAsxTd5 = document.createElement("td");          
             BitolaAsxTd5.textContent = BitolaAsx5 + " cm";
    
     //Comprimento das barras

         var ComprimentoAsx = (ladoA-2*dLinha+2*(0.7*45*(form.asx.value/10))).toFixed(0);
         var ComprimentoAsxTd = document.createElement("td");
             ComprimentoAsxTd.textContent = ComprimentoAsx + " cm";
         
     //Aço kg
         var AcoAsxKg =  (bitolaAsx*(ComprimentoAsx/100)*(((((form.asx.value/1000)*(form.asx.value/1000)*Math.PI))/4)*7800)).toFixed(2);
         var AcoAsxKgTd = document.createElement("td");
             AcoAsxKgTd.textContent = AcoAsxKg; 
             
             
         QuantitativoAsxTr.appendChild(TipoAsxTd);
         QuantitativoAsxTr.appendChild(BarraXTd);            
         QuantitativoAsxTr.appendChild(BitolaAsxTd4);
         QuantitativoAsxTr.appendChild(BitolaAsxTd5);
         QuantitativoAsxTr.appendChild(ComprimentoAsxTd);
         QuantitativoAsxTr.appendChild(AcoAsxKgTd);

         var tabelaAsx = document.querySelector ('#tabela-Quantitativo');
             tabelaAsx.appendChild(QuantitativoAsxTr);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     //Tipo AsSup
     var QuantitativoAsSupTr= document.createElement("tr");
         var TipoAssupTd = document.createElement('td');
             TipoAssupTd.textContent = "As.sup"
     
     // Barra em Sup
    
         var BarraSup =form.assup.value;                            
         var BarraSupTd = document.createElement("td");
             BarraSupTd.textContent = BarraSup + " mm" 
    

     //Quantidade AsSup

         var bitolaAssup = 2*(AsSup/((((form.assup.value/10)*(form.assup.value/10)*Math.PI))/4)).toFixed(0);                                    
         var BitolaAssupTd = document.createElement("td");  
             BitolaAssupTd.textContent = bitolaAssup + " barras";   
                  
     //Espaçamento Asyutil            
         var BitolaAssup5 = (ladoA/bitolaAssup).toFixed(0);                             
         var BitolaAssupTd5 = document.createElement("td");   
             BitolaAssupTd5.textContent = BitolaAssup5 + " cm";      
         
     //Comprimento das barras

         var ComprimentoAssup = (ladoA-2*dLinha+2*(0.7*45*(form.assup.value/10))).toFixed(0);
         var ComprimentoAssupTd = document.createElement("td");
             ComprimentoAssupTd.textContent = ComprimentoAssup + " cm";
         
     //Aço kg
         var AcoAssupKg =  (bitolaAssup*(ComprimentoAssup/100)*(((((form.assup.value/1000)*(form.assup.value/1000)*Math.PI))/4)*7800)).toFixed(2);
         var AcoAssupKgTd = document.createElement("td");
             AcoAssupKgTd.textContent = AcoAssupKg; 
             
             
         QuantitativoAsSupTr.appendChild(TipoAssupTd);
         QuantitativoAsSupTr.appendChild(BarraSupTd);            
         QuantitativoAsSupTr.appendChild(BitolaAssupTd);
         QuantitativoAsSupTr.appendChild(BitolaAssupTd5);
         QuantitativoAsSupTr.appendChild(ComprimentoAssupTd);
         QuantitativoAsSupTr.appendChild(AcoAssupKgTd);

         var tabelaAssup = document.querySelector ('#tabela-Quantitativo');
             tabelaAssup.appendChild(QuantitativoAsSupTr);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //Tipo Aspele
         var QuantitativoAspeleTr= document.createElement("tr");
         var TipoAspeleTd = document.createElement('td');
             TipoAspeleTd.textContent = "As.pele"
     
     // Barra em Aspele
 
         var BarraAspele =form.aspele.value;                            
         var BarraAspeleTd = document.createElement("td");
             BarraAspeleTd.textContent = BarraAspele + " mm" 
     

     //Quantidade Aspele

         var bitolaAspele = 3*(AsPele/((((form.aspele.value/10)*(form.aspele.value/10)*Math.PI))/4)).toFixed(0);                                    
         var BitolaAspeleTd = document.createElement("td");  
             BitolaAspeleTd.textContent = bitolaAspele + " barras";   
                 
     //Espaçamento Aspeleutil            
         var BitolaAspele5 = ((alturaH-2*dLinha)/(bitolaAspele/3)).toFixed(0);                         
         var BitolaAspeleTd5 = document.createElement("td"); 
             BitolaAspeleTd5.textContent = BitolaAspele5 + " cm";
   
     //Comprimento das barras

         var ComprimentoAspele = (1*ladoA+1*ladoB-2*dLinha).toFixed(0);
         var ComprimentoAspeleTd = document.createElement("td");
             ComprimentoAspeleTd.textContent = ComprimentoAspele + " cm";
         
     //Aço kg
         var AcoAspeleKg =  (bitolaAspele*(ComprimentoAspele/100)*(((((form.aspele.value/1000)*(form.aspele.value/1000)*Math.PI))/4)*7800)).toFixed(2);
         var AcoAspeleKgTd = document.createElement("td");
             AcoAspeleKgTd.textContent = AcoAspeleKg;  


             QuantitativoAspeleTr.appendChild(TipoAspeleTd);
             QuantitativoAspeleTr.appendChild(BarraAspeleTd);            
             QuantitativoAspeleTr.appendChild(BitolaAspeleTd);
             QuantitativoAspeleTr.appendChild(BitolaAspeleTd5);
             QuantitativoAspeleTr.appendChild(ComprimentoAspeleTd);
             QuantitativoAspeleTr.appendChild(AcoAspeleKgTd);
              
 
             var tabelaAsPele = document.querySelector ('#tabela-Quantitativo');
                 tabelaAsPele.appendChild(QuantitativoAspeleTr);
            

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //Tipo Asmalha
         var QuantitativoAsMalhaTr= document.createElement("tr");
         var TipoAsMalhaTd = document.createElement('td');
             TipoAsMalhaTd.textContent = "As.malha"
     
     // Barra em malha
 
         var BarraAsMalha =form.asw.value;                            
         var BarraAsMalhaTd = document.createElement("td");
             BarraAsMalhaTd.textContent = BarraAsMalha + " mm" 
     

     //Quantidade Asmalha

         var bitolaAsMalha = 3*(AsMalha/((((form.aspele.value/10)*(form.aspele.value/10)*Math.PI))/4)).toFixed(0);                                    
         var BitolaAsMalhaTd = document.createElement("td");  
             BitolaAsMalhaTd.textContent = bitolaAsMalha + " barras";   
                 
     //Espaçamento Asmalha            
         var BitolaAsMalha1 = ((ladoA)/(bitolaAsMalha)).toFixed(0);                                     
         var BitolaAsMalha1Td = document.createElement("td");    
             BitolaAsMalha1Td.textContent = BitolaAsMalha1 + " cm";
    
         
     //Comprimento das barras

         var ComprimentoAsMalha = (ladoA-2*dLinha+2*(0.7*45*(form.assup.value/10))).toFixed(0);
         var ComprimentoAsMalhaTd = document.createElement("td");
             ComprimentoAsMalhaTd.textContent = ComprimentoAsMalha + " cm";
         
     //Aço kg
         var AcoAsMalhaKg =  (bitolaAsMalha*(ComprimentoAsMalha/100)*(((((form.asw.value/1000)*(form.asw.value/1000)*Math.PI))/4)*7800)).toFixed(2);
         var AcoAsMalhaKgTd = document.createElement("td");
             AcoAsMalhaKgTd.textContent = AcoAsMalhaKg; 
             
             QuantitativoAsMalhaTr.appendChild(TipoAsMalhaTd);
             QuantitativoAsMalhaTr.appendChild(BarraAsMalhaTd);            
             QuantitativoAsMalhaTr.appendChild(BitolaAsMalhaTd);
             QuantitativoAsMalhaTr.appendChild(BitolaAsMalha1Td);
             QuantitativoAsMalhaTr.appendChild(ComprimentoAsMalhaTd);
             QuantitativoAsMalhaTr.appendChild(AcoAsMalhaKgTd);
             QuantitativoAsMalhaTr.appendChild(AcoAsMalhaKgTd);


         var tabelaAsMalha = document.querySelector ('#tabela-Quantitativo');
             tabelaAsMalha.appendChild(QuantitativoAsMalhaTr); 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  
     //Tipo total
         var QuantitativoTotalTr= document.createElement("tr");
         var TipoTotalTd = document.createElement('td');
             TipoTotalTd.textContent = ""

     // Barra em vazio                               
         var BarraTotalTd = document.createElement("td");
             BarraTotalTd.textContent =  "" 


     //Quantidade vazio
                                             
         var BitolaTotalTd = document.createElement("td");  
             BitolaTotalTd.textContent =  "";   
                 
     //Espaçamento vazio            
                         
         var BitolaTotalTd5 = document.createElement("td");
             BitolaTotalTd5.textContent =  ""; 

     //Comprimento das barras
         var ComprimentoTotalTd = document.createElement("td");
             ComprimentoTotalTd.textContent ="Total Aço";
         
     //Aço kg
         var totalKg = (AcoAsxKg*1+AcoAssupKg*1+AcoAspeleKg*1+AcoAsMalhaKg*1).toFixed(2)
         var AcoKgTotalTd = document.createElement("td");
             AcoKgTotalTd.textContent = totalKg + " kg"; 
             
             
         QuantitativoTotalTr.appendChild(TipoTotalTd);
         QuantitativoTotalTr.appendChild(BarraTotalTd);            
         QuantitativoTotalTr.appendChild(BitolaTotalTd);
         QuantitativoTotalTr.appendChild(BitolaTotalTd5);
         QuantitativoTotalTr.appendChild(ComprimentoTotalTd);
         QuantitativoTotalTr.appendChild(AcoKgTotalTd);

         var tabelaTotal = document.querySelector ('#tabela-Quantitativo');
             tabelaTotal.appendChild(QuantitativoTotalTr);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //Tipo concreto
         var QuantitativoConcretoTr= document.createElement("tr");
         var TipoConcretoTd = document.createElement('td');
             TipoConcretoTd.textContent = ""

     // Barra em vazio                               
         var BarraConcretoTd = document.createElement("td");
             BarraConcretoTd.textContent =  "" 


     //Quantidade vazio
                                             
         var BitolaConcretoTd = document.createElement("td");  
             BitolaConcretoTd.textContent =  "";   
                 
     //Espaçamento vazio            
                         
         var BitolaConcretoTd5 = document.createElement("td");
             BitolaConcretoTd5.textContent =  ""; 

     //Comprimento das barras
         var ComprimentoConcretoTd = document.createElement("td");
             ComprimentoConcretoTd.textContent ="Total Concreto";
         
     //Concreto kg

     var ConcretoTd = document.createElement("td");
             ConcretoTd.textContent = ConcretoKg + " m³"; 
             
             
         QuantitativoConcretoTr.appendChild(TipoConcretoTd);
         QuantitativoConcretoTr.appendChild(BarraConcretoTd);            
         QuantitativoConcretoTr.appendChild(BitolaConcretoTd);
         QuantitativoConcretoTr.appendChild(BitolaConcretoTd5);
         QuantitativoConcretoTr.appendChild(ComprimentoConcretoTd);
         QuantitativoConcretoTr.appendChild(ConcretoTd);

         var tabelaTotal1 = document.querySelector ('#tabela-Quantitativo');
             tabelaTotal1.appendChild(QuantitativoConcretoTr);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //Tipo kg/m³
         var QuantitativoConcreto1Tr= document.createElement("tr");
         var TipoConcreto1Td = document.createElement('td');
             TipoConcreto1Td.textContent = ""

     // Barra em vazio                               
         var BarraConcreto1Td = document.createElement("td");
             BarraConcreto1Td.textContent =  "" 


     //Quantidade vazio
                                             
         var BitolaConcreto1Td = document.createElement("td");  
             BitolaConcreto1Td.textContent =  "";   
                 
     //Espaçamento vazio            
                         
         var BitolaConcreto1Td5 = document.createElement("td");
             BitolaConcreto1Td5.textContent =  ""; 

     //Comprimento das barras
         var ComprimentoConcreto1Td = document.createElement("td");
             ComprimentoConcreto1Td.textContent ="Total ";
         
     //Aço kg
         var Concreto1Kg = (totalKg/ConcretoKg).toFixed(2)
         var Concreto1Td = document.createElement("td");
             Concreto1Td.textContent = Concreto1Kg + " Aço/m³"; 
             
             
         QuantitativoConcreto1Tr.appendChild(TipoConcreto1Td);
         QuantitativoConcreto1Tr.appendChild(BarraConcreto1Td);            
         QuantitativoConcreto1Tr.appendChild(BitolaConcreto1Td);
         QuantitativoConcreto1Tr.appendChild(BitolaConcreto1Td5);
         QuantitativoConcreto1Tr.appendChild(ComprimentoConcreto1Td);
         QuantitativoConcreto1Tr.appendChild(Concreto1Td);

         var tabelaTotal2 = document.querySelector ('#tabela-Quantitativo');
             tabelaTotal2.appendChild(QuantitativoConcreto1Tr);



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
     //Tipo vazio
         var QuantitativoTr= document.createElement("tr");
         var TipoTd = document.createElement('td');
             TipoTd.textContent = "-"

     // Barra em vazio                               
         var BarraTd = document.createElement("td");
             BarraTd.textContent =  "-" 


     //Quantidade vazio
                                             
         var BitolaTd = document.createElement("td");  
             BitolaTd.textContent =  "-";   
                 
     //Espaçamento vazio            
                          
         var BitolaTd5 = document.createElement("td");
             BitolaTd5.textContent =  "-"; 

     //Comprimento das barras
         var ComprimentoTd = document.createElement("td");
             ComprimentoTd.textContent ="-";
         
     //Aço kg
          var AcoKgTd = document.createElement("td");
             AcoKgTd.textContent = "-"; 
                             
         QuantitativoTr.appendChild(TipoTd);
         QuantitativoTr.appendChild(BarraTd);            
         QuantitativoTr.appendChild(BitolaTd);
         QuantitativoTr.appendChild(BitolaTd5);
         QuantitativoTr.appendChild(ComprimentoTd);
         QuantitativoTr.appendChild(AcoKgTd);

         var tabela = document.querySelector ('#tabela-Quantitativo');
             tabela.appendChild(QuantitativoTr);

    
};


let botaoAdicionar2 = document.querySelector("#armadura-tabela"); 
botaoAdicionar2.addEventListener("click", armadura);

