# Profit-First Calculator — NGF


## Installation
```html
<html>
    <head></head>
    <body>
        <div id="calc-state"></div>
        <div>
            <header id="income-section"></header>
            <div id="income"></div>
            <div id="materials"></div>
        </div>
        <script defer async src="/path/to/pfc.js"></script>
        <script type="text/javascript">
            window.addEventListener('load', function() {
                // this first part needs to match an element with an id in the <body> of the
                // document. it can be named whatever you want. It also has to be empty.
                window.profitCalculator('calc-state', {
                    // See usage section.
                });
            });
        </script>
    </body>
</html>
```
## Usage
Configuring the Profit-First Calculator, is very simple. Nearly all properties follow the same pattern of:

```javascript
['document_identifier', {
    propertyName: 'value'
}]
```
Where `document_identifier` matches an element inside the `<body>` element. **DO NOT put it on the `body` element**

As you can see below, this is an example of a configuration:


```javascript
{
    income: ['income', {
        label: 'Income Received',
        placeholder: 'Enter income received'
    }],
    materialCost: ['materials', {
        label: 'Materials and Subcontractors',
        placeholder: 'ex. 1000'
    }],
    headers: [
        // you can add as many headers as you'd like
        ['income-section', {
            title: 'Real Revenue',
            stateKey: 'realRevenue'
        }]
    ]
}
```

## Keys
**income, materialCost, profitPercentage,
ownerPayPercentage, taxPercentage,
operatingExpensePercentage**
```javascript
['document_identifier', {
    label: 'Your label here',
    placeholder: 'Your placeholder here',
    className: 'Your additional classnames here.'
}]
```

**headers**
```javascript
[
    ['document_identifer', {
        title: 'Your header title',
        stateKey: '' // one of: 'realRevenue', 'profitRemaining', 'percentageRemaining'
    }]
]
```

**accounts**
```javascript
// TODO
```

**outputs**
```javascript
// TODO
```