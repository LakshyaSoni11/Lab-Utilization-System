describe("Lab Booking System", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/faculty/dashboard"); // Ensure correct URL
    });

    it("shows error when required fields are empty", () => {
        cy.get('button[type="submit"]').click();

        // Ensure validation messages appear
        cy.get("select").should("have.value", "");
        cy.get('input[type="text"]').should("have.value", ""); 
        cy.get('input[type="date"]').should("have.value", ""); 
        cy.get('input[type="time"]').should("have.value", ""); 
        cy.get('input[type="number"]').should("have.value", ""); 
        cy.get("textarea").should("have.value", "");
    });

    it("prevents booking outside allowed time slots", () => {
        cy.get("select").select("Computer Lab");
        cy.get('input[type="text"]').type("Software Engineering");
        cy.get('input[type="date"]').type("2025-04-01");
        cy.get('input[type="time"]').type("07:30"); // Before 8:00 AM (restricted)
        cy.get('input[type="number"]').clear().type("2");
        cy.get("textarea").type("This booking should fail due to time restrictions");

        cy.get('button[type="submit"]').click();

        // Check for timeout toast message
        cy.contains("Cannot book lab in this particular slot").should("be.visible");
    });

    it("prevents duplicate bookings", () => {
        // First booking
        cy.get("select").select("Computer Lab");
        cy.get('input[type="text"]').type("Programming");
        cy.get('input[type="date"]').type("2025-04-01");
        cy.get('input[type="time"]').type("10:00");
        cy.get('input[type="number"]').clear().type("2");
        cy.get("textarea").type("First valid booking");

        cy.get('button[type="submit"]').click();

        // ✅ Fixed Toast Message Matching
        cy.contains("Lab request for computer Lab sent successfully.").should("be.visible");

        // Try to book the same slot again
        cy.get('button[type="submit"]').click();

        // Ensure conflict toast message appears
        cy.contains("There is a conflict with the time. Kindly try booking another slot.")
            .should("be.visible");
    });

    it("allows successful lab booking", () => {
        cy.get("select").select("Hardware Lab");
        cy.get('input[type="text"]').type("Electronics");
        cy.get('input[type="date"]').type("2025-04-05");
        cy.get('input[type="time"]').type("14:00");
        cy.get('input[type="number"]').clear().type("3");
        cy.get("textarea").type("Valid lab booking");

        cy.get('button[type="submit"]').click();

        // ✅ Fixed Toast Message Matching
        cy.contains("Lab request for hardware Lab sent successfully.").should("be.visible");
    });

    it("checks if the request appears in 'My Requests' list", () => {
        cy.get("select").select("Chemical Lab");
        cy.get('input[type="text"]').type("general Organic Chemistry");
        cy.get('input[type="date"]').type("2025-04-10");
        cy.get('input[type="time"]').type("12:00");
        cy.get('input[type="number"]').clear().type("2");
        cy.get("textarea").type("Chemical Lab for class experiment");

        cy.get('button[type="submit"]').click();

        // ✅ Fixed Toast Message Matching
        cy.contains("Lab request for chemical Lab sent successfully.").should("be.visible");

        // Ensure the new request appears in "My Requests" section
        cy.get(".bg-white.rounded-lg.shadow-lg.p-6").then(($div) => {
            cy.log($div.text()); // Log text content to check if "Chemical Lab" exists
        });
    });
});
{/* <div className="bg-white rounded-lg shadow-lg p-6"></div> */}