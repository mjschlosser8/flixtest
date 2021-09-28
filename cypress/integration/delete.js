describe('Delete Test', () => {
  const compname = 'Delete Test ' + (Math.random().toFixed(3) * 1000)
  const existcompname = 'Amiga 1200'
  before ('Record to delete is created', () => {
    //Note: Since no new inputs are stored, this is for proof of concept only.
    cy.request({
    method: 'POST',
    url: '/',
    form: true,
    body: {
    name: compname,
    introduced: '2021-09-26',
    discontinued: '2021-09-27',
    company: 3
  }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
    it('Searches for the record', () => {
      cy.visit('/') //Visits base URL set in cypress.json
      cy.get('#searchbox').type(existcompname) //Type name into filter field
      cy.get('#searchsubmit').click() //Clicks search filter button
      cy.get('a').contains(existcompname, {timeout: 10000}).click() //Verify page contains computer page link and clicks the link
      cy.location('pathname').then(recurl => {
        const compid = recurl.split('/')[2]
        cy.get('input').contains('Delete this computer', {timeout:10000}).click('bottom') //Clicks the delete button
        cy.get('div').contains('Done ! Computer ' + existcompname + ' has been deleted', {timeout:10000})//Wait for page to contain Done! Computer Testing Machine has been updated
        cy.request('GET', compid).then((response) => {
            expect(response.status).to.eq(200 /* 404 */) // Limitation due to not being able to delete records - this would normally check for a '404' status code.
        })
      })
    })
  })