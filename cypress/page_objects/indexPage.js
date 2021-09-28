class indexPage {

    addButton() {
        return cy.get('#add');
    }

    searchFilterField() {
        return cy.get('#searchbox');
    }

    searchSubmitButton() {
        return cy.get('#searchsubmit');
    }

    addConfirmation(comp_name) {
        cy.get('div').contains('Done ! Computer ' + comp_name + ' has been created', {timeout:10000})
    }

    deleteConfirmation() {
        return cy.get('div').contains('Done! Computer has been deleted', {timeout:10000});
    }
}

export default indexPage;