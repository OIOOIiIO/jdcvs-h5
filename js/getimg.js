const request = require('request')

// Define your HTML/CSS
const data = {
  html: "printing.html",
  css: "main.css",
  google_fonts: "Roboto"
}

// Create an image by sending a POST to the API.
// Retrieve your api_id and api_key from the Dashboard. https://htmlcsstoimage.com/dashboard
request.post({ url: 'https://hcti.io/v1/image', form: data})
  .auth(876c9930-efa8-4589-ad9e-14f491293e24, 09583518-7b50-46c0-a4f5-a7f372f0a149)
  .on('data', function(data) {
    console.log(JSON.parse(data))
  })    

// {"url": "https://hcti.io/v1/image/1113184e-419f-49f1-b231-2069942a186f"}