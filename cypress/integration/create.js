describe('Create Flow Test', () => {
    const newcompname = 'Create/Read Test ' + (Math.random().toFixed(3) * 1000)
    const existcompname = 'Amiga 1200' //Variable for checking an existing record
    it('Opens the Computer Database App, creates a record, and verifies result', () => {
      //CREATE TEST
      cy.visit('/') //Visits base URL set in cypress.json
      cy.get('#add').click() //Clicks New computer button
      cy.get('#name').type(newcompname) // Types name into name field
      cy.get('#introduced').type('2021-09-26') // Types 'introduced' date
      cy.get('#discontinued').type('2021-09-27') //Types 'discontinued' date
      cy.get('#company').select('RCA')
      cy.get('[type=submit]').click()
      cy.get('div').contains('Done ! Computer ' + newcompname + ' has been created', {timeout:10000})//Wait for page to contain Done! Computer Testing Machine has been created

      //NOTE: Due to the testing environment not saving new records, the below code is
      //a proof of concept of how I would verify the record is present.

      cy.get('#searchbox').type(existcompname)//Type name into filter field
      cy.get('#searchsubmit').click()//Clicks search filter button
      cy.contains('01 Oct 1992') //Verifies introduced date is set as expected in index
      cy.contains('01 Jan 1996') //Verifies discontinued date is set as expected in index
      cy.contains('Commodore International') //Verifies selected company displays in index
    })
  })