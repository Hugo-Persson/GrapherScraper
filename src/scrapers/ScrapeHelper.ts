import * as puppeteer from "puppeteer";

export default abstract class ScrapeHelper{
    private static puppeeterBrowser: puppeteer.Browser;

    protected async getWebsiteHTML(url: string): Promise<string>{
        
        if(!ScrapeHelper.puppeeterBrowser) ScrapeHelper.puppeeterBrowser = await puppeteer.launch();
        const page = await ScrapeHelper.puppeeterBrowser.newPage();
        await page.goto(url, {waitUntil: 'domcontentloaded'});

        const data = await page.evaluate(()=>document.querySelector("*")?.outerHTML);
        return data as string;
        
    }
}