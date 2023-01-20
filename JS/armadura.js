function armadura (event) { 
    event.preventDefault();

    //Geometria
    var form = document.querySelector("#form-adiciona");    
    var ladoA =  (form.estaca.value * 4 +30).toFixed(1);  //cálculo do lado A    
    var ladoB =  (form.estaca.value*1 + 30).toFixed(2); //cálculo do lado B   
    var dLinha =  5; //altura útil    
    var nkest1 =  (1.05*form.forcaNk.value)/2
    var mkest1 =  form.forcaNk1.value
    var eixo =  form.estaca.value*3;

    var nkest1A = (1*nkest1 -(mkest1/(eixo/100))).toFixed(2);
    var nkest2A = (1*nkest1 +(mkest1/(eixo/100))).toFixed(2);
    var nkResiste = Math.max(nkest1A,nkest2A); 
                 
    //cálculo do fcd

    var fcd =  ((form.fck.value/10)/1.4).toFixed(2);

    //cálculo do alfav2

    var alfav2 =  (1-(form.fck.value/250)).toFixed(2);
  
  
    //cálculo das exentricidades
    var exentricidadeEx = (eixo/2 - form.pilarAp.value/4).toFixed(2);

    //exentricidade em Y
    var exentricidadeEy = ((2*form.estaca.value)/(3*Math.PI) - form.pilarBp.value/4).toFixed(2);

    //exentricidade em E
    var exentricidadeE = Math.sqrt((exentricidadeEx*exentricidadeEx)+(exentricidadeEy*exentricidadeEy)).toFixed(2);

    //altura útil
    var AsTr= document.createElement("tr"); 
    var alturaUtil= form.alturaUtilNova.value;
    var alturaUtilTd = document.createElement("td") ;
    alturaUtilTd.textContent = alturaUtil + " cm"

    //braço de alavanca
    var zBraco = (0.8*alturaUtil).toFixed(2);
    //console.log(zBraco)

    //altura total do bloco
    var alturaH = (alturaUtil*1+5).toFixed(2);

    //delta X 
    var deltaX = ((0.4*alturaUtil*exentricidadeEx)/zBraco).toFixed(2);
      
    //delta y 

    var deltaY = ((0.4*alturaUtil*exentricidadeEy)/zBraco).toFixed(2);  

    // Aramdura - Asx       
    var AsX = ((nkResiste*1.4*exentricidadeEx)/(0.8*alturaUtil*(50/1.15))).toFixed(2);
    var AsXTd = document.createElement("td");
    AsXTd.textContent = AsX + " cm²";  

    // Aramdura - Asx.min       
    var AsXmin = (0.0015*(form.estaca.value*1+30)*alturaH).toFixed(2);
    var AsXminTd = document.createElement("td");
    AsXminTd.textContent = AsXmin + " cm²";  
 
    //Asx utilizada  
    var AsXutili = AsX*1;
    var AsXutili1 = AsXmin*1;
    var AsXutiliTd = document.createElement("td");  
  
    if (AsXutili>=AsXutili1){
        AsXutiliTd.textContent = AsXutili + " cm²";                 
    }else{
        AsXutiliTd.textContent = AsXutili1 + " cm²";    
    }
     
    // Aramdura - Asy      
    var AsY = (((0.5*nkResiste*1.4)*(exentricidadeEy/zBraco+0.2))*(1/(50/1.15))).toFixed(2);
    var AsYTd = document.createElement("td");
    AsYTd.textContent = AsY + " cm²";


    // Aramdura - Asy.min       
    var AsYmin = ((nkResiste*1.4)/(5*(50/1.15))).toFixed(2);
    var AsYminTd = document.createElement("td");
    AsYminTd.textContent = AsYmin + " cm²";

    //Asy utilizada
  
    var AsYutili = AsY*1;
    var AsYutili1 = AsYmin*1;
    var AsYutiliTd = document.createElement("td");  
  
    if (AsYutili>=AsYutili1){
        AsYutiliTd.textContent = AsYutili + " cm²";                 
    }else{
        AsYutiliTd.textContent = AsYutili1 + " cm²";    
    }

    //Aramdura - Asup
    
    var AsSup = (AsX/5).toFixed(2);
    var AsSup1 = (AsXmin/5).toFixed(2);
    var AsSupTd = document.createElement("td");    

    if (AsSup>=AsSup1){
        AsSupTd.textContent = AsSup + " cm²";                 
    }else{
        AsSupTd.textContent = AsSup1 + " cm²";    
    }

    //Aramdura - Aspele

    var AsPele = (0.001*(form.estaca.value*1+30)*alturaH).toFixed(2);
    var AsPele1 =(0.2*(nkResiste*1.4)/(50/1.15)).toFixed(2);
    var AsPeleTd = document.createElement("td");

    if (AsPele>= AsPele1){
        AsPeleTd.textContent = AsPele + " cm²";                 
    }else{
        AsPeleTd.textContent = AsPele1 + " cm²";    
    }

    // Aramdura - Asw      
    var Asw = (0.14*(form.estaca.value*1+30)).toFixed(2);
    var AswTd = document.createElement("td");
    AswTd.textContent = Asw + " cm²/cm";

   
    AsTr.appendChild(alturaUtilTd);
    AsTr.appendChild(AsXTd);
    AsTr.appendChild(AsXminTd);
    AsTr.appendChild(AsXutiliTd);
    AsTr.appendChild(AsYTd);
    AsTr.appendChild(AsYminTd);
    AsTr.appendChild(AsYutiliTd);
    AsTr.appendChild(AsSupTd);
    AsTr.appendChild(AsPeleTd);
    AsTr.appendChild(AswTd);
    var tabelaAs = document.querySelector ('#armaduras-blocos1');
    tabelaAs.appendChild(AsTr);  
     
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Tabela de quantidades

        //Tipo Asx
        var QuantitativoAsxTr= document.createElement("tr");
        var TipoAsxTd = document.createElement('td');
            TipoAsxTd.textContent = "As.x"
        
        // Barra em X
       
        var BarraX =form.asx.value;                            
        var BarraXTd = document.createElement("td");
            BarraXTd.textContent = BarraX + " mm" 
       

        //Quantidade Asxutil
            
            var AsXBitola = Math.max(AsX,AsXmin)
            var bitolaAsx = (AsXBitola/((((form.asx.value/10)*(form.asx.value/10)*Math.PI))/4)).toFixed(0)                                   
            var BitolaAsxTd4 = document.createElement("td");  
                BitolaAsxTd4.textContent = bitolaAsx + " barras";   
                     
        //Espaçamento Asxutil            
            var BitolaAsx5 = (ladoB/bitolaAsx).toFixed(0);  
            var BitolaAsx6 = 20;                       
            var BitolaAsxTd5 = document.createElement("td");
      
            if(BitolaAsx5<=BitolaAsx6){
                BitolaAsxTd5.textContent = BitolaAsx5 + " cm";
            }else{
                BitolaAsxTd5.textContent = BitolaAsx6 + " cm";
            }
            
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
        //Tipo Asy
        var QuantitativoAsyTr= document.createElement("tr");
        var TipoAsyTd = document.createElement('td');
            TipoAsyTd.textContent = "As.y"
        
        // Barra em Y
       
        var BarraY =form.asy.value;                            
        var BarraYTd = document.createElement("td");
            BarraYTd.textContent = BarraY + " mm" 
       

        //Quantidade Asyutil

            var AsYBitola = Math.max(AsY,AsYmin)
            var bitolaAsy = 2*(AsYBitola/((((form.asy.value/10)*(form.asy.value/10)*Math.PI))/4)).toFixed(0); 
            var bitolaAsy2 = bitolaAsy/2                                   
            var BitolaAsYTd = document.createElement("td");  
                BitolaAsYTd.textContent = bitolaAsy + " barras " + bitolaAsy2 + " por estaca"  
                     
        //Espaçamento Asyutil            
            var BitolaAsy5 = ((1*form.estaca.value+5)/(bitolaAsy2)).toFixed(0);  
                                
            var BitolaAsyTd5 = document.createElement("td");      
            BitolaAsyTd5.textContent = BitolaAsy5 + " cm";
        
            
        //Comprimento das barras

            var ComprimentoAsy = (ladoB-2*dLinha+2*(0.7*45*(form.asy.value/10))).toFixed(0);
            var ComprimentoAsyTd = document.createElement("td");
                ComprimentoAsyTd.textContent = ComprimentoAsy + " cm";
            
        //Aço kg
            var AcoAsyKg =  (bitolaAsy*(ComprimentoAsy/100)*(((((form.asy.value/1000)*(form.asy.value/1000)*Math.PI))/4)*7800)).toFixed(2);
            var AcoAsyKgTd = document.createElement("td");
                AcoAsyKgTd.textContent = AcoAsyKg; 
                
                
            QuantitativoAsyTr.appendChild(TipoAsyTd);
            QuantitativoAsyTr.appendChild(BarraYTd);            
            QuantitativoAsyTr.appendChild(BitolaAsYTd);
            QuantitativoAsyTr.appendChild(BitolaAsyTd5);
            QuantitativoAsyTr.appendChild(ComprimentoAsyTd);
            QuantitativoAsyTr.appendChild(AcoAsyKgTd);

            var tabelaAsy = document.querySelector ('#tabela-Quantitativo');
                tabelaAsy.appendChild(QuantitativoAsyTr);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Tipo AsSup
        var QuantitativoAsSupTr= document.createElement("tr");
        var TipoAssupTd = document.createElement('td');
            TipoAssupTd.textContent = "As.sup"
        
        // Barra em Sup
       
        var BarraSup =form.assup.value;                            
        var BarraSupTd = document.createElement("td");
            BarraSupTd.textContent = BarraSup + " mm" 
       

        //Quantidade Assuputil

            var AsSupBitola = Math.max(AsSup,AsSup1);
            var bitolaAssup = (AsSupBitola/((((form.assup.value/10)*(form.assup.value/10)*Math.PI))/4)).toFixed(0);                                    
            var BitolaAssupTd = document.createElement("td");  
                BitolaAssupTd.textContent = bitolaAssup + " barras";   
                     
        //Espaçamento Asyutil            
            var BitolaAssup5 = (ladoB/bitolaAssup).toFixed(0);  
            //var BitolaAssup6 = 20;                       
            var BitolaAssupTd5 = document.createElement("td");
      
            //if(BitolaAssup5<=BitolaAssup6){
                BitolaAssupTd5.textContent = BitolaAssup5 + " cm";
            //}else{
                //BitolaAssupTd5.textContent = BitolaAssup6 + " cm";
            //}
            
        //Comprimento das barras

            var ComprimentoAssup = (ladoA-2*dLinha+2*(0.7*45*(form.asy.value/10))).toFixed(0);
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

            var AspeleBitola = Math.max(AsPele,AsPele1);
            var bitolaAspele = (AspeleBitola/((((form.aspele.value/10)*(form.aspele.value/10)*Math.PI))/4)).toFixed(0);                                    
            var BitolaAspeleTd = document.createElement("td");  
                BitolaAspeleTd.textContent = bitolaAspele + " barras";   
                    
        //Espaçamento Aspeleutil            
            var BitolaAspele5 = (alturaH/bitolaAspele).toFixed(0);  
            //var BitolaAspele6 = 20;                       
            var BitolaAspeleTd5 = document.createElement("td");
    
            //if(BitolaAspele5<=BitolaAspele6){
                BitolaAspeleTd5.textContent = BitolaAspele5 + " cm";
            //}else{
                //BitolaAspeleTd5.textContent = BitolaAspele6 + " cm";
           //}
            
        //Comprimento das barras

            var ComprimentoAspele = (2*ladoA+2*ladoB-4*dLinha+14).toFixed(0);
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

            var tabelaAspele = document.querySelector ('#tabela-Quantitativo');
                tabelaAspele.appendChild(QuantitativoAspeleTr); 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Tipo Asw
            var QuantitativoAswTr= document.createElement("tr");
            var TipoAswTd = document.createElement('td');
                TipoAswTd.textContent = "As.w"

        // Barra em Asw
            var BarraAsw =form.asw.value;                            
            var BarraAswTd = document.createElement("td");
                BarraAswTd.textContent = BarraAsw + " mm" 


        //Quantidade Asw
            var bitolaAsw = (Asw/((((form.asw.value/10)*(form.asw.value/10)*Math.PI))/4)).toFixed(0);                                    
            var BitolaAswTd = document.createElement("td");  
                BitolaAswTd.textContent = bitolaAsw + " barras";   
                    
        //Espaçamento Asw            
            var BitolaAsw5 = (ladoA/bitolaAsw).toFixed(0);  
            //var BitolaAsw6 = 20;                       
            var BitolaAswTd5 = document.createElement("td");

            //if(BitolaAsw5<=BitolaAsw6){
                BitolaAswTd5.textContent = BitolaAsw5 + " cm";
            //}else{
               //BitolaAswTd5.textContent = BitolaAsw6 + " cm";
            //}
            
        //Comprimento das barras

            var ComprimentoAsw = (2*ladoB-4*dLinha+2*alturaH+14*1).toFixed(0);
            var ComprimentoAswTd = document.createElement("td");
                ComprimentoAswTd.textContent = ComprimentoAsw + " cm";
            
        //Aço kg
            var AcoAswKg =  (bitolaAsw*(ComprimentoAsw/100)*(((((form.asw.value/1000)*(form.asw.value/1000)*Math.PI))/4)*7800)).toFixed(2);
            var AcoAswKgTd = document.createElement("td");
                AcoAswKgTd.textContent = AcoAswKg; 
                
                
            QuantitativoAswTr.appendChild(TipoAswTd);
            QuantitativoAswTr.appendChild(BarraAswTd);            
            QuantitativoAswTr.appendChild(BitolaAswTd);
            QuantitativoAswTr.appendChild(BitolaAswTd5);
            QuantitativoAswTr.appendChild(ComprimentoAswTd);
            QuantitativoAswTr.appendChild(AcoAswKgTd);

            var tabelaAsw = document.querySelector ('#tabela-Quantitativo');
                tabelaAsw.appendChild(QuantitativoAswTr);


                
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
            var totalKg = (AcoAsxKg*1+AcoAsyKg*1+AcoAssupKg*1+AcoAspeleKg*1+AcoAswKg*1).toFixed(2)
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
            
        //Aço kg
            var ConcretoKg = (ladoA/100*ladoB/100*alturaH/100).toFixed(2)
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





    
 
    










  
