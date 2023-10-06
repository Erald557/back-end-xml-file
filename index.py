import xml.etree.ElementTree as ET

tree = ET.parse('data_0001_test_. (2) (2).xml')


root = tree.getroot()


for details_data in root.findall(".//detailsData"):
    sku_name = details_data.find("skuName").text
    color_description = details_data.find("color_description").text
    size_description = details_data.find("size_description").text
    sap_price = details_data.find("sapPrice").text

    print("SKU Name:", sku_name)
    print("Color Description:", color_description)
    print("Size Description:", size_description)
    print("SAP Price:", sap_price)
    print("-----")