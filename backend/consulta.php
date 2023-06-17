<?php
$conn = new mysqli('localhost', 'root', '', 'cursosql');

if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    include '../views/registered_users.html';
}

$conn->close();
?>