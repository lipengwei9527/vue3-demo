
import { createI18n } from 'vue-i18n'
import localEn from './lang/en'
import LocalZh from './lang/zh'
const messages = {
    en: {
        ...localEn
    },
    zh: {
        ...LocalZh
    }
}
const i18n = createI18n({
    locale: localStorage.getItem('local') || 'zh',
    legacy: false, // 使用componentAPI必须添加这条.
    globalInjection: true,// 全局使用$t
    fallbackLocale: 'zh', // 设置回退语言环境
    messages
})
export default i18n