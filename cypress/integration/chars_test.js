import indexPage from "../page_objects/indexPage"
import compDetailsPage from "../page_objects/compDetailsPage"

const index = new indexPage()
const details = new compDetailsPage()

describe('Record with special characters test', () => {
    const newcompname = 'Chars š®Œ¶®‰Ω∑ ' + (Math.random().toFixed(3) * 1000)
    const existcompname = 'Amiga 1200' //Variable for checking an existing record due to env limitations

    it('Creates a record with special characters in the title ', () => {
        index.openApp() //Visits base URL set in cypress.json
        index.addButton().click() //Clicks New computer button // Types name into name field
        details.introDateField().type('2021-09-26') // Types 'introduced' date
        details.discDateField().type('2021-09-27') //Types 'discontinued' date
        details.companyList().select('RCA') //Selects RCA from company list
        details.compNameField().type(newcompname) // Types name into name field
        details.compCreateButton().click() //Clicks the 'Create this computer' button
        index.checkAddConfirmation(newcompname) //Checks that the success message is displayed.

        // Note: Since I cannot create new records, I can't verify that the record itself displays the characters.
      })
      
      after('Deletes record created in test', () => {
        //Proof of concept only. This would normally find and delete the record created in the before hook.
        index.cleanupDelete(existcompname)
      })

})