class compDetailsPage {

    compNameField() {
        return cy.get('#name');
    }

    introDateField() {
        return cy.get('#introduced');
    }

    discDateField() {
        return cy.get('#discontinued');
    }

    companyList() {
        return cy.get('#company');
    }

    newCompSubmitButton() {
        return cy.get('[type=submit]')
    }

    deleteCompButton() {
       return cy.get('input').contains('Delete this computer');
    }

}

export default compDetailsPage;