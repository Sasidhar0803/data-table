import { LightningElement } from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'name', editable: true },
    { label: 'Email', fieldName: 'email', editable: true },
    { label: 'Phone', fieldName: 'phone', editable: true }
];

const data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-9012' }
];

export default class EditableDataTable extends LightningElement {
    data = data;
    columns = columns;

    handleSave(event) {
        const updatedFields = event.detail.draftValues;
        const updatedData = this.data.map(item => {
            const updatedItem = updatedFields.find(field => field.id === item.id);
            return updatedItem ? { ...item, ...updatedItem } : item;
        });

        this.data = updatedData;
    }
}