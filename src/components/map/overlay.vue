<template>
    <bm-overlay ref="overlay" pane="labelPane" class="overlay" @draw="draw">
        <div class="tag">
            <svg
                class="tag-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                :width="size"
                :height="size"
            >
                <path
                    d="M512 2.696533C286.071467 2.696533 102.929067 185.838933 102.929067 411.767467c0 251.170133 243.541333 471.432533 373.794133 595.370666a51.080533 51.080533 0 0 0 70.5024 0.136534c127.163733-120.763733 373.8624-345.122133 373.8624-595.5072C921.070933 185.838933 737.928533 2.696533 512 2.696533z m0 562.670934c-84.8384 0-153.6-68.7616-153.6-153.6s68.7616-153.6 153.6-153.6a153.6 153.6 0 0 1 0 307.2z"
                    :fill="color"
                    p-id="2142"
                ></path>
            </svg>
            <div class="tag-index">
                <span :style="{ color }">{{ index }}</span>
            </div>
        </div>
        <div class="text" :style="{ borderColor: color }">
            <span>
                {{ text }}
            </span>
        </div>
    </bm-overlay>
</template>

<script>
export default {
    name: 'overlay',

    data() {
        return {
            size: 35
        };
    },

    props: {
        text: String,

        position: Object,

        color: String,

        index: Number
    },

    watch: {
        position: {
            handler() {
                this.$refs.overlay.reload();
            },
            deep: true
        }
    },

    methods: {
        draw({ el, BMap, map }) {
            const { lng, lat } = this.position;
            const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));

            el.style.left = pixel.x - 16 + 'px';
            el.style.top = pixel.y - 5 + 'px';
        }
    }
};
</script>

<style lang="scss" scoped>
.overlay {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    word-break: keep-all;
    .tag {
        position: relative;
        .tag-index {
            width: 18px;
            height: 18px;
            overflow: hidden;
            position: absolute;
            left: 9px;
            top: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0;
            border-radius: 50%;
            background: #fff;
            span {
                font-weight: bold;
                font-size: 12px;
            }
        }
    }
    .text {
        background: #fff;
        border-width: 1px;
        border-style: solid;
        border-radius: 3px;
        padding: 0 3px;
        height: 25px;
        font-size: 0;
        display: flex;
        align-items: center;
        span {
            font-weight: 400;
            font-size: 12px;
        }
    }
}
</style>
