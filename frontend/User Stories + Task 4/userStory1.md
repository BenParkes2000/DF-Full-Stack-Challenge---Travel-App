### <h1>User Story 1</h1>

As a developer,
I want to develop a home page with a location search box,
So that users can search for a location's weather.

---

### <h1>Components</h1>

- Navbar

- Search Location Form

  - Search Location Form Heading
  - Search Location Form Description
  - Search Location Form Button

- Footer

---

### <h1>Acceptance Criteria</h1>

<h3>Navbar</h3>

- Must contain the company logo in the top left

- Should contain the following options

  - Home
  - My Saved Locations (Drop Down Menu)

    - The saved locations should produce a drop down menu with the saved locations from local storage.
    - If the main heading is clicked on, should take them to a favourite location page.

  - Search form (Bar and search button)

    = Should use an inline form

    - Should have a placeholder value of "Location search..."
    - Should have a magnifying glass picture as a button

- The navbar should collapse down to a burger menu for mobile / tablet portrait screens but expand for desktop / tablet landscape screens

- The navbar should conditionally render the saved locations depending on if there are any saved locations stored

- The navbar should conditionally render the search form depending on if it is on the home page.

<h3>Search Location Form</h3>

- Should contain a heading

  - Heading should read "Tell me about..."
  - Text should be centralised

- Form should be in a div wrapped with "form-group" class

- Should contain a description box

  - Should have a placeholder of "Location Name..."

- Should have a submit button
