describe('Read Test', () => {
    const compname = 'Read Test ' + (Math.random().toFixed(3) * 1000) //Creates computer name with a unique number to avoid duplicate names
    const existcompname = 'Amiga 1200' //Name of existing record to verify functionality

    before ('Create the computer record that will be read', () => {
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
    it('Opens the Computer Database App, searches for a record, and verifies record data', () => {
        cy.visit('/') //Visits base URL set in cypress.json
        cy.get('#searchbox').type(existcompname)//Type name into filter field
        cy.get('#searchsubmit').click()//Clicks search filter button
        cy.contains('01 Oct 1992') //Verifies introduced date is set as expected in index
        cy.contains('01 Jan 1996') //Verifies discontinued date is set as expected in index
        cy.contains('Commodore International') //Verifies selected company displays in index
        cy.get('a').contains(existcompname).click()//Verify page contains computer page link and clicks it
        cy.get('#introduced').should('have.value','1992-10-01') //Verifies introduced date is set as expected on details page
        cy.get('#discontinued').should('have.value','1996-01-01') //Verifies discontinued date is set as expected on details page
        cy.get('#company').should('have.value','6')

        //Deletes the record
        cy.location('pathname').then(recurl => {
            const compid = recurl.split('/')[2]
            cy.request({
            method: 'POST',
            url: compid + '/delete',
            form: true,
                })
        })
    })
})