describe('This spec is for ATM search fun', () => {
  

  beforeEach(() => {
    cy.visit('https://www.hsbc.co.in/')
 })

  it('validate the atm search', () => {
  

    cy.xpath('(//a[contains(text(),"Find your nearest HSBC branch or ATM")])[2]').click()
    cy.url().should('include',"/ways-to-bank/branches/")
    cy.xpath("//h1").contains("Branches & ATMs")
    cy.xpath("//span[text()='Branch & ATM Locator']").click()
    cy.wait(4000)
    cy.xpath('//form//input[@id="searchInput"]').type("India")
    cy.wait(6000)
    cy.xpath("//ul//li[@id='PlacesAutocomplete__suggestion-ChIJkbeSa_BfYzARphNChaFPjNc']").each(($el, index, $list) => {
      // $el is a wrapped jQuery element
      if ($el.text() === 'India') {
        // wrap this element so we can
        // use cypress commands on it
        cy.wrap($el).click()
      } 
    })
    cy.wait(6000)
    cy.xpath("//ul//li//button//h2").each(($el, index, $list) => {
      // $el is a wrapped jQuery element
      cy.wrap($el).should('have.text','Rajbhavan Road Branch')
      cy.xpath("//button[contains(text(),'Show more results')]").click()
    })
    cy.wait(6000)
    cy.xpath("//ul/li//span[@class='_1OVu0dKjGeodXsBo3rrQ-i']").each(($el, index, $list) => {
        // wrap this element so we can
        // use cypress commands on it
        const tooltipValue = $el.text()
        if(tooltipValue == 2){
          cy.wrap($el).should('be.visible')
        }
    })
    cy.wait(6000)
    cy.xpath('//a[@href="https://instagram.com/hsbc_in/"]').should('be.visible')
    cy.xpath("//div[@class='header-logo lg-2']").click()
    cy.wait(6000)
    cy.url().should('include',"hsbc.co.in")
    cy.xpath('//nav[@aria-label="Bottom Footer"]//ul/li/a[@href="/privacy-statement/"]').click()
    cy.wait(4000)
    cy.xpath('//div[@id="content_intro_hero_no_image_1"]/h1').contains('Privacy Statement')

         
  })
})