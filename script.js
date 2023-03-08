let dataJson;
function fetchMijson() {
    fetch('./datos.json').then( (response)=>{
        response.json().then((parsed)=>{
            dataJson = parsed;
            console.log(dataJson);
        });
        
    })
    // let miJson = fetch(...)
    // console.log(miJson['brands'][0]['name']);
    // onsole.log(miJson['years'][2]);
    // console.log(miJson['plan']['1']);
}
fetchMijson()


let confirmacion = confirm(`Bienvenido al Cotizador de Vehiculos mas seguro!!
Presiona Ok para continuar...`);
console.log(confirmacion);

if ((confirmacion = true)) {
    alert("Comencemos...");
}

const cotizarSeguro = () => {
    // Recuperar datos del localStorage o establecerlos como un objeto vacío
    let cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || {};

    let brand = document.querySelector("#brand").value;
    let year = document.querySelector("#year").value;
    let basico = document.querySelector("#basico");
    let intermedio = document.querySelector("#intermedio");
    let completo = document.querySelector("#completo");
    let confirmar = document.querySelector("#btn-confirmar");

    let divResumen = document.querySelector("#resumen");
    let divResultado = document.querySelector("#resultado");
    let divCorreo = document.querySelector("#correo");

    // Mensaje de error
    const mostrarError = (elemento, mensaje) => {
        divError = document.querySelector(elemento);
        divError.innerHTML = `<p class="alert alert-danger error"> ${mensaje} </p>`;
        setTimeout(() => {
            divError.innerHTML = ``;
        }, 2000);
    };

    // Para poner en mayuscula la primer letra de cada item del resumen
    const mayuscula = (palabra) => {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    };

    let plan = "";

    if (basico.checked) {
        plan = "basico";
    } else if (intermedio.checked) {
        plan = "intermedio";
    } else if (completo.checked) {
        plan = "completo";
    }

    if (brand === "" || year === "" || plan === "") {
        mostrarError("#msj-error-cotizador", "FALTA SELECCIONAR VALORES");
        return;
    }

    //Objeto cotizacion
    let cotizacion = {
        brand,
        year,
        plan,
    };
    document.querySelector("#msj").style.display = "none";

    // Spinner de carga
    divResumen.style.display = "block";

    divResumen.innerHTML = `<div style="text-align: center">
                            <img src="./spinner.gif" width=150px height=150px />
                            </div>`;

    const impresionCotizacion = () => {
        setTimeout(() => {
            divResumen.innerHTML = ` 
                                    <h2> Resumen de cotizacion </h2>
                                    <ul>
                                        <li>Marca: ${mayuscula(brand)}</li>
                                        <li>Plan: ${mayuscula(plan)}</li>
                                        <li>Año del auto: ${mayuscula(
                                        year
                                        )}</li>
                                    </ul>
                                    `;
            let cotizacionFinal = cotizar(cotizacion);
            divResultado.style.display = "block";
            divResultado.className = "divResultado";
            divResultado.innerHTML = `<p class="textoCotizacion"> Monto final:  $${cotizacionFinal} </p>`;
        }, 3000);
    };
    impresionCotizacion();

    const cotizar = (cotizacion) => {
        const {
            brand,
            year,
            plan
        } = cotizacion;
        let result = 2000; // base para cualquier seguro

        const diferenciaYear = diferencia(year);
        result -= (diferenciaYear * 3 * result) / 100;

        result = calcularBrand(brand) * result;
        const incrementPlan = obtenerPlan(plan);

        result = parseFloat(incrementPlan * result).toFixed(2);

        return result;
    };

    divCorreo.style.display = "block";
    setTimeout(() => {
        divCorreo.innerHTML = `<form action="https://formspree.io/f/{form_id}" method="post" class="correo">
                                    <label for="email">Ingrese su mail para enviar resumen y poliza: </label>
                                    <input name="Email" id="email" type="email" placeholder="Ingrese su mail">
                                    <input type="hidden" name="_next" value="http://localhost:8000"></input>
                                    <input type="hidden" name="_captcha" value="false"></input>
                                </form>`;
    }, 3000);

    let mail = document.querySelector("#Email");

    // guardar datos en localStorage
    let cotizacionData = {
        cotizacion: {
            marca: mayuscula(brand),
            plan: mayuscula(plan),
            year: mayuscula(year),
            cotizacionFinal: cotizacion,
            // mail = mail
        },
    };

    localStorage.setItem("cotizacion", JSON.stringify(cotizacionData));

    confirmar.style.display = "block";
    confirmar.innerHTML = "Confirmar";

    const diferencia = (year) => {
        return new Date().getFullYear() - year;
    };
    const calcularBrand = (brand) => {
        let increment;

        switch (brand) {
            case "europeo":
                increment = 1.5;
                break;
            case "americano":
                increment = 1.35;
                break;
            case "asiatico":
                increment = 1.1;
                break;
            default:
                break;
        }
        return increment;
    };

    const obtenerPlan = (plan) => {
        if (plan === "basico") {
            return 1.2;
        } else if (plan === "intermedio") {
            return 1.3;
        } else if (plan === "completo") {
            return 1.5;
        }
    };

    confirmar.addEventListener("click", () => {
        confirmar.style.display = "block";
        let cotizacionData = JSON.parse(localStorage.getItem("cotizacion"));
        if (cotizacionData) {
            alert(
                `Cotización confirmada:\nMarca: ${cotizacionData.cotizacion.marca}\nPlan: ${cotizacionData.cotizacion.plan}\nAño del auto: ${cotizacionData.cotizacion.year}\nMonto: ${cotizacionData.cotizacion.cotizacion}`
            );

            localStorage.removeItem("cotizacion");
        } else {
            alert("No hay cotizaciones guardadas");
        }
    });





};