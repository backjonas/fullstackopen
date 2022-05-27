describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cypress Name',
      username: 'testusername',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to the application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testusername')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Cypress Name logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testusername')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Cypress Name logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testusername', password: 'salainen' })
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#blog-title-input').type('cypress title')
      cy.get('#blog-author-input').type('cypress author')
      cy.get('#blog-url-input').type('cypress url')
      cy.get('#blog-submit').click()

      cy.contains('cypress title')
      cy.contains('cypress author')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'blog title',
          author: 'blog author',
          url: 'blog url'
        })
      })

      it('a blog can be liked', function() {
        cy.contains('blog title').parent().as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('like').click()
        cy.get('@blog').should('contain', 'likes 1')
      })

      it('a blog can be deleted by its creator', function() {
        cy.contains('blog title').parent().as('blog')
        cy.contains('blog author').should('exist')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('remove').click()
        cy.contains('blog author').should('not.exist')
      })
    })

    it('blogs will be ordered by number of likes', function () {
      cy.createBlog({
        title: 'first title',
        author: 'first author',
        url: 'first url',
        likes: 1
      })
      cy.createBlog({
        title: 'second title',
        author: 'second author',
        url: 'second url',
        likes: 5
      })
      cy.createBlog({
        title: 'third title',
        author: 'third author',
        url: 'third url',
        likes: 0
      })

      cy.get('.blog').eq(0).should('contain', 'second title')
      cy.get('.blog').eq(1).should('contain', 'first title')
      cy.get('.blog').eq(2).should('contain', 'third title')
    })
  })
})
