import puppeteer from 'puppeteer';

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
    path: './_site/testpdf.pdf',
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