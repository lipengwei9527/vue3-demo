
export default [
    {
        path: '/ts_note',
        name: 'ts笔记',
        component: () => import('@/views/NoteManage/TsNote/index.vue')
    },
    {
        path: '/theme_change',
        name: '主题切换',
        component: () => import('@/views/NoteManage/CssTheme/index.vue')
    }
]