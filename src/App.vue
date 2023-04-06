<template>
    <router-view :key="$route.path"/>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'app',

    created() {
        if (process.env.NODE_ENV === 'production') {
            this.getSsid();
        } else {
            if (!this.ssid) {
                this.$router.push('login');
            }
        }
    },

    computed: {
        ...mapState('common', ['ssid'])
    },

    mounted() {
        if (process.env.NODE_ENV === 'production') {
            this.getVersion();
        }
    },

    methods: {
        ...mapActions('common', ['setData']),

        async getSsid() {
            const res = await this.$http.fetchData({
                url: 'SCM.TMS7.WebApi/Oauth/GetSsidFormCurrentContext',
                type: 2
            });

            this.setData({ key: 'ssid', value: res.token, modules: 'common' });
        },

        getVersion() {
            let log = [
                {
                    msg: `%c项目名称%c手工分段`
                },
                {
                    msg: `%c版本信息%c${__TAGS__}`,
                    bgColor: 'rgba(104,188,71,1)'
                },
                {
                    msg: `%c打包时间%c${this.$moment(__BUILDDATE__).format('YYYY-MM-DD HH:mm:ss')}`
                },
                {
                    msg: `%c项目分支%c${__BRANCH__}`
                },
                {
                    msg: `%c提交记录%c${__COMMIT__}`
                }
            ];

            function versionLog({ bgColor, color, msg }) {
                if (!bgColor) {
                    bgColor = 'rgba(52,117,173,1)';
                }

                if (!color) {
                    color = '#fff';
                }

                const lableStyle =
                        'background:rgba(96,96,96,1);font-size:12px;padding:1px 10px;color:#fff;border-top-left-radius:4px;border-bottom-left-radius:4px;',
                    msgStyle = `background:${bgColor};font-size:12px;padding:1px 10px;color:${color};border-top-right-radius:4px;border-bottom-right-radius:4px;`;

                console.info(msg.trim(), lableStyle, msgStyle);
            }

            log.forEach(item => {
                versionLog(item);
            });
        }
    }
};
</script>
