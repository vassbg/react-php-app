<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Expose-Headers: Authorization");

// without that OPTIONS request will be handled by the router and will return 404
// which will result in CORS error
if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    die();
}

define('START_TIME', microtime(true));

require __DIR__ . '/vendor/autoload.php';

$router = new Bramus\Router\Router();
$router->setNamespace('\Vass\WM\Controllers');

$router->post('/', 'HomeController@index'); // You should remove this line

$router->post('/admin/login', 'AdminController@login');



$router->set404(function() {

    header('HTTP/1.1 404 Not Found');
    header('Content-Type: application/json');
    $response = [
        'time' => microtime(true) - START_TIME,
        'error' => 'Ресурсът не е намерен!',
        'data' => []
    ];
    echo json_encode($response);

});

$router->run();