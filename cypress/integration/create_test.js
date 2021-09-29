import indexPage from "../page_objects/indexPage"
import compDetailsPage from "../page_objects/compDetailsPage"

const index = new indexPage()
const details = new compDetailsPage()

describe('Create Flow Test', () => {
    const newcompname = 'Create/Read Test ' + (Math.random().toFixed(3) * 1000)
    const existcompname = 'Amiga 1200' //Variable for checking an existing record due to env limitations
    it('Opens the Computer Database App, creates a record, and verifies result', () => {
      //CREATE TEST
      index.openApp() //Visits base URL set in cypress.json
      index.addButton().click() //Clicks New computer button
      details.compNameField().type(newcompname) // Types name into name field
      details.introDateField().type('2021-09-26') // Types 'introduced' date
      details.discDateField().type('2021-09-27') //Types 'discontinued' date
      details.companyList().select('RCA') //Selects RCA from company list
      details.compCreateButton().click()
      index.checkAddConfirmation(newcompname)//Wait for page to contain Done! Computer Testing Machine has been created

      //NOTE: Due to the testing environment not saving new records, the below code is
      //a proof of concept of how I would verify the record is present.

      index.searchFilterField().type(existcompname)//Type name into filter field
      index.searchSubmitButton().click()//Clicks search filter button
      cy.contains('01 Oct 1992') //Verifies introduced date is set as expected in index
      cy.contains('01 Jan 1996') //Verifies discontinued date is set as expected in index
      cy.contains('Commodore International') //Verifies selected company displays in index
      index.locateLink(existcompname) //Locates link for record to verify record exists.
    })
    
    after('Deletes record created in test', () => {
      //Proof of concept only.
      index.cleanupDelete(existcompname)
    })
  })