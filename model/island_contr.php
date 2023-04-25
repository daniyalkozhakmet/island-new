<?php
class IslandContr extends Island
{
    public $island_arr;
    public $island_sum;
    public function __construct($island_arr, $island_sum)
    {
        $this->island_arr = $island_arr;
        $this->island_sum = $island_sum;
    }
    public function emptyInput()
    {
        $result = null;
        if (empty($this->island_arr) || empty($this->island_sum)) {
            $result = false;
        } else {
            $result = true;
        }
        return $result;
    }
    public function saveIsland()
    {
        if ($this->emptyInput() == false) {
            $response = [
                "error" => 'Please enter valid input'
            ];
            echo $response;
            exit();
        }
        return $this->setIsland($this->island_arr, $this->island_sum);
    }
}
