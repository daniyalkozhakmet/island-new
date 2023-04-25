<?php

class Dbh
{
    protected function connect()
    {
        try {
            $username = 'root';
            $dsn = 'mysql:host=localhost:3307;dbname=island';
            $password = 'developer';
            $db = new PDO($dsn, $username, $password);
            return $db;
        } catch (PDOException $e) {
            $error = 'Database error:';
            $error .= $e->getMessage();
            $response = [
                "error" => $error
            ];
            echo $response;

            exit();
        }
    }
}


// Check connection
