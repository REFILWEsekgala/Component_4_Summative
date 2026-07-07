/**
 * Community Library DOM Summative Tests
 * Run using: npm test
 */

import { ok, strictEqual } from "assert";
import { readFileSync } from "fs";
import { resolve } from "path";
import { pathToFileURL } from "url";

suite("Community Library DOM Assessment", function () {
    let addButton;
    let customerInput;
    let customerList;
    let moduleExports;

    setup(async function () {
        document.body.innerHTML = readFileSync(
            resolve(__dirname, "../index.html"),
            "utf8"
        );

        const scriptUrl = pathToFileURL(resolve(__dirname, "../script.js")).href;
        moduleExports = await import(`${scriptUrl}?cache=${Date.now()}`);

        addButton = document.getElementById("add-button");
        customerInput = document.getElementById("customer-name");
        customerList = document.getElementById("customer-list");
    });

    test("Customers array exists", function () {
        ok(Array.isArray(moduleExports.customers));
    });

    test("Clicking the Add Visitor button adds a customer to the array", function () {
        customerInput.value = "John";

        addButton.click();

        strictEqual(moduleExports.customers.length, 1);
        strictEqual(moduleExports.customers[0], "John");
    });

    test("Input field is cleared after adding a customer", function () {
        customerInput.value = "Sarah";

        moduleExports.addCustomer();

        strictEqual(customerInput.value, "");
    });

    test("displayCustomers() creates one list item for every customer", function () {
        moduleExports.customers.length = 0;
        moduleExports.customers.push("John");
        moduleExports.customers.push("Sarah");
        moduleExports.customers.push("Peter");

        moduleExports.displayCustomers();

        const items = customerList.querySelectorAll("li");
        strictEqual(items.length, 3);
    });

    test("Visitor names are displayed correctly", function () {
        const items = customerList.querySelectorAll("li");

        ok(items[0].textContent.includes("John"));
        ok(items[1].textContent.includes("Sarah"));
        ok(items[2].textContent.includes("Peter"));
    });

    test("displayCustomers() does not duplicate customers", function () {
        moduleExports.displayCustomers();
        moduleExports.displayCustomers();

        const items = customerList.querySelectorAll("li");
        strictEqual(items.length, moduleExports.customers.length);
    });
});
