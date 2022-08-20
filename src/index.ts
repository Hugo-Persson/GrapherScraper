import GasPriceScraper from "./scrapers/GasPriceScraper"
import MatSparScraper from "./scrapers/MatSparScraper";

console.log("Hello world")


init();

async function init(){
    const gasPriceScrape = new GasPriceScraper();

    //gasPriceScrape.scrapePrices();
    
    const foodScraper = new MatSparScraper();
    const prices = await foodScraper.getAllPrices();
    console.log(prices)
    process.exit(0);
}