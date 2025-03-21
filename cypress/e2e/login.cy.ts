describe("Login Navigation Test", () => {
  beforeEach(() => {
      cy.visit("http://localhost:5173/login"); // Adjust if needed
  });

  const testLogin = (userType, expectedPath) => {
      it(`redirects to the correct dashboard when logging in as ${userType}`, () => {
          // Select the user type
          cy.get("button").contains(userType.charAt(0).toUpperCase() + userType.slice(1)).click();

          // Fill in login credentials
          cy.get('input[name="email"]').type(`${userType}@example.com`);
          cy.get('input[name="password"]').type("password123");

          // Click login
          cy.get('button[type="submit"]').click();

          // Verify redirection
          cy.url().should("include", expectedPath);
      });
  };

  testLogin("admin", "/admin/dashboard");
  testLogin("faculty", "/faculty/dashboard");
  testLogin("student", "/students");
});
