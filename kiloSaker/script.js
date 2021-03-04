let toChange={'kilogram':1,'hektogram':10,'gram':100,'milligram':1000};
const verdier=['kilogram','hektogram','gram','milligram'];
function convert(){
    const from = document.getElementById('select1').value;
    const to = document.getElementById('select2').value;
    let value = document.getElementById('konverter').value
    if(from=='base' || to=='base'){
        console.log("NAH")
    } 
    else{
        if(value.trim(" ")==''){
            console.log("mah")
        }
        else if(Number(value)){
            value = Number(value);
            let ogVal = value
            value = value/toChange[from];
            value = value*toChange[to];
            console.log(value)
            document.getElementById('tekst2').innerHTML = ogVal + from+ ' = ' +value+to;
        }
        else{
            console.log("didnt work")
        }
    }
}
function fillSelect(){
    a = document.querySelector('#select1');
    b = document.querySelector('#select2');
    let select;  
    verdier.forEach(element => {
        var c = document.createElement("option");
        var c2 = document.createElement("option");
        c.text = element;
        c2.text = element;
        a.options.add(c, 1);
        b.options.add(c2, 1)        
    });    
}
fillSelect()
