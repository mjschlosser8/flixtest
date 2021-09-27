describe('Create/Read Test', () => {
    const compname = 'Create/Read Test ' + (Math.random().toFixed(3) * 1000)
    it('Opens the Computer Database App, creates a record, and verifies result', () => {
      //CREATE TEST
      cy.visit('/') //Visits base URL set in cypress.json
      cy.get('#add').click() //Clicks New computer button
      cy.get('#name').type(compname) // Types name into name field
      cy.get('#introduced').type('2021-09-26') // Types 'introduced' date
      cy.get('#discontinued').type('2021-09-27')
      cy.get('#company').select('RCA')
      cy.get('[type=submit]').click()
      cy.get('div').contains('Done! Computer ${compname} has been created', {timeout:10000})//Wait for page to contain Done! Computer Testing Machine has been created
      cy.get('#searchbox').type(compname)//Type name into filter field
      cy.get('#searchsubmit').click()//Clicks search filter button

      //READ TEST
      cy.contains('26 Sep 2021') //Verifies introduced date is set as expected in index
      cy.contains('27 Sep 2021') //Verifies discontinued date is set as expected in index
      cy.contains('RCA') //Verifies selected company displays in index
      cy.get('a').contains(compname).click()//Verify page contains computer page link and clicks it
      cy.get('#introduced').should('have.value','2021-09-26') //Verifies introduced date is set as expected on details page
      cy.get('#discontinued').should('have.value','2021-09-27') //Verifies discontinued date is set as expected on details page
      cy.get('#company').should('have.value','3')
      cy.get('input').contains('Delete this computer').click()
      cy.get('div').contains('Done! Computer has been deleted', {timeout:10000})
    })
  })