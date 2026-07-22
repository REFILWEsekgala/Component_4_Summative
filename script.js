//  Starter Array - Do Not Edit this, only manipulate by adding more visitors

// "export" makes the variables and functions modules. Do not remove it.
// Export does not change how variables and functions work. 

export let customers = [peter];

// =======================================
// QUESTION 1
// =======================================

//Fetch The DOM Elements
export const customerInput =document.getElementById ("customerinput");
export const addBtn =document.getElementById ("addBtn ")
export const customerList =document.getElementById ("customerlist");
export const counter =document.getElementById("counter");

// Complete this function

export function addCustomer()
{

    // Retrieve the customer's name
    let customername = customerInput.value;




    // Add customer to array
     customers.push(customername)



    // Clear the textbox
    customerInput.value="";



    // Call displayCustomers()
    displayCustomers();


}

// =======================================
// QUESTION 2
// Complete this function
// =======================================

export function displayCustomers()
{

    // Clear the list
    customerList.innerhtml ="";



    // Loop through the array
    for (let i=0; i< customerInput.length; i++)



        // Create a list item
        let id = document.createElement("ii");



        // Display customer
        li.textcontent=customer[i];




        // Add list item to UL
        customerList.appendChild(li);



    // Update customer counter
    customercounter.textcontent =customer.length;



}


// ================================
//  DO NOT EDIT LINE 78 AND LINE 81
// =================================

// Do not remove this line 
displayCustomers();

// Event Listener
addBtn.addEventListener("click", addCustomer);