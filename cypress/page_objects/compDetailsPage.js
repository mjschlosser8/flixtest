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

    compCreateButton() {
        return cy.get('input').contains('Create this computer')
    }

    compSaveButton() {
        return cy.get('input').contains('Save this computer')
    }

    deleteCompButton() {
       return cy.get('input').contains('Delete this computer');
    }

    missingDataError() {
        return cy.get('span').contains('Failed to refine type : Predicate isEmpty() did not fail.')
    }
}

export default compDetailsPage;