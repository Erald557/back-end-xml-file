const fs = require('fs');
const xml2js = require('xml2js');


const xmlData = fs.readFileSync('data_0001_test_. (2) (2).xml', 'utf-8');


xml2js.parseString(xmlData, (err, result) => {
  if (err) {
    console.error('Error parsing XML:', err);
    return;
  }


  const product = result.product;
  const bleachingCode = product.bleachingCode[0];
  const defaultLanguage = product.defaultLanguage[0];

 
  const detailsDataList = product.definitions[0].detailsData;


  detailsDataList.forEach((detailsData) => {
    const cedi = detailsData.cedi[0];
    const colorCode = detailsData.color_code[0];
    const colorDescription = detailsData.color_description[0];
 

    console.log(`Cedi: ${cedi}, Color Code: ${colorCode}, Color Description: ${colorDescription}`);
  });


  const headerData = product.definitions[0].headerData[0];
  const brand = headerData.brand[0];
  const catalog = headerData.catalog[0];
 
  const dryCleaningCode = product.dryCleaningCode[0];
  const dryingCode = product.dryingCode[0];

  console.log(`Bleaching Code: ${bleachingCode}`);
  console.log(`Default Language: ${defaultLanguage}`);
  console.log(`Brand: ${brand}`);
  console.log(`Catalog: ${catalog}`);

});
