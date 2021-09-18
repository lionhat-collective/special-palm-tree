# Profit-First Calculator — NGF


## Installation
```html
<html>
    <head></head>
    <body>
        <div id="calc-state"></div>
        <div>
            <header>
                <h1>Real Revenue <span id='real-revenue'></span></h1>
            </header>
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
    observers: [
        // you can add as many observers as you'd like
        ['real-revenue', {
            name: 'realRevenue'
        }]
    ],
    accounts: [
        ['account-1', {
            label: 'Account 1',
            placeholder: 'Enter income for account 1'
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
    labelClassName: 'Your additional label-specific classnames here',
    placeholder: 'Your placeholder here',
    className: 'Your additional input-specific classnames here.'
}]
```

**accounts**
```javascript
[
    ['document_identifier', {
        label: 'Account Label here',
        labelClassName: 'Your additional label-specific classnames here',
        placeholder: 'Your placeholder here',
        className: 'Your additional input-specific classnames here.'
    }],
    ['document_identifier', {
        label: 'Account Label here',
        labelClassName: 'Your additional label-specific classnames here',
        placeholder: 'Your placeholder here',
        className: 'Your additional input-specific classnames here.'
    }],
    ['document_identifier', {
        label: 'Account Label here',
        labelClassName: 'Your additional label-specific classnames here',
        placeholder: 'Your placeholder here',
        className: 'Your additional input-specific classnames here.'
    }]
]
```

**observers**
*incomeReceived,
materialCost,
profitPercentage,
ownerPayPercentage,
taxPercentage,
operatingExpensePercentage,
realRevenue,
percentageRemaining,
profitRemaining,
accounts,
intoProfit,
intoOwner,
intoTax,
intoOperatingExpense,
intoAccounts*
```javascript
[
    ['document_identifer', {
        name: '' // any of the above observers.
    }]
]
```