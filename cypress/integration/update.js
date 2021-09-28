describe('Update Test', () => {
    const compname = 'Update Test ' + (Math.random().toFixed(3) * 1000) //Creates computer name with a unique number to avoid duplicate names
    const existcompname = 'Amiga 1200' //Existing record to verify functionality
    const newdate = '2021-09-28'

    before ('Create the computer record that will be updated', () => {
      cy.request({
      method: 'POST',
      url: '/',
      form: true,
      body: {
      name: compname,
      introduced: '2021-09-26',
      discontinued: '2021-09-27',
      company: 3 //Should be the value 'RCA'
    }
      })
    })

    it('Opens the Computer Database App,  and verifies result', () => {
        cy.visit('/') //Visits base URL set in cypress.json
        cy.get('#searchbox').type(existcompname) //Type name into filter field
        cy.get('#searchsubmit').click() //Clicks search filter button
        cy.get('a').contains(existcompname, {timeout: 10000}).click() //Finds and clicks the link for the new record
        cy.get('#discontinued').clear().type(newdate) //Types new 'discontinued' date
        cy.location('pathname').then(recurl => {
            const compid = recurl.split('/')[2]
            cy.get('[type=submit]').contains('Save this computer').click()
            cy.get('div').contains('Done ! Computer ' + existcompname + ' has been updated', {timeout:10000})//Wait for page to contain Done! Computer Testing Machine has been updated
            cy.request({
            method: 'GET',
            url: compid
                })
        })
    })
})