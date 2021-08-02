class ListaTareas{
    constructor(){
        this.tareas = JSON.parse(localStorage.getItem("tareas"));


        if (!this.tareas) {
            this.tareas = [
                {tarea: 'Aprender JavaScript',
                  completado: false},
                  {tarea: 'Aprender React',
                  completado: false}, 
                  {tarea: 'Aprender Mongo',
                  completado: true}
            ];
        }

        this.cargarTareas();
        this.agregarEventListeners();

    }

    agregarEventListeners(){
        document.getElementById('recordatorio').addEventListener('Keypress', (evento) => {
            if (evento.keyCode == 13) {
                this.agregarTarea(evento.target.value);
                evento.target.value = '';
            }
        });
    }

    cargarTareas(){
        localStorage.setItem("tareas", JSON.stringify(this.tareas));

        let htmlTareas = this.tareas.reduce((html, tarea, indice) => html += this.generarHtmlTarea(tarea, indice), '');
        document.getElementById('listaTareas').innerHTML = htmlTareas;
    }

    cambiarEstadoTarea(indice){
        this.tareas[indice].completado = !this.tareas[indice].completado;
        this.cargarTareas();
    }

    eliminarTarea(event, indice){
        event.preventDefault();
        this.tareas.splice(indice, 1);
        this.cargarTareas();
    }

    generarHtmlTarea(tarea, indice){
        return `
            <li class="list-group-item checkbox">
               <div iv class="row">
                    <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                        <label>
                        <input type="checkbox" id="cambiarEstadoTarea" onchange = "listaTareas.cambiarEstadoTarea(${indice})" value="" class="cajaComprobacion" ${tarea.completado ? 'checked':''}/>
                        </label>
                        </div>
                        <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 texto-tarea ${tarea.completado ? 'tarea-completada': ''}">
                        ${tarea.tarea}
                        </div>
                        <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 area-icono-eliminacion">
                        <a class="" href="/" onclick="listaTareas.eliminarTarea(event, ${indice})">
                            <i id="eliminarTarea" data-id=${indice} class="icono-eliminacion bi bi-trash"></i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            </a>
                    </div>
                </div>
            </li>
        `;
    }

    agregarTarea(tarea){

        let padre = document.getElementById('recordatorio').parentElement;

        if(tarea != ''){
            padre.classList.add('has-error');
            let nuevaTarea = {
                tarea,
                completado: false
            };
            this.tareas.push(nuevaTarea);
            this.cargarTareas();
        } else{
            padre.classList.add('has-error');
        }

    }

    agregarTareaClick(){
        let recordatorio = document.getElementById('recordatorio');
        let tarea = recordatorio.value;
        if (tarea) {
            this.agregarTarea(tarea);
            recordatorio.value = '';
        }
    }

}

let listaTareas;

window.addEventListener('load', () => {
    listaTareas = new ListaTareas();
})
