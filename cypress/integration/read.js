import indexPage from "../page_objects/indexPage"
import compDetailsPage from "../page_objects/compDetailsPage"
import Utilities from "../page_objects/utils"
const index = new indexPage()
const details = new compDetailsPage()
const utils = new Utilities()

describe('Read Test', () => {
    const compname = 'Read Test ' + (Math.random().toFixed(3) * 1000) //Creates computer name with a unique number to avoid duplicate names
    const existcompname = 'Amiga 1200' //Name of existing record to verify functionality

    before ('Create the computer record that will be read', () => {
      //Note: Since no new inputs are stored, this is for proof of concept only.
        utils.createRecord(compname)
    })
    it('Opens the Computer Database App, searches for a record, and verifies record data', () => {
        index.openApp() //Visits base URL set in cypress.json
        index.searchFilterField().type(existcompname)//Type name into filter field
        index.searchSubmitButton().click()//Clicks search filter button
        cy.contains('01 Oct 1992') //Verifies introduced date is set as expected in index
        cy.contains('01 Jan 1996') //Verifies discontinued date is set as expected in index
        cy.contains('Commodore International') //Verifies selected company displays in index
        index.locateLink(existcompname).click()//Verify page contains computer page link and clicks it
        details.introDateField().should('have.value','1992-10-01') //Verifies introduced date is set as expected on details page
        details.discDateField().should('have.value','1996-01-01') //Verifies discontinued date is set as expected on details page
        details.companyList().should('have.value','6')

    })
    after('Deletes record created in before hook', () => {
        //Deletes the record. Proof of concept only.
          index.cleanupDelete(existcompname)
     })
})