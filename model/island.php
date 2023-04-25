<?php

class Island extends Dbh
{
    protected function setIsland($result_arr, $result_sum)
    {
        $statement = $this->connect()->prepare('INSERT INTO island (island_arr,island_sum) VALUES (?,?);');
        if (!$statement->execute(array(json_encode($result_arr), $result_sum))) {
            $statement = null;
            $response = [
                "error" => 'Server error, try again'
            ];
            echo $response;
            // include('view/error.php');
            exit();
        }
        // Return saved row
        return $this->returnSavedValue();
    }
    protected function returnSavedValue()
    {
        $statement = $this->connect()->prepare('SELECT * from island ORDER BY id DESC LIMIT 1;');
        $statement->execute();
        $data = $statement->fetch();
        return $data;
    }
    protected function getQtyIslandDb($id)
    {
        $statement = $this->connect()->prepare('SELECT id FROM island LIMIT 1');
        $statement->execute();
        $data = $statement->fetch();
        return $data;
    }
    protected function getIslandByIdDb($id)
    {
        $statement = $this->connect()->prepare('SELECT * from island WHERE id = ?;');
        $statement->execute(array($id));
        $data = $statement->fetch();
        return $data;
    }
    protected function getLastIslandDb()
    {
        $statement = $this->connect()->prepare('SELECT * from island ORDER BY id DESC LIMIT 1;');
        $statement->execute();
        $data = $statement->fetch();
        return $data;
    }
}
