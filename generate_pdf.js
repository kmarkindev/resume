import puppeteer from 'puppeteer';

// Test code
import fs from 'fs'
let directoryPath = process.cwd();

let print = function()
{
    try {
        const files = fs.readdirSync(directoryPath);
        console.log(`Files in ${directoryPath}:`);
        files.forEach(file => {
            console.log(file);
        });
    } catch (err) {
        console.error(`Error reading directory: ${err}`);
    }
};

print();
directoryPath = directoryPath + '/..';
print();
// Test code end

const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
});
const page = await browser.newPage();

await page.goto('https://kmarkindev.github.io/resume/gamedev', {
    waitUntil: 'load',
});

await page.bringToFront();

console.log(`Current working directory: ${process.cwd()}`);

await page.pdf({
    path: './_site/Kirill_Markin_Resume.pdf',
    displayHeaderFooter: false,
    printBackground: true,
    landscape: false,
    format: 'a4',
    waitForFonts: true,
    margin: {
        top: 25,
        bottom: 25,
        left: 25,
        right: 25
    }
});

await browser.close();