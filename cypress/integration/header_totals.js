import indexPage from "../page_objects/indexPage"

const index = new indexPage()

describe('Header results total test', () => {
    it('Verifies search results header displays correct singular/plural form of "computers"', () => {
        index.openApp() //Visits base URL set in cypress.json
        index.searchFilterField().type('Arra')//searches for Arra - returns one result
        index.searchSubmitButton().click()//Clicks search filter button
        index.headerCheck('One computer found')//Verifies header displays "one computer found"
        index.searchFilterField().clear().type('Acer Extensa')//Acer Extensa - two results
        index.searchSubmitButton().click()
        index.headerCheck('2 computers found') //Clicks search filter button
    })
})