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
    //var eixo = 80
    var eixo =  form.estaca.value*3;
    //var comprimentoL =135;
    var comprimentoL =Math.sqrt((eixo*eixo)-((eixo/2)*(eixo/2))).toFixed(0);
         

    var nkest1A = (1*nkest1 -(mkest1/(comprimentoL/100))-(mkest2/(comprimentoL/100))).toFixed(2);
    var nkest2A = (1*nkest1 +(mkest1/(comprimentoL/100))+(mkest2/(comprimentoL/100))).toFixed(2);
    var nkest3A = (1*nkest1 +(mkest1/((comprimentoL/100)*2))-(mkest2/((comprimentoL/100)*2))).toFixed(2);

    var nkResiste = Math.max(nkest1A,nkest2A,nkest3A); 
            
    //cálculo do fcd
    var fcd =  ((form.fck.value/10)/1.4).toFixed(2);   

    //cálculo do alfav2
    var alfav2 =  (1-(form.fck.value/250)).toFixed(2);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Excentricidades  
    //cálculo das exentricidades ESTACA FRONTAL
    var exentricidadeEx = (((2*(5+1*form.estaca.value))/(3*Math.PI))-(form.pilarBp.value/4)).toFixed(2); //exentricidade em X   
    var exentricidadeEy = (((comprimentoL*2)/3)+((form.pilarAp.value/3)/2)-(1*form.pilarAp.value/2)).toFixed(2); //exentricidade em Y    
    var exentricidadeE = Math.sqrt((exentricidadeEx*exentricidadeEx)+(exentricidadeEy*exentricidadeEy)).toFixed(2); //exentricidade em E
    
    //cálculo das exentricidades DEMAIS ESTACAS
    var exentricidadeEx1 = ((eixo/2)-(form.pilarBp.value/4)).toFixed(2)  //EM X
    var exentricidadeEy1 = ((comprimentoL/3)+(form.pilarAp.value/2)-((2*form.pilarAp.value)/3)).toFixed(2); //EM Y

    //altura útil
    var AsTr= document.createElement("tr"); 
    var alturaUtil= form.alturaUtilNova.value;
    var alturaUtilTd = document.createElement("td") ;
    alturaUtilTd.textContent = alturaUtil + " cm"

    //braço de alavanca
    var zBraco = (0.8*alturaUtil).toFixed(2);
    
    //altura total do bloco
    var alturaH = (alturaUtil*1+5).toFixed(2);
    var alturaHTd = document.createElement("td");
        alturaHTd.textContent = alturaH + " cm"

    //delta X 
    var deltaX = ((0.4*alturaUtil*exentricidadeEx)/zBraco).toFixed(2);
      
    //delta y
    var deltaY = ((0.4*alturaUtil*exentricidadeEy)/zBraco).toFixed(2);  

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //PESO DO BLOCO

    var Area1 = ((((comprimentoL/100)))+(((form.estaca.value/100)/2)+(15/100)))*(ladoB/100); //retangulo meio            
    var Area2 = (eixo/100+form.estaca.value/100+30/100)*(((form.estaca.value/100)/2)+15/100); //retangulo baixo           
    var Area3 = (Math.sqrt(((ladoB/100)*(ladoB/100))-((((form.estaca.value/100)/2)+15/100)*(((form.estaca.value/100)/2)+15/100))))*(((form.estaca.value/100)/2)+15/100) //subtrair1
               
    var lado1 = ((eixo/100+(((form.estaca.value/100)+30/100)))-ladoB/100)/2
    var lado2 = ((((comprimentoL/100)))+(((form.estaca.value/100)/2)+(15/100)))
    var Area4 = lado1*lado2
   
    var AreaTotal = (Area1+Area2-Area3+Area4).toFixed(2);      
    var ConcretoKg = (AreaTotal*alturaH/100).toFixed(2);

    var nkfinal = ((ConcretoKg*25)+nkResiste).toFixed(2); 

    // CÁLCULO DAS DISTRIBIÇÕES DAS FORÇAS EM SUAS DECOMPOSIÇÕES    
    var NK1 = ((nkfinal*exentricidadeE)/zBraco).toFixed(2);

    var NK2X = ((nkfinal*exentricidadeEx1)/zBraco).toFixed(2); //TRIÂNGULO EM X
    var NK2Y = ((nkfinal*exentricidadeEy1)/zBraco).toFixed(2); //TRIÂNGULO EM Y
    var anguloNK1 =  (Math.atan((eixo/2)/comprimentoL)*180/Math.PI).toFixed(2);
    

    var NKT1 = (NK1/(2*Math.cos(anguloNK1*Math.PI/180))).toFixed(2);   
    var NKT = (NK2X/(Math.cos(anguloNK1*Math.PI/180))).toFixed(2);
    var NKTX = (NK2X - NKT*Math.sin(anguloNK1*Math.PI/180)).toFixed(2);

    console.log(NK1 + "força principal")
    console.log(anguloNK1 + "angulo cosseno")
    console.log(NKT1 + "força diagonal")

    //ARMADURAS
    //Armadura AS1
    var As1 = (2*((NKT1*1.4)/(50/1.15))).toFixed(2);
    var As1Td = document.createElement("td");
    As1Td.textContent = As1 + " cm²";  

    // Aramdura As2     
    var As2 = (2*((NKTX*1.4)/(50/1.15))).toFixed(2);
    var As2Td = document.createElement("td");
    As2Td.textContent = As2 + " cm²"; 
    
    
    //AsMin
    var Zrt = 0.6*(alturaH-0.4*alturaUtil)    
    var b0 = ((1*form.estaca.value+ 5)*2).toFixed(2);
    var fctm = (0.3*Math.pow(form.fck.value,(2/3))).toFixed(3); 


    //Angulo rad e graus
    //cálculo do ângulo
    var aestaca = ((Math.PI/4)*((1*form.estaca.value+5)*(1*form.estaca.value+5))).toFixed(2);
    var anguloTeta = Math.sqrt((nkResiste*1.4)/(0.72*alfav2*fcd*aestaca)).toFixed(4);  
    var anguloTeta1 = (Math.asin(anguloTeta)*180/Math.PI).toFixed(2);

    //BRAÇO DE ALAVANCA, ALTURA ÚTIL E ALTURA DO BLOCO
    //braço de alavanca
    var zBraco1 = (exentricidadeE*Math.tan(anguloTeta1*Math.PI/180)).toFixed(2); 

    //altura útil 
    var alturaUtil1= (zBraco1/0.8).toFixed(2);  
    // X BARRA
    var xBarra = 2*(alturaUtil1-zBraco).toFixed(2);
    var Rctd = (0.8*(alturaH-xBarra)*(fctm/10)*b0).toFixed(2);  
    var Asmin = ((Rctd*Zrt)/((alturaUtil-((0.4*alturaUtil)/2))*(50/1.15))).toFixed(2);
    console.log (xBarra + "cm")

    var AsminTd = document.createElement("td");
    AsminTd.textContent =  Asmin+ " cm²";  

    //As utilizado
    var Asutili = Math.max(As1,As2,Asmin);
    var AsutiliTd = document.createElement("td");
    AsutiliTd.textContent = Asutili + " cm², por face"; 
 
    //Aramdura - Asup
    
    var AsSup = (nkResiste/(4.5*(50/1.15))).toFixed(2);
    //var AsSup1 = (AsSup/3).toFixed(2);
    var AsSupTd = document.createElement("td");
    AsSupTd.textContent = AsSup + " cm², por face "  //+ AsSup1 + " cm², por face";

 
    //Aramdura - Aspele

    var AsPele = (3*Asutili/8).toFixed(2);
    var AsPeleTd = document.createElement("td");
    AsPeleTd.textContent = AsPele + " cm², por face";

     //Aramdura - Asmalha

    var AsMalha = (Asutili/5).toFixed(2);
    var AsMalhaTd = document.createElement("td");
    AsMalhaTd.textContent = AsMalha + " cm²";
   
    AsTr.appendChild(alturaUtilTd);
    AsTr.appendChild(alturaHTd);
    AsTr.appendChild(As1Td);
    AsTr.appendChild(As2Td);
    AsTr.appendChild(AsminTd);
    AsTr.appendChild(AsutiliTd);
    AsTr.appendChild(AsSupTd);
    AsTr.appendChild(AsPeleTd);
    AsTr.appendChild(AsMalhaTd);
   

    var tabelaAs = document.querySelector ('#armaduras-blocos1');
    tabelaAs.appendChild(AsTr);  
     
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Tabela de quantidades

        //Tipo As utili
        var QuantitativoAsxTr= document.createElement("tr");
        var TipoAsxTd = document.createElement('td');
            TipoAsxTd.textContent = "As.utili"
        
        // Barra em X
       
        var BarraX =form.asx.value;                            
        var BarraXTd = document.createElement("td");
            BarraXTd.textContent = BarraX + " mm" 
       

        //Quantidade Asxutil           
            
           var bitolaAsx = 3*(Asutili/((((form.asx.value/10)*(form.asx.value/10)*Math.PI))/4)).toFixed(0)                                   
           var BitolaAsxTd4 = document.createElement("td");  
                BitolaAsxTd4.textContent = bitolaAsx + " barras";   
                     
        //Espaçamento Asxutil            
            var BitolaAsx5 = ((1*form.estaca.value+5)/(bitolaAsx/3)).toFixed(0); //rever **  
            //var BitolaAsx6 = 15;                       
            var BitolaAsxTd5 = document.createElement("td");
      
            //if(BitolaAsx5<=BitolaAsx6){
                BitolaAsxTd5.textContent = BitolaAsx5 + " cm";
            //}else{
                //BitolaAsxTd5.textContent = BitolaAsx6 + " cm";
            //}
            
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
            //var BitolaAssup6 = 15;                       
            var BitolaAssupTd5 = document.createElement("td");
      
            //if(BitolaAssup5<=BitolaAssup6){
                BitolaAssupTd5.textContent = BitolaAssup5 + " cm";
            //}else{
                //BitolaAssupTd5.textContent = BitolaAssup6 + " cm";
            //}
            
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
            //var BitolaAspele6 = 15;                       
            var BitolaAspeleTd5 = document.createElement("td");
    
            //if(BitolaAspele5<=BitolaAspele6){
                BitolaAspeleTd5.textContent = BitolaAspele5 + " cm";
            //}else{
                //BitolaAspeleTd5.textContent = BitolaAspele6 + " cm";
            //}
            
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

            var bitolaAsMalha = 2*(AsMalha/((((form.aspele.value/10)*(form.aspele.value/10)*Math.PI))/4)).toFixed(0);                                    
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





    
 
    










  
