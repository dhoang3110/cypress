/// <reference types="cypress" />
const myItems = require('../fixtures/items')
const profile = require('../profile')


export function  logIn() {
    cy.visit("/")
    //cy.request("https://uat-cms.api.nine.com.au/auth/account/login?returnUrl=%2Fauth%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dwebclient%26nonce%3D31148d136a434837bb38be6dc5d2b2d5%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8080%252Fcallback%26response_type%3Did_token%2520token%26scope%3Dopenid%2520profile%2520searchuat%2520templateuat%2520treenavuat%2520itemcruduat%2520activityuat%2520imageresizeruat%2520filesignuat%2520filerecorduat%2520proxyuat%2520pubuat%2520stickynoteuat%26state%3D73aded5cddca4356b8d9ca2dbd91a330")
    
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
    cy.location('pathname').should('eq','/search')
    cy.url().should('include',myItems.articles.NewsSearch)
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
      .should('have.css', 'background-color', 'rgb(255, 149, 0)' ) // Verify stattus Publish + Changes turns to yellow
    cy.get('button').contains('Publish').click()
    cy.contains('Published').should('visible')
    cy.contains('Published')
      .should('have.css', 'background-color', 'rgb(0, 194, 0)' )  // Verify stattus Publish turns to green

  }


