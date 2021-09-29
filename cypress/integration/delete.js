import indexPage from "../page_objects/indexPage"
import Utilities from "../page_objects/utils"

const index = new indexPage()
const utils = new Utilities()

describe('Delete Test', () => {
  const compname = 'Delete Test ' + (Math.random().toFixed(3) * 1000)
  const existcompname = 'Amiga 1200' //Existing record to verify functionality

  before ('Create record to be deleted', () => {
    //Note: Since no new inputs are stored, this is for proof of concept only.
      utils.createRecord(compname)
  })
    it('Searches for the record', () => {
      index.openApp() //Visits base URL set in cypress.json
      index.searchFilterField().type(existcompname) //Type name into filter field
      index.searchSubmitButton().click() //Clicks search filter button
      index.locateLink(existcompname, {timeout: 10000}).click() //Verify page contains computer page link and clicks the link
      cy.location('pathname').then(recurl => {
        const compid = recurl.split('/')[2]
        cy.get('input').contains('Delete this computer', {timeout:10000}).click('bottom') //Clicks the delete button
        cy.get('div').contains('Done ! Computer ' + existcompname + ' has been deleted', {timeout:10000})//Wait for page to contain Done! Computer Testing Machine has been updated
        cy.request('GET', compid).then((response) => {
            expect(response.status).to.eq(200 /* 404 */) // Limitation due to not being able to delete records - this would normally check for a '404' status code.
        })
      })
    })

    after('Deletes record created in before hook', () => {
      //Proof of concept only since data cannot be modified.
      index.cleanupDelete(existcompname)
    })
  })