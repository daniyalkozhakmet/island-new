<?php
include('./model/database.php');
include('./model/island.php');
include('./model/island_contr.php');
include('./model/island_contr_without_const.php');

if (isset($_POST)) {
  $data = stripslashes(file_get_contents("php://input"));
  $my_data = json_decode($data, true);

  if (isset($my_data['island_sum']) && isset($my_data['island_arr'])) {
    $island_sum = ($my_data['island_sum']);
    $island_arr = ($my_data['island_arr']);
    $island = new IslandContr($island_arr, $island_sum);
    $new_island = $island->saveIsland();
    $response = [
      "data" => $new_island,
      "message" => "Saved successfully",
    ];
    print_r(json_encode($response));
  } elseif (isset($my_data['id'])) {
    $id = $my_data['id'];
    $island = new IslandContrWithoutConst(intval($id));
    $prev_island = $island->getPreviousIsland();
    if (is_bool($prev_island)) {
      $response = [
        "error" => "No data to show",
      ];
      print_r(json_encode($response));
    } else {
      $response = [
        "data" => $prev_island,
        "message" => "Retrieved successfully",
      ];
      print_r(json_encode($response));
    }
  } else {
    $response = [
      "error" => 'Fill in all fields'
    ];
    print_r($response);
  }
}
