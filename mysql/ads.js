const fs = require('fs');
const xml2js = require('xml2js');
const mysql = require('mysql');

// Read the XML file
const xmlData = fs.readFileSync('data_0001_test_. (2) (2).xml', 'utf-8');

// Configure your MySQL connection
const dbConfig = {
  host: 'localhost',
  
  database: 'new',
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Parse the XML data
xml2js.parseString(xmlData, (err, result) => {
  if (err) {
    console.error('Error parsing XML:', err);
    return;
  }

  // Extract data from the XML result object
  const product = result.product;
  const detailsDataList = product.definitions[0].detailsData;
  const headerData = product.definitions[0].headerData[0];

  // Insert data into MySQL tables
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }

    // Insert data into the 'product' table
    const productData = {
      productID: product.productID[0],
      bleachingCode: product.bleachingCode[0],
      defaultLanguage: product.defaultLanguage[0],
      // Add other fields here based on your schema
    };

    connection.query('INSERT INTO product SET ?', productData, (err, result) => {
      if (err) {
        console.error('Error inserting into product table:', err);
        return;
      }
      console.log('Inserted into product table:', result);

      // Insert data into the 'details_data' table (loop through detailsDataList)
      detailsDataList.forEach((detailsData) => {
        const detailsDataItem = {
          productID: product.productID[0],
          cedi: detailsData.cedi[0],
          color_code: detailsData.color_code[0],
          color_description: detailsData.color_description[0],
          // Add other fields here based on your schema
        };

        connection.query('INSERT INTO details_data SET ?', detailsDataItem, (err, result) => {
          if (err) {
            console.error('Error inserting into details_data table:', err);
            return;
          }
          console.log('Inserted into details_data table:', result);
        });
      });

      // Insert data into the 'header_data' table
      const headerDataItem = {
        productID: product.productID[0],
        brand: headerData.brand[0],
        catalog: headerData.catalog[0],
        // Add other fields here based on your schema
      };

      connection.query('INSERT INTO header_data SET ?', headerDataItem, (err, result) => {
        if (err) {
          console.error('Error inserting into header_data table:', err);
          return;
        }
        console.log('Inserted into header_data table:', result);
      });

      // Close the MySQL connection
      connection.end();
    });
  });
});