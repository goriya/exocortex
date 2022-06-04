describe("Smoke test", () => {
  let baseUrl = "http://localhost:3000"
  it("loads", () => {
    cy.visit(baseUrl)
  })

  it("shows the title", () => {
    cy.visit(baseUrl)
    cy.contains("Exocortex")
  })
})
