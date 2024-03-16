// Función para cargar los tópicos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    cargarTopicos();
});

// Función para cargar los tópicos desde la API
function cargarTopicos() {
    axios.get('https://backend-5e5g.onrender.com/topicos')
        .then(response => {
            const topicList = document.getElementById('topicList');
            const ul = topicList.querySelector('ul');
            ul.innerHTML = '';
            response.data.forEach(topico => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `Título: ${topico.titulo}, Mensaje: ${topico.mensaje}, Autor: ${topico.autor}, Curso: ${topico.curso}, Fecha: ${topico.fecha_crecion}, Estatus: ${topico.estatus}`;
                ul.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar los tópicos:', error));
}

// Manejador de eventos para el envío del formulario
document.getElementById('topicForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos del formulario
    const titulo = document.getElementById('titulo').value;
    const mensaje = document.getElementById('mensaje').value;
    const autor = document.getElementById('autor').value;
    const curso = document.getElementById('curso').value;
    const estatus = document.getElementById('estatus').value;

    // Crear el objeto con los datos del formulario
    const formData = {
        titulo: titulo,
        mensaje: mensaje,
        autor: autor,
        estatus: estatus,
        curso: curso
    };

    // Enviar los datos al servidor mediante Axios
    axios.post('https://backend-5e5g.onrender.com/topico', formData)
        .then(response => {
            console.log('Tópico registrado:', response.data);
            // Limpiar el formulario después del registro
            document.getElementById('topicForm').reset();
            // Puedes llamar a una función para cargar los tópicos nuevamente si es necesario
            cargarTopicos(); // Volver a cargar los tópicos
        })
        .catch(error => {
            console.error('Error al registrar el tópico:', error);
            // Puedes manejar el error de acuerdo a tus necesidades
        });
});

