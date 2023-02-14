
var botaoAdicionar = document.querySelector("#calculaBloco2"); 

botaoAdicionar.addEventListener("click", function calcular (event) { 
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var tabelaGeometriaTr = document.createElement('tr');//Tabela das geometrias

    
/////////////////////////////////////////////////////////////////////////////////
    //Geometria

    //lado A
    var ladoA =  (form.estaca.value * 4 +30).toFixed(1);
    //var ladoATd = document.createElement('td');
        //ladoATd.textContent = ladoA + ' cm'

    //lado B
    var ladoB =  (form.estaca.value*1 + 30).toFixed(2);
    //var ladoBTd = document.createElement('td');
        //ladoBTd.textContent = ladoB + ' cm'

    //calculo do eixo 
    var eixoEstaca =  (form.estaca.value*3).toFixed(2);
    var eixoEstacaTd = document.createElement('td');
        eixoEstacaTd.textContent = eixoEstaca + " cm";

    //calculo do d' 
    var dLinha =  5;
    //var dLinhaTd = document.createElement('td');
          //dLinhaTd.textContent = dLinha + " cm";

    //alturas úteis
    var dmin = (0.5*(eixoEstaca-form.pilarAp.value/2)).toFixed(2);
    var dminTd = document.createElement('td')
        dminTd.textContent = dmin + " cm"

    //var tgteta = (dmin/(eixoEstaca/2-form.pilarAp.value/4));

    //var tggraus = (Math.atan(tgteta)*180/Math.PI).toFixed(2);
    //var tggrausTd = document.createElement('td');
        //tggrausTd.textContent = tggraus + " °";


    var dmax = (0.71*(eixoEstaca -form.pilarAp.value/2)).toFixed(2);
    var dmaxTd = document.createElement('td')
        dmaxTd.textContent = dmax + " cm"    

    //var tgteta1 = (dmax/(eixoEstaca/2-form.pilarAp.value/4));

    //var tggraus1 = (Math.atan(tgteta1)*180/Math.PI).toFixed(2) 
    //var tggraus1Td = document.createElement('td');
        //tggraus1Td.textContent = tggraus1 + " °";


//////////////////////////////////////////////////////////////////////////////////////////
    //TABELA GEOMETRIA DO BLOCO
    //tabelaGeometriaTr.appendChild(ladoATd); //Lado A
    //tabelaGeometriaTr.appendChild(ladoBTd);//Lado B
    tabelaGeometriaTr.appendChild(eixoEstacaTd);//Eixo
    //tabelaGeometriaTr.appendChild(dLinhaTd);//d linha
    tabelaGeometriaTr.appendChild(dminTd);//d mínimo
    //tabelaGeometriaTr.appendChild(tggrausTd);//graus mínimo
    tabelaGeometriaTr.appendChild(dmaxTd);//d máx
    //tabelaGeometriaTr.appendChild(tggraus1Td);//graus máximo
 

    var tabelaLadoTr = document.querySelector('#tabela-geometria'); 
    tabelaLadoTr.appendChild(tabelaGeometriaTr);   


});
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   

const btn = document.querySelector('.recarregar');
    btn.addEventListener('click',function(){
        location.reload
    })
   






































































