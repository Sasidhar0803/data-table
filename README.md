# Mastering Lightning Data Table in LWC: A Comprehensive Guide with Examples

## Introduction

Lightning Web Components (LWC) have revolutionized the way developers build user interfaces on the Salesforce platform. Among the many powerful components available in LWC, the `lightning-datatable` stands out as a versatile and feature-rich component for displaying and interacting with tabular data. Whether you need to display simple data sets or implement advanced features like sorting, inline editing, and row selection, the `lightning-datatable` has got you covered.

In this blog, we'll explore the various features of the `lightning-datatable` component, including how to implement sorting, inline editing, row selection, and more. We'll provide practical examples and code snippets to help you get started with building dynamic and interactive data tables in your LWC projects.

## What is `lightning-datatable`?

The `lightning-datatable` component is a pre-built LWC component that allows you to display data in a tabular format. It comes with a variety of built-in features, such as sorting, filtering, inline editing, and row selection, making it a powerful tool for building data-rich user interfaces.

### Key Features:

1. **Sorting**: Allows users to sort data by clicking on column headers.
2. **Inline Editing**: Enables users to edit data directly within the table.
3. **Row Selection**: Allows users to select one or more rows for further action.
4. **Pagination**: Supports pagination for large data sets.
5. **Custom Cell Rendering**: Allows you to customize how data is displayed in individual cells.

## Basic Usage of `lightning-datatable`

Before diving into advanced features, let's start with a basic example of how to use the `lightning-datatable` component.

### HTML:

```html
<template>
    <lightning-datatable
        key-field="id"
        data={data}
        columns={columns}>
    </lightning-datatable>
</template>
```

### JavaScript:

```javascript
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
```

### Explanation:

- **`key-field`**: A unique identifier for each row. This is required for the table to function correctly.
- **`data`**: The data to be displayed in the table. This should be an array of objects.
- **`columns`**: Defines the columns in the table. Each column has a `label` (the column header) and a `fieldName` (the key in the data object).

## Implementing Sorting

Sorting is a common requirement for data tables. The `lightning-datatable` component supports sorting out of the box. To enable sorting, you need to set the `sortable` property to `true` for the columns you want to be sortable.

### HTML:

```html
<template>
    <lightning-datatable
        key-field="id"
        data={data}
        columns={columns}
        onsort={handleSort}>
    </lightning-datatable>
</template>
```

### JavaScript:

```javascript
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
```

### Explanation:

- **`sortable: true`**: Enables sorting for the column.
- **`onsort`**: Event handler that triggers when a column header is clicked to sort the data.
- **`handleSort`**: Custom method to handle the sorting logic. It sorts the data based on the selected column and sort direction.

## Implementing Inline Editing

Inline editing allows users to edit data directly within the table. To enable inline editing, you need to set the `editable` property to `true` for the columns you want to be editable.

### HTML:

```html
<template>
    <lightning-datatable
        key-field="id"
        data={data}
        columns={columns}
        onsave={handleSave}>
    </lightning-datatable>
</template>
```

### JavaScript:

```javascript
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
```

### Explanation:

- **`editable: true`**: Enables inline editing for the column.
- **`onsave`**: Event handler that triggers when the user saves the edited data.
- **`handleSave`**: Custom method to handle the save logic. It updates the data with the edited values.

## Implementing Row Selection

Row selection allows users to select one or more rows for further action. To enable row selection, you need to set the `selected-rows` property and handle the `rowselection` event.

### HTML:

```html
<template>
    <lightning-datatable
        key-field="id"
        data={data}
        columns={columns}
        selected-rows={selectedRows}
        onrowselection={handleRowSelection}>
    </lightning-datatable>
</template>
```

### JavaScript:

```javascript
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

export default class SelectableDataTable extends LightningElement {
    data = data;
    columns = columns;
    selectedRows = [];

    handleRowSelection(event) {
        this.selectedRows = event.detail.selectedRows;
    }
}
```

### Explanation:

- **`selected-rows`**: Binds the selected rows to a property in the component.
- **`onrowselection`**: Event handler that triggers when rows are selected.
- **`handleRowSelection`**: Custom method to handle the row selection logic. It updates the `selectedRows` property with the selected rows.

## Custom Cell Rendering

Custom cell rendering allows you to customize how data is displayed in individual cells. This is useful for displaying icons, buttons, or other custom content.

### HTML:

```html
<template>
    <lightning-datatable
        key-field="id"
        data={data}
        columns={columns}>
    </lightning-datatable>
</template>
```

### JavaScript:

```javascript
import { LightningElement } from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Email', fieldName: 'email' },
    { label: 'Phone', fieldName: 'phone' },
    {
        label: 'Action',
        type: 'button',
        typeAttributes: {
            label: 'View',
            name: 'view',
            variant: 'brand'
        }
    }
];

const data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-9012' }
];

export default class CustomCellDataTable extends LightningElement {
    data = data;
    columns = columns;
}
```

### Explanation:

- **`type: 'button'`**: Specifies that the cell should render a button.
- **`typeAttributes`**: Defines the attributes of the button, such as `label`, `name`, and `variant`.

## Conclusion

The `lightning-datatable` component is a powerful and flexible tool for displaying and interacting with tabular data in LWC. With built-in support for sorting, inline editing, row selection, and custom cell rendering, it provides everything you need to build dynamic and interactive data tables in your Salesforce applications.

In this blog, we've covered the basics of using the `lightning-datatable` component, as well as how to implement advanced features like sorting, inline editing, row selection, and custom cell rendering. With these examples and best practices, you're well-equipped to start building your own data tables in LWC.

Happy coding!
