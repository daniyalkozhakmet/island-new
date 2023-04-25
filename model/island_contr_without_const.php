<?php
class IslandContrWithoutConst extends Island
{
    public $island_id;
    public function __construct($island_id)
    {
        $this->island_id = $island_id;
    }
    public function getPreviousIsland()
    {
        if ($this->island_id > 0) {
            return $this->getIslandByIdDb($this->island_id - 1);
        } elseif ($this->island_id == 1) {
            return $this->getIslandByIdDb(1);
        } else {
            return $this->getLastIslandDb();
        }
    }
}
