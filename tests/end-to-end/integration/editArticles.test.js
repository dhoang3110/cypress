/// <reference types="cypress" />
const myItems = require('../fixtures/items')
import * as myActions from "../support/actions"


describe('Test all sites dashboard', () => {

  before(() => {
    myActions.logIn()
  })

  afterEach(() => {
    //showAllSites()
  })

  it('Test edit article on 9News', () => {
    myActions.selectSite(myItems.sites.News)
    myActions.navigateArticle(myItems.sites.News)
    myActions.editArticle()
    myActions.publishArticle()

    // cy.wait(3000)

  })

  it.skip('TFake test', () => {
    cy.server()
    cy.route('OPTIONS', '**/template/api/v1/**').as('getUsers')
    //myActions.navigateArticle(myItems.sites.News)
    cy.contains('Create New').click()
    cy.contains('Article').click()
    cy.wait('@getUsers')
    // cy.wait(3000)

  })

})
