<?php

namespace Vass\WM\Controllers;

use Vass\WM\Models\Admin;
use Vass\WM\Lib\Token;

class AdminController {
    /**
     * Admin login
     * @return json
     */
    public function login() {

        $ipAddress = $_SERVER['REMOTE_ADDR'];

        $email = $_POST['email'] ?? "";
        $password = $_POST['password'] ?? "";

        $response = [
            'time' => '',
            'error' => '',
            'data' => []
        ];

        if ($email && $password) {

            $adm = new Admin();

            $adminCheck = $adm->isAdmin($email, $password);

            if ($adminCheck['error']) {
                $response['error'] = $adminCheck['error'];
            } 
            
            else {
                $response['data'] = $adminCheck['data'];
                $token = Token::create($adminCheck['data']['id'], $ipAddress);
                $response['data']['token'] = $token;
            }

        } 
        
        else {
            $response['error'] = "Грешни данни за вход!";
        }

        $response['time'] = microtime(true) - START_TIME;

        header('Content-Type: application/json');
        echo json_encode($response);
    }
}