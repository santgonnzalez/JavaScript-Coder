const cotizarSeguro=()=>{
    let brand=document.querySelector("#brand").value;
    let year=document.querySelector("#year").value;
    let basico=document.querySelector("#basico").value;
    let intermedio=document.querySelector("#intermedio");
    let completo=document.querySelector("#completo");


    let divResumen=document.querySelector("#resumen");
    let divResultado=document.querySelector("#resultado");

    // Mensaje de error
    const mostrarError=(elemento, mensaje)=>{ 
        divError=document.querySelector(elemento);
        divError.innerHTML=`<p class="alert alert-danger error"> ${mensaje} </p>`;
        setTimeout(()=>{ divError.innerHTML=``;},2000);
    }

    // Para poner en mayuscula la primer letra de cada item del resumen
    const mayuscula=(palabra)=>{
        return palabra.charAt(0).toUpperCase()+palabra.slice(1);
    }


    let plan="";

    if(basico.checked){
        plan="basico";
    }else if(intermedio.checked){
        plan="intermedio";
    }else if(completo.checked){
        plan="completo";
    }


    if(brand === '' || year === '' || plan === ''){
        mostrarError("#msj-error-cotizador", "FALTA SELECCIONAR VALORES"); 
        return;
        }

    //Objeto cotizacion
    let cotizacion={brand,year,plan};
    document.querySelector("#msj").style.display="none";

        

    // divResumen.style.backgroundColor="#FFFF";
    divResumen.style.display= "block";
    
    divResumen.innerHTML=`<div style="text-align: center">
                            <img src="./spinner.gif" width=150px height=150px />
                            </div>`;
        setTimeout(()=>{
            // divResumen.style.backgroundColor="#FFFF";
            divResumen.innerHTML=` 
                                    <h2> Resumen de cotizacion </h2>
                                    <ul>
                                        <li>Marca: ${mayuscula(brand)}</li>
                                        <li>Plan: ${mayuscula(plan)}</li>
                                        <li>Año del auto: ${mayuscula(year)}</li>
                                    </ul>
                                    `;
        let cotizacionFinal= cotizar(cotizacion);
        divResultado.style.display="block";
        divResultado.className="divResultado";
        divResultado.innerHTML= `<p class="textoCotizacion"> $ ${cotizacionFinal} </p>`;
        },3000);


        const cotizar=(cotizacion)=>{
            const {brand,year,plan}=cotizacion;
            let result=2000; // base para cualquier seguro

            const diferenciaYear= diferencia(year);
            result-=((diferenciaYear*3)* result)/100;

            result=calcularBrand(brand)*result;
            const incrementPlan=obtenerPlan(plan);

            result=parseFloat(incrementPlan*result).toFixed(2);
            return result;
        }

        const diferencia=(year)=>{
            return new Date().getFullYear() -year;
        }
        const calcularBrand=brand=>{
            let increment;

            switch(brand){
                case 'europeo': increment = 1.50;
                break;
                case 'americano': increment = 1.35;
                break;
                case 'asiatico': increment = 1.10;
                break;
                default: break;
            }
            return increment;
        }

        const obtenerPlan=plan=>{
            if(plan==='basico'){
                return 1.20;
            }else if(plan==='intermedio'){
                return 1.30;
            }else if(plan==='completo'){
                return 1.50;
            }
        }



}