import {defineStore} from "pinia";

export const useFilterStore = defineStore('filterStore',{
    state: () => ({
        search: '',
        category: '',
    }),
    actions: {
        setCategory(category) {
            if (this.category === category) {
                this.category = ''
            } else {
                this.category = category
            }
        },
        setSearch(search) {
            this.search = search
        }
    }
})