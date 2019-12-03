/// <reference types="cypress" />
const myItems = require('../fixtures/items')
const profile = require('../fixtures/profile')


export function logIn() {
  cy.visit("/")
  //cy.request("https://press.uat.nine.com.au/")

  cy.get('#username').type(profile.username)
  cy.get('#password').type(profile.password)
  cy.contains('Sign').click()
}

export function selectSite(site) {
  //cy.get('div[class*=Layout__SiteSelectorToggle]').click()
  cy.get('div[class*="SiteSelector__Button"]').contains(site).click({ force: true })

}

export function navigateArticle(site) {
  cy.get('input[type="checkbox"]').get('[name="mine"]')
    .uncheck().should('not.be.checked')
  cy.get('input[type="checkbox"]').get('[name="all-sites"]')
    .uncheck().should('not.be.checked')
  cy.get('input[placeholder="Search"]').get('[name="search"]').type(myItems.articles.News).type('{enter}')
  //check URL consist of /search
  cy.location('pathname').should('eq', '/search')
  cy.url().should('include', myItems.articles.NewsSearch)
  cy.get('.Spinner__Inner').should('not.exist')
  cy.get('a > span > h3[class*="ResultsItem__Headline"]')
    .contains(myItems.articles.News).click()
  //cy.location('href').should('eq', 'https://press.uat.nine.com.au/item/22f6970d-4a17-4fe1-bacc-c4b908bfe651')
}

export function editArticle() {
  // cy.get('[role=textbox]').eq(0).click().clear().type('DongDong0')  // Select the first text box
  // cy.get('[role=textbox]').eq(1).click().clear().type('DongDong1')   //select the second text box
  cy.get('div[class*="ItemFields__LeftColumn"]')
    .find('div[class*="RichText__StyledEditor"]')
    .click().clear().type('DongDong0')
  cy.get('div[class*="ItemFields__RightColumn"]')
    .find('div[class*="RichText__StyledEditor"]')
    .click().clear().type('DongDong1')
}

export function publishArticle() {

  cy.contains('Saving...').should('visible')
  cy.contains('Saved').should('visible')

  cy.contains('Published + Changes').should('visible')
  cy.contains('Published + Changes')
    .should('have.css', 'background-color', 'rgb(255, 149, 0)') // Verify stattus Publish + Changes turns to yellow
  cy.get('button').contains('Publish').click()
  cy.contains('Published').should('visible')
  cy.contains('Published')
    .should('have.css', 'background-color', 'rgb(0, 194, 0)')  // Verify stattus Publish turns to green

}


