const operatorList = {
    text: [
        {
            value: '~',
            label: '包含',
            method: 'Contains'
        },
        {
            value: '=',
            label: '等于',
            method: 'Equal'
        },
        {
            value: 'in',
            label: '其中之一',
            method: 'StdIn'
        },
        {
            value: '!in',
            label: '非其中之一',
            method: 'StdNotIn'
        },
        {
            value: '!~',
            label: '不包含',
            method: 'NotLike'
        },
        {
            value: '^',
            label: '开始于',
            method: 'StartsWith'
        },
        {
            value: '|',
            label: '结束于',
            method: 'EndsWith'
        }
    ],
    number: [
        {
          value: '=',
          label: '等于',
          method: 'Equal'
        },
        {
          value: '<=',
          label: '小于等于',
          method: 'LessThanOrEqual'
        },
        {
          value: '<',
          label: '小于',
          method: 'LessThan'
        },
        {
          value: '>',
          label: '大于',
          method: 'GreaterThan'
        },
        {
          value: '>=',
          label: '大于等于',
          method: 'GreaterThanOrEqual'
        }
    ]
};

export { operatorList };
