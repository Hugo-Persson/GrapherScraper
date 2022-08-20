import ScrapeHelper from "./ScrapeHelper";
import * as cheerio from "cheerio";

export default class MatSparScraper extends ScrapeHelper{


    private scrapes = {
        "milk": "https://www.matspar.se/produkt/mellanmjolk-1-5-1l-skanemejerier",
        "frozenChicken": "https://www.matspar.se/produkt/kycklingfile-morad-1000-g-kronfagel"
    }


    public async getAllPrices(): Promise<Map<string, Array<StorePrice>>>{
        const prices: Map<string, Array<StorePrice>> = new Map
        for(let [item, url] of Object.entries(this.scrapes)){
            prices.set(item, await this.getPrices(url));
        }
        return prices;
    }
    private async getPrices(url: string): Promise<Array<StorePrice>>{
        const html = await this.getWebsiteHTML(url);
        const $ = cheerio.load(html);
        console.log("here", );
        const prices = $("._2qyvs").map((e, el): StorePrice | undefined=>{
            try{
                const store = this.storeLogoToName($(el).find("._3xr6h").attr("style") as string);
                const price = $(el).find("._3n8y8").first().text().split("krJfr", 1)[0].replace(",", ".");
                return {store: store, price: Number(price), discount: false};
            }
            catch(err){
                console.log($(el).text());
                return undefined;
            }
        }).filter(e=>e !== undefined).toArray();
        return prices;

    }


    private storeLogoToName(style: string): Store{
        switch(style){
            case 'background-image: url("https://d3bgqh8ib51vrg.cloudfront.net/images/logos/willys.6dbfdb95.svg");':
                return Store.willys
            case 'background-image: url("https://d3bgqh8ib51vrg.cloudfront.net/images/logos/ica.d4dcd2c4.svg");':
                return Store.ica;
            case 'background-image: url("https://d3bgqh8ib51vrg.cloudfront.net/images/logos/hemkop.c2eec73d.svg");':
                return Store.hemköp
            case 'background-image: url("https://d3bgqh8ib51vrg.cloudfront.net/images/logos/mathem.cda0fe35.svg");':
                return Store.mathem
            case 'background-image: url("https://d3bgqh8ib51vrg.cloudfront.net/images/logos/coop.a58cb029.svg");':
                return Store.coop
            
        }
        throw "Unknown store";
    }
}


enum Store{
    willys,
    ica,
    hemköp,
    coop,
    mathem
}

interface StorePrice{
    store: Store,
    price: number,
    discount: boolean,
}