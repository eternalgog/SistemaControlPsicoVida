// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el botón "Administrar pacientes" y le asigna una acción al hacer clic
    document.getElementById("btnPaciente").addEventListener("click", function () {
        window.location.href = "adpaciente.html"; // Redirige a "adpaciente.html"
    });

    // Selecciona el botón "Administrar terapeutas" y le asigna una acción al hacer clic
    document.getElementById("btnTerapeuta").addEventListener("click", function () {
        window.location.href = "adterapeuta.html"; // Redirige a "adterapeuta.html"
    });

    // Selecciona el botón "Administrar citas" y le asigna una acción al hacer clic
    document.getElementById("btnCita").addEventListener("click", function () {
        window.location.href = "adcita.html"; // Redirige a "adcita.html"
    });

    // Selecciona el botón "Administrar usuarios" y le asigna una acción al hacer clic
    document.getElementById("btnUsuario").addEventListener("click", function () {
        window.location.href = "adusuario.html"; // Redirige a "adusuario.html"
    });
});
