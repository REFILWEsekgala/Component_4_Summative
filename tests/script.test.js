/**
 * Community Library DOM Summative Tests
 * Run using: npm test
 */

import { ok, strictEqual } from "assert";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { Buffer } from "buffer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

        const scriptSource = readFileSync(resolve(__dirname, "../script.js"), "utf8");

        if (scriptSource.includes('export const customerInput = ""') || scriptSource.includes('export const addBtn = ""')) {
            throw new Error(
                "Please complete script.js first. Set the DOM elements to the real HTML elements before testing."
            );
        }

        const adaptedSource = scriptSource.replace(
            'export const customerInput = "";\nexport const addBtn = "";\nexport const customerList = "";\nexport const counter = "";',
            'export const customerInput = document.getElementById("customer-name");\nexport const addBtn = document.getElementById("add-button");\nexport const customerList = document.getElementById("customer-list");\nexport const counter = document.getElementById("customer-counter");'
        );
        const moduleUrl = `data:text/javascript;base64,${Buffer.from(adaptedSource).toString("base64")}`;
        moduleExports = await import(moduleUrl);

        addButton = document.getElementById("add-button");
        customerInput = document.getElementById("customer-name");
        customerList = document.getElementById("customer-list");
    });

    test("Customers array exists", function () {
        ok(Array.isArray(moduleExports.customers), "customers should be an array in script.js");
    });

    test("Clicking the Add Visitor button adds a customer to the array", function () {
        ok(typeof moduleExports.addCustomer === "function", "addCustomer() should be implemented in script.js");

        customerInput.value = "John";

        addButton.click();

        strictEqual(moduleExports.customers.length, 1, "addCustomer() should add the entered name to the customers array");
        strictEqual(moduleExports.customers[0], "John", "addCustomer() should store the entered name in the array");
    });

    test("Input field is cleared after adding a customer", function () {
        customerInput.value = "Sarah";

        moduleExports.addCustomer();

        strictEqual(customerInput.value, "", "addCustomer() should clear the input after adding a customer");
    });

    test("displayCustomers() creates one list item for every customer", function () {
        ok(typeof moduleExports.displayCustomers === "function", "displayCustomers() should be implemented in script.js");

        moduleExports.customers.length = 0;
        moduleExports.customers.push("John");
        moduleExports.customers.push("Sarah");
        moduleExports.customers.push("Peter");

        moduleExports.displayCustomers();

        const items = customerList.querySelectorAll("li");
        strictEqual(items.length, 3, "displayCustomers() should create one list item for each customer");
    });

    test("Visitor names are displayed correctly", function () {
        const items = customerList.querySelectorAll("li");

        ok(items[0].textContent.includes("John"), "displayCustomers() should display the first customer's name");
        ok(items[1].textContent.includes("Sarah"), "displayCustomers() should display the second customer's name");
        ok(items[2].textContent.includes("Peter"), "displayCustomers() should display the third customer's name");
    });

    test("displayCustomers() does not duplicate customers", function () {
        moduleExports.displayCustomers();
        moduleExports.displayCustomers();

        const items = customerList.querySelectorAll("li");
        strictEqual(items.length, moduleExports.customers.length, "displayCustomers() should not create duplicate list items");
    });
});
