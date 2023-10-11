<template>
    <div ref="outerDom">
        <div class="backgroundPic">
            <div class="px-40px flex flex-col py-40px items-center">
                <img src="picture/name.png" />
                <div class="bg-[#fff] w-80 mt-30px rounded-10px">
                    <div class="flex">
                        <img src="picture/left.png" />
                        <div class="flex-1"></div>
                        <img src="picture/right.png" />
                    </div>
                    <div class="flex justify-center items-center mt--30px">
                        <img src="picture/a.png" class="h-10px" />
                        <div class="text-size-30px mx-60px font-bold color-[#1D6DCF]">教学团队</div>
                        <img src="picture/aa.png" class="h-10px" />
                    </div>
                    <div class="px-60px">
                        <el-divider />
                    </div>
                    <div class="sl_NCLBoxc px-50px">
                        <div class="ct_au_intro">
                            <div class="ct_au_introTitle">• 实验教学项目负责人</div>
                            <div class="ct_au_tip">
                                <div class="ct_au_left">
                                    <el-image
                                        :src="principal.avatar_url"
                                        style="height: 120px; width: 100px;"
                                    />
                                </div>
                                <div class="ct_au_right">
                                    <b>{{ principal.name }}</b>
                                    <div class="ct_au_RInfo">
                                        <div class="ct_au_RIItem">
                                            <span>性别：</span>
                                            {{ principal.gender }}
                                        </div>
                                        <div class="ct_au_RIItem">
                                            <span>出生年月：</span>
                                            {{ principal.date_of_birth }}
                                        </div>
                                        <div class="ct_au_RIItem">
                                            <span>学历：</span>
                                            {{ principal.education }}
                                        </div>
                                        <div class="ct_au_RIItem">
                                            <span>学位：</span>
                                            {{ principal.degree }}
                                        </div>
                                        <div class="ct_au_RIItem">
                                            <span>专业技术职务：</span>
                                            {{ principal.professional_title }}
                                        </div>
                                        <div class="ct_au_RIItem">
                                            <span>行政职务：</span>
                                            {{ principal.administrative_position }}
                                        </div>
                                        <div class="ct_au_RIItem" style="width: 100%;">
                                            <span>院系：</span>
                                            {{ principal.department }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="ct_team_textIntro"
                            v-for="(item, index) in teachingTeam.teachingContent"
                            :key="index"
                        >
                            <div class="ix_team_title">• {{ item.name }}</div>
                            <div class="ix_team_cont">
                                <p v-for="(v, i) in item.content" :key="i">
                                    {{ v }}
                                </p>
                            </div>
                        </div>
                        <div class="ct_au_intro">
                            <div class="ct_au_introTitle">• 实验教学项目教学服务团队情况</div>
                            <div
                                class="ct_au_tip"
                                v-for="(item, index) in teachingTeam.teachingTeam"
                                :key="index"
                            >
                                <div class="ct_au_left">
                                    <el-image
                                        :src="item.avatar_url"
                                        style="height: 120px; width: 100px;"
                                    />
                                </div>
                                <div class="ct_au_right">
                                    <div>{{ item.name }}</div>
                                    <p>
                                        {{ item.schoolName }} / {{ item.position }} /
                                        {{ item.task }}
                                    </p>
                                    <p>{{ item.remark }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <backTop @changeScrollTop="changeScrollTop" type="about" />
        <Footer />
    </div>
</template>

<script>
import Footer from './footer';
import backTop from './backTop.vue';
export default {
    name: 'about',
    components: {
        Footer,
        backTop
    },
    data() {
        return {
            teachingTeam: {},
            principal: {}
        };
    },
    mounted() {
        this.teachingTeam = window.globalData.teachingTeam;
        this.principal = this.teachingTeam.personal;
    },
    methods: {
        changeScrollTop() {
            this.$refs.outerDom.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
</script>

<style lang="scss" scoped>
.ct_au_left {
    height: auto;
    border-radius: 0;
}
</style>
