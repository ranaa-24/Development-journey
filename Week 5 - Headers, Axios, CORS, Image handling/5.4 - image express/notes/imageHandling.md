## Sending image from express 
To send an image from an Express server to a client, the easiest and most efficient way is to use `res.sendFile()`. This method handles reading the file from your system, setting the proper Content-Type header, and streaming it to the browser automatically

This approach reads a local file and transfers it as an octave/stream response. You must provide an **absolute path** to the file

```js
const express = require('express');
const path = require('path');
const app = express();

app.get('/image', (req, res) => {
    // Construct the absolute path to your image
    const imagePath = path.join(__dirname, 'images', 'photo.jpg');
    
    // Send the file
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(404).send('Image not found');
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));

```

### `Using express.static`(For public assets)

If you want to serve a whole folder of images (like a public or images directory) so clients can access them via their URLs directly, use the static middleware. 

```js
const express = require('express');
const path = require('path');
const app = express();

// Serve all files inside the "public/images" directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(3000);
```

If you have a file at `public/images/logo.png`, a user can view it instantly by navigating to `http://localhost:3000/images/logo.png`.

`public/images` folder is alised with `/images` as specified 


### Downloading an image as an attachment

If your goal is to force the user's browser to download the image instead of displaying it on the screen, use `res.download()`

```js
app.get('/download-image', (req, res) => {
    const imagePath = path.join(__dirname, 'images', 'photo.jpg');
    
    // This forces a "Save As" prompt on the client side
    res.download(imagePath, 'user-friendly-name.jpg'); 
});
```

## How frontend haldels 
How your frontend handles the image depends entirely on whether your backend returns a direct URL string or the raw image file data.

### Approach 1: Pointing directly to the API URL (Easiest)

If your Express route uses `res.sendFile()` or `express.static`, the backend endpoint behaves exactly like a direct image URL. You do not need to use fetch or axios; you can pass the backend URL directly into an HTML `<img>` tag's src attribute.

```html
<!-- HTML / Vanilla JS -->
<img src="http://localhost:3000/image" alt="Dynamic Backend Image" />
```

### Approach 2: Fetching raw image data as a Blob

If your API route requires special authentication headers (like `Authorization: Bearer <token>`) or you are fetching protected data, you must fetch the data manually using JavaScript and convert it into a local object URL.

```js
async function loadProtectedImage() {
  try {
    const response = await fetch('http://localhost:3000/image', {
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
      }
    });

    // axios has a responsetype:'blob' to get the data as blob
    // axios.get('link', {
    //     responsetype: 'blob'
    // })


    // 1. Convert the response into a raw binary blob
    const imageBlob = await response.blob();
    
    // 2. Create a temporary local URL pointing to that blob
    const imageObjectURL = URL.createObjectURL(imageBlob);
    
    // 3. Assign it to your image element
    document.getElementById('my-image').src = imageObjectURL;
  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

loadProtectedImage();
```

### Handling Base64 or Buffer Data

If your Express backend sends the image as a JSON object containing a base64 encoded string (common when pulling binary data out of databases like MongoDB or PostgreSQL), you can display it using a Data URL.

```json
{
  "image": "iVBORw0KGgoAAAANSUhEUgAA..."
}
```

```js
async function loadBase64Image() {
  const response = await fetch('http://localhost:3000/api/image-json');
  const data = await response.json();
  
  // Prefix the base64 string with the proper data mime-type details
  const mimeType = 'image/jpeg'; // or image/png
  document.getElementById('my-image').src = `data:${mimeType};base64,${data.image}`;
}
```
