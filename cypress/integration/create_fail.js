import indexPage from "../page_objects/indexPage"
import compDetailsPage from "../page_objects/compDetailsPage"

const index = new indexPage()
const details = new compDetailsPage()

describe('Create Flow Sad Path/Recovery Test', () => {
    const newcompname = 'Create/Read Test ' + (Math.random().toFixed(3) * 1000)
    const existcompname = 'Amiga 1200' //Variable for checking an existing record due to env limitations

    it('Attempts to create a record without data in required fields, then corrects the error', () => {
        index.openApp() //Visits base URL set in cypress.json
        index.addButton().click() //Clicks New computer button // Types name into name field
        details.introDateField().type('2021-09-26') // Types 'introduced' date
        details.discDateField().type('2021-09-27') //Types 'discontinued' date
        details.companyList().select('RCA') //Selects RCA from company list
        details.compCreateButton().click()
        details.missingDataError().should('be.visible')
        details.compNameField().type(newcompname) // Types name into name field
        details.compCreateButton().click()
        index.checkAddConfirmation(newcompname)
      })
      
      after('Deletes record created in test', () => {
        //Proof of concept only. This would find and delete the record created in the test.
        index.cleanupDelete(existcompname)
      })

})