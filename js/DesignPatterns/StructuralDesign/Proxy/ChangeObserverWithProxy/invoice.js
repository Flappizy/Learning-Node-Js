import { createObservable } from "./create-observable.js";

function calculateTotal(invoice) {
    return invoice.subTotal - invoice.discount + invoice.tax;
}

const invoice = {
    subTotal: 100,
    discount: 32,
    tax: 5
};

let total = calculateTotal(invoice);
console.log(`Starting total: ${total}`);

const obsInvoice = createObservable(invoice, ({ prop, previousValue, currentValue }) => {
        total = calculateTotal(invoice)
        console.log(`TOTAL: ${total} (${prop} changed: ${previousValue} ->${currentValue})`)
});

obsInvoice.subTotal = 200;
obsInvoice.discount = 20;
obsInvoice.discount = 20;
obsInvoice.tax = 30; 
console.log(`Final total: ${total}`);