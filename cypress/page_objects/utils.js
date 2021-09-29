class Utilities {

createRecord(record_name) {
    cy.request({
        method: 'POST',
        url: '/',
        form: true,
        body: {
        name: record_name,
        introduced: '2021-09-26',
        discontinued: '2021-09-27',
        company: 3 //Should be the value 'RCA'
      }
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
}

}

export default Utilities