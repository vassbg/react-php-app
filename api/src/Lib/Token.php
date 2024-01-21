<?php

namespace Vass\WM\Lib;

class Token {
    private static $secretKey = 'y08UosDWN49ZKJBIRp4h29cq72gzVx6n4y6jvYoUFMW3b1/UWy+/RBSuS4ENynGHhyBtA2SwwiuIBHsw/t99Vg==';
    
    private static $expirationTime = 60 * 60 * 24 * 90; // 90 days - reduce it in procduction
    private static $encriptionMethod = 'AES-256-CBC';

    /**
     * Create a token
     * @param int $adminId
     * @param string $ipAddress
     * @return string The token
     */
    public static function create(int $adminId, string $ipAddress): string {

        $time = time() + self::$expirationTime;

        $data = [
            'id' => $adminId,
            'ipAddress' => $ipAddress,
            'expirationTime' => $time
        ];

        $jsonData = json_encode($data);

        $ivLength = openssl_cipher_iv_length(self::$encriptionMethod);
        $iv = openssl_random_pseudo_bytes($ivLength);

        $encrypted = openssl_encrypt($jsonData, self::$encriptionMethod, self::$secretKey, OPENSSL_RAW_DATA, $iv);
        $encrypted = $iv . $encrypted;
        $encrypted = base64_encode($encrypted);

        return $encrypted;
    }

    /**
     * Validate a token
     * @param string $token
     * @param string $ipAddress
     * @return array An array containing the admin ID and an error message
     */
    public static function validate(string $token, string $ipAddress): array {

        $response = [
            'error' => '',
            'id' => null
        ];

        $encryptedData = base64_decode($token);

        $ivLength = openssl_cipher_iv_length(self::$encriptionMethod);
        $iv = substr($encryptedData, 0, $ivLength);

        $encryptedData = substr($encryptedData, $ivLength);
        $decryptedData = openssl_decrypt($encryptedData, self::$encriptionMethod, self::$secretKey, OPENSSL_RAW_DATA, $iv);

        if ($decryptedData === false) {
            $response['error'] = 'Invalid token';
            return $response;
        }

        $decodedData = json_decode($decryptedData, true);

        if (time() > $decodedData['expirationTime']) {
            $response['error'] = 'Token expired';
            return $response;
        }

        if ($ipAddress !== $decodedData['ipAddress']) {
            $response['error'] = 'Invalid IP address';
            return $response;
        }

        $response['id'] = $decodedData['id'];

        return $response;

    }
}
