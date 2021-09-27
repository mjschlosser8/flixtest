describe('Delete Test', () => {
  before ('Record to delete is created', () => {
    cy.request({
    method: 'POST',
    url: '/computers',
    form: true,
    body: {
    name:'Test1',
    introduced: '2021-09-26',
    discontinued: '2021-09-27',
    company: 3
  }
    })
  })
    it('Searches for the record', () => {
      cy.visit('/') //Visits base URL set in cypress.json
      cy.get('#searchbox').type('Test1') //Type name into filter field
      cy.get('#searchsubmit').click() //Clicks search filter button
      cy.get('a').contains('Testing Machine', {timeout: 10000}).click() //Verify page contains computer page link and clicks the link
      cy.get('input').contains('Delete this computer').click() //Clicks the delete button
      cy.get('div').contains('Done! Computer has been deleted', {timeout:10000})
      cy.request('GET', '/').then((response) => {
        expect(response.body).to.not.have.property('name', 'Test1')
      }) //Requests results and verifies computer is no longer returned
    })
  })
//name=Test1&introduced=2021-09-26&discontinued=2021-09-26&company=3