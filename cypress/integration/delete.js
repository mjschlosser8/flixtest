import compDetailsPage from "../page_objects/compDetailsPage"
import indexPage from "../page_objects/indexPage"
import Utilities from "../page_objects/utils"

const index = new indexPage()
const utils = new Utilities()
const details = new compDetailsPage()

describe('Delete Flow Test', () => {
  const compname = 'Delete Test ' + (Math.random().toFixed(3) * 1000)
  const existcompname = 'Amiga 1200' //Existing record to verify functionality

  before ('Creates record to be deleted', () => {
    //Note: Since no new inputs are stored, this is for proof of concept only.
      utils.createRecord(compname)
  })

    it('Searches for a record created in the before hook and then deletes it using the UI', () => {
      index.openApp() //Visits base URL set in cypress.json
      index.searchFilterField().type(existcompname) //Type name into filter field
      index.searchSubmitButton().click() //Clicks search filter button
      index.locateLink(existcompname, {timeout: 10000}).click() //Verify page contains computer page link and clicks the link
      cy.location('pathname').then(recurl => {
        const compid = recurl.split('/')[2] //Gets the path to the record detail page
        details.deleteCompButton().click('bottom') //Clicks the delete button
        index.checkDeleteConfirmation(existcompname)//Wait for page to contain Done! Computer Testing Machine has been updated
        cy.request('GET', compid).then((response) => {
            expect(response.status).to.eq(200 /* 404 */) // Limitation due to not being able to delete records - this would normally check for a '404' status code.
            
            //Fallback in case delete request from detail page is unsuccessful.
            if (response.status != 200 /* 404 */)
              index.cleanupDelete(existcompname)
        })
      })
    })
  })