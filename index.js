const fs = require("fs");

// Synchronous -> blocking code
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about avocado ${textIn}`;

fs.writeFileSync("./txt/out.txt", textOut);
console.log("file is written");

// Asynchronous -> non-blocking code
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});

//Callback hell
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return;
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your data is written");
      });
    });
  });
});
