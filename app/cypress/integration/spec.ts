describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('http://localhost:8100/transfer')
    cy.contains('Your Recent Transfers')
  })
})
