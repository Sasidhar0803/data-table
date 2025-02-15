import { LightningElement } from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'name', sortable: true },
    { label: 'Email', fieldName: 'email', sortable: true },
    { label: 'Phone', fieldName: 'phone', sortable: true }
];

const data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-9012' }
];

export default class SortableDataTable extends LightningElement {
    data = data;
    columns = columns;

    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        const sortedData = this.sortData(fieldName, sortDirection);
        this.data = sortedData;
    }

    sortData(fieldName, sortDirection) {
        const data = [...this.data];
        const reverse = sortDirection === 'asc' ? 1 : -1;

        data.sort((a, b) => {
            if (a[fieldName] < b[fieldName]) return -1 * reverse;
            if (a[fieldName] > b[fieldName]) return 1 * reverse;
            return 0;
        });

        return data;
    }
}