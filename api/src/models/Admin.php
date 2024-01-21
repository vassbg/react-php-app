<?php

namespace Vass\WM\Models;

use Vass\WM\Lib\DB;
use PDOException;

class Admin extends DB {
    
    /**
     * Check if admin exists
     * 
     * @param string $email
     * @param string $password
     * 
     * @return array $resp  - error, data
     */
    public function isAdmin(string $email, string $password): array {

        $resp = [
            'error' => "",
            'data' => []
        ];

        try {
            $query = "SELECT * FROM admins WHERE email = ? and blocked = 0";
            $admin = $this->connection->prepare($query);
            $admin->execute([$email]);
            $admin = $admin->fetch();
        }

        catch (PDOException $e) {
            $resp['error'] = "Грешка при връзката с базата данни!";
            return $resp;
        }

        if ($admin && password_verify($password, $admin['password'])) {
            unset($admin['password']);
            unset($admin['created']);
            unset($admin['blocked']);

            $resp['data'] = $admin;
            return $resp;
        }

        $resp['error'] = "Потребителят не е намерен!";
        return $resp;
    }

    /**
     * Get admin by id
     * @param int Admin id 
     * @return array $resp - error, data
     */
    public function get(int $id): array {

        $resp = [
            'error' => "",
            'data' => []
        ];

        try {
            $query = "SELECT * FROM admins WHERE id = ?";
            $admin = $this->connection->prepare($query);
            $admin->execute([$id]);
            $admin = $admin->fetch();
        }

        catch(PDOException $e) {
            $resp["error_message"] = "Проблем с базата данни!";
            return $resp;
        }

        if (!$admin) {
            $resp["error_message"] = "Администратора не е намерен!";
            return $resp;
        }

        if ($admin['blocked'] !== 0) {
            $resp["error_message"] = "Администратора е блокиран!";
            return $resp;
        }

        unset($admin['password']);
        unset($admin['created']);
        unset($admin['blocked']);

        $resp["data"] = $admin;
        return $resp;

    }

}