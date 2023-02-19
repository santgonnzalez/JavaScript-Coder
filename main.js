let confirmacion = confirm(`Bienvenido al Cotizador de Vehiculos mas seguro!!
Presiona Ok para continuar...`);
console.log(confirmacion);

if (confirmacion = true) {
    alert("Comencemos...")
} else {
    alert("Te esperamos en otra oportunidad!");
}

const cotizarSeguro=()=>{
    let brand=document.querySelector("#brand").value;
    let year=document.querySelector("#year").value;
    let basico=document.querySelector("#basico").value;
    let intermedio=document.querySelector("#intermedio");
    let completo=document.querySelector("#completo");


    let divResumen=document.querySelector("#resumen");
    let divResultado=document.querySelector("#resultado");


    // LocalStorage
    let savedData = JSON.parse(localStorage.getItem('cotizacionData'));

    
    if (savedData) {
        brand = savedData.brand;
        year = savedData.year;
        basico = savedData.basico;
        intermedio = savedData.intermedio;
        completo = savedData.completo;
    }

    
    document.querySelector("#brand").value = brand;
    document.querySelector("#year").value = year;
    document.querySelector("#basico").checked = basico === 'true';
    document.querySelector("#intermedio").checked = intermedio === 'true';
    document.querySelector("#completo").checked = completo === 'true';

    
    const saveData = () => {
        const data = {
            brand: document.querySelector("#brand").value,
            year: document.querySelector("#year").value,
            basico: document.querySelector("#basico").checked,
            intermedio: document.querySelector("#intermedio").checked,
            completo: document.querySelector("#completo").checked
        };

        localStorage.setItem('cotizacionData', JSON.stringify(data));
    };

    document.querySelector("#brand").addEventListener('change', saveData);
    document.querySelector("#year").addEventListener('change', saveData);
    document.querySelector("#basico").addEventListener('change', saveData);
    document.querySelector("#intermedio").addEventListener('change', saveData);
    document.querySelector("#completo").addEventListener('change', saveData);



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