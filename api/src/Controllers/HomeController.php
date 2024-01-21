<?php

namespace Vass\WM\Controllers;

use Vass\WM\Models\Admin;
use Vass\WM\Lib\Token;

class HomeController {

    public function index() {

        $headers = apache_request_headers();
        $auth_header = $headers['Authorization'] ?? "";
        $token = trim(str_replace("Bearer", "", $auth_header));

        $ipAddress = $_SERVER['REMOTE_ADDR'];

        $admin = Token::validate($token, $ipAddress);

        if ($admin['error']) {
            header('HTTP/1.1 401 Unauthorized');
            header('Content-Type: application/json');
            $response = [
                'time' => microtime(true) - START_TIME,
                'error' => $admin['error'],
                'data' => []
            ];
            echo json_encode($response);
            die();
        }

        $response = [
            'time' => '',
            'error' => '',
            'data' => []
        ];

        $adm = new Admin();
        $adm = $adm->get($admin['id']);
        
        if ($adm['error']) {
            $response['error'] = $adm['error'];
        } 
        
        else {
            $response['data'] = $adm['data'];
        }

        $response['time'] = microtime(true) - START_TIME;

        header('Content-Type: application/json');
        echo json_encode($response);
    }
}