<?php

$xml = simplexml_load_file('data_0001_test_. (2) (2).xml');

foreach ($xml->definitions->detailsData as $detailsData) {
    echo "SKU Name: " . $detailsData->skuName . "<br>";
    echo "Color Description: " . $detailsData->color_description . "<br>";
    echo "Size Description: " . $detailsData->size_description . "<br>";
    echo "SAP Price: " . $detailsData->sapPrice . "<br>";
    echo "<hr>";
}

?>
