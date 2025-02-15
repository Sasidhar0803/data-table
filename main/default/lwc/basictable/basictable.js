import { LightningElement } from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Email', fieldName: 'email' },
    { label: 'Phone', fieldName: 'phone' }
];

const data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-9012' }
];

export default class BasicDataTable extends LightningElement {
    data = data;
    columns = columns;
}