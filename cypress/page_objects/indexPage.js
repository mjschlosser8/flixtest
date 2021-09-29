class indexPage {


    openApp() {
        return cy.visit('/');
    }

    addButton() {
        return cy.get('#add');
    }

    searchFilterField() {
        return cy.get('#searchbox');
    }

    searchSubmitButton() {
        return cy.get('#searchsubmit');
    }

    checkAddConfirmation(comp_name) {
        cy.get('div').contains('Done ! Computer ' + comp_name + ' has been created', {timeout:10000})
    }

    checkDeleteConfirmation() {
        return cy.get('div').contains('Done! Computer has been deleted', {timeout:10000});
    }

    locateLink(linktext) {
        return cy.get('a').contains(linktext);
    }

    cleanupDelete(linktext) {
        this.openApp()
        this.searchFilterField().type(linktext)//Type name into filter field
        this.searchSubmitButton().click()//Clicks search filter button
        this.locateLink(linktext).invoke('attr', 'href').then(recurl => {
          const compid = recurl.split('/')[2]
          cy.request('POST', '/' + compid + '/delete').then((response) => {
            expect(response.status).to.eq(200)
          })
            })
    }
}

export default indexPage;