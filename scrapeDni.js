const axios = require('axios');
const cheerio = require('cheerio'); // Librería para trabajar con HTML como en jQuery

async function scrapeDniInfo(dni) {
  try {
    // Hacer la solicitud HTTP utilizando Axios
    const response = await axios.get(`https://www.cuitonline.com/search.php?q=${dni}`);
    const html = response.data; // Obtener el HTML de la página

    // Utilizar Cheerio para cargar el HTML y trabajar con él como en jQuery
    const $ = cheerio.load(html);

    // Capturar el nombre, CUIL desde el HTML utilizando selectores CSS
    const nombre = $('.hit .denominacion h2').text().trim();
    const cuil = $('.hit .cuit').text().trim();

    return { nombre, cuil };
  } catch (error) {
    console.error('Error al realizar la solicitud HTTP:', error);
    return null;
  }
}

module.exports = scrapeDniInfo;

/* // Ejemplo de uso
const dni = '34487318';
scrapeDniInfo(dni)
  .then((data) => {
    console.log('Resultado del scraping:', data);
  })
  .catch((error) => {
    console.error('Error al ejecutar el scraping:', error);
  }); */
