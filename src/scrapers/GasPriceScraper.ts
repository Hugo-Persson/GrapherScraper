import ScrapeHelper from "./ScrapeHelper";
import * as cheerio from "cheerio";

export default class GasPriceScraper extends ScrapeHelper{

    private url = "https://bensinpriser.nu/";
    public async scrapePrices(){
        const $ = cheerio.load(await this.getWebsiteHTML(this.url));
        const prices = $("#price_table tbody tr td:nth-child(2)").each(function(e, el){
            if(!$(this).text()) return;
            const [price, date] = $(this).text().split("kr");
            if(!price || !date){
                console.log("ERR", $(this).text())
            }
            else console.log(price, date);
        })
    }
}

export interface IGasPrice{

}