describe("Lab Booking Request Approval & Rejection", () => {
    beforeEach(() => {
        // Ensure the correct route
        cy.visit("http://localhost:5173/admin/dashboard");

        // Ensure that the page is fully loaded before interacting
        cy.contains("Lab Requests").should("be.visible");
    });

    it("shows success toast when a lab request is approved", () => {
        // Click on the first pending request's "Approve" button
        cy.get("button").contains("Approve").first().click();

        // Wait for the toast message to appear (Sonner toasts use role="status")
        cy.contains("Lab request for Computer Lab Approved").should("be.visible");
    });

    it("shows error toast when a lab request is rejected", () => {
        // Click on the first pending request's "Reject" button
        cy.get("button").contains("Reject").first().click();

        // Wait for the rejection toast message (Sonner toasts use role="status")
        cy.contains("Request for Computer Lab rejected Kindly book lab on the other slot").should("be.visible");
    });
});
