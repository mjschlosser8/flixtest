class indexPage {

    addButton() {
        return cy.get('#add');
    }

    searchFilterField() {
        return cy.get('#searchbox');
    }

    searchSubmitButton() {
        return cy.get('#searchsubmit')
    }
}

export default indexPage;