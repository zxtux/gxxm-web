<script>
import _ from 'lodash';

export default {
    name: 'qtButton',

    props: {
        size: {
            type: String,
            default: 'mini'
        },

        buttonName: {
            type: String
        }
    },

    render() {
        const data = {
            attrs: this.$attrs,
            props: this.$props,
            on: {
                listeners: this.$listeners,
                click: _.debounce(
                    () => {
                        this.$emit('click', event);
                    },
                    400,
                    {
                        leading: true,
                        trailing: false
                    }
                )
            }
        };

        return <el-button {...data}>{this.buttonName}</el-button>;
    }
};
</script>
