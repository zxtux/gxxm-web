export default require
    .context('@/components/qt/components', true, /index.vue/)
    .keys()
    .map(item => {
        return require('@/components/qt/components/' + item.replace('./', '')).default;
    });
