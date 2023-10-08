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
                                    <img src="@/assets/picture/img1.png" />
                                </div>
                                <div class="ct_au_right">
                                    <b>{{ configData.teachingTeam.personal.name }}</b>
                                    <div class="ct_au_RInfo">
                                        <div class="ct_au_RIItem">
                                            <span>性别：</span>
                                            {{ configData.teachingTeam.personal.gender }}
                                        </div>
                                        <div class="ct_au_RIItem">
                                            <span>出生年月：</span>
                                            {{ configData.teachingTeam.personal.date_of_birth }}
                                        </div>
                                        <div class="ct_au_RIItem">
                                            <span>学历：</span>
                                            {{ configData.teachingTeam.personal.education }}
                                        </div>
                                        <div class="ct_au_RIItem">
                                            <span>学位：</span>
                                            {{ configData.teachingTeam.personal.degree }}
                                        </div>
                                        <div class="ct_au_RIItem">
                                            <span>专业技术职务：</span>
                                            {{
                                                configData.teachingTeam.personal.professional_title
                                            }}
                                        </div>
                                        <div class="ct_au_RIItem">
                                            <span>行政职务：</span>
                                            {{
                                                configData.teachingTeam.personal
                                                    .administrative_position
                                            }}
                                        </div>
                                        <div class="ct_au_RIItem" style="width: 100%;">
                                            <span>院系：</span>
                                            {{ configData.teachingTeam.personal.department }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ct_team_textIntro">
                            <div class="ix_team_title">• 教学研究课题</div>
                            <div class="ix_team_cont">
                                <p
                                    v-for="(item, index) in configData.teachingTeam
                                        .teachingResearchTopics"
                                    :key="index"
                                >
                                    ({{ index + 1 }}) {{ item }}
                                </p>
                            </div>
                        </div>
                        <div class="ct_team_textIntro">
                            <div class="ix_team_title">• 教学表彰/奖励</div>
                            <div class="ix_team_cont">
                                <p
                                    v-for="(item, index) in configData.teachingTeam.teachingAwards"
                                    :key="index"
                                >
                                    ({{ index + 1 }}) {{ item }}
                                </p>
                            </div>
                        </div>
                        <div class="ct_team_textIntro">
                            <div class="ix_team_title">• 教学研究论文</div>
                            <div class="ix_team_cont">
                                <p
                                    v-for="(item, index) in configData.teachingTeam
                                        .teachingResearchPapers"
                                    :key="index"
                                >
                                    ({{ index + 1 }}) {{ item }}
                                </p>
                            </div>
                        </div>
                        <div class="ct_team_textIntro">
                            <div class="ix_team_title">• 教学研究论文</div>
                            <div class="ix_team_cont">
                                <p
                                    v-for="(item, index) in configData.teachingTeam
                                        .academicResearchProjects"
                                    :key="index"
                                >
                                    ({{ index + 1 }}) {{ item }}
                                </p>
                            </div>
                        </div>
                        <div class="ct_team_textIntro">
                            <div class="ix_team_title">• 学术论文</div>
                            <div class="ix_team_cont">
                                <p
                                    v-for="(item, index) in configData.teachingTeam.academicPapers"
                                    :key="index"
                                >
                                    ({{ index + 1 }}) {{ item }}
                                </p>
                            </div>
                        </div>
                        <div class="ct_team_textIntro">
                            <div class="ix_team_title">• 学术研究表彰/奖励</div>
                            <div class="ix_team_cont">
                                <p
                                    v-for="(item, index) in configData.teachingTeam.academicAwards"
                                    :key="index"
                                >
                                    ({{ index + 1 }}) {{ item }}
                                </p>
                            </div>
                        </div>
                        <div class="ct_au_intro">
                            <div class="ct_au_introTitle">• 实验教学项目教学服务团队情况</div>
                            <div
                                class="ct_au_tip"
                                v-for="(item, index) in configData.teachingTeam.teachingTeam"
                                :key="index"
                            >
                                <div class="ct_au_left">
                                    <img :src="item.avatar_url" />
                                </div>
                                <div class="ct_au_right">
                                    <div>{{ item.name }}</div>
                                    <p>
                                        {{ item.schoolName }} / {{ item.position }} /
                                        {{ item.task }}
                                    </p>
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
        return {};
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
