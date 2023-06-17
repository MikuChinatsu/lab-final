<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = $_POST['nombre'];
    $primerApellido = $_POST['primer_apellido'];
    $segundoApellido = $_POST['segundo_apellido'];
    $email = $_POST['email'];
    $login = $_POST['login'];
    $password = $_POST['password'];

    $errors = array();

    if (empty($nombre) || empty($primerApellido) || empty($segundoApellido) || empty($email) || empty($login) || empty($password)) {
        $errors[] = "Todos los campos son requeridos.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "El campo email debe tener un formato de correo electrónico válido.";
    }

    if (strlen($password) < 4 || strlen($password) > 8) {
        $errors[] = "El campo password debe tener una extensión entre 4-8 caracteres.";
    }

    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    } else {
        $conn = new mysqli('localhost', 'root', '', 'cursosql');

        if ($conn->connect_error) {
            die("Error de conexión a la base de datos: " . $conn->connect_error);
        }

        $checkEmailQuery = "SELECT * FROM usuarios WHERE email = '$email'";
        $checkEmailResult = $conn->query($checkEmailQuery);

        if ($checkEmailResult->num_rows > 0) {
            echo "El correo electrónico ya está registrado. Por favor, intenta con otro.";
        } else {
            $insertQuery = "INSERT INTO usuarios (NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO, EMAIL, LOGIN, PASSWORD)
                            VALUES ('$nombre', '$primerApellido', '$segundoApellido', '$email', '$login', '$password')";

            if ($conn->query($insertQuery) === TRUE) {
                echo "Registro completado con éxito.<br>";
                echo '<a href="consulta.php">Consulta</a>';
                exit();
            } else {
                echo "Error al registrar los datos: " . $conn->error;
            }
        }

        $conn->close();
    }
}
?>