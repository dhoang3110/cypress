/// <reference types="cypress" />
const myItems = require('../fixtures/items')
const expect = require('chai').expect
import * as myActions from "../support/actions"


describe('Test Top Stories Fast and Slow Publish', () => {

  before(() => {
    myActions.logIn()
    myActions.selectSite(myItems.sites.NH)
    //expand Homapge tree
    cy.contains(myItems.sites.NH).eq(0).click()

  })

  beforeEach(() => {


  })

  it('Test Top Stories Fast', () => {

    cy.get('span[class*="ListItem__ExpandToggle"]').eq(0).click()
    cy.contains('Top Stories Fast').click()

    cy.get('input[class*="SelectPanel__Filter"]')
      .get('input[placeholder="Search"]')
      .get('input[name="filter"]')
      .type('test')

    cy.contains('Add').eq(0).click()
    myActions.publishArticle()

    cy.get('button[data-testid=delete-item]').eq(0).invoke('show').click({ force: true })
    myActions.publishArticle()

  })

  it('Test Top Stories Slow', () => {

    cy.contains('Top Stories Slow').click()

    cy.get('input[class*="SelectPanel__Filter"]')
      .get('input[placeholder="Search"]')
      .get('input[name="filter"]')
      .type('test')

    cy.contains('Add').eq(0).click()
    myActions.publishArticle()

    cy.get('button[data-testid=delete-item]').eq(0).invoke('show').click({ force: true })
    myActions.publishArticle()

  })

})
