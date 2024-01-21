<?php
namespace Vass\WM\Lib;

use PDO;
use PDOException;

# Database credentials
const HOST = 'localhost';
const USER = 'root';
const PASSWORD = 'joker';
const DATABASE = 'wm';

class DB {
    private $host = HOST;
    private $dbname = DATABASE;
    private $username = USER;
    private $password = PASSWORD;
    protected $connection;

    public function __construct() {
        $this->connect();
    }

    protected function connect() {
        $dsn = "mysql:host=$this->host;dbname=$this->dbname;charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];

        try {
            $this->connection = new PDO($dsn, $this->username, $this->password, $options);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}
