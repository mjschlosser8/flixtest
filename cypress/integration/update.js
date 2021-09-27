describe('Update Test', () => {
    const compname = 'Update Test ' + (Math.random().toFixed(3) * 1000)
    before ('Create the computer record that will be updated', () => {
      cy.request({
      method: 'POST',
      url: '/computers',
      form: true,
      body: {
      name: compname,
      introduced: '2021-09-26',
      discontinued: '2021-09-27',
      company: 3 //Should be the value 'RCA'
    }
      })
    })
    it('Opens the Computer Database App, creates a record, and verifies result', () => {
        cy.visit('/') //Visits base URL set in cypress.json
        cy.get('#searchbox').type(compname) //Type name into filter field
        cy.get('#searchsubmit').click() //Clicks search filter button
        cy.get('a').contains(compname, {timeout: 10000}).click() //Verify page contains computer page link and clicks the link
    })
})