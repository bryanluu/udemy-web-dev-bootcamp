/*
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";
import { log } from "console";

inquirer
  .prompt([{
    name: "url",
    message: "What's the URL to convert?"
  }])
  .then((answers) => {
    fs.writeFile("url.txt", answers.url, (err) => {
      if (err) throw err;

      console.log("Raw URL written to url.txt");
    });

    let qr_png = qr.image(answers.url, { type: "png" });
    qr_png.pipe(fs.createWriteStream("qr.png"));

    console.log("QR Code saved to qr.png");
  })
  .catch((error) => {
    throw error;
  });
