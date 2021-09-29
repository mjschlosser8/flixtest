import indexPage from "../page_objects/indexPage"
import compDetailsPage from "../page_objects/compDetailsPage"
import Utilities from "../page_objects/utils"

const index = new indexPage()
const details = new compDetailsPage()
const utils = new Utilities()

describe('Update Test', () => {
    const compname = 'Update Test ' + (Math.random().toFixed(3) * 1000) //Creates computer name with a unique number to avoid duplicate names
    const existcompname = 'Amiga 1200' //Existing record to verify functionality
    const newdate = '2021-09-28' //Value to update in comp record

    before ('Create the computer record that will be updated', () => {
    //Note: Since no new inputs are stored, this is for proof of concept only.
      utils.createRecord(compname)
    })

    it('Opens app and updates a record', () => {
        index.openApp() //Visits base URL set in cypress.json
        index.searchFilterField().type(existcompname) //Type name into filter field
        index.searchSubmitButton().click() //Clicks search filter button
        index.locateLink(existcompname, {timeout: 10000}).click() //Finds and clicks the link for the new record
        details.discDateField().clear().type(newdate) //Types new 'discontinued' date

        // Note: This saves the changes, then checks the response body of the record
        // to make sure the changes are saved. Since I can't modify records in the
        // gatling.io app, this checks the value of an existing record.
        cy.location('pathname').then(recurl => {
          const compid = recurl.split('/')[2]
          details.compSaveButton().click()
          index.checkUpdatedConfirmation(existcompname) //Wait for page to contain Done! Computer Testing Machine has been updated
          cy.request('GET', compid).then((response) => {
              expect(response.status).to.eq(200)
              expect(response.body).to.include('name="discontinued" value="1996-01-01"')
              })
        })
    })

    after('Deletes record created in before hook', () => {
      //Proof of concept only since data cannot be modified.
        index.cleanupDelete(existcompname)
      })

})